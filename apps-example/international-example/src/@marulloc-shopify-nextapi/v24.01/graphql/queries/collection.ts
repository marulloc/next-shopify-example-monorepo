import { collectionFragment, collectionWithSeoFragment } from '../fragments/collection';
import { productFragment } from '../fragments/product';

export const getCollectionQuery = `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionWithSeoFragment}
`;

export const getCollectionsQuery = `
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;

export const getCollectionProductsQuery = `
  query getProducstSearch(
    $handle: String!
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      ...collection
      products(first: 16, filters: $filters, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${collectionWithSeoFragment}
  ${productFragment}
`;
