import { getCollectionProducts, getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import CollectionCard from '@/components/collection/CollectionCard';
import ProductCard from '@/components/product/ProductCard';
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
    <main className={classNames(localTheme.fill.base.main, localTheme.spacing.container, 'shadow-xl')}>
      {/* Hero */}
      <section className="relative max-h-screen ">
        <div className="absolute inset-0">
          <Image
            src="/default/information.png"
            alt={'home-page-hero'}
            width={1400}
            height={1000}
            className="h-full w-full object-cover object-center"
          />
          <div
            className={classNames('absolute w-full h-1/4 bottom-0', 'bg-gradient-to-t from-gray-100 via-gray-100')}
          />
          <div className={classNames('absolute inset-0', localTheme.fill.base.main, 'bg-opacity-30 ')} />
        </div>

        <div className="relative px-20 py-64 sm:py-80 w-full h-full  ">
          <div className=" w-full max-w-md h-full text-center">
            <h2
              id="comfort-heading"
              className={classNames(
                'font-bold tracking-tight',
                localTheme.text.size.extraLarge,
                localTheme.text.color.base.main,
              )}
            >
              {shopInfo.name}
            </h2>
            <p
              className={classNames(
                'mt-8 tracking-tight ',
                localTheme.text.size.medium,
                localTheme.text.color.base.muted,
              )}
            >
              {shopInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section aria-labelledby="collection-heading" className={classNames(' ', localTheme.spacing.padding.x.medium)}>
        <h2
          id="collection-heading"
          className={classNames(
            'font-bold tracking-tight',
            localTheme.text.size.large,
            localTheme.text.color.base.main,
          )}
        >
          Collections
        </h2>

        <div className={classNames('mt-4 grid grid-cols-3', localTheme.spacing.gap.xy.medium)}>
          {collections.map((collection, index) => (
            <Link key={`home-${collection.title}`} href={collection.handleRoute} className="group block">
              <CollectionCard variant="big" collection={collection} index={index} />
            </Link>
          ))}
        </div>
      </section>

      {/* Trends */}
      <section aria-labelledby="category-heading" className={classNames('mt-40 ', localTheme.spacing.padding.x.medium)}>
        <div className="flex justify-between items-center">
          <h2
            id="category-heading"
            className={classNames(
              'font-bold tracking-tight',
              localTheme.text.size.large,
              localTheme.text.color.base.main,
            )}
          >
            Trends
          </h2>
          <Link
            href="#"
            className={classNames(
              'font-semibold',
              localTheme.text.size.small,
              localTheme.text.color.primary.main,
              localTheme.text.color.primary.hover,
            )}
          >
            Browse all products
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-4 ">
          <div className="relative  ">
            <ul
              className={classNames(
                'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ',
                localTheme.spacing.gap.xy.medium,
              )}
            >
              {products.map((product) => (
                <li key={`home-product-${product.title}`}>
                  <Link
                    href={product.handleRoute}
                    className={classNames('relative w-full aspect-square hover:shadow-md rounded-lg ')}
                  >
                    <ProductCard variant="big" product={product} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Information */}
      <section className="relative  mt-24  ">
        <div className="absolute inset-0 group   ">
          <Image
            src={shopInfo.brand.coverImage.image.url}
            alt={shopInfo.brand.coverImage.image.altText}
            width={shopInfo.brand.coverImage.image.width}
            height={shopInfo.brand.coverImage.image.height}
            className="h-full w-full object-cover object-right-top  "
          />

          <div className="absolute w-full h-1/4 top-0 bg-gradient-to-b from-gray-100 via-gray-100" />
          <div className={classNames('absolute inset-0', localTheme.fill.base.main, 'bg-opacity-30 ')} />
        </div>

        <div className=" relative mx-auto max-w-7xl px-20 py-44  w-full h-full  ">
          <h2
            id="comfort-heading"
            className={classNames(
              'font-bold tracking-tight',
              localTheme.text.size.extraLarge,
              localTheme.text.color.base.main,
            )}
          >
            International Examples
          </h2>
          <p
            className={classNames(
              'mt-8 tracking-tight ',
              localTheme.text.size.medium,
              localTheme.text.color.base.muted,
            )}
          >
            example of {countryCode}-{languageCode}
          </p>
          <div className="  ">
            <a
              href="https://github.com/marulloc/Marulloc-shopify-headless-monorepo/tree/master"
              className={classNames(
                'mt-8 inline-block px-4 py-2 rounded-lg ',
                localTheme.text.size.small,
                localTheme.text.color.base.contrast,
                localTheme.fill.primary.muted,
                localTheme.fill.primary.hover,
              )}
            >
              View Code
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
