'use client';

import { classNames } from '@/styles/utils';
import Drawer from '@marulloc/components-library/Drawer';
import { useCartContext } from './context';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CartLines from './CartLines';
import Price from '../Price';

type Props = {
  Trigger: React.ReactNode;
};
const Cart = ({ Trigger }: Props) => {
  const { cart, updateItem, deleteItem } = useCartContext();

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
        {({}) => (
          <div className={classNames('w-full h-full', 'dark:bg-black dark:bg-opacity-50 bg-white bg-opacity-50')}></div>
        )}
      </Drawer.Backdrop>

      <Drawer.Contents>
        {({ isOpen, closeDrawer }) => (
          <div
            className={classNames(
              'bg-black bg-opacity-70 backdrop-blur-sm',
              'border-l border-gray-600',
              'h-full w-screen md:w-[400px]',
              'p-6',
              'dark:text-white  ',
              'flex flex-col',
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-200">My Cart Tester</p>

              <button
                aria-label="Close cart"
                onClick={() => closeDrawer()}
                className={classNames(
                  'group',
                  'h-10',
                  'rounded-lg bg-zinc-800 border border-zinc-600',
                  'p-2.5',
                  'hover:ring-1 ring-zinc-400 ring-inse hover:text-zinc-100 text-zinc-300',
                )}
              >
                <XMarkIcon className={classNames('h-full w-auto', 'group-hover:scale-110')} />
              </button>
            </div>

            <div className="flex h-full flex-col justify-between overflow-hidden p-1">
              <CartLines
                lines={cart?.lines || []}
                updateItem={updateItem}
                deleteItem={deleteItem}
                handleProductLink={() => closeDrawer()}
              />

              <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                  <p>Taxes</p>
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={cart?.cost.totalTaxAmount?.amount || ''}
                    currencyCode={cart?.cost.totalTaxAmount?.currencyCode || ''}
                  />
                </div>

                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Shipping</p>
                  <p className="text-right">Calculated at checkout</p>
                </div>

                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Total</p>
                  <Price
                    className="text-right text-base text-black dark:text-teal-400"
                    amount={cart?.cost.totalAmount.amount || ''}
                    currencyCode={cart?.cost.totalAmount.currencyCode || ''}
                  />
                </div>
              </div>

              {/* Checkout Link */}
              <a
                href={cart?.checkoutUrl}
                className="block w-full rounded-full bg-teal-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
              >
                Proceed to Checkout
              </a>
            </div>
          </div>
        )}
      </Drawer.Contents>
    </Drawer>
  );
};

export default Cart;
