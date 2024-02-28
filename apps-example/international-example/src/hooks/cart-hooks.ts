'use client';

import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { ShopifyProductVariant } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-product';
import { addToCart } from '@/@marulloc-shopify-nextapi/v24.01/services/cart/service';
import { useCallback, useState } from 'react';
import { ToolkitCartLine } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import { atomCart, atomOptimisticCartLines } from '../context/cart-atoms';
import { useGetLocale } from '@/hooks/locale-hooks';

/**
 *
 * @returns
 */
export const useGetLoadableCart = () => {
  const loadableCart = useRecoilValueLoadable(atomCart);
  return loadableCart as Readonly<typeof loadableCart>;
};

/**
 *
 * @param lineId
 * @returns
 */
export const useCartLineOptimisticMutation = (lineId: ToolkitCartLine['id']) => {
  const setCartLineOptimistic = useSetRecoilState(atomOptimisticCartLines);

  const updateQty = useCallback(
    (qty: number) => {
      setCartLineOptimistic((cartLines) => {
        if (!cartLines) return [];
        const targetIndex = cartLines.findIndex(({ id }) => id === lineId);

        return [
          ...cartLines.slice(0, targetIndex),
          { ...cartLines[targetIndex], quantity: qty >= 0 ? qty : 0 },
          ...cartLines.slice(targetIndex + 1, cartLines.length),
        ];
      });
    },
    [lineId, setCartLineOptimistic],
  );

  const deleteLine = useCallback(() => {
    setCartLineOptimistic((cartLines) => {
      if (!cartLines) return [];
      const targetIndex = cartLines.findIndex(({ id }) => id === lineId);

      return [
        ...cartLines.slice(0, targetIndex),
        { ...cartLines[targetIndex], quantity: 0 },
        ...cartLines.slice(targetIndex + 1, cartLines.length),
      ];
    });
  }, [lineId, setCartLineOptimistic]);

  return { updateQty, deleteLine } as const;
};

/**
 *
 * @returns
 */
export const useAddToCart = () => {
  const { contents: cart } = useGetLoadableCart();
  const setCart = useSetRecoilState(atomCart);
  const locale = useGetLocale();
  const [state, setState] = useState<'waiting' | 'adding'>('waiting');

  const addItem = useCallback(
    async (variantId: ShopifyProductVariant['id'], quantity: number) => {
      setState('adding');
      const updatedCart = await addToCart(cart.id, [{ merchandiseId: variantId, quantity }], locale);
      setCart(updatedCart);
      setState('waiting');
    },
    [cart.id, locale, setCart],
  );

  return [state, addItem] as const;
};
