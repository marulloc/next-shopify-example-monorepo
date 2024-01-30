import { Connection } from '../../@shopify-types/shopify-common';
import { ShopifyProduct } from '../../@shopify-types/shopify-product';

export type GetProductService = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type GetProductRecommendationsService = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type GetProductsService = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};
