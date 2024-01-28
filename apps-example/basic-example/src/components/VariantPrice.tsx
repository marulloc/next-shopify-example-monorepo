'use client';

import { useSearchParams } from 'next/navigation';
import Price from './Price';
import { useEffect, useMemo } from 'react';

type Props = {
  variants: Product['variants'];
};
const VariantPrice = ({ variants }: Props) => {
  const searchParams = useSearchParams();
  const selectedVariant = useMemo(() => {
    return variants.find((variant) =>
      variant.selectedOptions.every((option) => option.value === searchParams.get(option.name)),
    );
  }, [searchParams, variants]);

  return (
    <div>
      {selectedVariant && (
        <>
          <span className="text-teal-500 text-xs pb-1 "> Selected price </span>
          <div className="text-lg  md:text-xl text-teal-400">
            <Price currencyCode={selectedVariant.price.currencyCode} amount={selectedVariant.price.amount} />
          </div>
        </>
      )}
    </div>
  );
};

export default VariantPrice;
