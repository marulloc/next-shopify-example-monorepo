'use client';

import { ToolkitCartLine } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import Image from 'next/image';
import Link from 'next/link';
import Price from '../Price';
import { classNames } from '@marulloc/components-library/utils';
import { HiPlus, HiMinus } from 'react-icons/hi2';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { localTheme } from '@/theme/local-theme';
import IconButton from '../IconButton';
import { debounce } from '@/utils/throttle';
import { useCartMutation } from '@/context/cart/hooks';

type Props = {
  cartLine: ToolkitCartLine;
};

const CartLine = ({ cartLine }: Props) => {
  const { updateItem, deleteItem } = useCartMutation();
  const [pendingQtyChanges, setPendingQtyChanges] = useState<number>(0); //=> 감가산을 위한 숫자를 저장
  const optimisticQty = useMemo(() => cartLine.quantity + pendingQtyChanges, [cartLine.quantity, pendingQtyChanges]); //=> 실제 서버 데이터와 감가산을 합산
  const [isPending, setIsPending] = useState(false);

  const debounced = useRef(
    debounce(async (qty) => {
      setIsPending(true);
      if (qty <= 0) await deleteItem({ lineId: cartLine.id });
      else await updateItem({ lineId: cartLine.id, quantity: qty });
      setIsPending(false);
    }, 1000),
  );

  useEffect(() => {
    if (pendingQtyChanges === 0) return;
    debounced.current(cartLine.quantity + pendingQtyChanges);
  }, [cartLine.quantity, pendingQtyChanges]);

  const handlePlus = () => setPendingQtyChanges(pendingQtyChanges + 1);
  const handleMinus = () => setPendingQtyChanges(pendingQtyChanges - 1);
  const handleDelete = () => setPendingQtyChanges(-cartLine.quantity);
  const handleInput = (qty: number) =>
    setPendingQtyChanges(cartLine.quantity < qty ? -cartLine.quantity : cartLine.quantity - qty);

  if (optimisticQty === 0) return null;
  return (
    <div
      className={classNames(
        'py-6 flex min-h-24 px-6 -mx-6',
        isPending ? localTheme.fill.base.disabled + 'animate-pulse bg-opacity-30' : '',
      )}
    >
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
              onClick={handleDelete}
              disabled={isPending}
            >
              Remove
            </button>
          </div>

          <div className={classNames('flex flex-row items-center rounded-lg', 'border', localTheme.border.base.main)}>
            <IconButton
              srName={`'minus quantity of ${cartLine.merchandise.product.title}`}
              className="px-1"
              onClick={handleMinus}
              disabled={isPending}
            >
              <HiMinus className="h-4 w-4  " />
            </IconButton>
            <p className="w-6 text-center">
              <input
                className="w-full text-sm bg-transparent  block text-center"
                id="Line Quantity"
                value={optimisticQty}
                disabled={isPending}
                onChange={(e) => handleInput(Number(e.target.value))}
              ></input>
            </p>

            <IconButton
              srName={`'minus quantity of ${cartLine.merchandise.product.title}`}
              className="px-1"
              onClick={handlePlus}
              disabled={isPending}
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
