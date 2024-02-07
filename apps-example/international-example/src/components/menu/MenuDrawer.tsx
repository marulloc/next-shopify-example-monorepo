'use client';

import { ToolkitMenu } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import Drawer from '@marulloc/components-library/Drawer';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';

type Props = {
  Trigger: React.ReactNode;
  menu: ToolkitMenu;
};

const MenuDrawer = ({ Trigger, menu }: Props) => {
  return (
    <Drawer anchor="bottom">
      <Drawer.Trigger>
        {({ openDrawer }) => (
          <div onClick={() => openDrawer()}>
            <>{Trigger}</>
          </div>
        )}
      </Drawer.Trigger>
      <Drawer.Backdrop>{() => <></>}</Drawer.Backdrop>

      <Drawer.Contents>
        {({ isOpen, closeDrawer }) => (
          <div className={classNames('bg-white bg-opacity-100 ', ' h-screen w-screen', 'p-6')}>
            <div className=" flex flex-col justify-between h-full">
              <div className="flex space-x-6 items-center justify-between">
                {/* Search */}
                <div className="relative w-full" onClick={() => closeDrawer()}>
                  <div className={classNames('isolate relative group')}>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <HiOutlineSearch
                        className={classNames(
                          'h-6 w-5',
                          'text-gray-600 group-hover:text-zinc-400 group-hover:scale-110',
                        )}
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="fake-search"
                      name="search"
                      placeholder="Search ..."
                      // defaultValue={defaultValue || searchParams.get('query') || ''}
                      type="search"
                      className={classNames(
                        'block w-full',
                        'rounded-lg',
                        'bg-transparent',
                        'border border-zinc-700',
                        'text-xs text-zinc-50',
                        'outline-none',
                        'pl-10 pr-3 py-2',
                        'focus-within:ring-1 ring-zinc-400 ring-inset',
                      )}
                    />
                  </div>
                  <div className=" cursor-text absolute inset-0 z-10"></div>
                </div>

                {/* Xbutton */}
                <button
                  className={classNames(
                    'group ',
                    'rounded-lg border border-gray-500 p-1',
                    ' hover:ring-1 ring-zinc-400 ring-inse  hover:text-gray-600 text-gray-900',
                  )}
                  onClick={() => closeDrawer()}
                >
                  <span className="sr-only">Close panel</span>
                  <HiOutlineX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="border-t border-gray-400 my-6" />

              <div className="flex-1  flex flex-col justify-between">
                <p className="text-lg font-medium text-gray-900 mb-3">Menu</p>
                <nav className=" flex-1 overflow-auto">
                  <ul className="  space-y-3">
                    {menu.map(({ title, url }) => (
                      <li
                        key={`side-menu-${title}`}
                        onClick={() => closeDrawer()}
                        className={classNames(
                          'hover:text-gray-600 text-gray-900',
                          'cursor-pointer',
                          'text-base',
                          ' group',
                        )}
                      >
                        <Link href={url} className="p-2 ">
                          <span>{title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="border-t border-gray-400 my-6" />

                <a href="#" className="  flex items-center  ">
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </Drawer.Contents>
    </Drawer>
  );
};

export default MenuDrawer;
