'use client';

import { useEffect, useState } from 'react';
import { ModalContextType, useModalContext } from './context';
import ReactDOM from 'react-dom';
import { classNames } from '@/styles/utils';
import { MODAL_PORTAL_ID } from './constant';

type ModalBackdropProps<T extends React.ElementType = 'div'> = {
  children: (props: ModalContextType) => React.ReactNode;
  preventScroll?: boolean;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children'>;

const ModalBackdrop = <T extends React.ElementType = 'div'>({
  children,
  preventScroll,
  as,
  className,
  ...rest
}: ModalBackdropProps<T>) => {
  const { isOpen, openModal, closeModal } = useModalContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [isOpen]);

  if (!isMounted) return null;

  const Component = as ?? 'div';
  return ReactDOM.createPortal(
    <Component
      {...rest}
      className={classNames(
        'fixed z-30 top-0 left-0 w-screen h-screen transition-all transform duration-300 ease-in-out ',
        isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        className,
      )}
      onClick={(e: any) => {
        closeModal();
      }}
    >
      {children({ isOpen, openModal, closeModal })}
    </Component>,
    document.getElementById(MODAL_PORTAL_ID)!,
  );
};

export default ModalBackdrop;
