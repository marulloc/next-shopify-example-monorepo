import { ShopifyLocalization, ShopifyMenuItem, ShopifyShopInfo } from '../@shopify-types/shopify-shop';

export type ToolkitMenu = Array<ShopifyMenuItem>;

export type ToolkitLocale = ShopifyLocalization & {
  locales: Array<string>;
  supportedCountries: Array<string>;
  supportedLanguages: Array<string>;
};

export type ToolkitShopInfo = ShopifyShopInfo;
