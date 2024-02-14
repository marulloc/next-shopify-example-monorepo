'use client';

import { useContext } from 'react';
import { CartMutationContext, CartQueryContext } from './context';

export const useCartQuery = () => {
  const context = useContext(CartQueryContext);
  if (!context) {
    throw new Error('useCartData must be used within a CartDataProvider');
  }
  return context;
};

export const useCartMutation = () => {
  const context = useContext(CartMutationContext);

  if (!context) {
    throw new Error('useCartActions must be used within a CartActionsProvider');
  }
  return context;
};
