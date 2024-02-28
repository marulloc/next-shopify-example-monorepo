'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiXMark } from 'react-icons/hi2';
import Link from 'next/link';
import { localTheme } from '@/theme/local-theme';
import IconButton from '@/components/IconButton';
import Price from '@/components/Price';
import { useRecoilValueLoadable } from 'recoil';
import { atomOptimisticCart } from '@/context/cart-atoms';
import CartLine from './CartLine';
import React from 'react';
import { useGetDictioanry } from '@/hooks/locale-hooks';
import Box from '@/components/@common/semantic/Box';

const CartContents = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const { state, contents: cart } = useRecoilValueLoadable(atomOptimisticCart);
  const dictionary = useGetDictioanry().cart.CartContents;

  if (state !== 'hasValue') return null;
  return (
    <Box
      as="aside"
      level={0}
      className={classNames(
        'isolate w-screen max-w-md h-screen overflow-hidden',
        'flex flex-col  divide-y divide-gray-200',
      )}
    >
      <Box
        as="header"
        variant="glassy"
        level={2}
        className={classNames('px-4 py-4 sm:px-6', 'flex items-center justify-between ')}
      >
        <h2 className="text-lg font-medium text-gray-900">{dictionary.title}</h2>
        <div className={classNames('ml-4 flex items-center border rounded-lg', localTheme.border.base.main)}>
          <IconButton
            srName="close panel"
            className={classNames(localTheme.text.color.base.muted, localTheme.text.color.base.hover)}
            onClick={() => closeDrawer()}
          >
            <HiXMark className="h-6 w-6" aria-hidden="true" />
            <span className=" sr-only">{dictionary.closeBtn.sr}</span>
          </IconButton>
        </div>
      </Box>

      <Box as="section" variant="glassy" level={4} className={classNames('flex-1 overflow-y-auto px-4 py-4 sm:px-6')}>
        <ul role="list" className="-my-6 divide-y divide-gray-300">
          {cart?.lines?.map((cartLine) => (
            <li key={`side-cart-${cartLine.merchandise.title}` + Math.random()}>
              <CartLine cartLine={cartLine} />
            </li>
          ))}
        </ul>
      </Box>

      <Box as="footer" variant="glassy" level={2} className={classNames('px-6 py-6')}>
        <div className={classNames('mb-6 ', localTheme.text.size.small, 'text-gray-500')}>
          <div className="mb-1 flex items-center justify-between py-1">
            <p>{dictionary.footer.taxes.title}</p>
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
            <p>{dictionary.footer.shipping.title}</p>
            <p className="text-right">{dictionary.footer.shipping.p}</p>
          </div>

          <div className="mb-1 flex items-center justify-between py-1">
            <p>{dictionary.footer.total.title}</p>
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
            {dictionary.footer.checkout.title}
          </Link>
        </div>
      </Box>
    </Box>
  );
};

export default CartContents;
