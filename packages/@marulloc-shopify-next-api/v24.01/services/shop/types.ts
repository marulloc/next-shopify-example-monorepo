import { ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { ShopifyLocalization, ShopifyMenuItem, ShopifyShopInfo } from '../../@shopify-types/shopify-shop';

export type GetLocaleService = {
  data: {
    localization: ShopifyLocalization;
  };
  variables: {} & ShopifyLocaleContext;
};
export type GetMenuService = {
  data: {
    menu?: {
      items: Array<ShopifyMenuItem>;
    };
  };
  variables: {
    handle: string;
  } & Pick<ShopifyLocaleContext, 'language'>;
};

export type GetShopInfoService = {
  data: {
    shop: ShopifyShopInfo;
  };
  variables: {} & ShopifyLocaleContext;
};
