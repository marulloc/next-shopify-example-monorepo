'use client';

import { ToolkitCartLine } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import Image from 'next/image';
import Link from 'next/link';
import Price from '../Price';
import { classNames } from '@marulloc/components-library/utils';
import { HiPlus, HiMinus } from 'react-icons/hi2';
import React from 'react';
import { localTheme } from '@/theme/local-theme';
import IconButton from '../IconButton';
import { useSetCartLineOptimistic } from '@/context/cart/hooks';

type Props = {
  cartLine: ToolkitCartLine;
};

const CartLine = ({ cartLine }: Props) => {
  const { updateQty, deleteLine } = useSetCartLineOptimistic(cartLine.id);

  const handleInput = (qty: number) => updateQty(qty);
  const handlePlus = () => updateQty(cartLine.quantity + 1);
  const handleMinus = () => updateQty(cartLine.quantity - 1 >= 0 ? cartLine.quantity - 1 : 0);
  const handleDelete = () => deleteLine();

  if (cartLine.quantity <= 0) return null;
  return (
    <div className={classNames('py-6 flex min-h-24 px-3 -mx-3 md:px-6 md:-mx-6')}>
      {/* Image */}
      <div className={classNames('h-24 aspect-square flex-shrink-0 overflow-hidden', 'rounded-lg')}>
        <Image
          src={cartLine.merchandise.product.featuredImage.url || ''}
          alt={cartLine.merchandise.product.featuredImage.altText || cartLine.merchandise.product.title || ''}
          height={cartLine.merchandise.product.featuredImage.height}
          width={cartLine.merchandise.product.featuredImage.width}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className={classNames('ml-4 flex-1   flex flex-col justify-between')}>
        <div className="flex justify-between  ">
          <div>
            <h3 className={classNames(localTheme.text.size.small, localTheme.text.color.base.main)}>
              <Link href={cartLine.merchandise.product.handleRoute}>{cartLine.merchandise.product.title}</Link>
            </h3>
            <p className={classNames('text-xs mt-1', localTheme.text.color.base.disabled)}>
              {cartLine.merchandise.title}
            </p>
          </div>

          <div className="flex-shrink-0  ">
            <Price
              className={classNames(localTheme.text.size.small, localTheme.text.color.base.main)}
              currencyCode={cartLine.cost.totalAmount.currencyCode}
              amount={cartLine.cost.totalAmount.amount}
            />
          </div>
        </div>

        <div className="flex justify-between items-end ">
          <div>
            <button
              type="button"
              className={classNames(localTheme.text.size.small, localTheme.text.color.primary.main)}
              onClick={handleDelete}
            >
              Remove
            </button>
          </div>

          <div className={classNames('flex flex-row items-center rounded-lg', 'border', localTheme.border.base.main)}>
            <IconButton
              srName={`'minus quantity of ${cartLine.merchandise.product.title}`}
              className="px-1"
              onClick={handleMinus}
            >
              <HiMinus className="h-4 w-4  " />
            </IconButton>
            <p className="w-6 text-center">
              <input
                className="w-full text-sm bg-transparent  block text-center"
                id="Line Quantity"
                defaultValue={cartLine.quantity}
                onBlur={(e) => handleInput(Number(e.target.value))}
              ></input>
            </p>

            <IconButton
              srName={`'minus quantity of ${cartLine.merchandise.product.title}`}
              className="px-1"
              onClick={handlePlus}
            >
              <HiPlus className="h-4 w-4 " />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CartLine);
