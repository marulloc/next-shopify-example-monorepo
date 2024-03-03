'use client';

import { atomDictionary, atomLocale } from '@/context/locale-atoms';
import { isSameISOCode } from '@/utils/locale';
import { ToolkitLocale } from '@marulloc/shopify-next-api/v24.01/@toolkit-types';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

/**
 *
 * @returns
 */
export const useGetLocale = () => {
  const locale = useRecoilValue(atomLocale);
  return locale as Readonly<typeof locale>;
};

/**
 *
 * @returns
 */
export const useGetDictioanry = () => {
  const dictionary = useRecoilValue(atomDictionary);
  return dictionary as Readonly<typeof dictionary>;
};

type TReturn = {
  status: 'matched' | 'not-matched' | 'not-detected';
  currentCountry: ToolkitLocale['availableCountries'][number];
  currentLanguage: ToolkitLocale['availableLanguages'][number];
  detectedCountry: ToolkitLocale['availableCountries'][number] | undefined;
};

/**
 * @feature resolve cookie getter timing error -> call api for getting cookie
 * @param localeData
 * @returns
 */
export const useDetectLocaleMatch = (localeData: ToolkitLocale) => {
  const { country: currentConuntryCode, language: currentLanguageCode } = useGetLocale();
  const [result, setResult] = useState<TReturn | null>(null);

  useEffect(() => {
    (async () => {
      // Get Cookie from api call
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

  return result as Readonly<typeof result>;
};

/**
 * @summary change locale by routing (locale atom init when redirect)
 * @returns
 */
export const useSelectLocale = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locale: currentLocale } = useParams();

  const routeToSelectedLocale = useCallback(
    ({ country, language }: { country: string; language: string }): void => {
      const newLocale = `${country.toLowerCase()}-${language.toLowerCase()}`;
      const newPathname = pathname.replace(currentLocale as string, newLocale);

      const paramsString = searchParams.toString();
      const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

      // Change locale by routing (locale atom init when redirect)
      router.push(newPathname + queryString);
    },
    [currentLocale, pathname, router, searchParams],
  );

  return routeToSelectedLocale;
};
