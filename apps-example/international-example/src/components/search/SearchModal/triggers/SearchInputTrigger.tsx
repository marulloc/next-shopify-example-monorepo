'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import { useSyncDataUrl } from '@/hooks/useSyncDataUrl';
import { useSetPortalRecoil } from '@/hooks/portal-hooks';
import { useGetDictioanry } from '@/hooks/locale-hooks';
const SearchFakeInputTrigger = () => {
  const { activate } = useSetPortalRecoil('search-modal');
  const [{ query }] = useSyncDataUrl({ keys: ['query'], targetPathname: '/search' });
  const dictionary = useGetDictioanry().search.SearchFakeInputTrigger;

  return (
    <div className={classNames('isolate relative group cursor-text')} onClick={() => activate()}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <HiOutlineMagnifyingGlass
          className={classNames('h-5 w-5', 'group-hover:scale-110 text-default-accent')}
          aria-hidden="true"
        />
      </div>
      <input
        id="fake-search"
        name="search"
        placeholder={dictionary.placeholder}
        value={query || ''}
        onChange={() => {}}
        type="search"
        className={classNames(
          'block w-full',
          'rounded-lg bg-transparent',
          'text-xs ',
          'pl-10 pr-3 py-2',
          'border',
          'border-gray-300',
        )}
      />
      <span className="sr-only">{dictionary.sr}</span>
      <div className=" cursor-text absolute inset-0 z-10"></div>
    </div>
  );
};

export default SearchFakeInputTrigger;
