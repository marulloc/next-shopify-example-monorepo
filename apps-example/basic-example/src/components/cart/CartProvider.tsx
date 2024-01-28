'use client';

import { useCallback, useEffect, useState } from 'react';
import { CartContext, CartContextType } from './context';
import { addToCart, createCart, getCart, removeFromCart, updateCart } from '@/services/cart/services';

type Props = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: Props) => {
  const [contextState, setContextState] = useState<CartContextType>({
    cart: null,
    status: 'pending',
    addItem: async ({ variantId, quantity }) => {},
    updateItem: async ({ lineId, quantity }) => {},
    deleteItem: async ({ lineId }) => {},
  });

  useEffect(() => {
    const storageKey = 'marulloc-cart';

    if (contextState.cart) {
      localStorage.setItem(storageKey, JSON.stringify(contextState.cart));
      return;
    }

    (async () => {
      const savedCart = JSON.parse(localStorage.getItem(storageKey) || 'null') as Cart | null;

      if (savedCart) {
        const memoizedCart = await getCart(savedCart.id);
        setContextState(({ status, ...rest }) => ({ ...rest, cart: memoizedCart, status: 'loaded' }));
      } else {
        const newCart = await createCart();
        setContextState(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
      }
    })();
  }, [contextState.cart]);

  const addItem: CartContextType['addItem'] = useCallback(
    async ({ variantId, quantity }) => {
      if (!contextState.cart) return;

      setContextState(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
      const newCart = await addToCart(contextState.cart.id, [{ merchandiseId: variantId, quantity }]);
      setContextState(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
    },
    [contextState.cart],
  );

  const updateItem: CartContextType['updateItem'] = useCallback(
    async ({ lineId, quantity }) => {
      if (!contextState.cart) return;

      setContextState(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
      const newCart = await updateCart(contextState.cart.id, [{ id: lineId, quantity }]);
      setContextState(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
    },
    [contextState.cart],
  );
  const deleteItem: CartContextType['deleteItem'] = useCallback(
    async ({ lineId }) => {
      if (!contextState.cart) return;

      setContextState(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
      const newCart = await removeFromCart(contextState.cart.id, [lineId]);
      setContextState(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
    },
    [contextState.cart],
  );

  return (
    <CartContext.Provider value={{ ...contextState, addItem, updateItem, deleteItem }}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
