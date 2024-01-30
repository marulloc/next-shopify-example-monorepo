import { ShopifyCart } from '../../@shopify-types/shopify-cart';

export type CreateCartService = {
  data: {
    cartCreate: { cart: ShopifyCart };
  };
};

export type AddToCartService = {
  data: { cartLinesAdd: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lines: { merchandiseId: string; quantity: number }[];
  };
};

export type RemoveFromCartService = {
  data: { cartLinesRemove: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type UpdateCartService = {
  data: { cartLinesUpdate: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lines: { id: string; merchandiseId?: string; quantity: number }[];
  };
};

export type GetCartService = {
  data: { cart: ShopifyCart };
  variables: { cartId: string };
};
