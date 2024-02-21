import { atom } from 'recoil';

type TAtomLocale = {
  country: string | null;
  language: string | null;
};

export const atomLocale = atom<TAtomLocale>({
  key: 'locale',
  default: {
    country: null,
    language: null,
  },
});
