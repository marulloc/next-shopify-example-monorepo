'use client';

import { ShopifyProductVariant } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-product';
import { useAddToCart } from '@/context/cart/hooks';
import { useDictioanry } from '@/context/locale/hook';
import { useSetPortalRecoil } from '@/context/ui/hooks';
import { classNames } from '@marulloc/components-library/utils';
import { useMemo } from 'react';

type TAddToCartBtnStates = 'notYet' | 'soldOut' | 'waiting' | 'adding';

type TProps<T extends React.ElementType = 'button'> = {
  variant: ShopifyProductVariant | null;
  quantity?: number;
  className?: (params: { state: TAddToCartBtnStates; fullForm: string }) => string;
  children: (props: { state: TAddToCartBtnStates; fullForm: string }) => React.ReactNode;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'onClick' | 'className' | 'children'>;

const AddToCartButton = <T extends React.ElementType = 'button'>({
  as,
  variant,
  quantity = 1,
  ...props
}: TProps<T>) => {
  const [state, addItem] = useAddToCart();
  const { activate } = useSetPortalRecoil('cart-drawer');
  const dictionary = useDictioanry();

  const componentStates: { state: TAddToCartBtnStates; fullForm: string } = useMemo(() => {
    if (!variant) return { state: 'notYet', fullForm: dictionary.cart.AddToCart.states.notYet };
    if (!variant.availableForSale) return { state: 'soldOut', fullForm: dictionary.cart.AddToCart.states.soldOut };
    if (state === 'adding') return { state, fullForm: dictionary.cart.AddToCart.states.adding };
    if (state === 'waiting') return { state, fullForm: dictionary.cart.AddToCart.states.waiting };
    return { state: 'notYet', fullForm: dictionary.cart.AddToCart.states.error };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, variant]);

  const handleClick = async () => {
    if (!variant) return;
    await addItem(variant.id, quantity);
    activate();
  };

  const Component = as ?? 'button';
  return (
    <Component
      {...props}
      onClick={handleClick}
      className={
        props.className &&
        classNames(
          props.className(componentStates),
          componentStates.state === 'waiting' ? 'pointer-events-auto' : 'pointer-events-none',
        )
      }
    >
      <span className="sr-only">{dictionary.cart.AddToCart.sr}</span>
      {props.children(componentStates)}
    </Component>
  );
};

export default AddToCartButton;
