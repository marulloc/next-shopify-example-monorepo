'use client';

import { createContext, useContext } from 'react';

export type DrawerContextType = {
  isOpen: boolean;
  anchor: 'top' | 'left' | 'bottom' | 'right';
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const DrawerContext = createContext<DrawerContextType | null>(null);

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);

  if (!context) throw new Error('<Drawer.*> component must be rendered as child of <Drawer> component');
  return context;
};
