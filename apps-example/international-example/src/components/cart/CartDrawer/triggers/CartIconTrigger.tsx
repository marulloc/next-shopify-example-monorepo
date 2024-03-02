'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import IconButton from '@/components/IconButton';
import { useSetPortalRecoil } from '@/hooks/portal-hooks';
import { useGetDictioanry } from '@/hooks/locale-hooks';
import { useGetLoadableCart } from '@/hooks/cart-hooks';

const CartIconTrigger = () => {
  const { activate } = useSetPortalRecoil('cart-drawer');
  const dictionary = useGetDictioanry();
  const { state, contents: cart } = useGetLoadableCart();
  const totalQty = cart?.totalQuantity || 0;

  return (
    <IconButton
      srName="items in cart, view bag"
      className={classNames('p-2 text-default-muted hover:text-default-accent')}
      onClick={() => activate()}
    >
      <HiOutlineShoppingBag className="h-6 w-6 flex-shrink-0 " aria-hidden="true" />
      <span className=" sr-only">{dictionary.cart.CartIconTrigger.sr}</span>
      {totalQty > 0 && (
        <div
          className={classNames(
            'absolute -top-0 -right-1 ',
            'px-1 h-4',
            'flex items-center justify-center',
            'shadow-2xl rounded-full  overflow-ellipsis',
            'bg-primary-base',
          )}
        >
          <span className="text-xs text-primary-contrast">{totalQty >= 10 ? '9+' : cart?.totalQuantity}</span>
        </div>
      )}
    </IconButton>
  );
};

export default CartIconTrigger;
