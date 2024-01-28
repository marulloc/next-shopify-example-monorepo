'use client';

import React from 'react';
import { DrawerContextType, useDrawerContext } from './context';

type DrawerTriggerProps<T extends React.ElementType = typeof React.Fragment> = {
  children: (props: DrawerContextType) => React.ReactNode;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children'>;

const DrawerTrigger = <T extends React.ElementType = typeof React.Fragment>({
  as,
  children,
  ...rest
}: DrawerTriggerProps<T>) => {
  const context = useDrawerContext();

  const Component = as ?? React.Fragment;
  return <Component {...rest}>{children({ ...context })}</Component>;
};

export default DrawerTrigger;
