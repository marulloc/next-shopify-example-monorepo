'use client';

import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSyncDataUrl2 } from './useSyncDataUrl';

export const useSelectProductVariant = ({ product }: { product: ToolkitProduct }) => {
  const [queryParams, navigateWithParams] = useSyncDataUrl2(product.options.map((option) => option.name));
  const [selectedOptions, setSelectedOptions] = useState(queryParams);

  useEffect(() => {
    navigateWithParams(selectedOptions);
  }, [navigateWithParams, selectedOptions]);

  const selectedVariant = useMemo(() => {
    return product.variants.find(({ selectedOptions: variantOptions }) =>
      variantOptions.every((option) => option.value === selectedOptions[option.name]),
    );
  }, [product.variants, selectedOptions]);

  const handleOptionSelect = useCallback(
    (key: string, value: string) => {
      setSelectedOptions((prev) => ({ ...prev, [key]: value }));
    },
    [setSelectedOptions],
  );

  return { selectedVariant, selectedOptions, handleOptionSelect };
};

export const useSelectVariant = ({
  product,
  initialValue,
}: {
  product: ToolkitProduct;
  initialValue: { [key: string]: string | null };
}): [
  { selectedOptions: { [key: string]: string | null }; selectedVariant: ToolkitProduct['variants'][number] | null },
  (key: string, value: string) => void,
] => {
  // const [queryParams, navigateWithParams] = useSyncDataUrl2(product.options.map((option) => option.name));
  const [selectedOptions, setSelectedOptions] = useState(initialValue);

  const selectedVariant = useMemo(() => {
    return (
      product.variants.find(({ selectedOptions: variantOptions }) =>
        variantOptions.every((option) => option.value === selectedOptions[option.name]),
      ) ?? null
    );
  }, [product.variants, selectedOptions]);

  const select = useCallback(
    (key: string, value: string) => {
      setSelectedOptions((prev) => ({ ...prev, [key]: value }));
    },
    [setSelectedOptions],
  );

  return [{ selectedOptions, selectedVariant }, select];
};
