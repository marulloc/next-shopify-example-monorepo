import { storeFetch } from '@/shopify-gql';
import { getCollectionProductsQuery, getCollectionQuery, getCollectionsQuery } from '@/shopify-gql/queries/collection';
import { flatConnection } from '@/shopify-gql/utils';
import { parseProducts } from '../product/parser';
import { parseCollection, parseCollections } from './parser';

/**
 *
 * @param handle
 * @returns
 */
export const getCollection = async (handle: string): Promise<Collection | undefined> => {
  const res = await storeFetch<GetCollectionService>({
    query: getCollectionQuery,
    // tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return parseCollection(res.body.data.collection);
};

/**
 *
 * @param param0
 * @returns
 */
export const getCollectionProducts = async ({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> => {
  const res = await storeFetch<GetCollectionProductsService>({
    query: getCollectionProductsQuery,
    // tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey,
    },
  });

  return parseProducts(flatConnection(res.body.data.collection.products));
};

/**
 *
 * @returns
 */
export const getCollections = async (): Promise<Collection[]> => {
  const res = await storeFetch<GetCollectionsService>({
    query: getCollectionsQuery,
    // tags: [TAGS.collections]
  });

  return parseCollections(flatConnection(res.body.data.collections));
};
