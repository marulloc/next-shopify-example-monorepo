'use client';

import { useEffect, useState } from 'react';
import { DrawerContextType, useDrawerContext } from './context';
import ReactDOM from 'react-dom';
import { classNames } from '@/styles/utils';
import { DRAWER_PORTAL_ID } from './constant';

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

  const Component = as ?? 'div';

  if (!isMounted) return null;
  return ReactDOM.createPortal(
    <Component
      {...rest}
      className={classNames(
        'fixed z-30 top-0 left-0 w-screen h-screen transition-all transform duration-300 ease-in-out ',
        isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        className,
      )}
      onClick={() => closeDrawer()}
    >
      {children({ ...restContext, isOpen, closeDrawer })}
    </Component>,
    document.getElementById(DRAWER_PORTAL_ID)!,
  );
};

export default DrawerBackdrop;
