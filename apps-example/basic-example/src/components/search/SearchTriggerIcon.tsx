import { classNames } from '@marulloc/components-library/utils';

import Search from './Search';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchTriggerIcon = () => {
  return (
    <Search
      Trigger={
        <button className={classNames('rounded-lg text-zinc-400 p-1.5')}>
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      }
    />
  );
};

export default SearchTriggerIcon;
