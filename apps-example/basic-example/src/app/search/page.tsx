import ProductCard from '@/components/ProductCard';
import { getProductsSearch } from '@/services/search/service';
import { theme } from '@/styles/theme';
import { classNames } from '@/styles/utils';
import Link from 'next/link';
import Sort from '../../components/Sort';
import { SortKey } from '@/services/search/type';
import SearchTriggerInput from '@/components/search/SearchTriggerInput';

const Page = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  const { sort, query, filter } = searchParams as { [key: string]: string };

  const products = await getProductsSearch({ query, sortKey: sort as SortKey, filters: [] });

  return (
    <div className=" ">
      <div className="mb-4">
        <SearchTriggerInput />
      </div>

      <div className="flex justify-between items-center">
        <p className="mb-4 text-xs text-gray-400 ">
          {`Showing ${products.length} ${'products'} for `}
          <span className="font-bold text-gray-200">&quot;{query}&quot;</span>
        </p>

        <div className="flex-shrink-0 flex justify-end mb-4">
          <Sort />
        </div>
      </div>

      <div>
        <ul className="grid gap-4  grid-cols-2   lg:grid-cols-3">
          {products.map((product) => (
            <li
              key={`product-card-${product.handle}`}
              className={classNames(theme.mainBackground, 'w-full aspect-square')}
            >
              <Link href={product.handleRoute} key={`home-product-card-${product.handle}`}>
                <ProductCard product={product} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
