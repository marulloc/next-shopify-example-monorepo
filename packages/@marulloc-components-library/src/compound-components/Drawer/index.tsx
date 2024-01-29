'use client';

import { useCallback, useEffect, useState } from 'react';
import { DrawerContext, DrawerContextType } from './context';
import DrawerTrigger from './DrawerTrigger';
import DrawerContents from './DrawerContents';
import DrawerBackdrop from './DrawerBackdrop';
import { DRAWER_PORTAL_ID } from './constant';
import { withPortalRoot } from '../../portal-hoc';

type DrawerRootProps = {
  children: React.ReactNode;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
} & Pick<DrawerContextType, 'anchor'>;

const DrawerRoot = ({ anchor, open, onOpen, onClose, children }: DrawerRootProps) => {
  const [context, setContext] = useState<DrawerContextType>({
    isOpen: open || false,
    anchor,
    openDrawer: () => {},
    closeDrawer: () => {},
  });

  useEffect(() => {
    setContext((context) => {
      if (open === undefined) return { ...context, anchor };
      return { ...context, anchor, isOpen: open };
    });
  }, [anchor, open]);

  const openDrawer = useCallback(() => {
    setContext((context) => ({ ...context, isOpen: true }));
    if (onOpen) onOpen();
  }, [onOpen]);
  const closeDrawer = useCallback(() => {
    setContext((context) => ({ ...context, isOpen: false }));
    if (onClose) onClose();
  }, [onClose]);

  return (
    <DrawerContext.Provider value={{ ...context, openDrawer, closeDrawer }}>
      <>{children}</>
    </DrawerContext.Provider>
  );
};

const Drawer = Object.assign(withPortalRoot(DrawerRoot, DRAWER_PORTAL_ID), {
  Trigger: DrawerTrigger,
  Contents: DrawerContents,
  Backdrop: DrawerBackdrop,
});

export default Drawer;
