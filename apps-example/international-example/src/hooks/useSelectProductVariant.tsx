'use client';

import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { deepCompare } from '@/utils/compare';

export const useSelectProductVariant = ({ product }: { product: ToolkitProduct }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getDataFromUrl = () => {
    const targetOptionNames = product.options.map((option) => option.name);
    return targetOptionNames.reduce(
      (prevResult, optionName) => ({ ...prevResult, [optionName]: searchParams.get(optionName) || null }),
      {} as { [key: string]: string | null },
    );
  };

  const [selectedOptions, setSelectedOptions] = useState(getDataFromUrl());
  const selectedVariant = useMemo(() => {
    return product.variants.find(({ selectedOptions: variantOptions }) =>
      variantOptions.every((option) => option.value === selectedOptions[option.name]),
    );
  }, [product.variants, selectedOptions]);

  const handleOptionSelect = (key: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));
  };

  // Sync Url -> Data
  useEffect(() => {
    const optionsFromRurl = getDataFromUrl();
    if (deepCompare(optionsFromRurl, selectedOptions)) return;

    setSelectedOptions(optionsFromRurl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Sync Data -> Url
  useEffect(() => {
    const newUrl = new URLSearchParams(searchParams.toString());

    Object.entries(selectedOptions).forEach(([optionName, value]) => {
      if (value) newUrl.set(optionName, value);
      else newUrl.delete(optionName);
    });

    const newSearchParams = newUrl.toString();
    const query = newSearchParams ? `?${newSearchParams}` : '';
    if (newSearchParams !== searchParams.toString()) router.replace(`${pathname}/${query}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  return { selectedVariant, selectedOptions, handleOptionSelect };
};
