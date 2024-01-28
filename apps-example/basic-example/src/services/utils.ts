import { extractGid } from '@/shopify-gql/utils';

export const generateGIDRoute = (gid: ShopifyGid['hash']) => {
  const { resource, id } = extractGid(gid);
  return `/${resource.toLowerCase()}/${id.toLowerCase()}`;
};

export const generateHandleRoute = (gid: ShopifyGid['hash'], handle: ShopifyProduct['handle']) => {
  const { resource, id } = extractGid(gid);
  return `/${resource.toLowerCase()}/${handle}`;
};
