'use client';

import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { useCallback, useMemo, useState } from 'react';

type TParams = {
  product: ToolkitProduct;
  initialValue: { [key: string]: string | null };
};

export const useSelectVariant = ({ product, initialValue }: TParams) => {
  const [selectedOptions, setSelectedOptions] = useState(initialValue);

  const selectedVariant = useMemo(() => {
    return (
      product.variants.find(({ selectedOptions: variantOptions }) =>
        variantOptions.every((option) => option.value === selectedOptions[option.name]),
      ) ?? null
    );
  }, [product.variants, selectedOptions]);

  const select = useCallback(
    (key: string, value: string) => setSelectedOptions((prev) => ({ ...prev, [key]: value })),
    [setSelectedOptions],
  );

  return [{ selectedOptions, selectedVariant }, select] as const;
};
