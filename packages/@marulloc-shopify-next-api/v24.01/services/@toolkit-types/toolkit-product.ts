import { ShopifyImage } from '../../@shopify-types/shopify-common';
import { ShopifyProduct, ShopifyProductVariant } from '../../@shopify-types/shopify-product';

export type ToolkitProduct = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ShopifyProductVariant[];
  images: ShopifyImage[];

  handleRoute: string;
  gidRoute: string;
};
