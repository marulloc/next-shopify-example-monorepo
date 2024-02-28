import { getProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import Description from '@/components/product/Description';
import ImageGallery from '@/components/product/ImageGallery';
import ProductOptions from '@/components/product/ProductOptions';
import Recommendations, { RecommendationsSkeleton } from '@/components/product/Recommendations';
import { TDictionaries, getDictionary } from '@/dictionaries';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { delay } from '@/utils/asyncUtils';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata, ServerRuntime } from 'next';
import { Suspense } from 'react';

export const runtime: ServerRuntime = 'edge';

type TParams = { locale: string; product: string };

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);
  const { product: handle } = params;

  const [shopInfo, product] = await Promise.all([
    getShopInfo({ country, language }),
    getProduct(handle, { country, language }),
  ]);

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
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);
  const { product: handle } = params;

  const [product, dict] = await Promise.all([
    getProduct(handle, { country, language }),
    getDictionary(language as TDictionaries),
  ]);
  const dictionary = dict.product;

  return (
    <main className={classNames(' relative min-h-screen  ')}>
      <div className="flex flex-col lg:flex-row">
        <h1 className="sr-only">{product.title}</h1>

        <div className={classNames('h-full flex-1 lg:border-r', localTheme.border.base.main)}>
          <section className={classNames(localTheme.border.base.main + ' border-b')}>
            <ImageGallery product={product} />
          </section>

          {/* lg- block */}
          <section className={classNames('block lg:hidden bg-white ', localTheme.border.base.main + ' border-b')}>
            <ProductOptions product={product} dict={dictionary} />
          </section>

          <section className={classNames()}>
            <Description product={product} dict={dictionary} />
          </section>
        </div>

        {/* lg+ block */}
        <div className="pb-4 sm:pb-6 lg:pb-8 max-w-[500px]">
          <section className={classNames(' hidden lg:block sticky top-24 flex-shrink-0  ')}>
            <ProductOptions product={product} dict={dictionary} />
          </section>
        </div>
      </div>

      <aside className={classNames('border-t ', localTheme.border.base.main)}>
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations locale={{ country, language }} product={product} dict={dictionary} />
        </Suspense>
      </aside>
    </main>
  );
};

export default ProductPage;
