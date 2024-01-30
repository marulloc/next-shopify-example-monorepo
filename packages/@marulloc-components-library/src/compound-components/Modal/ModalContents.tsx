'use client';

import { useEffect, useState } from 'react';
import { ModalContextType, useModalContext } from './context';
import ReactDOM from 'react-dom';
import { classNames } from '../../utils';
import { MODAL_PORTAL_ID } from './constant';
import './modal-styles.css';

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
        'modal-contents',
        isOpen ? 'modal-contents-visible' : 'modal-contents-invisible',
        className,
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
