'use client';

import { classNames } from '@marulloc/components-library/utils';

import Drawer from '@marulloc/components-library/Drawer';
import { HiMenu, HiOutlineSearch, HiOutlineShoppingBag, HiOutlineX } from 'react-icons/hi';
import Price from '../Price';
import { useCartContext } from '@/context/cart/context';
import CartLine from './CartLine';
import Link from 'next/link';

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
        {({}) => <div className={classNames('w-full h-full', '  bg-gray-400  bg-opacity-60 backdrop-blur-sm')}></div>}
      </Drawer.Backdrop>

      <Drawer.Contents>
        {({ isOpen, closeDrawer }) => (
          <div
            className={classNames(
              'pointer-events-auto w-screen  max-w-md  h-screen overflow-hidden',
              'bg-gray-100 bg-opacity-90 backdrop-blur-sm',
              'border-r border-gray-200',
            )}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={classNames('px-4 py-4 sm:px-6', 'flex items-center justify-between ', 'bg-white')}>
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

              {/* Main */}
              <div className={classNames('flex-1 overflow-y-auto    ', 'px-4 py-4 sm:px-6')}>
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart?.lines.map((cartLine) => (
                    <li key={`side-cart-${cartLine.merchandise.title}` + Math.random()}>
                      <CartLine cartLine={cartLine} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className={classNames('px-6 py-6', 'bg-white')}>
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
                  <Link
                    href={cart?.checkoutUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </Link>
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
