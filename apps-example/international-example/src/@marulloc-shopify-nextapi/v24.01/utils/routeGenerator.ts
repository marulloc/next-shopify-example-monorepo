import { ShopifyGid } from '../@shopify-types/shopify-common';
import { extractGid } from './gid';

export const generateGIDRoute = (gid: ShopifyGid['hash']) => {
  const { resource, id } = extractGid(gid);
  return `/${resource.toLowerCase()}/${id.toLowerCase()}`;
};

export const generateHandleRoute = (gid: ShopifyGid['hash'], handle: string) => {
  const { resource, id } = extractGid(gid);
  return `/${resource.toLowerCase()}/${handle}`;
};
