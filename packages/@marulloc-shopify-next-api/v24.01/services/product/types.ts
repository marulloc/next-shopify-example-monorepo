import { Connection, ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { ShopifyProduct } from '../../@shopify-types/shopify-product';

export type GetProductService = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  } & ShopifyLocaleContext;
};

export type GetProductRecommendationsService = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  } & ShopifyLocaleContext;
};

export type GetProductsService = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  } & ShopifyLocaleContext;
};
