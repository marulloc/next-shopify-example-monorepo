'use client';

import { classNames } from '@marulloc/components-library/utils';
import SearchModal from '../SearchModal';
import { HiOutlineSearch } from 'react-icons/hi';
import { useSearchParams } from 'next/navigation';

const SearchFakeInputTrigger = () => {
  const searchParams = useSearchParams();

  return (
    <SearchModal
      Trigger={
        <div className={classNames('isolate relative group')}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <HiOutlineSearch
              className={classNames('h-6 w-5', 'text-gray-600 group-hover:text-zinc-400 group-hover:scale-110')}
              aria-hidden="true"
            />
          </div>
          <input
            id="fake-search"
            name="search"
            placeholder="Search ..."
            defaultValue={searchParams.get('query') || ''}
            type="search"
            className={classNames(
              'block w-full',
              'rounded-lg',
              'bg-transparent',
              'border border-zinc-700',
              'text-xs text-zinc-50',
              'outline-none',
              'pl-10 pr-3 py-2',
              'focus-within:ring-1 ring-zinc-400 ring-inset',
            )}
          />
          <span className="sr-only">Search </span>
          <div className=" cursor-text absolute inset-0 z-10"></div>
        </div>
      }
    />
  );
};

export default SearchFakeInputTrigger;
