import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getProductsSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/search/service';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import SortingDropdown from './SortingDropdown';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import SearchFakeInputTrigger from '@/components/search/triggers/SearchInputTrigger';

type TParams = { locale: string };
type TSearchParams = { [key: string]: string | string[] | undefined };

const SearchPage = async ({ params, searchParams }: { params: TParams; searchParams?: TSearchParams }) => {
  const { sort, query, filter } = searchParams as { [key: string]: string };
  const { countryCode, languageCode } = splitLocale(params.locale);

  const products = await getProductsSearch({
    query,
    sortKey: sort as ToolkitSortKey,
    filters: [],
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
        <div className="w-full rounded-xl bg-gray-50 bg-opacity-80">
          <SearchFakeInputTrigger />
        </div>
      </div>

      <div className={classNames(localTheme.spacing.padding.x.medium, localTheme.spacing.padding.y.small)}>
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
          <ul
            className={classNames('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ', localTheme.spacing.gap.xy.small)}
          >
            {products.map((product) => (
              <li key={`product-card-${product.handle}`} className=" aspect-square">
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

export default SearchPage;
