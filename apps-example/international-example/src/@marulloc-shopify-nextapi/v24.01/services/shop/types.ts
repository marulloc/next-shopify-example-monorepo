import { ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { ShopifyLocalization, ShopifyMenuItem, ShopifyShopInfo } from '../../@shopify-types/shopify-shop';

export type GetLocaleService = {
  data: {
    localization: ShopifyLocalization;
  };
};
export type GetMenuService = {
  data: {
    menu?: {
      items: Array<ShopifyMenuItem>;
    };
  };
  variables: {
    handle: string;
  } & ShopifyLocaleContext;
};

export type GetShopInfoService = {
  data: {
    shop: ShopifyShopInfo;
  };
  variables: {} & ShopifyLocaleContext;
};
