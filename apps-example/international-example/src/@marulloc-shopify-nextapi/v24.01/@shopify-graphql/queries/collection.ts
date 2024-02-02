import { collectionWithoutSEOFragment, collectionFragment } from '../fragments/collection';
import { productWithoutSEOFragment } from '../fragments/product';

export const getCollectionQuery = `
  query getCollection($handle: String!, $country: CountryCode, $language: LanguageCode)  @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionFragment}
`;

export const getCollectionsQuery = `
  query getCollections ($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionWithoutSEOFragment}
`;

export const getCollectionProductsQuery = `
  query getProducstSearch(
    $handle: String!
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $country: CountryCode 
    $language: LanguageCode
  )  @inContext(country: $country, language: $language) {
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
  ${collectionWithoutSEOFragment}
  ${productWithoutSEOFragment}
`;
