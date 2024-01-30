export type ShopInfo = undefined;

export type ShopifyCountryIsoCode = 'KR' | 'CA' | 'US' | string;
export type ShopifyLanguageIsoCode = 'KO' | 'EN' | 'FR' | string;
export type ShopifyLocalization = {
  availableCountries: Array<{ name: string; isoCode: ShopifyCountryIsoCode }>;
  availableLanguages: Array<{ name: string; isoCode: ShopifyLanguageIsoCode }>;
};

export type ShopifyMenuItem = {
  title: string;
  url: string;
};
export type ShopifyMenu = Array<ShopifyMenuItem>;
