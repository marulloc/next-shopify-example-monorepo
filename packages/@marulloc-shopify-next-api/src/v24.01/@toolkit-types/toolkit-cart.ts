import { ShopifyBaseCartLine, ShopifyCart } from '../@shopify-types/shopify-cart';
import { ShopifyMoney } from '../@shopify-types/shopify-common';
import { ToolkitProduct } from './toolkit-product';

export type ToolkitCartLine = Omit<ShopifyBaseCartLine, 'product'> & {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: ToolkitProduct;
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
};

export type ToolkitCart = Omit<ShopifyCart, 'lines'> & {
  lines: ToolkitCartLine[];
};
