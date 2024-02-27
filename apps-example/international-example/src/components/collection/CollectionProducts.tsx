import { ToolkitSortKey } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getCollectionProducts } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import Skeleton from '@/components/loading/Skeleton';
import ProductCard from '@/components/product/ProductCard';
import SortingDropdown from '@/components/search/SortingDropdown';
import { TDictionaries, getDictionary } from '@/dictionaries';
import { dictionaryReplacer } from '@/dictionaries/utils';
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
  // await delay(1000);
  // const products = await getCollectionProducts({ collection: handle, sortKey, locale });
  // const dictionary = (await getDictionary(locale.language.toLowerCase() as TDictionaries)).collection
  //   .CollectionProducts;
  const [products, dict] = await Promise.all([
    getCollectionProducts({ collection: handle, locale }),
    getDictionary(locale.language as TDictionaries),
  ]);
  const dictionary = dict.collection.CollectionProducts;

  return (
    <section className={classNames(localTheme.spacing.padding.x.medium, localTheme.spacing.padding.y.small)}>
      <div className="flex flex-col md:flex-row justify-between  ">
        <div>
          <p className={classNames('mb-4', localTheme.text.color.base.muted, localTheme.text.size.small)}>
            {dictionaryReplacer(dictionary.p, [{ target: 'number', replace: products.length }])}
          </p>
        </div>

        <div className="flex-shrink-0 flex justify-start md:justify-end mb-4  py-1 -my-1 px-3 -mx-3">
          <SortingDropdown />
        </div>
      </div>

      <div>
        <ul className={classNames('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ', localTheme.spacing.gap.xy.small)}>
          {products.map((product) => (
            <li key={`collection-${handle}-product-card-${product.handle}`} className=" aspect-square">
              <Link href={product.handleRoute} key={`home-product-card-${product.handle}`}>
                <ProductCard variant="big" product={product} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
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
