import { classNames } from '@marulloc/components-library/utils';
import Link, { LinkProps } from 'next/link';
import ProductCard, { TPRoductCardProps } from './ProductCard';
import { ToolkitProduct } from '@marulloc/shopify-next-api/v24.01/@toolkit-types';

type TProductListProps = {
  products: ToolkitProduct[];
  variant: TPRoductCardProps['variant'];
  subProps?: {
    ul?: Omit<React.ComponentPropsWithoutRef<'ul'>, 'children'>;
    li?: Omit<React.ComponentPropsWithoutRef<'li'>, 'children'>;
    Link?: Omit<LinkProps, 'href' | 'children'>;
  };
};

const ProductList = ({ products, variant, subProps }: TProductListProps) => {
  const uniqueId = `id-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;

  const ulProps = subProps?.ul;
  const liProps = subProps?.li;
  const linkProps = subProps?.Link;

  const ulClassName =
    variant === 'big'
      ? classNames('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8', ulProps?.className)
      : classNames('space-y-4', ulProps?.className);
  const liClassName =
    variant === 'big' ? classNames('aspect-square', liProps?.className) : classNames('py-1', liProps?.className);

  return (
    <ul {...ulProps} className={ulClassName}>
      {products.map((product) => (
        <li key={`${uniqueId}-product-card-${product.handle}`} {...liProps} className={liClassName}>
          <Link href={product.handleRoute} {...linkProps}>
            <ProductCard variant={variant} product={product} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
