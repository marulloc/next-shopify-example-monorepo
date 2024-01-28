import { storeFetch } from '@/shopify-gql';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from '@/shopify-gql/mutations/cart';
import { getCartQuery } from '@/shopify-gql/queries/cart';
import { parseCart } from './parser';

/**
 *
 * @returns
 */
export const createCart = async (): Promise<Cart> => {
  const res = await storeFetch<CreateCartService>({
    query: createCartMutation,
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartCreate.cart);
};

/**
 *
 * @param cartId
 * @param lines
 * @returns
 */
export const addToCart = async (
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> => {
  const res = await storeFetch<AddToCartService>({
    query: addToCartMutation,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartLinesAdd.cart);
};

/**
 *
 * @param cartId
 * @param lineIds
 * @returns
 */
export const removeFromCart = async (cartId: string, lineIds: string[]): Promise<Cart> => {
  const res = await storeFetch<RemoveFromCartService>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartLinesRemove.cart);
};

/**
 *
 * @param cartId
 * @param lines
 * @returns
 */
export const updateCart = async (
  cartId: string,
  lines: { id: string; merchandiseId?: string; quantity: number }[],
): Promise<Cart> => {
  const res = await storeFetch<UpdateCartService>({
    query: editCartItemsMutation,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartLinesUpdate.cart);
};

/**
 *
 * @param cartId
 * @returns
 */
export const getCart = async (cartId: string): Promise<Cart> => {
  const res = await storeFetch<GetCartService>({
    query: getCartQuery,
    variables: { cartId },
    // tags: [TAGS.cart],
    cache: 'no-store',
  });

  // Old carts becomes `null` when you checkout.
  // if (!res.body.data.cart) {
  //   return undefined;
  // }

  return parseCart(res.body.data.cart);
};
