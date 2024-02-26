import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import ProductPrice from './ProductPrice';
import Image from 'next/image';

type Props = TSmallProductCardProps | TBigProductCardProps;

const ProductCard = ({ variant, product, ...rest }: Props) => {
  switch (variant) {
    case 'small':
      return <SmallProductCard product={product} />;

    default:
    case 'big':
      return <BigProductCard product={product} {...rest} />;
  }
};

export default ProductCard;

type TSmallProductCardProps = {
  variant: 'small';
  product: ToolkitProduct;
};
const SmallProductCard = ({ product }: Omit<Props, 'variant'>) => {
  return (
    <article className="group flex items-center  space-x-6">
      <div
        className={classNames(
          'aspect-square h-14 w-14 bg-gray-400 ',
          'rounded-lg flex justify-center items-center overflow-hidden',
          'border group-hover:border-indigo-600 group-hover:text-indigo-600',
        )}
      >
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url || ''}
            alt={product.featuredImage.altText || product.title}
            width={product.featuredImage.width || 0}
            height={product.featuredImage.height || 0}
            className="h-14 w-14 object-cover object-center"
            priority
          />
        )}
      </div>

      <div
        className={classNames(
          'text-base',
          'text-gray-600 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
        )}
      >
        <h2>{product.title}</h2>
        <div className={classNames('text-sm')}>
          <ProductPrice priceRange={product.priceRange} />
        </div>
      </div>
    </article>
  );
};

type TBigProductCardProps = {
  variant: 'big';
  product: ToolkitProduct;
  priceDefaultOpen?: boolean;
};

const BigProductCard = ({ product, priceDefaultOpen = false }: Omit<TBigProductCardProps, 'variant'>) => {
  return (
    <article className="relative group h-full rounded-lg overflow-hidden   ">
      <div
        className={classNames(
          'w-full h-full relative',
          'text-zinc-200 flex justify-center items-center',
          localTheme.fill.base.muted,
        )}
      >
        {product.featuredImage ? (
          <Image
            src={product.featuredImage?.url}
            alt={product.featuredImage?.altText || ''}
            width={product.featuredImage?.width}
            height={product.featuredImage?.height}
            className="h-full w-full object-cover object-center group-hover:scale-110  transition-all duration-300  "
          />
        ) : (
          <>NO IMAGE</>
        )}
      </div>

      <div
        className={classNames(
          'absolute bottom-0 h-1/2 w-full rounded-none z-10',
          'transform transition-all  duration-500',
          priceDefaultOpen ? '' : 'group-hover:visible invisible group-hover:translate-y-0 translate-y-full',

          'bg-gradient-to-t  from-gray-50 bg-opacity-90',
        )}
      >
        <div className=" h-full p-4 flex flex-col justify-end items-end">
          <h2 className={classNames(localTheme.text.size.small, localTheme.text.color.base.main)}>{product.title}</h2>
          <ProductPrice
            priceRange={product.priceRange}
            className={classNames(localTheme.text.size.small, localTheme.text.color.primary.main)}
          />
        </div>
      </div>
    </article>
  );
};
