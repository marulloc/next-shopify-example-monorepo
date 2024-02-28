import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getProductsSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/search/service';
import Skeleton from '@/components/loading/Skeleton';
import ProductCard from '@/components/product/ProductCard';
import SortingDropdown from '@/components/search/SortingDropdown';
import { TDictionaries, getDictionary } from '@/dictionaries';
import { dictionaryReplacer } from '@/dictionaries/utils';
import { localTheme } from '@/theme/local-theme';
import { delay } from '@/utils/asyncUtils';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import Box from '../@common/semantic/Box';
import ProductList from '../_draft/ProductList';

type TProps = {
  query: string;
  sort: ToolkitSortKey;
  locale: { country: string; language: string };
};
const SearchResult = async ({ query, sort: sortKey, locale }: TProps) => {
  const [products, dict] = await Promise.all([
    getProductsSearch({ query, sortKey, filters: [], locale }),
    getDictionary(locale.language as TDictionaries),
  ]);
  const dictionary = dict.search.SearchResult;

  await delay(2000);
  return (
    <Box
      as="div"
      level={0}
      className={classNames(localTheme.spacing.padding.x.medium, localTheme.spacing.padding.y.small)}
    >
      <Box as="header" level={0} className="flex flex-col md:flex-row justify-between">
        <h2 className={classNames('mb-4', localTheme.text.color.base.muted, localTheme.text.size.small)}>
          {dictionaryReplacer(dictionary.summary, [
            { target: 'number', replace: products.length },
            {
              target: 'query',
              replace: (
                <span className={classNames('font-bold', localTheme.text.color.base.main)}>&quot;{query}&quot;</span>
              ),
            },
          ])}
        </h2>

        <div className="flex-shrink-0 flex justify-start md:justify-end mb-4  py-1 -my-1 px-3 -mx-3">
          <SortingDropdown />
        </div>
      </Box>

      <Box as="section" level={0}>
        <h3 className="sr-only">Search result</h3>
        <ProductList products={products} variant="big" />
      </Box>
    </Box>
  );
};

export default SearchResult;

export const SearchResultSkeleton = () => {
  return (
    <Box
      as="div"
      level={0}
      className={classNames(localTheme.spacing.padding.x.medium, localTheme.spacing.padding.y.small)}
    >
      <Box as="header" level={0} className="flex flex-col md:flex-row justify-between">
        <div className={classNames('mb-4', 'w-1/3 h-3 sm:h-5')}>
          <Skeleton />
        </div>
      </Box>

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
    </Box>
  );

  return (
    <section>
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
    </section>
  );
};
