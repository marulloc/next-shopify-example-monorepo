'use client';

import { useEffect, useMemo, useState } from 'react';
import { DrawerContextType, useDrawerContext } from './context';
import { classNames } from '../../utils';
import ReactDOM from 'react-dom';
import { DRAWER_PORTAL_ID } from './constant';
import './drawer-styles.css';

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

  if (!isMounted) return null;

  const Component = as ?? 'aside';
  return ReactDOM.createPortal(
    <Component
      {...rest}
      className={classNames(
        'drawer',
        `drawer-${anchor}`,
        isOpen ? `drawer-${anchor}-open` : `drawer-${anchor}-closed`,
        className,
      )}
    >
      {children({ isOpen, anchor, closeDrawer, openDrawer })}
    </Component>,
    document.getElementById(DRAWER_PORTAL_ID)!,
  );
};

export default DrawerContents;
