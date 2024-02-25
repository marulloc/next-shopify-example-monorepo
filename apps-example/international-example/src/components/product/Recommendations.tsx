import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { getProduct, getProductRecommendations } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import ProductCard from '@/components/product/ProductCard';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import ScrollCarousel from '../ScrollCarousel';
import { delay } from '@/utils/throttle';
import Skeleton from '@/components/loading/Skeleton';
import { TDictionaries, getDictionary } from '@/dictionaries';

type TProps = {
  product?: ToolkitProduct;
  handle: string;
  locale: { country: string; language: string };
};

const Recommendations = async ({ product: origin, handle, locale }: TProps) => {
  // await delay(3000);
  const product = await getProduct(handle, locale);
  const recommendations = await getProductRecommendations(product!.id, locale);
  const dictionary = await (
    await getDictionary(locale.language.toLowerCase() as TDictionaries)
  ).product.Recommendations;

  return (
    <div className={classNames(localTheme.spacing.padding.xy.medium, ' ')}>
      <p className={classNames(localTheme.text.size.medium, localTheme.spacing.padding.b.small, 'font-bold')}>
        {dictionary.title}
      </p>

      <ScrollCarousel>
        {recommendations.map((recom) => (
          <Link
            href={recom.handleRoute}
            key={`${product.title}-recommendation-${recom.title}`}
            className=" h-52 sm:h-64 md:h-80 lg:h-96 aspect-square  "
          >
            <ProductCard variant="big" product={recom} priceDefaultOpen={false} />
          </Link>
        ))}
      </ScrollCarousel>
    </div>
  );
};

export default Recommendations;

export const RecommendationsSkeleton = () => {
  return (
    <div className={classNames(localTheme.spacing.padding.xy.medium, ' ')}>
      <Skeleton />
    </div>
  );
};
