import { getProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import Description from '@/components/product/Description';
import ImageGallery from '@/components/product/ImageGallery';
import ProductOptions from '@/components/product/ProductOptions';
import Recommendations, { RecommendationsSkeleton } from '@/components/product/Recommendations';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata, ServerRuntime } from 'next';
import { Suspense } from 'react';

export const runtime: ServerRuntime = 'edge';

type TParams = { locale: string; product: string };

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { product: handle } = params;

  const product = await getProduct(handle, { country: countryCode, language: languageCode });
  const shopInfo = await getShopInfo({ country: countryCode, language: languageCode });

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      images: [
        {
          url: product.featuredImage?.url || shopInfo.brand.coverImage.image.url,
          alt: product.featuredImage?.altText || '',
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
            <ImageGallery handle={handle} locale={{ country: countryCode, language: languageCode }} />
          </section>

          <section
            className={classNames(
              'block lg:hidden ',
              localTheme.fill.base.main + ' bg-opacity-40 backdrop-blur-sm',
              localTheme.border.base.main + ' border-b',
            )}
          >
            <ProductOptions handle={handle} locale={{ country: countryCode, language: languageCode }} />
          </section>

          <section className={classNames()}>
            <Description handle={handle} locale={{ country: countryCode, language: languageCode }} />
          </section>
        </div>

        <div>
          <section className={classNames(' hidden lg:block sticky top-16 flex-shrink-0')}>
            <ProductOptions handle={handle} locale={{ country: countryCode, language: languageCode }} />
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
