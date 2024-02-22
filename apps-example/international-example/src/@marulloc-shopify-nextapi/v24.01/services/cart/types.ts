import { ShopifyCart, ShopifyCartLineUpdateInput } from '../../@shopify-types/shopify-cart';
import { ShopifyLocaleContext } from '../../@shopify-types/shopify-common';

export type CreateCartService = {
  data: {
    cartCreate: { cart: ShopifyCart };
  };
  variables: {} & ShopifyLocaleContext;
};

export type AddToCartService = {
  data: { cartLinesAdd: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lines: { merchandiseId: string; quantity: number }[];
  } & ShopifyLocaleContext;
};

export type RemoveFromCartService = {
  data: { cartLinesRemove: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lineIds: string[];
  } & ShopifyLocaleContext;
};

export type UpdateCartService = {
  data: { cartLinesUpdate: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lines: { id: string; merchandiseId?: string; quantity: number }[];
  } & ShopifyLocaleContext;
};

export type GetCartService = {
  data: { cart: ShopifyCart };
  variables: { cartId: string } & ShopifyLocaleContext;
};

export type UpdateCartLocaleService = {
  data: { cartBuyerIdentityUpdate: { cart: ShopifyCart } };
  variables: { cartId: string; country: ShopifyLocaleContext['country']; language: ShopifyLocaleContext['language'] };
};

export type UpdateCartLinesService = {
  data: { cartLinesUpdate: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lines: ShopifyCartLineUpdateInput[];
  };
};
