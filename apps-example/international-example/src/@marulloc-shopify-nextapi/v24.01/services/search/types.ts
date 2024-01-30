import { ShopifyCollection } from '../../@shopify-types/shopify-collection';
import { Connection } from '../../@shopify-types/shopify-common';
import { ShopifyProduct } from '../../@shopify-types/shopify-product';
import { ShopifyProductFilter, ShopifySortKey } from '../../@shopify-types/shopify-search';

export type GetPredictiveSearchService = {
  data: {
    predictiveSearch: {
      products: ShopifyProduct[];
      collections: ShopifyCollection[];
    };
  };
  variables: {
    query: string;
  };
};

export type GetProductsSearchService = {
  data: {
    search: Connection<ShopifyProduct>;
  };
  variables: {
    query: string;
    productFilters: ShopifyProductFilter[];
    sortKey?: ShopifySortKey;
    reverse?: boolean;
  };
};
