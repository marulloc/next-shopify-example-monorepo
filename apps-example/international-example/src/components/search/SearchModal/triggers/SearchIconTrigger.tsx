'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import IconButton from '@/components/IconButton';
import { localTheme } from '@/theme/local-theme';
import { useSetPortalRecoil } from '@/context/ui/hooks';

const SearchIconTrigger = () => {
  const { activate } = useSetPortalRecoil('search-modal');

  return (
    <IconButton
      srName="Search Items and Collections"
      className={classNames(localTheme.text.color.base.main, localTheme.text.color.base.hover, 'p-2')}
      onClick={() => activate()}
    >
      <HiOutlineMagnifyingGlass className="h-6 w-6" aria-hidden="true" />
    </IconButton>
  );
};

export default SearchIconTrigger;
