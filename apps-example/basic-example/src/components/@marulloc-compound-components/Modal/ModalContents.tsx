'use client';

import { useEffect, useState } from 'react';
import { ModalContextType, useModalContext } from './context';
import ReactDOM from 'react-dom';
import { classNames } from '@/styles/utils';
import { MODAL_PORTAL_ID } from './constant';

type ModalContentsProps<T extends React.ElementType = 'div'> = {
  children: (props: ModalContextType) => React.ReactNode;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children'>;

const ModalContents = <T extends React.ElementType = 'div'>({
  children,
  as,
  className,
  ...rest
}: ModalContentsProps<T>) => {
  const { isOpen, openModal, closeModal } = useModalContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const Component = as ?? 'div';
  return ReactDOM.createPortal(
    <Component
      {...rest}
      id="modal-contents-wrapper"
      className={classNames(
        'fixed inset-0 z-40',
        'transition-all transform duration-300 ease-in-out',
        isOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-4',
      )}
      onClick={(e: any) => {
        if (e.target.id === 'modal-contents-wrapper') closeModal();
      }}
    >
      <>{children({ isOpen, openModal, closeModal })}</>
    </Component>,
    document.getElementById(MODAL_PORTAL_ID)!,
  );
};

export default ModalContents;
