'use client';

import { createContext, useContext } from 'react';

export type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) throw new Error('<Modal.*> component must be rendered as child of <Modal> component');
  return context;
};
