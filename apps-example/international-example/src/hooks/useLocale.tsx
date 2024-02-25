'use client';

import { ToolkitLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import { getLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { splitLocale } from '@/utils/locale';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const isSameISOCode = (code1: string, code2: string) => {
  return code1.toUpperCase() === code2.toUpperCase();
};

export const useLocale = () => {
  const { locale } = useParams();
  const { countryCode, languageCode } = splitLocale(locale as string);

  return { locale, countryCode, languageCode };
};

export const useSelectLocale = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locale: currentLocale, countryCode: currentConuntry, languageCode: currentLanguage } = useLocale();

  const setLocale = ({ country, language }: { country?: string; language?: string }): void => {
    const newLocale = `${(country || currentConuntry).toLowerCase()}-${(language || currentLanguage).toLowerCase()}`;
    const newPathname = pathname.replace(currentLocale as string, newLocale);

    const paramsString = searchParams.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    router.push(newPathname + queryString);
  };

  return {
    locale: currentLocale,
    countryCode: currentConuntry.toUpperCase(),
    languageCode: currentLanguage.toUpperCase(),
    setLocale,
    isSameISOCode,
  };
};

type TParams = {
  localeData: ToolkitLocale;
};
type TReturn = {
  status: 'matched' | 'not-matched' | 'not-detected';
  currentCountry: ToolkitLocale['availableCountries'][number];
  currentLanguage: ToolkitLocale['availableLanguages'][number];
  detectedCountry: ToolkitLocale['availableCountries'][number] | undefined;
};
export const useDetectLocale = ({ localeData }: TParams) => {
  const { countryCode: currentConuntryCode, languageCode: currentLanguageCode } = useLocale();
  const [result, setResult] = useState<TReturn | null>(null);

  useEffect(() => {
    (async () => {
      const [{ detectedCountry: detectedCountryCode }] = await Promise.all([
        fetch('/api/locale-detection').then((response) => response.json() as Promise<{ detectedCountry: string }>),
      ]);

      const currentCountry = localeData.availableCountries.find(
        ({ isoCode, name }) => isoCode.toUpperCase() === currentConuntryCode?.toUpperCase(),
      ) as ToolkitLocale['availableCountries'][number];
      const currentLanguage = localeData.availableLanguages.find(
        ({ isoCode, name }) => isoCode.toUpperCase() === currentLanguageCode?.toUpperCase(),
      ) as ToolkitLocale['availableLanguages'][number];
      const detectedCountry = localeData.availableCountries.find(
        ({ isoCode, name }) => isoCode.toUpperCase() === detectedCountryCode?.toUpperCase(),
      );

      const isDetected = !!detectedCountry;
      const isMatched = isSameISOCode(detectedCountry?.isoCode || '', currentCountry.isoCode);
      const status = isMatched ? 'matched' : isDetected ? 'not-matched' : 'not-detected';

      setResult({ status, currentCountry, currentLanguage, detectedCountry });
    })();
  }, [currentConuntryCode, currentLanguageCode, localeData]);

  return result;
};
