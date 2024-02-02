import { getPredictiveSearchQuery } from '../../@shopify-graphql/queries/search';
import { ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { ShopifyProductFilter } from '../../@shopify-types/shopify-search';
import { flatConnection } from '../../utils/flat';
import { storeFetch } from '../../utils/storeFetch';
import { ToolkitProduct } from '../@toolkit-types/toolkit-product';
import { ToolkitPredictiveSearch, ToolkitSortKey } from '../@toolkit-types/toolkit-search';
import { parseProducts } from '../product/parser';
import { parsePredictiveSearch, parseSortParams } from './parser';
import { GetPredictiveSearchService, GetProductsSearchService } from './types';

export const getPredictiveSearch = async (
  query: string,
  locale?: ShopifyLocaleContext,
): Promise<ToolkitPredictiveSearch> => {
  const res = await storeFetch<GetPredictiveSearchService>({
    query: getPredictiveSearchQuery,
    variables: {
      query,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parsePredictiveSearch(res.body.data.predictiveSearch.products, res.body.data.predictiveSearch.collections);
};

export const getProductsSearch = async ({
  query,
  filters,
  sortKey: sort,
  locale,
}: {
  query: string;
  filters: ShopifyProductFilter[];
  sortKey?: ToolkitSortKey;
  locale?: ShopifyLocaleContext;
}): Promise<ToolkitProduct[]> => {
  const { sortKey, reverse } = parseSortParams(sort || 'relevance');

  const res = await storeFetch<GetProductsSearchService>({
    query: getPredictiveSearchQuery,
    variables: {
      query: query || '',
      productFilters: filters,
      sortKey,
      reverse,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseProducts(flatConnection(res.body.data.search));
};
