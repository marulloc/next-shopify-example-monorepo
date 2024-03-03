import { ShopifyImage } from './shopify-common';

export type ShopifyShopInfo = {
  name: string;
  description: string;
  brand: {
    slogan: string;
    shortDescription: string;
    coverImage: {
      image: ShopifyImage;
    };
    squareLogo: {
      image: ShopifyImage;
    };
    logo: {
      previewImage: ShopifyImage;
      image: ShopifyImage;
    };
  };
};

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
