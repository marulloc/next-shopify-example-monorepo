import { collectionFragment } from '../fragments/collection';
import { productFragment } from '../fragments/product';

export const getPredictiveSearchQuery = /* GraphQL */ `
  query getPredictiveSearch($query: String!) {
    predictiveSearch(
      query: $query
      limit: 5
      limitScope: EACH
      searchableFields: [TITLE]
      types: [COLLECTION, PRODUCT]
    ) {
      products {
        ...product
      }
      collections {
        id
        handle
        title
        description
      }
    }
  }
  ${productFragment}
`;

export const getProductsSearchQuery = /* GraphQL */ `
  query getProducstSearch($query: String!, $filters: [ProductFilter!], $sortKey: SearchSortKeys, $reverse: Boolean) {
    search(first: 16, query: $query, productFilters: $filters, types: [PRODUCT], sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ... on Product {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductsInCollectionSearchQuery = /* GraphQL */ `
  query getProducstSearch(
    $handle: String!
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      products(first: 16, filters: $filters, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;
