import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getProductsSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/search/service';
import Skeleton from '@/components/loading/Skeleton';
import SortingDropdown from '@/components/search/SortingDropdown';
import { TDictionaries, getDictionary } from '@/dictionaries';
import { dictionaryReplacer } from '@/dictionaries/utils';

import { classNames } from '@marulloc/components-library/utils';
import ProductList from '../_draft/ProductList';
import Typography from '../_draft/Typography';

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

  // await delay(2000);
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-end md:justify-between  text-right md:text-left ">
        <Typography as="h2" color="default-muted" size="sm" noWarn className={classNames('mb-4 ')}>
          {dictionaryReplacer(dictionary.summary, [
            { target: 'number', replace: products.length },
            {
              target: 'query',
              replace: <span className={classNames('font-bold', 'text-default-accent')}>&quot;{query}&quot;</span>,
            },
          ])}
        </Typography>

        <div className="flex-shrink-0 flex  justify-end mb-4  py-1 -my-1 px-3 -mx-3 text-right md:text-left">
          <SortingDropdown />
        </div>
      </div>

      <ProductList products={products} variant="big" />
    </div>
  );
};

export default SearchResult;

export const SearchResultSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className={classNames('mb-4', 'w-1/3 h-3 sm:h-5')}>
          <Skeleton />
        </div>
      </div>

      <div>
        <ul className={classNames('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ', 'gap-2 sm:gap-4 md:gap-6')}>
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
    </div>
  );
};
