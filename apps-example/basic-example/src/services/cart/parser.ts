import { flatConnection } from '@/shopify-gql/utils';
import { parseProduct } from '../product/parser';

export const parseCart = (cart: ShopifyCart): Cart => {
  return {
    ...cart,
    lines: flatConnection(cart.lines).map((line) => ({
      ...line,
      merchandise: { ...line.merchandise, product: parseProduct(line.merchandise.product) },
    })),
  };
};
