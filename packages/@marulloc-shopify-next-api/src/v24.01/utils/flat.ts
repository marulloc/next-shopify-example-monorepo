import { Connection } from '../@shopify-types/shopify-common';

export const flatConnection = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};
