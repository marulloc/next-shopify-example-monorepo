'use client';

import { ToolkitCart } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import { createContext, useContext } from 'react';

type CartService = {
  addItem: ({ variantId, quantity }: { variantId: string; quantity: number }) => Promise<void>;
  updateItem: ({ lineId, quantity }: { lineId: string; quantity: number }) => Promise<void>;
  deleteItem: ({ lineId }: { lineId: string }) => Promise<void>;
};
type CartPendingStatus = {
  status: 'pending';
  cart: null | ToolkitCart;
} & CartService;

type CartLoadedStatus = {
  status: 'loaded';
  cart: ToolkitCart;
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

// Refactoring
export type TCartMutationContext = {
  addItem: ({ variantId, quantity }: { variantId: string; quantity: number }) => Promise<void>;
  updateItem: ({ lineId, quantity }: { lineId: string; quantity: number }) => Promise<void>;
  deleteItem: ({ lineId }: { lineId: string }) => Promise<void>;
};

export const CartMutationContext = createContext<TCartMutationContext>({
  addItem: async () => {},
  updateItem: async () => {},
  deleteItem: async () => {},
});

export const useCartMutation = () => {
  const context = useContext(CartMutationContext);

  if (!context) {
    throw new Error('useCartActions must be used within a CartActionsProvider');
  }
  return context;
};

export type TCartQueryContext =
  | { status: 'pending'; cart: null | ToolkitCart }
  | { status: 'loaded'; cart: ToolkitCart };

export const CartQueryContext = createContext<TCartQueryContext>({
  status: 'pending',
  cart: null,
});

export const useCartQuery = () => {
  const context = useContext(CartQueryContext);
  if (!context) {
    throw new Error('useCartData must be used within a CartDataProvider');
  }
  return context;
};
