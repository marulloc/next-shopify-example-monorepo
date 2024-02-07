import { classNames } from '@marulloc/components-library/utils';
import CartDrawer from '../CartDrawer';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useCartContext } from '@/context/cart/context';

const CartTriggerIcon = () => {
  const { cart } = useCartContext();
  return (
    <CartDrawer
      Trigger={
        <div className="relative group">
          <button className={classNames('rounded-lg p-1.5')}>
            <HiOutlineShoppingBag className="h-6 w-6 flex-shrink-0 " aria-hidden="true" />
            <span className="sr-only">items in cart, view bag</span>
          </button>
          {cart?.totalQuantity && (
            <div
              className={classNames(
                'absolute -top-0 -right-1 ',
                ' px-1 h-4',
                'flex items-center justify-center',
                'bg-sky-600  shadow-2xl rounded-full  bg-opacity-80  overflow-ellipsis',
              )}
            >
              <span className="text-xs text-white     ">{cart?.totalQuantity >= 10 ? '9+' : cart?.totalQuantity}</span>
            </div>
          )}
        </div>
      }
    />
  );
};

export default CartTriggerIcon;
