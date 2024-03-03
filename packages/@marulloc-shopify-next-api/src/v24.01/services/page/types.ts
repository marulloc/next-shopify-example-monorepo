import { Connection, ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { ShopifyPage } from '../../@shopify-types/shopify-page';

export type GetPageService = {
  data: { pageByHandle: ShopifyPage };
  variables: { handle: string } & ShopifyLocaleContext;
};
export type GetPagesService = {
  data: {
    pages: Connection<ShopifyPage>;
  };
  variables: {} & ShopifyLocaleContext;
};
