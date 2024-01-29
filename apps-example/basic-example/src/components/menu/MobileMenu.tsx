'use client';

import { classNames } from '@/styles/utils';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SearchTriggerInput from '../search/SearchTriggerInput';
import Drawer from '@marulloc/components-library/Drawer';

type Props = {
  Trigger: React.ReactNode;
};

const MobileMenu = ({ Trigger }: Props) => {
  return (
    <Drawer anchor="bottom">
      <Drawer.Trigger>
        {({ openDrawer }) => (
          <div onClick={() => openDrawer()}>
            <>{Trigger}</>
          </div>
        )}
      </Drawer.Trigger>

      <Drawer.Contents>
        {({ isOpen, closeDrawer }) => (
          <div
            className={classNames(
              'bg-zinc-900 bg-opacity-90 backdrop-blur-md ',
              'h-screen w-screen',
              'p-6',
              'dark:text-white  ',
              'space-y-6',
            )}
          >
            <button
              onClick={() => closeDrawer()}
              className={classNames(
                'group',
                'h-10',
                'rounded-lg bg-zinc-800 border border-zinc-600',
                'p-2.5',
                'hover:ring-1 ring-zinc-400 ring-inse hover:text-zinc-100 text-zinc-300',
              )}
            >
              <XMarkIcon className={classNames('h-full w-auto', 'group-hover:scale-110')} />
            </button>

            <div onClick={(e) => closeDrawer()}>
              <SearchTriggerInput />
            </div>

            <nav>
              <ul className="  space-y-3">
                <li
                  onClick={() => closeDrawer()}
                  className={classNames(
                    'hover:text-zinc-100 text-zinc-300',
                    'cursor-pointer',
                    'text-base',
                    'p-2 group',
                  )}
                >
                  <span className=" ">All</span>
                </li>

                <li
                  onClick={() => closeDrawer()}
                  className={classNames(
                    'hover:text-zinc-100 text-zinc-300',
                    'cursor-pointer',
                    'text-base',
                    'p-2 group',
                  )}
                >
                  <span className=" ">Abstract</span>
                </li>

                <li
                  onClick={() => closeDrawer()}
                  className={classNames(
                    'hover:text-zinc-100 text-zinc-300',
                    'cursor-pointer',
                    'text-base',
                    'p-2 group',
                  )}
                >
                  <span className=" ">Landscape</span>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </Drawer.Contents>
    </Drawer>
  );
};

export default MobileMenu;
