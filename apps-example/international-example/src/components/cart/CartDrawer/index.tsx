'use client';

import { classNames } from '@marulloc/components-library/utils';
import Drawer from '@marulloc/components-library/Drawer';
import React from 'react';
import { usePortalRecoil } from '@/context/ui/hooks';
import CartContents from './CartContents';

const CartDrawer = () => {
  const { isActive, deactivate } = usePortalRecoil('cart-drawer');

  return (
    <Drawer anchor="right" open={isActive} onClose={() => deactivate()}>
      <Drawer.Backdrop>
        {({ closeDrawer }) => (
          <div
            onClick={() => closeDrawer()}
            className={classNames(' isolate w-full h-full', 'bg-gray-500 bg-opacity-40  ')}
          />
        )}
      </Drawer.Backdrop>

      <Drawer.Contents>{({ isOpen, closeDrawer }) => <CartContents closeDrawer={closeDrawer} />}</Drawer.Contents>
    </Drawer>
  );
};

export default CartDrawer;
