import { classNames } from '@marulloc/components-library/utils';

import Price from './Price';

type Props<T extends React.ElementType = 'div'> = {
  priceRange: Product['priceRange'];
} & Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'ref'>;

const ProductPrice = ({ priceRange, className = 'text-zinc-400', ...rest }: Props) => {
  const isSame = priceRange.maxVariantPrice.amount === priceRange.minVariantPrice.amount;

  return (
    <div className={classNames(className)} {...rest}>
      {/* <span className="text-zinc-400 text-xs pb-1 "> Price Range </span> */}
      <div className="flex space-x-2  ">
        <div>
          <Price currencyCode={priceRange.minVariantPrice.currencyCode} amount={priceRange.minVariantPrice.amount} />
        </div>
        <p className={classNames(isSame ? 'hidden' : 'block')}>~</p>
        <div className={classNames(isSame ? 'hidden' : 'block')}>
          <Price currencyCode={priceRange.maxVariantPrice.currencyCode} amount={priceRange.maxVariantPrice.amount} />
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;
