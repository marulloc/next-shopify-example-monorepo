'use client';

import { classNames } from '@marulloc/components-library/utils';
import Drawer from '@marulloc/components-library/Drawer';
import { HiXMark } from 'react-icons/hi2';
import Price from '../Price';
import CartLine from './CartLine';
import Link from 'next/link';
import IconButton from '../IconButton';
import { localTheme } from '@/theme/local-theme';
import { useCartQuery } from '@/context/cart/hooks';

type Props = {
  Trigger: React.ReactNode;
};
const Cart = ({ Trigger }: Props) => {
  const { cart, status } = useCartQuery();

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
        {({ closeDrawer }) => (
          <div
            onClick={() => closeDrawer()}
            className={classNames('w-full h-full', 'bg-opacity-60 ', localTheme.fill.base.disabled)}
          />
        )}
      </Drawer.Backdrop>

      <Drawer.Contents>
        {({ isOpen, closeDrawer }) => (
          <div
            className={classNames(
              'pointer-events-auto w-screen  max-w-md  h-screen overflow-hidden',
              'bg-opacity-80 backdrop-blur-md',
              localTheme.fill.base.main,
            )}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={classNames('px-4 py-4 sm:px-6', 'flex items-center justify-between ', 'bg-white')}>
                <p className="text-lg font-medium text-gray-900">Shopping cart</p>
                <div className={classNames('ml-4 flex items-center border rounded-lg', localTheme.border.base.main)}>
                  <IconButton
                    srName="close panel"
                    className={classNames(localTheme.text.color.base.muted, localTheme.text.color.base.hover)}
                    onClick={() => closeDrawer()}
                  >
                    <HiXMark className="h-6 w-6" aria-hidden="true" />
                  </IconButton>
                </div>
              </div>
              <div
                className={classNames(
                  'h-1   ',
                  status === 'pending' ? 'bg-indigo-600 animate-pulse' : 'bg-transparent',
                )}
              />

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
              <div className={classNames('px-6 py-6', 'bg-white isolate')}>
                <div className={classNames('mb-6 ', localTheme.text.size.small, 'text-gray-500')}>
                  <div className="mb-1 flex items-center justify-between py-1">
                    <p>Taxes</p>
                    <div>
                      {cart?.cost.totalTaxAmount ? (
                        <Price
                          className={classNames(localTheme.text.color.primary.main, 'text-right ', 'font-semibold')}
                          amount={cart?.cost.totalTaxAmount?.amount || '0'}
                          currencyCode={cart?.cost.totalTaxAmount?.currencyCode || ''}
                        />
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </div>

                  <div className="mb-1 flex items-center justify-between py-1">
                    <p>Shipping</p>
                    <p className="text-right">Calculated at checkout</p>
                  </div>

                  <div className="mb-1 flex items-center justify-between py-1">
                    <p>Total</p>
                    <Price
                      className={classNames('text-right text-indigo-600 ', 'font-semibold')}
                      amount={cart?.cost.totalAmount.amount || ''}
                      currencyCode={cart?.cost.totalAmount.currencyCode || ''}
                    />
                  </div>
                </div>
                <div className=" ">
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
