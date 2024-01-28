import { storeFetch } from '@/shopify-gql';
import {
  getPredictiveSearchQuery,
  getProductsInCollectionSearchQuery,
  getProductsSearchQuery,
} from '@/shopify-gql/queries/search';
import {
  GetPredictiveSearchService,
  GetProductsInCollectionSearchService,
  GetProductsSearchService,
  PredictiveSearch,
  SortKey,
} from './type';
import { parsePredictiveSearch, parseSortParams } from './parser';
import { parseProducts } from '../product/parser';
import { flatConnection } from '@/shopify-gql/utils';

/**
 *
 * @param productId
 * @returns
 */
export const getPredictiveSearch = async (query: string): Promise<PredictiveSearch> => {
  const res = await storeFetch<GetPredictiveSearchService>({
    query: getPredictiveSearchQuery,
    variables: {
      query,
    },
  });

  return parsePredictiveSearch(res.body.data.predictiveSearch.products, res.body.data.predictiveSearch.collections);
};

export const getProductsSearch = async ({
  query,
  filters,
  sortKey: sort,
}: {
  query: string;
  filters: ShopifyProductFilter[];
  sortKey?: SortKey;
}): Promise<Product[]> => {
  const { sortKey, reverse } = parseSortParams(sort || 'relevance');

  const res = await storeFetch<GetProductsSearchService>({
    query: getProductsSearchQuery,
    variables: {
      query: query || '',
      productFilters: filters,
      sortKey,
      reverse,
    },
  });

  return parseProducts(flatConnection(res.body.data.search));
};

export const getProductsInCollectionSearch = async ({
  handle,
  filters,
  sortKey: sort,
}: {
  handle: string;
  filters: ShopifyProductFilter[];
  sortKey?: SortKey;
}): Promise<Product[]> => {
  const { sortKey, reverse } = parseSortParams(sort || 'relevance');

  try {
    const res = await storeFetch<GetProductsInCollectionSearchService>({
      query: getProductsInCollectionSearchQuery,
      variables: {
        handle,
        productFilters: filters,
        sortKey,
        reverse,
      },
    });

    return parseProducts(flatConnection(res.body.data.collection.products));
  } catch (e) {
    console.error(e);
    return [];
  }
};
