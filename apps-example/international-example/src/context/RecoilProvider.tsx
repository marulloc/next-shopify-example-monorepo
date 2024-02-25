'use client';

import { RecoilRoot } from 'recoil';
import { atomDictionary, atomLocale } from './locale/atom';
import { TDictionary } from '@/dictionaries';

type TProps = {
  children: React.ReactNode;
  locale: { country: string; language: string };
  dictionary: TDictionary;
};

const RecoilProvider = ({ children, locale, dictionary }: TProps) => {
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(atomLocale, locale);
        set(atomDictionary, dictionary);
      }}
    >
      <>{children}</>
    </RecoilRoot>
  );
};

export default RecoilProvider;
