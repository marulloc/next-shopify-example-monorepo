import { ShopifyGid } from '../@shopify-types/shopify-common';

export const extractGid = (gid: ShopifyGid['hash']) => {
  const regexParttern = /gid:\/\/shopify\/([^\/]+)\/(\d+)/;

  const match = gid.match(regexParttern);
  if (match) {
    const [_, resource, id] = match;
    return { resource, id } as { resource: string; id: string };
  } else {
    return { resource: 'undefined', id: 'undefined' };
  }
};

export const combineGid = (id: ShopifyGid['id'], resource: ShopifyGid['resource']) => {
  const gid = `gid://shopify/${resource}/${id}`;
  return gid;
};
