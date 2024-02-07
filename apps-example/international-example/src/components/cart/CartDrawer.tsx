'use client';

import { classNames } from '@marulloc/components-library/utils';

import Drawer from '@marulloc/components-library/Drawer';
import { HiMenu, HiOutlineSearch, HiOutlineShoppingBag, HiOutlineX } from 'react-icons/hi';
import Price from '../Price';
import { useCartContext } from '@/context/cart/context';
import CartLine from './CartLine';

type Props = {
  Trigger: React.ReactNode;
};
const Cart = ({ Trigger }: Props) => {
  const { cart } = useCartContext();

  return (
    <Drawer anchor="right">
      <Drawer.Trigger>
        {({ openDrawer }) => (
          <div onClick={() => openDrawer()}>
            <>{Trigger}</>
          </div>
        )}
      </Drawer.Trigger>

      <Drawer.Backdrop>
        {({}) => <div className={classNames('w-full h-full', '  bg-gray-400  bg-opacity-60')}></div>}
      </Drawer.Backdrop>

      <Drawer.Contents>
        {({ isOpen, closeDrawer }) => (
          <div className="pointer-events-auto w-screen max-w-md h-full">
            <div className={classNames('flex h-full flex-col overflow-y-scroll', ' bg-white bg-opacity-80  shadow-xl')}>
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <p className="text-lg font-medium text-gray-900">Shopping cart</p>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => closeDrawer()}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close panel</span>
                      <HiOutlineX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cart?.lines.map((cartLine) => (
                        <li key={cartLine.id}>
                          <CartLine cartLine={cartLine} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <Price
                    className="text-right text-base text-sky-500"
                    amount={cart?.cost.totalAmount.amount || ''}
                    currencyCode={cart?.cost.totalAmount.currencyCode || ''}
                  />
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <a
                    href={cart?.checkoutUrl}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </a>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => closeDrawer()}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer.Contents>
    </Drawer>
  );
};

export default Cart;
