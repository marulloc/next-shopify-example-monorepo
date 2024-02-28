'use client';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomDictionary, atomLocale } from '../locale-atoms';
import { useParams } from 'next/navigation';
import { splitLocale } from '@/utils/locale';
import { useEffect } from 'react';

export const useLocaleUpdateEffect = () => {
  const { locale } = useParams();
  const pathLocale = splitLocale(locale as string);
  const setLocale = useSetRecoilState(atomLocale);

  useEffect(() => {
    setLocale((atomLocale) => {
      const isSame =
        atomLocale.country?.toUpperCase() === pathLocale.countryCode.toUpperCase() &&
        atomLocale.language?.toUpperCase() === pathLocale.languageCode.toUpperCase();
      if (isSame) return atomLocale;
      else return { country: pathLocale.countryCode.toUpperCase(), language: pathLocale.languageCode.toUpperCase() };
    });
  }, [pathLocale, setLocale]);

  return null;
};

export const useGetLocale = () => {
  const locale = useRecoilValue(atomLocale);
  return locale;
};

export const useDictioanry = () => {
  const dictionary = useRecoilValue(atomDictionary);
  return dictionary;
};
