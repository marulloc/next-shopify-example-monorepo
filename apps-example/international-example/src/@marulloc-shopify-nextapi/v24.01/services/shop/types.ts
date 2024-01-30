import { ShopifyLocalization, ShopifyMenuItem } from '../../@shopify-types/shopify-shop';

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
