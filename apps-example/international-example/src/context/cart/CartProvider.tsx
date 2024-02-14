'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  CartContext,
  CartContextType,
  CartMutationContext,
  CartQueryContext,
  TCartMutationContext,
  TCartQueryContext,
} from './context';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
  updateCartLocale,
} from '@/@marulloc-shopify-nextapi/v24.01/services/cart/service';
import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';
import { useCartInitEffect, useCartLocaleEffect } from './hooks';
import { ToolkitCart } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';

type Props = {
  children: React.ReactNode;
  locale?: ShopifyLocaleContext;
};

const CartProvider = ({ children, locale }: Props) => {
  const [contextState, setContextState] = useState<CartContextType>({
    cart: null,
    status: 'pending',
    addItem: async ({ variantId, quantity }) => {},
    updateItem: async ({ lineId, quantity }) => {},
    deleteItem: async ({ lineId }) => {},
  });

  useCartInitEffect(contextState, setContextState, locale);
  useCartLocaleEffect(contextState, setContextState, locale);

  /**
   * Service Functions (mutations)
   * - addItem()
   * - updateItem()
   * - deleteItem()
   */
  const addItem: CartContextType['addItem'] = useCallback(
    async ({ variantId, quantity }) => {
      if (!contextState.cart) return;

      setContextState(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
      const newCart = await addToCart(contextState.cart.id, [{ merchandiseId: variantId, quantity }], locale);
      setContextState(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
    },
    [contextState.cart, locale],
  );

  const updateItem: CartContextType['updateItem'] = useCallback(
    async ({ lineId, quantity }) => {
      if (!contextState.cart) return;

      setContextState(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
      const newCart = await updateCart(contextState.cart.id, [{ id: lineId, quantity }], locale);
      setContextState(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
    },
    [contextState.cart, locale],
  );
  const deleteItem: CartContextType['deleteItem'] = useCallback(
    async ({ lineId }) => {
      if (!contextState.cart) return;

      setContextState(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
      const newCart = await removeFromCart(contextState.cart.id, [lineId], locale);
      setContextState(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
    },
    [contextState.cart, locale],
  );

  return (
    <CartContext.Provider value={{ ...contextState, addItem, updateItem, deleteItem }}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

type TProps = {
  children: React.ReactNode;
  locale?: ShopifyLocaleContext;
  storageKey: string;
};
export const CartProvider2 = ({ children, locale, storageKey }: TProps) => {
  const [cartQueryContext, setCartQueryContext] = useState<TCartQueryContext>({ cart: null, status: 'pending' });

  const initCart = async () => {
    const memoizedCart = JSON.parse(localStorage.getItem(storageKey) || 'null') as ToolkitCart | null;

    let savedOrNewCart: ToolkitCart;
    if (memoizedCart) savedOrNewCart = await getCart(memoizedCart.id, locale);
    else savedOrNewCart = await createCart(locale);
    setCartQueryContext({ status: 'loaded', cart: savedOrNewCart });
  };

  const memoCart = async (cart: TCartQueryContext['cart']) => {
    if (!cart) return;
    localStorage.setItem(storageKey, JSON.stringify(cart));
  };

  const updateLocale = async () => {
    if (!cartQueryContext.cart || !locale) return;
    if (locale.country?.toLowerCase() === cartQueryContext.cart?.buyerIdentity?.countryCode.toLowerCase()) return;

    setCartQueryContext(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
    const cartWithNewLocale = await updateCartLocale(cartQueryContext.cart.id, locale);
    setCartQueryContext(({ status, ...rest }) => ({ ...rest, cart: cartWithNewLocale, status: 'loaded' }));
  };

  const addItem: CartContextType['addItem'] = async ({ variantId, quantity }) => {
    if (!cartQueryContext.cart) return;

    setCartQueryContext(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
    const newCart = await addToCart(cartQueryContext.cart.id, [{ merchandiseId: variantId, quantity }], locale);
    setCartQueryContext(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
  };

  const updateItem: CartContextType['updateItem'] = async ({ lineId, quantity }) => {
    if (!cartQueryContext.cart) return;

    setCartQueryContext(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
    const newCart = await updateCart(cartQueryContext.cart.id, [{ id: lineId, quantity }], locale);
    setCartQueryContext(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
  };

  const deleteItem: CartContextType['deleteItem'] = async ({ lineId }) => {
    if (!cartQueryContext.cart) return;

    setCartQueryContext(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
    const newCart = await removeFromCart(cartQueryContext.cart.id, [lineId], locale);
    setCartQueryContext(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
  };

  useEffect(() => {
    initCart();
    updateLocale();

    return () => {
      memoCart(cartQueryContext.cart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartQueryContext.cart, locale]);

  return (
    <CartMutationContext.Provider value={{ addItem, updateItem, deleteItem }}>
      <CartQueryContext.Provider value={cartQueryContext}>{children}</CartQueryContext.Provider>
    </CartMutationContext.Provider>
  );
};
