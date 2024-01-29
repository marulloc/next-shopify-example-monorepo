'use client';

import React from 'react';
import { ModalContextType, useModalContext } from './context';

type ModalTriggerProps<T extends React.ElementType = typeof React.Fragment> = {
  children: (props: ModalContextType) => React.ReactNode;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children'>;

const ModalTrigger = <T extends React.ElementType = typeof React.Fragment>({
  as,
  children,
  ...rest
}: ModalTriggerProps<T>) => {
  const context = useModalContext();

  const Component = as ?? React.Fragment;
  return <Component {...rest}>{children({ ...context })}</Component>;
};

export default ModalTrigger;
