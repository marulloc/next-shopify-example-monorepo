import { classNames } from '@marulloc/components-library/utils';
import MenuDrawer from '../MenuDrawer';
import { HiBars3 } from 'react-icons/hi2';
import { ToolkitLocale, ToolkitMenu } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import { ToolkitCollection } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-collection';
import IconButton from '@/components/IconButton';
import { localTheme } from '@/theme/local-theme';

type Props = {
  menu: ToolkitMenu;
  collections: ToolkitCollection[];
  localeData: ToolkitLocale;
};
const MenuIconTrigger = ({ menu, collections, localeData }: Props) => {
  return (
    <MenuDrawer
      menu={menu}
      collections={collections}
      localeData={localeData}
      Trigger={
        <IconButton
          srName="Open menu"
          className={classNames(localTheme.text.color.base.main, localTheme.text.color.base.hover, 'p-2')}
        >
          <HiBars3 className={classNames('h-5 w-5 flex-shrink-0')} aria-hidden="true" />
        </IconButton>
      }
    />
  );
};

export default MenuIconTrigger;
