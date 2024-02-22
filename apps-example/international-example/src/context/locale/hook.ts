'use client';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomLocale } from './atom';
import { useParams } from 'next/navigation';
import { splitLocale } from '@/utils/locale';
import { useEffect } from 'react';

export const useLocaleUpdateEffect = () => {
  const setLocale = useSetRecoilState(atomLocale);

  const { locale } = useParams();
  const currentLocale = splitLocale(locale as string);

  useEffect(() => {
    setLocale({ country: currentLocale.countryCode, language: currentLocale.languageCode });
  }, [currentLocale, setLocale]);

  return null;
};

export const useGetLocale = () => {
  const locale = useRecoilValue(atomLocale);

  return locale;
};
