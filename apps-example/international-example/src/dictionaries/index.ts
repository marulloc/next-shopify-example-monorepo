export type TDictionaries = keyof typeof dictionaries;
export type TDictionary = Awaited<ReturnType<typeof getDictionary>>;

const dictionaries = {
  en: () => import('./en').then((module) => module.default),
  ko: () => import('./ko').then((module) => module.default),
  fr: () => import('./fr').then((module) => module.default),
};

export const getDictionary = async (locale: TDictionaries) => {
  if (!dictionaries[locale]) throw Error(`Cannot found ${locale}'s dictionary`);

  return dictionaries[locale]();
};
