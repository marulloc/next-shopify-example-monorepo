'use client';

import { useEffect, useState } from 'react';
import { DrawerContextType, useDrawerContext } from './context';
import ReactDOM from 'react-dom';
import { DRAWER_PORTAL_ID } from './constant';
import { classNames } from '../../utils';
import './drawer-styles.css';

type DrawerBackdropProps<T extends React.ElementType = 'div'> = {
  children: (props: DrawerContextType) => React.ReactNode;
  preventScroll?: boolean;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children'>;

const DrawerBackdrop = <T extends React.ElementType = 'div'>({
  as,
  children,
  preventScroll = true,
  className,
  ...rest
}: DrawerBackdropProps<T>) => {
  const { isOpen, closeDrawer, ...restContext } = useDrawerContext();
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
      className={classNames('drawer-backdrop', isOpen ? 'drawer-backdrop-open' : 'drawer-backdrop-closed', className)}
      onClick={() => closeDrawer()}
    >
      {children({ ...restContext, isOpen, closeDrawer })}
    </Component>,
    document.getElementById(DRAWER_PORTAL_ID)!,
  );
};

export default DrawerBackdrop;
