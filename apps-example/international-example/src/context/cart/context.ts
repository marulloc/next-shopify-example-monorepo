'use client';

import { ToolkitCart } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import { createContext } from 'react';

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

export type TCartQueryContext =
  | { status: 'pending'; cart: null | ToolkitCart }
  | { status: 'loaded'; cart: ToolkitCart };

export const CartQueryContext = createContext<TCartQueryContext>({
  status: 'pending',
  cart: null,
});
