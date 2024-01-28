'use client';

import { useEffect, useMemo, useState } from 'react';
import { DrawerContextType, useDrawerContext } from './context';
import { classNames } from '@/styles/utils';
import ReactDOM from 'react-dom';
import { DRAWER_PORTAL_ID } from './constant';

type DrawerContentsProps<T extends React.ElementType = 'aside'> = {
  children: (props: DrawerContextType) => React.ReactNode;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children'>;

const DrawerContents = <T extends React.ElementType = 'aside'>({
  children,
  as,
  className,
  ...rest
}: DrawerContentsProps<T>) => {
  const { isOpen, anchor, closeDrawer, openDrawer } = useDrawerContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const classNameWithAnchor = useMemo(() => {
    switch (anchor) {
      case 'top':
        return classNames(
          'top-0 left-0 right-0 ',
          'w-screen overflow-x-auto overflow-y-auto',
          isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-full opacity-0',
        );

      case 'left':
        return classNames(
          'left-0 top-0 bottom-0',
          'h-screen overflow-y-auto',
          isOpen ? 'visible translate-x-0 opacity-100' : 'invisible -translate-x-full opacity-0',
        );

      case 'bottom':
        return classNames(
          'bottom-0 left-0 right-0',
          'w-screen overflow-x-auto overflow-y-auto',
          isOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-full opacity-0',
        );

      case 'right':
        return classNames(
          'right-0 top-0 bottom-0',
          'h-screen overflow-y-auto',
          isOpen ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-full opacity-0',
        );
    }
  }, [anchor, isOpen]);

  const Component = as ?? 'aside';

  if (!isMounted) return null;
  return ReactDOM.createPortal(
    <Component
      {...rest}
      className={classNames(
        'fixed z-40 transition-all transform duration-300 ease-in-out',
        classNameWithAnchor,
        className,
      )}
    >
      {children({ isOpen, anchor, closeDrawer, openDrawer })}
    </Component>,
    document.getElementById(DRAWER_PORTAL_ID)!,
  );
};

export default DrawerContents;
