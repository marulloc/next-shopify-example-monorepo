import { classNames } from '@marulloc/components-library/utils';

import Price from '../Price';
import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';

type Props<T extends React.ElementType = 'div'> = {
  priceRange: ToolkitProduct['priceRange'];
} & Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'ref'>;

const ProductPrice = ({ priceRange, ...rest }: Props) => {
  const isSame = priceRange.maxVariantPrice.amount === priceRange.minVariantPrice.amount;

  return (
    <div className={classNames('flex space-x-2  ', rest.className)} {...rest}>
      <Price currencyCode={priceRange.minVariantPrice.currencyCode} amount={priceRange.minVariantPrice.amount} />
      <p className={classNames(isSame ? 'hidden' : 'block')}>~</p>
    </div>
  );
};

export default ProductPrice;
