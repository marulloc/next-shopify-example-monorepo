import { TDictionary } from '@/dictionaries';
import { atom } from 'recoil';

export const atomLocale = atom<{ country: string; language: string }>({
  key: 'locale',
});

export const atomDictionary = atom<TDictionary>({
  key: 'dictionary',
});
