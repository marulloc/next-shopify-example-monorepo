'use client';

import { atom, selector } from 'recoil';
import { atomLocale } from '../locale/atom';
import { ToolkitCart } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import { createCart, getCart } from '@/@marulloc-shopify-nextapi/v24.01/services/cart/service';

const STORAGE_KEY = 'marulloc-cart';
const store = typeof window !== 'undefined' ? window.localStorage : null;

export const atomCart = atom({
  key: 'cart-atom-with-locale',
  default: selector({
    key: 'cart-with-locale-loader',
    get: async ({ get: subscribe }) => {
      if (!store) return;
      const locale = subscribe(atomLocale);

      const memoizedCart = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as ToolkitCart | null;

      let savedOrNewCart: ToolkitCart;
      if (memoizedCart?.id) {
        // if Locale MisMatch Update Locale
        // else
        savedOrNewCart = await getCart(memoizedCart.id, locale);
      } else {
        // with buyer identity
        savedOrNewCart = await createCart(locale);
      }

      return savedOrNewCart;
    },
  }),

  effects: [
    ({ onSet }) => {
      // Syncronize LocalStorage
    },
  ],
});

export const useAddToCart = () => {};
