import { ShopifyProduct } from '../../@shopify-types/shopify-product';
import { flatConnection } from '../../utils/flat';
import { generateGIDRoute, generateHandleRoute } from '../../utils/routeGenerator';
import { ToolkitProduct } from '../@toolkit-types/toolkit-product';

export const parseProduct = (product: ShopifyProduct): ToolkitProduct => {
  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: flatConnection(images),
    variants: flatConnection(variants),

    gidRoute: generateGIDRoute(rest.id),
    handleRoute: generateHandleRoute(rest.id, rest.handle),
  };
};

export const parseProducts = (products: Array<ShopifyProduct>): ToolkitProduct[] => {
  return products.map((product) => parseProduct(product));
};
