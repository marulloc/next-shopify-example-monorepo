'use client';

import { ShopifyLocalization } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-shop';
import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import { useGetLocale } from '@/context/locale/hook';
import { useDetectLocale, useSelectLocale } from '@/hooks/useLocale';
import { splitLocale } from '@/utils/locale';

type TProps = {
  localeData: ToolkitLocale;
};

const Tester = ({ localeData }: TProps) => {
  const detection = useDetectLocale({ localeData });

  if (!detection) return null;

  return (
    <div className="w-full my-44 text-3xl bg-red-600 flex flex-col px-20 items-center space-y-10 ">
      <div>{`Status : ${detection.status}`}</div>
      <div>{`Detected Country : ${detection.detectedCountry?.name} = ${detection.detectedCountry?.isoCode}`}</div>
      <div>{`Current Country : ${detection.currentCountry?.name} = ${detection.currentCountry?.isoCode}`}</div>
      <div>{`Current Language : ${detection.currentLanguage?.name} = ${detection.currentLanguage?.isoCode}`}</div>
    </div>
  );
};

export default Tester;
