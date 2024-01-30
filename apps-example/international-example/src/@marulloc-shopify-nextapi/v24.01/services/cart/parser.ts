import { ShopifyCart } from '../../@shopify-types/shopify-cart';
import { ToolkitCart } from '../@toolkit-types/toolkit-cart';
import { flatConnection } from '../../utils/flat';
import { parseProduct } from '../product/parser';

export const parseCart = (cart: ShopifyCart): ToolkitCart => {
  return {
    ...cart,
    lines: flatConnection(cart.lines).map((line) => ({
      ...line,
      merchandise: { ...line.merchandise, product: parseProduct(line.merchandise.product) },
    })),
  };
};
