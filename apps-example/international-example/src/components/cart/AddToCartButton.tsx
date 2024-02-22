'use client';

import { ShopifyProductVariant } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-product';
import { useAddToCart } from '@/context/cart/hooks';
import { classNames } from '@marulloc/components-library/utils';
import { useMemo } from 'react';

type TAddToCartBtnStates = 'nullVariant' | 'soldOut' | 'waiting' | 'adding';

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

  const componentStates: { state: TAddToCartBtnStates; fullForm: string } = useMemo(() => {
    if (!variant) return { state: 'nullVariant', fullForm: 'Please Select Options' };
    if (!variant.availableForSale) return { state: 'soldOut', fullForm: 'Sold Out' };
    if (state === 'adding') return { state, fullForm: 'Adding' };
    if (state === 'waiting') return { state, fullForm: 'Add To Cart' };

    return { state: 'nullVariant', fullForm: 'Something went wrong' };
  }, [state, variant]);

  const handleClick = () => {
    if (!variant) return;
    addItem(variant.id, quantity);
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
      {props.children(componentStates)}
    </Component>
  );
};

export default AddToCartButton;
