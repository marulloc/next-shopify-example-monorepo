'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiXMark } from 'react-icons/hi2';
import Link from 'next/link';
import IconButton from '@/components/IconButton';
import Price from '@/components/product/Price';
import CartLine from './CartLine';
import React from 'react';
import { useGetDictioanry } from '@/hooks/locale-hooks';
import { useGetLoadableCart } from '@/hooks/cart-hooks';
import Typography from '@/components/Typography';
import SemanticBox from '@/components/SemanticBox';

const CartContents = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const { state, contents: cart } = useGetLoadableCart();
  const dictionary = useGetDictioanry().cart.CartContents;

  if (state !== 'hasValue') return null;
  return (
    <aside
      className={classNames(
        'isolate w-screen max-w-md h-screen overflow-hidden',
        'flex flex-col divide-y divide-default-muted ',
      )}
    >
      <SemanticBox
        as="header"
        p={[{ dir: 'xy', size: 'md' }]}
        fill="glassy-default-accent"
        className={classNames('flex items-center justify-between md:px-6 md:py-6')}
      >
        <Typography as="h3" size="lg">
          {dictionary.title}
        </Typography>

        <div className={classNames('ml-4 flex items-center border rounded-lg', 'border-default-muted')}>
          <IconButton
            srName="close panel"
            onClick={() => closeDrawer()}
            className="text-default-muted hover:text-default-accent"
          >
            <HiXMark className="h-6 w-6" aria-hidden="true" />
            <Typography className=" sr-only">{dictionary.closeBtn.sr}</Typography>
          </IconButton>
        </div>
      </SemanticBox>

      <SemanticBox as="section" fill="glassy-default-base" className={classNames(' flex-1 overflow-y-auto    ')}>
        <ul role="list" className=" divide-y divide-default-base ">
          {cart?.lines?.map((cartLine) => (
            <li key={`side-cart-${cartLine.merchandise.title}` + Math.random()}>
              <CartLine cartLine={cartLine} />
            </li>
          ))}
        </ul>
      </SemanticBox>

      <SemanticBox as="footer" fill="glassy-default-accent" p={{ dir: 'xy', size: 'sm' }} className="md:p-4">
        <SemanticBox as="section" m={{ dir: 'b', size: 'sm' }}>
          <div className="mb-1 flex items-center justify-between py-1">
            <Typography as="h4">{dictionary.footer.taxes.title}</Typography>
            <Typography as="p" color="primary-base" className=" font-semibold">
              <Price
                amount={cart?.cost.totalTaxAmount?.amount || '0'}
                currencyCode={cart?.cost.totalTaxAmount?.currencyCode || ''}
              />
            </Typography>
          </div>

          <div className="mb-1 flex items-center justify-between py-1">
            <Typography as="h4">{dictionary.footer.shipping.title}</Typography>
            <Typography as="p">{dictionary.footer.shipping.p}</Typography>
          </div>

          <div className="mb-1 flex items-center justify-between py-1">
            <Typography as="h4">{dictionary.footer.total.title}</Typography>
            <Typography as="p" color="primary-base" className=" font-semibold">
              <Price
                amount={cart?.cost.totalAmount?.amount || '0'}
                currencyCode={cart?.cost.totalAmount?.currencyCode || ''}
              />
            </Typography>
          </div>
        </SemanticBox>

        <div className=" ">
          <Link
            href={cart?.checkoutUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-6 py-3 rounded-md bg-primary-base hover:bg-primary-accent"
          >
            <Typography as="span" color="primary-contrast" className=" font-semibold">
              {dictionary.footer.checkout.title}
            </Typography>
          </Link>
        </div>
      </SemanticBox>
    </aside>
  );
};

export default CartContents;
