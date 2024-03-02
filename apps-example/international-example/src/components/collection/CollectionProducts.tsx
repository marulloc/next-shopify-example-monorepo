import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getCollectionProducts } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import Skeleton from '@/components/loading/Skeleton';
import SortingDropdown from '@/components/search/SortingDropdown';
import { TDictionaries, getDictionary } from '@/dictionaries';
import { dictionaryReplacer } from '@/dictionaries/utils';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import ProductList from '../_draft/ProductList';
import Typography from '../_draft/Typography';

type TProps = {
  collection: string;
  sort: ToolkitSortKey;
  locale: { country: string; language: string };
};
const CollectionProducts = async ({ collection: handle, sort: sortKey, locale }: TProps) => {
  const [products, dict] = await Promise.all([
    getCollectionProducts({ collection: handle, locale }),
    getDictionary(locale.language as TDictionaries),
  ]);
  const dictionary = dict.collection.CollectionProducts;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-end md:justify-between  text-right md:text-left ">
        <Typography as="h2" color="default-muted" size="sm" noWarn className={classNames('mb-4 ')}>
          {dictionaryReplacer(dictionary.p, [{ target: 'number', replace: products.length }])}
        </Typography>

        <div className="flex-shrink-0 flex  justify-end mb-4  py-1 -my-1 px-3 -mx-3 text-right md:text-left">
          <SortingDropdown />
        </div>
      </div>

      <ProductList products={products} variant="big" />
    </div>
  );
};

export default CollectionProducts;

export const CollectionProductsSkeleton = () => {
  return (
    <section className={classNames(localTheme.spacing.padding.x.medium, localTheme.spacing.padding.y.small)}>
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
