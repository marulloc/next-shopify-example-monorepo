import { classNames } from '@marulloc/components-library/utils';
import SearchModal from '../SearchModal';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import IconButton from '@/components/IconButton';
import { localTheme } from '@/theme/local-theme';

const SearchIconTrigger = () => {
  return (
    <SearchModal
      Trigger={
        <IconButton
          srName="Search Items and Collections"
          className={classNames(localTheme.text.color.base.main, localTheme.text.color.base.hover, 'p-2')}
        >
          <HiOutlineMagnifyingGlass className="h-6 w-6" aria-hidden="true" />
        </IconButton>
      }
    />
  );
};

export default SearchIconTrigger;
