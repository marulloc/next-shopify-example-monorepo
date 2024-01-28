import { classNames } from '@/styles/utils';
import MobileMenu from './MobileMenu';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

const MobileMenuTriggerIcon = () => {
  return (
    <MobileMenu
      Trigger={
        <button className={classNames('rounded-lg text-zinc-400 p-1.5')}>
          <Bars3BottomLeftIcon className="w-6 h-6" />
        </button>
      }
    />
  );
};

export default MobileMenuTriggerIcon;
