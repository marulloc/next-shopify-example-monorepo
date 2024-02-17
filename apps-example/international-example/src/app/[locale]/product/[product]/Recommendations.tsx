import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { getProductRecommendations } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import ProductCard from '@/components/product/ProductCard';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import Carousel from './Carousel';
import ScrollCarousel from './ScrollCarousel';

type TProps = {
  product: ToolkitProduct;
  locale: { country: string; language: string };
};

const Recommendations = async ({ product, locale }: TProps) => {
  const recommendations = await getProductRecommendations(product!.id, locale);

  return (
    <section className={classNames(localTheme.spacing.padding.xy.medium, ' ')}>
      <p className={classNames(localTheme.text.size.medium, localTheme.spacing.padding.b.small, 'font-bold')}>
        Recommendations
      </p>

      <ScrollCarousel>
        {recommendations.map((recom) => (
          <Link
            href={recom.handleRoute}
            key={`${product.title}-recommendation-${recom.title}`}
            className=" h-52 sm:h-64 md:h-80 lg:h-96 aspect-square  "
          >
            <ProductCard variant="big" product={recom} priceDefaultOpen />
          </Link>
        ))}
      </ScrollCarousel>
    </section>
  );
};

export default Recommendations;
