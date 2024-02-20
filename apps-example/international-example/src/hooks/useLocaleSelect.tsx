'use client';

import { splitLocale } from '@/utils/locale';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useSelectLocale = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { locale: currentLocale } = useParams();
  const { countryCode: currentConuntry, languageCode: currentLanguage } = splitLocale(currentLocale as string);

  const setLocale = ({ country, language }: { country?: string; language?: string }): void => {
    const newLocale = `${(country || currentConuntry).toLowerCase()}-${(language || currentLanguage).toLowerCase()}`;
    const newPathname = pathname.replace(currentLocale as string, newLocale);

    const paramsString = searchParams.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    router.push(newPathname + queryString);
  };

  const isSameISOCode = (code1: string, code2: string) => {
    return code1.toUpperCase() === code2.toUpperCase();
  };
  return {
    locale: currentLocale,
    countryCode: currentConuntry.toUpperCase(),
    languageCode: currentLanguage.toUpperCase(),
    setLocale,
    isSameISOCode,
  };
};
