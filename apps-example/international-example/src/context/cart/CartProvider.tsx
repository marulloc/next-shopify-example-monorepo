'use client';

import { useCallback, useEffect, useState } from 'react';
import { CartContext, CartContextType } from './context';
import { addToCart, removeFromCart, updateCart } from '@/@marulloc-shopify-nextapi/v24.01/services/cart/service';
import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';
import { useCartInitEffect, useCartLocaleEffect } from './hooks';

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
