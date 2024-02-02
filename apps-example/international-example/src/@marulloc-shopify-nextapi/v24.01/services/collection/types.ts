import { ShopifyCollection } from '../../@shopify-types/shopify-collection';
import { Connection, ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { ShopifyProduct } from '../../@shopify-types/shopify-product';

export type GetCollectionService = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  } & ShopifyLocaleContext;
};

export type GetCollectionProductsService = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  } & ShopifyLocaleContext;
};

export type GetCollectionsService = {
  data: {
    collections: Connection<ShopifyCollection>;
  };

  variables: {} & ShopifyLocaleContext;
};
