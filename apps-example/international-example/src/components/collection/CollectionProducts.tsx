import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getCollection, getCollectionProducts } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import Skeleton from '@/components/loading/Skeleton';
import ProductCard from '@/components/product/ProductCard';
import SortingDropdown from '@/components/search/SortingDropdown';
import { localTheme } from '@/theme/local-theme';
import { delay } from '@/utils/throttle';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';

type TProps = {
  collection: string;
  sort: ToolkitSortKey;
  locale: { country: string; language: string };
};
const CollectionProducts = async ({ collection: handle, sort: sortKey, locale }: TProps) => {
  await delay(3000);

  const collection = await getCollection(handle, locale);
  const products = await getCollectionProducts({ collection: handle, sortKey, locale });

  return (
    <>
      <section
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
      </section>

      <section className={classNames(localTheme.spacing.padding.x.medium, localTheme.spacing.padding.y.small)}>
        <div className="flex flex-col md:flex-row justify-between  ">
          <div>
            <p className={classNames('mb-4', localTheme.text.color.base.muted, localTheme.text.size.small)}>
              {`Showing ${products.length} ${'products'} for Collection `}
              <span className={classNames('font-bold', localTheme.text.color.base.main, localTheme.text.size.small)}>
                &quot;{collection?.title}&quot;
              </span>
            </p>
          </div>

          <div className="flex-shrink-0 flex justify-start md:justify-end mb-4  py-1 -my-1 px-3 -mx-3">
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
      </section>
    </>
  );
};

export default CollectionProducts;

export const CollectionProductsSkeleton = () => {
  return (
    <>
      <section
        className={classNames(
          localTheme.spacing.padding.x.medium,
          localTheme.spacing.padding.y.small,
          localTheme.fill.base.main,
          localTheme.border.base.main,
          'border-b',
          'sticky top-16 z-20  ',
          'bg-opacity-40 backdrop-blur-sm',
        )}
      >
        <div className="w-1/5 h-3 sm:h-5">
          <Skeleton />
        </div>
      </section>
      <section className={classNames(localTheme.spacing.padding.x.medium, localTheme.spacing.padding.y.small)}>
        <div className="flex flex-col md:flex-row justify-between">
          <div className={classNames('mb-4', 'w-1/3 h-3 sm:h-5')}>
            <Skeleton />
          </div>
        </div>

        <div>
          <ul
            className={classNames('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ', localTheme.spacing.gap.xy.small)}
          >
            <li className=" aspect-square">
              <Skeleton />
            </li>

            <li className=" aspect-square">
              <Skeleton />
            </li>

            <li className=" aspect-square">
              <Skeleton />
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};
