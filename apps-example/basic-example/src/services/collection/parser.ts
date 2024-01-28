import { generateGIDRoute, generateHandleRoute } from '../utils';

export const parseCollection = (collection: ShopifyCollection): Collection => {
  return {
    ...collection,

    gidRoute: generateGIDRoute(collection.id),
    handleRoute: generateHandleRoute(collection.id, collection.handle).replace('/collection', '/search'),
  };
};

export const parseCollections = (collections: ShopifyCollection[]): Collection[] => {
  return collections.map((collection) => parseCollection(collection));
};
