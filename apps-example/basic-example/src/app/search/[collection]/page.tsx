import ProductCard from '@/components/ProductCard';
import { getCollection, getCollections } from '@/services/collection/service';
import { getProductsInCollectionSearch } from '@/services/search/service';
import { theme } from '@/styles/theme';
import { classNames } from '@marulloc/components-library/utils';

import Link from 'next/link';
import Sort from '../../../components/Sort';
import { SortKey } from '@/services/search/type';

export const runtime = 'edge';

const Page = async ({
  searchParams,
  params,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: { collection: string };
}) => {
  const { collection: handle } = params;
  const { sort, query, filter } = searchParams as { [key: string]: string };

  const collection = await getCollection(handle);
  const products = await getProductsInCollectionSearch({
    handle,
    sortKey: sort as SortKey,
    filters: [],
  });

  return (
    <div className="order-last min-h-screen w-full md:order-none">
      <div className="h-10   mb-4">
        <h1 className=" text-lg md:text-xl text-teal-400 font-semibold">{collection?.title}</h1>
      </div>

      <div className="flex justify-between items-center">
        <p className="mb-4 text-xs text-gray-400 ">
          {`Showing ${products.length} ${'products'} in `}
          <span className="font-bold text-gray-200">&quot;{collection?.title}&quot;</span>
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
