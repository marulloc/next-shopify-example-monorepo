import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getCollection, getCollectionProducts } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import SortingDropdown from '../SortingDropdown';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { Metadata } from 'next';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';

type TParams = { locale: string; collection: string };
type TSearchParams = { [key: string]: string | string[] | undefined };

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { collection: handle } = params;

  const shopInfo = await getShopInfo({ country: countryCode, language: languageCode });
  const collection = await getCollection(handle, { country: countryCode, language: languageCode });

  return {
    title: collection.title,
    metadataBase: new URL('http://localhost:3000'),
    description: collection.description,
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: [
        {
          url: collection.image?.url || shopInfo.brand.coverImage.image.url,
          width: collection.image?.width || shopInfo.brand.coverImage.image.width,
          height: collection.image?.height || shopInfo.brand.coverImage.image.height,
        },
      ],
    },
  };
};

const CollectionPage = async ({ params, searchParams }: { params: TParams; searchParams?: TSearchParams }) => {
  const { sort, query, filter } = searchParams as { [key: string]: string };
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { collection: handle } = params;

  const collection = await getCollection(handle, { country: countryCode, language: languageCode });
  const products = await getCollectionProducts({
    collection: handle,
    sortKey: sort as ToolkitSortKey,
    locale: { country: countryCode, language: languageCode },
  });

  return (
    <main className={classNames()}>
      <div
        className={classNames(
          localTheme.spacing.padding.x.medium,
          localTheme.spacing.padding.y.small,
          localTheme.fill.base.main,
          localTheme.border.base.main,
          'border-b',
          'sticky top-16 z-20',
          'bg-opacity-40 backdrop-blur-sm',
        )}
      >
        {collection.title}
      </div>

      <div className={classNames(localTheme.spacing.padding.x.medium, localTheme.spacing.padding.y.small)}>
        <div className="flex justify-between items-center">
          <p className={classNames('mb-4', localTheme.text.color.base.muted, localTheme.text.size.small)}>
            {`Showing ${products.length} ${'products'} for Collection `}
            <span className={classNames('font-bold', localTheme.text.color.base.main, localTheme.text.size.small)}>
              &quot;{collection?.title}&quot;
            </span>
          </p>

          <div className="flex-shrink-0 flex justify-end mb-4">
            <SortingDropdown />
          </div>
        </div>
        <div>
          <ul
            className={classNames('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ', localTheme.spacing.gap.xy.small)}
          >
            {products.map((product) => (
              <li key={`collection-${collection.title}-product-card-${product.handle}`} className=" aspect-square">
                <Link href={product.handleRoute} key={`home-product-card-${product.handle}`}>
                  <ProductCard variant="big" product={product} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default CollectionPage;
