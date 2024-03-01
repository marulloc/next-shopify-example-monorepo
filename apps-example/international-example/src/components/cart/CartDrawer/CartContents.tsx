'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiXMark } from 'react-icons/hi2';
import Link from 'next/link';
import { localTheme } from '@/theme/local-theme';
import IconButton from '@/components/IconButton';
import Price from '@/components/Price';
import CartLine from './CartLine';
import React from 'react';
import { useGetDictioanry } from '@/hooks/locale-hooks';
import Box from '@/components/@common/semantic/Box';
import { useGetLoadableCart } from '@/hooks/cart-hooks';
import Typography from '@/components/_draft/Typography';

const CartContents = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const { state, contents: cart } = useGetLoadableCart();
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
        className={classNames('px-4 py-2 sm:py-4 sm:px-6', 'flex items-center justify-between ')}
      >
        <Typography as="h3" size="lg">
          {dictionary.title}
        </Typography>

        <div className={classNames('ml-4 flex items-center border rounded-lg', 'border-gray-300')}>
          <IconButton
            srName="close panel"
            onClick={() => closeDrawer()}
            className="text-default-muted hover:text-default-accent"
          >
            <HiXMark className="h-6 w-6" aria-hidden="true" />
            <Typography className=" sr-only">{dictionary.closeBtn.sr}</Typography>
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
        <div className={classNames('mb-6 ')}>
          <section className="mb-1 flex items-center justify-between py-1">
            <Typography as="h4">{dictionary.footer.taxes.title}</Typography>
            <Typography as="p" color="primary-base" className=" font-semibold">
              <Price
                amount={cart?.cost.totalTaxAmount?.amount || '0'}
                currencyCode={cart?.cost.totalTaxAmount?.currencyCode || ''}
              />
            </Typography>
          </section>

          <section className="mb-1 flex items-center justify-between py-1">
            <Typography as="h4">{dictionary.footer.shipping.title}</Typography>
            <Typography as="p">{dictionary.footer.shipping.p}</Typography>
          </section>

          <section className="mb-1 flex items-center justify-between py-1">
            <Typography as="h4">{dictionary.footer.total.title}</Typography>
            <Typography as="p" color="primary-base" className=" font-semibold">
              <Price
                amount={cart?.cost.totalAmount?.amount || '0'}
                currencyCode={cart?.cost.totalAmount?.currencyCode || ''}
              />
            </Typography>
          </section>
        </div>

        <div className=" ">
          <Link
            href={cart?.checkoutUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700"
          >
            <Typography as="span" color="primary-contrast" className=" font-semibold">
              {dictionary.footer.checkout.title}
            </Typography>
          </Link>
        </div>
      </Box>
    </Box>
  );
};

export default CartContents;
