'use client';

import { Dispatch, SetStateAction, createContext, useContext } from 'react';

type CartService = {
  addItem: ({ variantId, quantity }: { variantId: string; quantity: number }) => Promise<void>;
  updateItem: ({ lineId, quantity }: { lineId: string; quantity: number }) => Promise<void>;
  deleteItem: ({ lineId }: { lineId: string }) => Promise<void>;
};
type CartPendingStatus = {
  status: 'pending';
  cart: null | Cart;
} & CartService;

type CartLoadedStatus = {
  status: 'loaded';
  cart: Cart;
} & CartService;

export type CartContextType = CartPendingStatus | CartLoadedStatus;

export const CartContext = createContext<CartContextType>({
  status: 'pending',
  cart: null,
  addItem: async () => {},
  updateItem: async () => {},
  deleteItem: async () => {},
});

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('<Cart.*> component must be rendered as child of <Cart> component');
  }

  return context;
};
