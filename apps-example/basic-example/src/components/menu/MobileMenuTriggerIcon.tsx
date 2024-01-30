import { classNames } from '@marulloc/components-library/utils';

import MobileMenu from './MobileMenu';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

type Props = {
  menu: Menu;
};
const MobileMenuTriggerIcon = ({ menu }: Props) => {
  return (
    <MobileMenu
      menu={menu}
      Trigger={
        <button className={classNames('rounded-lg text-zinc-400 p-1.5')}>
          <Bars3BottomLeftIcon className="w-6 h-6" />
        </button>
      }
    />
  );
};

export default MobileMenuTriggerIcon;
