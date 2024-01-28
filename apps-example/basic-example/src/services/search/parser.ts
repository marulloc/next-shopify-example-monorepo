import { parseCollection } from '../collection/parser';
import { parseProduct } from '../product/parser';
import { PredictiveSearch } from './type';

export const parsePredictiveSearch = (
  products: ShopifyProduct[],
  collections: ShopifyCollection[],
): PredictiveSearch => {
  return {
    products: products.map((product) => parseProduct(product)),
    collections: collections.map((collection) => parseCollection(collection)),
  };
};

export const parseSortParams = (
  sortKey: 'relevance' | 'plth' | 'phtl',
): { sortKey: ShopifySortKey; reverse: boolean } => {
  switch (sortKey) {
    case 'plth':
      return { sortKey: 'PRICE', reverse: false };

    case 'phtl':
      return { sortKey: 'PRICE', reverse: true };

    default:
    case undefined:
    case 'relevance':
      return { sortKey: 'RELEVANCE', reverse: false };
  }
};
