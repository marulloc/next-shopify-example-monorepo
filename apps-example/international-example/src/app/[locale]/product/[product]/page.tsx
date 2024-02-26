import { getProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import Description, { DescriptionSkeleton } from '@/components/product/Description';
import ImageGallery, { ImageGallerySkeleton } from '@/components/product/ImageGallery';
import ProductOptions, { ProductOptionsSkeleton } from '@/components/product/ProductOptions';
import Recommendations, { RecommendationsSkeleton } from '@/components/product/Recommendations';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { delay } from '@/utils/throttle';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata } from 'next';
import { Suspense } from 'react';

type TParams = { locale: string; product: string };

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { product: handle } = params;

  const product = await getProduct(handle, { country: countryCode, language: languageCode });
  const shopInfo = await getShopInfo({ country: countryCode, language: languageCode });

  return {
    metadataBase: new URL('http://localhost:3000'),
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.featuredImage?.url || shopInfo.brand.coverImage.image.url,
          width: product.featuredImage?.width || shopInfo.brand.coverImage.image.width,
          height: product.featuredImage?.height || shopInfo.brand.coverImage.image.height,
        },
      ],
    },
  };
};

const ProductPage = async ({ params }: { params: TParams }) => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { product: handle } = params;

  return (
    <main className={classNames(' relative min-h-screen  ')}>
      <div className="flex flex-col lg:flex-row">
        <div className={classNames('h-full flex-1 lg:border-r', localTheme.border.base.main)}>
          <section
            className={classNames(
              'block',
              localTheme.fill.base.main + ' bg-opacity-40 backdrop-blur-sm',
              localTheme.border.base.main + ' border-b',
            )}
          >
            <Suspense fallback={<ImageGallerySkeleton />}>
              <ImageGallery handle={handle} locale={{ country: countryCode, language: languageCode }} />
            </Suspense>
          </section>

          <section
            className={classNames(
              'block lg:hidden ',
              localTheme.fill.base.main + ' bg-opacity-40 backdrop-blur-sm',
              localTheme.border.base.main + ' border-b',
            )}
          >
            <Suspense fallback={<ProductOptionsSkeleton />}>
              <ProductOptions handle={handle} locale={{ country: countryCode, language: languageCode }} />
            </Suspense>
          </section>

          <section className={classNames()}>
            <Suspense fallback={<DescriptionSkeleton />}>
              <Description handle={handle} locale={{ country: countryCode, language: languageCode }} />
            </Suspense>
          </section>
        </div>

        <div>
          <section className={classNames(' hidden lg:block sticky top-16 flex-shrink-0')}>
            <Suspense fallback={<ProductOptionsSkeleton />}>
              <ProductOptions handle={handle} locale={{ country: countryCode, language: languageCode }} />
            </Suspense>
          </section>
        </div>
      </div>

      <section className={classNames('border-t ', localTheme.border.base.main)}>
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations handle={handle} locale={{ country: countryCode, language: languageCode }} />
        </Suspense>
      </section>
    </main>
  );
};

export default ProductPage;
