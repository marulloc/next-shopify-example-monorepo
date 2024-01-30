import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from '../../@shopify-graphql/queries/product';
import { flatConnection } from '../../utils/flat';
import { storeFetch } from '../../utils/storeFetch';
import { ToolkitProduct } from '../@toolkit-types/toolkit-product';
import { parseProduct, parseProducts } from './parser';
import { GetProductRecommendationsService, GetProductService, GetProductsService } from './types';

export const getProduct = async (handle: string): Promise<ToolkitProduct> => {
  const res = await storeFetch<GetProductService>({
    query: getProductQuery,
    // tags: [TAGS.products],
    variables: {
      handle,
    },
  });

  return parseProduct(res.body.data.product);
};

export const getProductRecommendations = async (productId: string): Promise<ToolkitProduct[]> => {
  const res = await storeFetch<GetProductRecommendationsService>({
    query: getProductRecommendationsQuery,
    // tags: [TAGS.products],
    variables: {
      productId,
    },
  });

  return parseProducts(res.body.data.productRecommendations);
};

export const getProducts = async ({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<ToolkitProduct[]> => {
  const res = await storeFetch<GetProductsService>({
    query: getProductsQuery,
    // tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey,
    },
  });

  return parseProducts(flatConnection(res.body.data.products));
};
