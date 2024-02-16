import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { getProductRecommendations } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import ProductCard from '@/components/product/ProductCard';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';

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
      <ul className={classNames(localTheme.spacing.gap.x.small, 'flex  flex-nowrap overflow-auto h-80')}>
        {recommendations.map((recommendation) => (
          <li key={`${product.title}-recommendation-${recommendation.title}`} className="h-full aspect-square  ">
            <Link href={recommendation.handleRoute} className={classNames('relative w-full aspect-square ')}>
              <ProductCard variant="big" product={recommendation} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Recommendations;
