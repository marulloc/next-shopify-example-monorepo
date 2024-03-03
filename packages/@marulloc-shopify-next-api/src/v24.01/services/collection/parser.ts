import { ShopifyCollection } from '../../@shopify-types/shopify-collection';
import { generateGIDRoute, generateHandleRoute } from '../../utils/routeGenerator';
import { ToolkitCollection } from '../../@toolkit-types/toolkit-collection';

export const parseCollection = (collection: ShopifyCollection): ToolkitCollection => {
  return {
    ...collection,

    gidRoute: generateGIDRoute(collection.id),
    handleRoute: generateHandleRoute(collection.id, collection.handle).replace('/collection', '/search'),
  };
};

export const parseCollections = (collections: ShopifyCollection[]): ToolkitCollection[] => {
  return collections.map((collection) => parseCollection(collection));
};
