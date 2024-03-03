import { ShopifyCollection } from '../@shopify-types/shopify-collection';

export type ToolkitCollection = ShopifyCollection & {
  handleRoute: string;
  gidRoute: string;
};
