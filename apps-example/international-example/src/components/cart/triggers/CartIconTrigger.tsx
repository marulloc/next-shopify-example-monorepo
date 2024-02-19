'use client';

import { classNames } from '@marulloc/components-library/utils';
import CartDrawer from '../CartDrawer';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import IconButton from '@/components/IconButton';
import { localTheme } from '@/theme/local-theme';
import { useCartQuery } from '@/context/cart/hooks';

const CartIconTrigger = () => {
  const { cart } = useCartQuery();

  return (
    <CartDrawer
      Trigger={
        <IconButton
          srName="items in cart, view bag"
          className={classNames(localTheme.text.color.base.main, localTheme.text.color.base.hover, 'p-2')}
        >
          <HiOutlineShoppingBag className="h-6 w-6 flex-shrink-0 " aria-hidden="true" />
          {cart && cart?.totalQuantity > 0 && (
            <div
              className={classNames(
                'absolute -top-0 -right-1 ',
                'px-1 h-4',
                'flex items-center justify-center',
                'shadow-2xl rounded-full  overflow-ellipsis',
                localTheme.fill.primary.main,
              )}
            >
              <span className="text-xs text-white     ">{cart?.totalQuantity >= 10 ? '9+' : cart?.totalQuantity}</span>
            </div>
          )}
        </IconButton>
      }
    />
  );
};

export default CartIconTrigger;
