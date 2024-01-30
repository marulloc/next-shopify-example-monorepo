import { Connection } from '../../@shopify-types/shopify-common';
import { ShopifyPage } from '../../@shopify-types/shopify-page';

export type GetPageService = {
  data: { pageByHandle: ShopifyPage };
  variables: { handle: string };
};
export type GetPagesService = {
  data: {
    pages: Connection<ShopifyPage>;
  };
};
