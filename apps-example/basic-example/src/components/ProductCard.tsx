import { theme } from '@/styles/theme';
import { classNames } from '@/styles/utils';
import Image from 'next/image';
import ProductPrice from './ProductPrice';

type Props = { product: Product };

const ProductCard = ({ product }: Props) => {
  return (
    <div className="relative group h-full rounded-lg overflow-hidden   ">
      <div
        className={classNames(
          theme.mainBackground,
          'w-full aspect-square relative z-20',
          'text-zinc-200 flex justify-center items-center',
        )}
      >
        <Image
          fill
          alt={product.featuredImage?.altText || ''}
          src={product.featuredImage?.url}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          className="group-hover:scale-110 transition-all duration-300"
        />
      </div>

      <div
        className={classNames(
          'absolute   bottom-0 h-1/2 w-full rounded-none z-30',
          'transform transition-all  duration-300',
          'group-hover:visible invisible',
          'group-hover:translate-y-1 translate-y-full',
          'bg-gradient-to-t from-zinc-900 bg-opacity-50  ',
        )}
      >
        <div className=" h-full p-4 flex flex-col justify-end items-end">
          <p className="text-zinc-200">{product.title}</p>
          <ProductPrice priceRange={product.priceRange} className="text-teal-400" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
