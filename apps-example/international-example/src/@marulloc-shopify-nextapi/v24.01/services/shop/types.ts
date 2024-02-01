import { ShopifyLocalization, ShopifyMenuItem, ShopifyShopInfo } from '../../@shopify-types/shopify-shop';

export type GetMenuService = {
  data: {
    menu?: {
      items: Array<ShopifyMenuItem>;
    };
  };
  variables: {
    handle: string;
  };
};

export type GetLocaleService = {
  data: {
    localization: ShopifyLocalization;
  };
};

export type GetShopInfoService = {
  data: {
    shop: ShopifyShopInfo;
  };
};
