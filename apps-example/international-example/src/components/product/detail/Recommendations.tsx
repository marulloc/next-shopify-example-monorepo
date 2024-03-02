import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { getProductRecommendations } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import ProductCard from '@/components/product/ProductCard';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import AutoScrollCarousel from '../../AutoScrollCarousel';
import Skeleton from '@/components/loading/Skeleton';
import { TDictionary } from '@/dictionaries';
import Typography from '../../Typography';

type TProps = {
  product: ToolkitProduct;
  dict: TDictionary['product'];
  locale: { country: string; language: string };
};

const Recommendations = async ({ product, dict, locale }: TProps) => {
  const recommendations = await getProductRecommendations(product!.id, locale);
  const dictionary = dict?.Recommendations;

  // await delay(2000);

  return (
    <div>
      <Typography as="h3" size="lg" className={classNames('pb-2 sm:pb-4 md:pb-6', 'font-bold')}>
        {dictionary.title}
      </Typography>

      <AutoScrollCarousel>
        {recommendations.map((recom) => (
          <Link
            href={recom.handleRoute}
            key={`${product.title}-recommendation-${recom.title}`}
            className="h-56 sm:h-64  md:h-72  aspect-square "
            prefetch={false}
          >
            <ProductCard variant="big" product={recom} priceDefaultOpen={false} />
          </Link>
        ))}
      </AutoScrollCarousel>
    </div>
  );
};

export default Recommendations;

export const RecommendationsSkeleton = () => {
  return (
    <div className={classNames('p-4 sm:p-6 md:p-8', ' ')}>
      <div
        className={classNames(
          'overflow-auto  h-full w-full ',
          'relative flex flex-nowrap    ',
          'gap-x-4 sm:gap-x-6 md:gap-x-8',
          'hide-scrollbar',
        )}
      >
        <div className=" h-52 sm:h-64 md:h-80 lg:h-96 aspect-square  ">
          <Skeleton />
        </div>

        <div className=" h-52 sm:h-64 md:h-80 lg:h-96 aspect-square  ">
          <Skeleton />
        </div>
        <div className=" h-52 sm:h-64 md:h-80 lg:h-96 aspect-square  ">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};
