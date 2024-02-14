'use client';

import { ToolkitCartLine } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import Image from 'next/image';
import Link from 'next/link';
import Price from '../Price';
import { useCartContext } from '@/context/cart/context';
import { classNames } from '@marulloc/components-library/utils';
import { HiPlus, HiMinus } from 'react-icons/hi2';
import React, { useEffect, useRef, useState } from 'react';
import { localTheme } from '@/theme/local-theme';
import IconButton from '../IconButton';
import { throttle } from '@/utils/throttle';

type Props = {
  cartLine: ToolkitCartLine;
};

/**
 * api 쏘는 순간 Status가 pending으로 바뀌면서
 * Cart Line이 리렌더되고 localQty가 초기화 되면서 optimistic ui 가 안되는 현상임
 * Throttle은 정상적으로 동작하고 있음
 * @param param0
 * @returns
 */
const CartLine = ({ cartLine }: Props) => {
  const { updateItem, deleteItem } = useCartContext();
  const [localQty, setLocalQty] = useState(cartLine.quantity);
  const throttled = useRef(
    throttle((qty) => {
      console.log('Throttle Function called qty :', qty);
      if (qty <= 0) deleteItem({ lineId: cartLine.id });
      else updateItem({ lineId: cartLine.id, quantity: qty });
    }, 700),
  );

  useEffect(() => {
    if (localQty === cartLine.quantity) return;
    throttled.current(localQty);
  }, [cartLine.quantity, localQty]);

  const handleUpdate = (qty: number) => {
    if (qty < 0) setLocalQty(0);
    else setLocalQty(qty);
  };

  if (localQty === 0) return null;
  return (
    <div className="py-6 flex min-h-24">
      {/* Image */}
      <div className={classNames('h-24 aspect-square flex-shrink-0 overflow-hidden', 'rounded-lg')}>
        <Image
          src={cartLine.merchandise.product.featuredImage.url || ''}
          alt={cartLine.merchandise.product.featuredImage.altText}
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
              // onClick={() => deleteItem({ lineId: cartLine.id })}
              onClick={() => handleUpdate(0)}
            >
              Remove
            </button>
          </div>

          <div className={classNames('flex flex-row items-center rounded-lg', 'border', localTheme.border.base.main)}>
            <IconButton
              srName={`'minus quantity of ${cartLine.merchandise.product.title}`}
              className="px-1"
              // onClick={() =>
              //   updateItem({ lineId: cartLine.id, quantity: cartLine.quantity <= 1 ? 0 : cartLine.quantity - 1 })
              // }
              onClick={() => handleUpdate(localQty - 1)}
            >
              <HiMinus className="h-4 w-4  " />
            </IconButton>
            <p className="w-6 text-center">
              <input
                className="w-full text-sm bg-transparent  block text-center"
                id="Line Quantity"
                value={localQty}
                onChange={(e) => handleUpdate(Number(e.target.value))}
              ></input>
            </p>

            <IconButton
              srName={`'minus quantity of ${cartLine.merchandise.product.title}`}
              className="px-1"
              // onClick={() => updateItem({ lineId: cartLine.id, quantity: cartLine.quantity + 1 })}
              onClick={() => handleUpdate(localQty + 1)}
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
