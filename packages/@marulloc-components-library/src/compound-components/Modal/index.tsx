'use client';

import { useCallback, useEffect, useState } from 'react';
import { ModalContext, ModalContextType } from './context';
import ModalTrigger from './ModalTrigger';
import ModalContents from './ModalContents';
import ModalBackdrop from './ModalBackdrop';
import { withPortalRoot } from '../../portal-hoc';
import { MODAL_PORTAL_ID } from './constant';

export type ModalRootProps = {
  children: React.ReactNode;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

const ModalRoot: React.ComponentType<ModalRootProps> = ({ children, open, onClose, onOpen }: ModalRootProps) => {
  const [context, setContext] = useState<ModalContextType>({
    isOpen: open || false,
    openModal: () => {},
    closeModal: () => {},
  });

  useEffect(() => {
    setContext((context) => {
      if (open === undefined) return { ...context };
      return { ...context, isOpen: open };
    });
  }, [open]);

  const openModal = useCallback(() => {
    setContext((context) => ({ ...context, isOpen: true }));
    if (onOpen) onOpen();
  }, [onOpen]);
  const closeModal = useCallback(() => {
    setContext((context) => ({ ...context, isOpen: false }));
    if (onClose) onClose();
  }, [onClose]);

  return (
    <ModalContext.Provider value={{ ...context, openModal, closeModal }}>
      <>{children}</>
    </ModalContext.Provider>
  );
};

const Modal = Object.assign(withPortalRoot(ModalRoot, MODAL_PORTAL_ID), {
  Trigger: ModalTrigger,
  Contents: ModalContents,
  Backdrop: ModalBackdrop,
});

export default Modal