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
import { parseProducts } from '../product/parser';
import { parseCollection, parseCollections } from './parser';
import { GetCollectionProductsService, GetCollectionService, GetCollectionsService } from './types';

export const getCollection = async (handle: string, locale?: ShopifyLocaleContext): Promise<ToolkitCollection> => {
  const res = await storeFetch<GetCollectionService>({
    query: getCollectionQuery,
    // tags: [TAGS.collections],
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
  reverse,
  sortKey,
  locale,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  locale?: ShopifyLocaleContext;
}): Promise<ToolkitProduct[]> => {
  const res = await storeFetch<GetCollectionProductsService>({
    query: getCollectionProductsQuery,
    // tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseProducts(flatConnection(res.body.data.collection.products));
};

export const getCollections = async (locale?: ShopifyLocaleContext): Promise<ToolkitCollection[]> => {
  const res = await storeFetch<GetCollectionsService>({
    query: getCollectionsQuery,
    // tags: [TAGS.collections]
    variables: {
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseCollections(flatConnection(res.body.data.collections));
};
