'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiBars3 } from 'react-icons/hi2';
import IconButton from '@/components/IconButton';
import { localTheme } from '@/theme/local-theme';
import { useSetPortalRecoil } from '@/hooks/portal-hooks';
import { useGetDictioanry } from '@/hooks/locale-hooks';
const MenuIconTrigger = () => {
  const { activate } = useSetPortalRecoil('menu-drawer');
  const dictionary = useGetDictioanry().menu.MenuTrigger;

  return (
    <IconButton
      srName="Open menu"
      className={classNames(localTheme.text.color.base.main, localTheme.text.color.base.hover, 'p-2')}
      onClick={() => activate()}
    >
      <HiBars3 className={classNames('h-5 w-5 flex-shrink-0')} aria-hidden="true" />
      <span className="sr-only">{dictionary.sr}</span>
    </IconButton>
  );
};

export default MenuIconTrigger;
