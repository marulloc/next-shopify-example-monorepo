'use client';

import { useEffect, useState } from 'react';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
  updateCartLocale,
} from '@/@marulloc-shopify-nextapi/v24.01/services/cart/service';
import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';
import { ToolkitCart } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import { CartMutationContext, CartQueryContext, TCartMutationContext, TCartQueryContext } from './context';

type TProps = {
  children: React.ReactNode;
  locale?: ShopifyLocaleContext;
  storageKey: string;
};
const CartProvider = ({ children, locale, storageKey }: TProps) => {
  const [cartQueryContext, setCartQueryContext] = useState<TCartQueryContext>({ cart: null, status: 'pending' });

  const readLocalCart = () => JSON.parse(localStorage.getItem(storageKey) || 'null') as ToolkitCart | null;

  const memoCart = async (cart: TCartQueryContext['cart']) => {
    if (!cart) return;
    localStorage.setItem(storageKey, JSON.stringify(cart));
  };

  const initCart = async () => {
    const memoizedCart = readLocalCart();

    let savedOrNewCart: ToolkitCart;
    if (memoizedCart) savedOrNewCart = await getCart(memoizedCart.id, locale);
    else savedOrNewCart = await createCart(locale);
    setCartQueryContext({ status: 'loaded', cart: savedOrNewCart });
  };

  const updateLocale = async () => {
    const memoizedCart = readLocalCart();

    if (!memoizedCart || !locale) return;
    if (locale.country?.toLowerCase() === cartQueryContext.cart?.buyerIdentity?.countryCode.toLowerCase()) return;

    setCartQueryContext(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
    const cartWithNewLocale = await updateCartLocale(memoizedCart.id, locale);
    setCartQueryContext(({ status, ...rest }) => ({ ...rest, cart: cartWithNewLocale, status: 'loaded' }));
  };

  const addItem: TCartMutationContext['addItem'] = async ({ variantId, quantity }) => {
    const memoizedCart = readLocalCart();
    if (!memoizedCart) return;

    //=> use this comment if you don't want optimistic
    // setCartQueryContext(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
    const newCart = await addToCart(memoizedCart.id, [{ merchandiseId: variantId, quantity }], locale);
    setCartQueryContext(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
  };

  const updateItem: TCartMutationContext['updateItem'] = async ({ lineId, quantity }) => {
    const memoizedCart = readLocalCart();
    if (!memoizedCart) return;

    //=> use this comment if you don't want optimistic
    // setCartQueryContext(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
    const newCart = await updateCart(memoizedCart.id, [{ id: lineId, quantity }], locale);
    setCartQueryContext(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
  };

  const deleteItem: TCartMutationContext['deleteItem'] = async ({ lineId }) => {
    const memoizedCart = readLocalCart();
    if (!memoizedCart) return;

    //=> use this comment if you don't want optimistic
    // setCartQueryContext(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
    const newCart = await removeFromCart(memoizedCart.id, [lineId], locale);
    setCartQueryContext(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
  };

  useEffect(() => {
    initCart();
    // return () => {
    //   memoCart(cartQueryContext.cart);
    // }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateLocale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return (
    <CartMutationContext.Provider value={{ addItem, updateItem, deleteItem }}>
      <CartQueryContext.Provider value={cartQueryContext}>{children}</CartQueryContext.Provider>
    </CartMutationContext.Provider>
  );
};

export default CartProvider;
