'use client';

import { ToolkitLocale, ToolkitMenu } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import Drawer from '@marulloc/components-library/Drawer';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import { HiXMark } from 'react-icons/hi2';
import { ToolkitCollection } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-collection';
import SearchFakeInputTrigger from '../search/triggers/SearchInputTrigger';
import { localTheme } from '@/theme/local-theme';
import IconButton from '../IconButton';
import CollectionCard from '../collection/CollectionCard';
import AltImage from '../AltImage';
import { GrGithub } from 'react-icons/gr';
import LocaleIconTrigger from '../locale/triggers/LocaleIconTrigger';

type Props = {
  Trigger: React.ReactNode;
  menu: ToolkitMenu;
  collections: ToolkitCollection[];
  localeData: ToolkitLocale;
};

const MenuDrawer = ({ Trigger, menu, collections, localeData }: Props) => {
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
        {({ closeDrawer }) => (
          <div
            onClick={() => closeDrawer()}
            className={classNames('w-full h-full', 'bg-opacity-60 ', localTheme.fill.base.disabled)}
          />
        )}
      </Drawer.Backdrop>

      <Drawer.Contents>
        {({ isOpen, closeDrawer }) => (
          <div
            className={classNames(
              'pointer-events-auto w-screen  max-w-md  h-screen  overflow-hidden',
              'bg-opacity-80 backdrop-blur-md',
              localTheme.fill.base.main,
              'border-r border-gray-200',
            )}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={classNames('px-4 py-4 sm:px-6', 'flex items-center justify-between ', 'bg-white')}>
                <div className="relative w-full" onClick={() => closeDrawer()}>
                  <SearchFakeInputTrigger />
                </div>
                <div className={classNames('ml-4 flex items-center border rounded-lg', localTheme.border.base.main)}>
                  <IconButton
                    srName="close panel"
                    className={classNames(localTheme.text.color.base.muted, localTheme.text.color.base.hover)}
                    onClick={() => closeDrawer()}
                  >
                    <HiXMark className="h-6 w-6" aria-hidden="true" />
                  </IconButton>
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
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 ',
                              )}
                              onClick={() => closeDrawer()}
                            >
                              <AltImage initial={title[0] || 'c'} />
                              <span className="truncate">{title.toUpperCase()}</span>
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
                            <Link href={collection.handleRoute} className="block p-2" onClick={() => closeDrawer()}>
                              <CollectionCard variant="small" collection={collection} index={index} />
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
                <div onClick={() => closeDrawer()}>
                  <LocaleIconTrigger
                    locales={localeData.locales}
                    availableCountries={localeData.availableCountries}
                    availableLanguages={localeData.availableLanguages}
                  />
                </div>

                {/* TODO : Layout change */}
                <div className={classNames('mt-2 pt-2', 'flex flex-col space-y-3  border-t')}>
                  <Link
                    href="https://github.com/marulloc/Marulloc-shopify-headless-monorepo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block "
                  >
                    <div
                      className={classNames(
                        'text-gray-700 hover:text-indigo-600  ',
                        'group flex gap-x-3 rounded-md  text-sm leading-6',
                      )}
                    >
                      <div
                        className={classNames(
                          'h-6 w-6 overflow-hidden border border-gray-200 group-hover:border-indigo-600 rounded-lg ',
                          'flex justify-center items-center',
                        )}
                      >
                        <GrGithub className={classNames('  shrink-0 h-6 w-7      ')} />
                      </div>
                      <span className=" ">Go to Monorepo</span>
                    </div>
                  </Link>

                  <Link
                    href="https://github.com/marulloc/Marulloc-shopify-headless-monorepo/tree/master/apps-example/international-example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block "
                  >
                    <div
                      className={classNames(
                        'text-gray-700 hover:text-indigo-600  ',
                        'group flex gap-x-3 rounded-md  text-sm leading-6',
                      )}
                    >
                      <div
                        className={classNames(
                          'h-6 w-6 overflow-hidden border border-gray-200 group-hover:border-indigo-600 rounded-lg ',
                          'flex justify-center items-center',
                        )}
                      >
                        <GrGithub className={classNames('  shrink-0 h-7 w-7      ')} />
                      </div>
                      <span className=" ">Go to Example Repo</span>
                    </div>
                  </Link>
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
