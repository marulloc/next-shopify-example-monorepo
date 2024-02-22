'use client';

import {
  DefaultValue,
  atom,
  selector,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import { atomLocale } from '../locale/atom';
import { ToolkitCart, ToolkitCartLine } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import {
  addToCart,
  createCart,
  getCart,
  updateCartLocale,
} from '@/@marulloc-shopify-nextapi/v24.01/services/cart/service';
import { useGetLocale } from '../locale/hook';
import { useState } from 'react';
import { debounce } from '@/utils/throttle';

const STORAGE_KEY = 'marulloc-cart';
const store = typeof window !== 'undefined' ? window.localStorage : null;

const syncWithShopify = debounce((newValue: ToolkitCart | undefined) => {
  console.log('Sync Called', newValue);
}, 300);

export const atomOptimisticCart = atom({
  key: 'cart-atom-with-locale',
  default: selector({
    key: 'cart-with-locale-loader',
    get: async ({ get: subscribe }) => {
      if (!store) return;
      const locale = subscribe(atomLocale);

      const memoizedCart = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as ToolkitCart | null;

      let savedOrNewCart: ToolkitCart;
      if (!memoizedCart?.id) {
        savedOrNewCart = await createCart(locale);
      } else {
        if (locale.country?.toUpperCase() !== memoizedCart.buyerIdentity.countryCode.toUpperCase()) {
          savedOrNewCart = await updateCartLocale(memoizedCart.id, locale);
          // console.log('udpate and init');
        } else {
          savedOrNewCart = await getCart(memoizedCart.id, locale);
          // console.log('Just Get');
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedOrNewCart));
      return savedOrNewCart;
    },
  }),

  effects: [
    ({ onSet, setSelf }) => {
      // Update CartLine

      onSet(async (newValue, oldValue, isReset) => {
        console.log('Changed', newValue);
        syncWithShopify(newValue);
        if (isReset) return localStorage.removeItem(STORAGE_KEY);
        return localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
      });
    },
  ],
});

export const optimisticCartLines = selector({
  key: 'cart-subscribe1244',
  get: ({ get: subscribe }) => {
    if (!store) return [];

    const cart = subscribe(atomOptimisticCart);
    if (!cart) return [];
    return cart.lines;
  },
  set: ({ set }, newValue) => {
    set(atomOptimisticCart, (cart) => {
      if (!cart) return;
      if (!newValue || newValue instanceof DefaultValue) return cart;

      const optimisticTotalQty = newValue.reduce((prevResult, { quantity }) => prevResult + quantity, 0);

      return { ...cart, lines: newValue, totalQuantity: optimisticTotalQty };
    });
  },
});

export const useSetCartLineOptimistic = (lineId: ToolkitCartLine['id']) => {
  const setCartLineOptimistic = useSetRecoilState(optimisticCartLines);

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

export const useAddToCart = () => {
  const [state, setState] = useState<'pending' | 'resolved' | 'error' | null>(null);
  const setCart = useSetRecoilState(atomOptimisticCart);

  const addItem = async () => {};

  return [state];
};
