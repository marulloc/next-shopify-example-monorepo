import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getProductsSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/search/service';
import Skeleton from '@/components/loading/Skeleton';
import ProductCard from '@/components/product/ProductCard';
import SortingDropdown from '@/components/search/SortingDropdown';
import { localTheme } from '@/theme/local-theme';
import { delay } from '@/utils/throttle';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';

type TProps = {
  query: string;
  sort: ToolkitSortKey;
  locale: { country: string; language: string };
};
const SearchResult = async ({ query, sort: sortKey, locale }: TProps) => {
  await delay(1000);
  const products = await getProductsSearch({ query, sortKey, filters: [], locale });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <p className={classNames('mb-4', localTheme.text.color.base.muted, localTheme.text.size.small)}>
            {`Showing ${products.length} ${'products'} for `}
            <span className={classNames('font-bold', localTheme.text.color.base.main, localTheme.text.size.small)}>
              &quot;{query}&quot;
            </span>
          </p>
        </div>

        <div className="flex-shrink-0 flex justify-start md:justify-end mb-4  py-1 -my-1 px-3 -mx-3">
          <SortingDropdown />
        </div>
      </div>

      <div>
        <ul className={classNames('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ', localTheme.spacing.gap.xy.small)}>
          {products.map((product) => (
            <li key={`product-card-${product.handle}`} className=" aspect-square">
              <Link href={product.handleRoute} key={`home-product-card-${product.handle}`}>
                <ProductCard variant="big" product={product} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchResult;

export const SearchResultSkeleton = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        <div className={classNames('mb-4', 'w-1/3 h-3 sm:h-5')}>
          <Skeleton />
        </div>
      </div>

      <div>
        <ul className={classNames('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ', localTheme.spacing.gap.xy.small)}>
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
    </>
  );
};
