import { getProduct, getProductRecommendations } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata } from 'next';
import ImageGallery from './ImageGallery';
import Description from './Description';
import Recommendations from './Recommendations';
import ProductOptions from './ProductOptions';

type TParams = { locale: string; product: string };

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { product: handle } = params;

  const product = await getProduct(handle, { country: countryCode, language: languageCode });

  return {};
};

const ProductPage = async ({ params }: { params: TParams }) => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { product: handle } = params;

  const product = await getProduct(handle, { country: countryCode, language: languageCode });
  const recommendations = await getProductRecommendations(product!.id, {
    country: countryCode,
    language: languageCode,
  });

  return (
    <main className={classNames('   ')}>
      <div className="flex flex-col md:flex-row">
        <div className={classNames('h-full flex-1 md:border-r', localTheme.border.base.main)}>
          <section
            id="image-gallery-section"
            className={classNames(
              'block md:sticky top-16',
              localTheme.fill.base.main,
              localTheme.border.base.main,
              'bg-opacity-40 backdrop-blur-sm',
              'border-b ',
              localTheme.border.base.main,
            )}
          >
            <ImageGallery product={product} />
          </section>

          <div
            id="mobile-product-variant-selector"
            className={classNames(
              'block md:hidden sticky top-16',
              localTheme.fill.base.main,
              localTheme.border.base.main,
              'bg-opacity-40 backdrop-blur-sm',
              'border-b',
              localTheme.border.base.main,
            )}
          >
            <ProductOptions product={product} />
          </div>

          <section
            id="product-description-section"
            className={classNames(
              'h-screen', //test
            )}
          >
            <Description product={product} />
          </section>
        </div>

        <div>
          <div id="product-variant-selector" className={classNames(' hidden md:block sticky top-16 flex-shrink-0')}>
            <ProductOptions product={product} />
          </div>
        </div>
      </div>

      <div>
        {/* ToDo Fix : Border Collpase */}
        <section
          id="product-recommendation-section"
          className={classNames(
            'h-screen', //test
            'border-t ',
            localTheme.border.base.main,
          )}
        >
          <Recommendations product={product} />
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
