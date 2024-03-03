import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery,
} from '../../@shopify-graphql/queries/collection';
import { ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { flatConnection } from '../../utils/flat';
import { storeFetch } from '../../utils/storeFetch';
import { ToolkitCollection } from '../@toolkit-types/toolkit-collection';
import { ToolkitProduct } from '../@toolkit-types/toolkit-product';
import { ToolkitSortKey } from '../@toolkit-types/toolkit-search';
import { parseProducts } from '../product/parser';
import { parseSortParams } from '../search/parser';
import { parseCollection, parseCollections } from './parser';
import { GetCollectionProductsService, GetCollectionService, GetCollectionsService } from './types';

export const getCollection = async (handle: string, locale?: ShopifyLocaleContext): Promise<ToolkitCollection> => {
  const res = await storeFetch<GetCollectionService>({
    query: getCollectionQuery,
    variables: {
      handle,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseCollection(res.body.data.collection);
};

export const getCollectionProducts = async ({
  collection,
  sortKey: sort,
  locale,
}: {
  collection: string;
  sortKey?: ToolkitSortKey;
  locale?: ShopifyLocaleContext;
}): Promise<ToolkitProduct[]> => {
  const { sortKey, reverse } = parseSortParams(sort || 'relevance');

  const res = await storeFetch<GetCollectionProductsService>({
    query: getCollectionProductsQuery,
    variables: {
      handle: collection,
      reverse,
      sortKey,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseProducts(flatConnection(res.body.data.collection.products));
};

export const getCollections = async (locale?: ShopifyLocaleContext): Promise<ToolkitCollection[]> => {
  const res = await storeFetch<GetCollectionsService>({
    query: getCollectionsQuery,
    variables: {
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseCollections(flatConnection(res.body.data.collections));
};
