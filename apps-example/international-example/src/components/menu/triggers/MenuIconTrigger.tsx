import { classNames } from '@marulloc/components-library/utils';
import MenuDrawer from '../MenuDrawer';
import { HiMenu } from 'react-icons/hi';
import { ToolkitMenu } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';

type Props = {
  menu: ToolkitMenu;
};
const MenuIconTrigger = ({ menu }: Props) => {
  return (
    <MenuDrawer
      menu={menu}
      Trigger={
        <button type="button" className={classNames('rounded-lg text-zinc-400 p-1.5')}>
          <span className="sr-only">Open menu</span>
          <HiMenu className="h-6 w-6" aria-hidden="true" />
        </button>
      }
    />
  );
};

export default MenuIconTrigger;
