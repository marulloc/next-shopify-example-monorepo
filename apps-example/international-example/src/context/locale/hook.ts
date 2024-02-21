'use client';

import { useSetRecoilState } from 'recoil';
import { atomLocale } from './atom';
import { useParams } from 'next/navigation';
import { splitLocale } from '@/utils/locale';
import { useEffect } from 'react';

const store = typeof window !== 'undefined' ? window.localStorage : null;
export const useLocaleUpdateEffect = () => {
  const setLocale = useSetRecoilState(atomLocale);

  const { locale } = useParams();
  const currentLocale = splitLocale(locale as string);

  useEffect(() => {
    if (!store) return;
    console.log('> locale effect >', currentLocale);
    setLocale({ country: currentLocale.countryCode, language: currentLocale.languageCode });
  }, [currentLocale, setLocale]);

  return null;
};
