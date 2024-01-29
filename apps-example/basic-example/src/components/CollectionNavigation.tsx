import { getCollections } from '@/services/collection/service';
import { classNames } from '@marulloc/components-library/utils';

import CollectionLink from './CollectionLink';

const CollectionNavigation = async () => {
  const collections = await getCollections();

  return (
    <>
      <nav className=" mt-0 md:mt-14  mb-8 ">
        <div className="pt-0.5 mb-4">
          <p className="text-xs text-zinc-400">All Collections</p>
        </div>

        <ul
          className={classNames(
            'flex flex-row md:flex-col gap-6 md:gap-2  ',
            'w-full overflow-auto hide-scrollbar',

            'bg-zinc-800 md:bg-transparent p-2 md:p-0',
            'rounded-lg',
          )}
        >
          <li>
            <CollectionLink href="/search" title="All" handle="" />
          </li>

          {collections.map(({ handle, title, handleRoute }) => (
            <li key={`search-collection-list-${handle}`}>
              <CollectionLink href={handleRoute} title={title} handle={handle} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default CollectionNavigation;
