'use client';

import { useEffect, useState } from 'react';
import { ModalContextType, useModalContext } from './context';
import ReactDOM from 'react-dom';
import { classNames } from '../../utils';
import { MODAL_PORTAL_ID } from './constant';
import './modal-styles.css';

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
        'modal-backdrop',
        isOpen ? 'modal-backdrop-visible' : 'modal-backdrop-invisible',
        className,
      )}
    >
      {children({ isOpen, openModal, closeModal })}
    </Component>,
    document.getElementById(MODAL_PORTAL_ID)!,
  );
};

export default ModalBackdrop;
