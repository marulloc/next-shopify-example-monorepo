'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiXMark } from 'react-icons/hi2';
import Link from 'next/link';
import { localTheme } from '@/theme/local-theme';
import IconButton from '@/components/IconButton';
import Price from '@/components/Price';
import { useRecoilValueLoadable } from 'recoil';
import { atomOptimisticCart } from '@/context/cart/atom';
import CartLine from './CartLine';
import React from 'react';
import { useDictioanry, useGetLocale } from '@/context/locale/hook';

const CartContents = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const { state, contents: cart } = useRecoilValueLoadable(atomOptimisticCart);
  const dictionary = useDictioanry();

  if (state !== 'hasValue') return null;
  return (
    <div className={classNames('isolate w-screen max-w-md  h-screen overflow-hidden')}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div
          className={classNames(
            'px-4 py-4 sm:px-6',
            'flex items-center justify-between ',
            'bg-white bg-opacity-90  border-b border-gray-200',
          )}
        >
          <p className="text-lg font-medium text-gray-900">
            {dictionary.cart.CartContents.title}
            {/* Shopping Cart  */}
          </p>
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

        {/* Main */}
        <div className={classNames('flex-1 overflow-y-auto px-4 py-4 sm:px-6', 'bg-gray-50 bg-opacity-80  ')}>
          <ul role="list" className="-my-6 divide-y divide-gray-300">
            {cart?.lines?.map((cartLine) => (
              <li key={`side-cart-${cartLine.merchandise.title}` + Math.random()}>
                <CartLine cartLine={cartLine} />
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className={classNames('px-6 py-6', 'bg-white bg-opacity-90  border-t border-gray-200')}>
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
  );
};

export default CartContents;
