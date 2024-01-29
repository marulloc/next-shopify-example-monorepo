'use client';

import { createContext, useContext } from 'react';

export type DropdownContextType = {
  isOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  triggerId: string;
  dropdownId: string;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) throw new Error('<Dropdown.*> component must be rendered as child of <Dropdown> component');
  return context;
};
