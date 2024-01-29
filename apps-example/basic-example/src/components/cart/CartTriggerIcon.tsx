import { classNames } from '@marulloc/components-library/utils';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Cart from './Cart';

const CartTriggerIcon = () => {
  return (
    <Cart
      Trigger={
        <button className={classNames('rounded-lg text-zinc-400 p-1.5')}>
          <ShoppingBagIcon className="w-6 h-6" />
        </button>
      }
    />
  );
};

export default CartTriggerIcon;
