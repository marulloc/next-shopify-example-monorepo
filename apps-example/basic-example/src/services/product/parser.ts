import { flatConnection } from '@/shopify-gql/utils';
import { generateGIDRoute, generateHandleRoute } from '../utils';

export const parseProduct = (product: ShopifyProduct): Product => {
  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: flatConnection(images),
    variants: flatConnection(variants),

    gidRoute: generateGIDRoute(rest.id),
    handleRoute: generateHandleRoute(rest.id, rest.handle),
  };
};

export const parseProducts = (products: ShopifyProduct[]): Product[] => {
  return products.map((product) => parseProduct(product));
};
