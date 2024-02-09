'use client';

import { ToolkitMenu } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import Drawer from '@marulloc/components-library/Drawer';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineX } from 'react-icons/hi';
import { ToolkitCollection } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-collection';
import SearchFakeInputTrigger from '../search/triggers/SearchInputTrigger';

type Props = {
  Trigger: React.ReactNode;
  menu: ToolkitMenu;
  collections: ToolkitCollection[];
};

const MenuDrawer = ({ Trigger, menu, collections }: Props) => {
  return (
    <Drawer anchor="left">
      <Drawer.Trigger>
        {({ openDrawer }) => (
          <div onClick={() => openDrawer()}>
            <>{Trigger}</>
          </div>
        )}
      </Drawer.Trigger>

      <Drawer.Backdrop>
        {({}) => <div className={classNames('w-full h-full', '  bg-gray-400  bg-opacity-60 backdrop-blur-sm')}></div>}
      </Drawer.Backdrop>

      <Drawer.Contents>
        {({ isOpen, closeDrawer }) => (
          <div
            className={classNames(
              'pointer-events-auto w-screen  max-w-md  h-screen  overflow-hidden',
              'bg-gray-100 bg-opacity-90 backdrop-blur-sm',
              'border-r border-gray-200',
            )}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={classNames('px-4 py-4 sm:px-6', 'flex items-center justify-between ', 'bg-white')}>
                <div className="relative w-full" onClick={() => closeDrawer()}>
                  <SearchFakeInputTrigger />
                </div>
                <div className="ml-4 flex items-center">
                  <button
                    type="button"
                    className="relative   p-1 text-gray-400 bg-gray-100 hover:text-gray-500 border rounded-lg border-gray-500"
                    onClick={() => closeDrawer()}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close panel</span>
                    <HiOutlineX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Main */}
              <div className={classNames('flex-1 overflow-y-auto    ', 'px-4 py-4 sm:px-6')}>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="mt-2 flex flex-1 flex-col gap-y-14">
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-500">Menus</div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {[{ title: 'home', url: '/' }, ...menu].map(({ title, url }) => (
                          <li key={`side-menu-${title}`}>
                            <Link
                              href={url}
                              className={classNames(
                                'text-gray-700 hover:text-indigo-600  ',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                              )}
                            >
                              <span
                                className={classNames(
                                  'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                                )}
                              >
                                {(title[0] || 'c').toUpperCase()}
                              </span>
                              <span className="truncate">{title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-500">Collections</div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {collections.map((collection, index) => (
                          <li key={`sidemenu-collection-${collection.title}`}>
                            <Link
                              href={collection.handleRoute}
                              className={classNames(
                                'text-gray-700 hover:text-indigo-600  ',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                              )}
                            >
                              {collection.image || index < 3 ? (
                                <Image
                                  src={collection.image?.url || `/default/collection-${index + 1}.png`}
                                  alt={collection.image?.altText || `default-collection-${index + 1}`}
                                  width={collection.image?.width || 1200}
                                  height={collection.image?.height || 1200}
                                  className={classNames(
                                    'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                                  )}
                                />
                              ) : (
                                <span
                                  className={classNames(
                                    'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                                  )}
                                >
                                  {(collection.title[0] || 'c').toUpperCase()}
                                </span>
                              )}
                              <span className="truncate">{collection.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Footer */}
              <div className={classNames('px-6 py-6', 'bg-white')}>
                <div className="  flex items-center  ">
                  <Image
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="block  w-5 h-5 rounded-full border border-gray-300 shadow-2xl flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium ">Change Locale</span>
                  <span className="sr-only">, change currency</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer.Contents>
    </Drawer>
  );
};

export default MenuDrawer;
