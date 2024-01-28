export const flatConnection = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

export const extractGid = (gid: ShopifyGid['hash']) => {
  const regexParttern = /gid:\/\/shopify\/([^\/]+)\/(\d+)/;

  const match = gid.match(regexParttern);
  if (match) {
    const [_, resource, id] = match;
    return { resource, id };
  } else {
    return { resource: 'undefined', id: 'undefined' };
  }
};

export const combineGid = (id: ShopifyGid['id'], resource: ShopifyGid['resource']) => {
  const gid = `gid://shopify/${resource}/${id}`;
  return gid;
};
