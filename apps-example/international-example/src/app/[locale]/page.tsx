import { getCollectionProducts, getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import Link from 'next/link';

const Home = async ({ params }: { params: { locale: string } }) => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const shopInfo = await getShopInfo({ country: countryCode, language: languageCode });

  const collections = await getCollections({ country: countryCode, language: languageCode });
  const products = await getCollectionProducts({
    collection: 'automated-collection',
    locale: { country: countryCode, language: languageCode },
  });

  return (
    <main className={classNames('max-w-7xl mx-auto shadow-xl', localTheme.fill.base.main)}>
      {/* Hero */}
      <section className="relative max-h-screen    ">
        <div className="absolute inset-0 group   ">
          <Image
            src="/default/information.png"
            alt={'home-page-hero'}
            width={1400}
            height={1000}
            className="h-full w-full object-cover object-center"
          />
          <div
            className={classNames('absolute w-full h-1/4 bottom-0 ', 'bg-gradient-to-t from-gray-100  via-gray-100  ')}
          />
          <div className={classNames('absolute inset-0', localTheme.fill.base.main, 'bg-opacity-30 ')} />
        </div>

        <div className="relative mx-auto max-w-7xl px-20 py-64 sm:py-80 w-full h-full  ">
          <div className=" w-full  md:w-[550px] h-full text-center">
            <h2
              id="comfort-heading"
              className={classNames('text-2xl sm:text-3xl font-bold tracking-tight', localTheme.text.color.base.main)}
            >
              {shopInfo.brand.slogan || 'Shopify Brand Slogan'}
            </h2>
            <p className={classNames('mt-8 text-sm md:text-lg ', localTheme.text.color.base.muted)}>
              {shopInfo.brand.shortDescription || 'Shopify Brand short Description'}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="collection-heading" className="mx-auto max-w-xl px-4    sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
          Collections
        </h2>

        <div className="mt-4 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
          {collections.map((collection, index) => (
            <Link key={`home-${collection.title}`} href={collection.handleRoute} className="group block">
              <div
                aria-hidden="true"
                className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5  opacity-90 border"
              >
                <Image
                  src={collection.image?.url || `/default/collection-${index + 1}.png`}
                  alt={collection.image?.altText || `default-collection-${index + 1}`}
                  width={collection.image?.width || 1200}
                  height={collection.image?.height || 1200}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">{collection.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{collection.description || `Shopify default collection`}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="category-heading" className="mt-24 xl:mx-auto xl:max-w-7xl xl:px-8">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
            Trends
          </h2>
          <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
            Browse all products
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content  py-2  ">
              <div
                className={classNames(
                  'grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-8  ',
                  'px-4 sm:px-6 lg:px-8    xl:px-0',
                )}
              >
                {products.map((product) => (
                  <Link
                    key={`home-${product.title}`}
                    href={product.handleRoute}
                    className={classNames(
                      'relative flex h-80 w-full flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto',
                      'border',
                    )}
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText}
                        width={product.featuredImage.width}
                        height={product.featuredImage.height}
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative max-h-screen  mt-24  ">
        <div className="absolute inset-0 group   ">
          <Image
            src={shopInfo.brand.coverImage.image.url}
            alt={shopInfo.brand.coverImage.image.altText}
            width={shopInfo.brand.coverImage.image.width}
            height={shopInfo.brand.coverImage.image.height}
            className="h-full w-full object-cover object-right-top  "
          />

          <div className="absolute w-full h-1/4 top-0 bg-gradient-to-b from-white via-white" />
          <div className="absolute inset-0  bg-white bg-opacity-30 "></div>
        </div>

        <div className=" relative mx-auto max-w-7xl px-20 py-44  w-full h-full  ">
          <h2 id="comfort-heading" className="text-xl lg:text-3xl font-bold tracking-tight text-gray-900  ">
            {shopInfo.name}
          </h2>
          <p className="mt-3  text-lg text-gray-900">{shopInfo.description}</p>
          <div className=" text-center">
            <a
              href="https://github.com/marulloc/Marulloc-shopify-headless-monorepo/tree/master"
              className=" text-center mt-12 inline-block  rounded-md border border-transparent   px-8 py-3  text-xs lg:text-sm font-medium text-gray-900 hover:bg-gray-700  "
            >
              View Code - Github
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
