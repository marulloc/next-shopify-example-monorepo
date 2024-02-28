'use client';

import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { useGetLocale } from '../locale/hook';
import { ShopifyProductVariant } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-product';
import { addToCart } from '@/@marulloc-shopify-nextapi/v24.01/services/cart/service';
import { useState } from 'react';
import { ToolkitCartLine } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import { atomOptimisticCart, atomOptimisticCartLines } from '../cart-atoms';

/**
 *
 * @param lineId
 * @returns
 */

export const useSetCartLineOptimistic = (lineId: ToolkitCartLine['id']) => {
  const setCartLineOptimistic = useSetRecoilState(atomOptimisticCartLines);

  const updateQty = (qty: number) => {
    setCartLineOptimistic((cartLines) => {
      if (!cartLines) return [];

      const targetIndex = cartLines.findIndex(({ id }) => id === lineId);

      return [
        ...cartLines.slice(0, targetIndex),
        { ...cartLines[targetIndex], quantity: qty >= 0 ? qty : 0 },
        ...cartLines.slice(targetIndex + 1, cartLines.length),
      ];
    });
  };
  const deleteLine = () => {
    setCartLineOptimistic((cartLines) => {
      if (!cartLines) return [];

      const targetIndex = cartLines.findIndex(({ id }) => id === lineId);
      return [
        ...cartLines.slice(0, targetIndex),
        { ...cartLines[targetIndex], quantity: 0 },
        ...cartLines.slice(targetIndex + 1, cartLines.length),
      ];
    });
  };

  return { updateQty, deleteLine };
};

/**
 *
 * @returns
 */
export const useAddToCart = () => {
  const locale = useGetLocale();
  const [state, setState] = useState<'waiting' | 'adding'>('waiting');
  const { contents: cart } = useRecoilValueLoadable(atomOptimisticCart);
  const setCart = useSetRecoilState(atomOptimisticCart);

  const addItem = async (variantId: ShopifyProductVariant['id'], quantity: number) => {
    setState('adding');
    const updatedCart = await addToCart(cart.id, [{ merchandiseId: variantId, quantity }], locale);
    setCart(updatedCart);
    setState('waiting');
  };

  return [state, addItem] as const;
};
