import { storeFetch } from '@/shopify-gql';
import { getProductQuery, getProductRecommendationsQuery, getProductsQuery } from '@/shopify-gql/queries/product';
import { parseProduct, parseProducts } from './parser';
import { flatConnection } from '@/shopify-gql/utils';

/**
 *
 * @param handle
 * @returns
 */
export const getProduct = async (handle: string): Promise<Product | undefined> => {
  const res = await storeFetch<GetProductService>({
    query: getProductQuery,
    // tags: [TAGS.products],
    variables: {
      handle,
    },
  });

  return parseProduct(res.body.data.product);
};

/**
 *
 * @param productId
 * @returns
 */
export const getProductRecommendations = async (productId: string): Promise<Product[]> => {
  const res = await storeFetch<GetProductRecommendationsService>({
    query: getProductRecommendationsQuery,
    // tags: [TAGS.products],
    variables: {
      productId,
    },
  });

  return parseProducts(res.body.data.productRecommendations);
};

/**
 *
 * @param param0
 * @returns
 */
export const getProducts = async ({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> => {
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
