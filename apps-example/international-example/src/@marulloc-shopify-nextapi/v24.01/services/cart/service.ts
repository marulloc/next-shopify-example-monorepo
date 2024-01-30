import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from '../../@shopify-graphql/mutations/cart';
import { getCartQuery } from '../../@shopify-graphql/queries/cart';
import { storeFetch } from '../../utils/storeFetch';
import { ToolkitCart } from '../@toolkit-types/toolkit-cart';
import { parseCart } from './parser';
import { AddToCartService, CreateCartService, GetCartService, RemoveFromCartService, UpdateCartService } from './types';

export const createCart = async (): Promise<ToolkitCart> => {
  const res = await storeFetch<CreateCartService>({
    query: createCartMutation,
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartCreate.cart);
};

export const addToCart = async (
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<ToolkitCart> => {
  const res = await storeFetch<AddToCartService>({
    query: addToCartMutation,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartLinesAdd.cart);
};

export const removeFromCart = async (cartId: string, lineIds: string[]): Promise<ToolkitCart> => {
  const res = await storeFetch<RemoveFromCartService>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartLinesRemove.cart);
};

export const updateCart = async (
  cartId: string,
  lines: { id: string; merchandiseId?: string; quantity: number }[],
): Promise<ToolkitCart> => {
  const res = await storeFetch<UpdateCartService>({
    query: editCartItemsMutation,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartLinesUpdate.cart);
};

export const getCart = async (cartId: string): Promise<ToolkitCart> => {
  const res = await storeFetch<GetCartService>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cart);
};
