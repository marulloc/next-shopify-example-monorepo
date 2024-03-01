import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { getProductRecommendations } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import ProductCard from '@/components/product/ProductCard';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import ScrollCarousel from '../ScrollCarousel';
import { delay } from '@/utils/asyncUtils';
import Skeleton from '@/components/loading/Skeleton';
import { TDictionary } from '@/dictionaries';
import Box from '../@common/semantic/Box';
import Typography from '../_draft/Typography';

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
    <Box as="div" level={0} className={classNames(localTheme.spacing.padding.xy.medium, ' ')}>
      <Typography as="h3" size="lg" className={classNames(localTheme.spacing.padding.b.small, 'font-bold')}>
        {dictionary.title}
      </Typography>

      <ScrollCarousel>
        {recommendations.map((recom) => (
          <Link
            href={recom.handleRoute}
            key={`${product.title}-recommendation-${recom.title}`}
            className=" h-52 sm:h-64 md:h-80 lg:h-96 aspect-square  "
            prefetch={false}
          >
            <ProductCard variant="big" product={recom} priceDefaultOpen={false} />
          </Link>
        ))}
      </ScrollCarousel>
    </Box>
  );
};

export default Recommendations;

export const RecommendationsSkeleton = () => {
  return (
    <div className={classNames(localTheme.spacing.padding.xy.medium, ' ')}>
      <div
        className={classNames(
          'overflow-auto  h-full w-full ',
          'relative flex flex-nowrap    ',
          localTheme.spacing.gap.x.medium,
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
