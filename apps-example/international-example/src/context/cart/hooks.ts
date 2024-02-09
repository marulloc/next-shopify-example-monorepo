import { Dispatch, SetStateAction, useEffect } from 'react';
import { CartContextType } from './context';
import { createCart, getCart, updateCartLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/cart/service';
import { ToolkitCart } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-cart';
import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';

/**
 * @summary Init Cart
 * 1. if(savedCart) : getCart(savedCart)
 * 2. else : createCart()
 * @param context
 * @param setContext
 * @param locale
 */
export const useCartInitEffect = (
  context: CartContextType,
  setContext: Dispatch<SetStateAction<CartContextType>>,
  locale?: ShopifyLocaleContext,
) => {
  useEffect(() => {
    const storageKey = 'marulloc-cart';

    if (context.cart) {
      localStorage.setItem(storageKey, JSON.stringify(context.cart));
      return;
    }

    (async () => {
      const savedCart = JSON.parse(localStorage.getItem(storageKey) || 'null') as ToolkitCart | null;

      if (savedCart) {
        const memoizedCart = await getCart(savedCart.id, locale);
        setContext(({ status, ...rest }) => ({ ...rest, cart: memoizedCart, status: 'loaded' }));
      } else {
        const newCart = await createCart(locale);
        setContext(({ status, ...rest }) => ({ ...rest, cart: newCart, status: 'loaded' }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.cart, locale]);
};

/**
 * @summary Locale Update for Cart Money Format
 * cart's money format follow Cart BuyerIdentity
 * so, if locale change , update Cart buyerIdentity's "Country Code"
 * @param context
 * @param setContext
 * @param locale
 */
export const useCartLocaleEffect = (
  context: CartContextType,
  setContext: Dispatch<SetStateAction<CartContextType>>,
  locale?: ShopifyLocaleContext,
) => {
  useEffect(() => {
    (async () => {
      if (!context.cart || !locale) return;
      if (locale.country?.toLowerCase() === context.cart?.buyerIdentity?.countryCode.toLowerCase()) return;

      setContext(({ status, ...rest }) => ({ ...rest, status: 'pending' }));
      const cartWithNewLocale = await updateCartLocale(context.cart.id, locale);
      setContext(({ status, ...rest }) => ({ ...rest, cart: cartWithNewLocale, status: 'loaded' }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.cart, locale]);
};
