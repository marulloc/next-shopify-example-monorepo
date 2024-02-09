import { classNames } from '@marulloc/components-library/utils';
import SearchModal from '../SearchModal';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchIconTrigger = () => {
  return (
    <SearchModal
      Trigger={
        <button type="button" className={classNames('rounded-lg text-zinc-400 p-1.5')}>
          <span className="sr-only">Search </span>
          <HiOutlineSearch className="h-6 w-6" aria-hidden="true" />
        </button>
      }
    />
  );
};

export default SearchIconTrigger;
