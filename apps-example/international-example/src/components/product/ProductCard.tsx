import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import ProductPrice from '../ProductPrice';
import Image from 'next/image';

type Props = {
  variant: 'small' | 'big';
} & { product: ToolkitProduct };

const ProductCard = ({ variant, product }: Props) => {
  switch (variant) {
    case 'small':
      return <SmallProductCard product={product} />;

    default:
    case 'big':
      return <BigProductCard product={product} />;
  }
};

export default ProductCard;

const SmallProductCard = ({ product }: Omit<Props, 'variant'>) => {
  return (
    <>
      {}
      {/*  */}
    </>
  );
};

const BigProductCard = ({ product }: Omit<Props, 'variant'>) => {
  return (
    <div className="relative group h-full rounded-lg overflow-hidden   ">
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
            className="group-hover:scale-110 transition-all duration-300 w-full h-full"
          />
        ) : (
          <>NO IMAGE</>
        )}
      </div>

      <div
        className={classNames(
          'absolute bottom-0 h-1/2 w-full rounded-none z-30',
          'transform transition-all  duration-500',
          'group-hover:visible invisible',
          'group-hover:translate-y-0 translate-y-full',
          'bg-gradient-to-t  from-gray-50 bg-opacity-90',
        )}
      >
        <div className=" h-full p-4 flex flex-col justify-end items-end">
          <p className={classNames(localTheme.text.size.small, localTheme.text.color.base.main)}>{product.title}</p>
          <ProductPrice
            priceRange={product.priceRange}
            className={classNames(localTheme.text.size.small, localTheme.text.color.primary.main)}
          />
        </div>
      </div>
    </div>
  );
};
