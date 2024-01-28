'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import AddToCart from './cart/AddToCart';
import { classNames } from '@/styles/utils';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  variants: Product['variants'];
};
const ProductAddToCart = ({ variants }: Props) => {
  const searchParams = useSearchParams();
  const selectedVariant = useMemo(() => {
    return variants.find((variant) =>
      variant.selectedOptions.every((option) => option.value === searchParams.get(option.name)),
    );
  }, [searchParams, variants]);

  return (
    <>
      {selectedVariant ? (
        <AddToCart variantId={selectedVariant.id} quantity={1} />
      ) : (
        <div className="">
          <button
            className={classNames(
              'bg-zinc-700 hover:bg-zinc-600 hover:scale-105 transition-all rounded-lg',

              'py-3 px-8',
              'relative w-full  text-center',
              'cursor-not-allowed',
            )}
          >
            <XMarkIcon className="w-5 h-5 text-zinc-200 absolute left-4 " />
            <span className=" text-zinc-200 text-base">Add to cart</span>
          </button>
        </div>
      )}
    </>
  );
};

export default ProductAddToCart;
