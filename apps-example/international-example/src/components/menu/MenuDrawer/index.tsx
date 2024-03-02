'use client';

import { ToolkitMenu } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import Drawer from '@marulloc/components-library/Drawer';
import { classNames } from '@marulloc/components-library/utils';
import Link from 'next/link';
import { HiXMark } from 'react-icons/hi2';
import { ToolkitCollection } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-collection';
import IconButton from '@/components/IconButton';
import SearchFakeInputTrigger from '@/components/search/SearchModal/triggers/SearchInputTrigger';
import InitialIcon from '@/components/InitialIcon';
import LocaleIconTrigger from '@/components/locale/LocaleSelectModal/triggers/LocaleSelectModalIconTrigger';
import { usePortalRecoil } from '@/hooks/portal-hooks';
import { useGetDictioanry } from '@/hooks/locale-hooks';
import GithubLink from './triggers/GithubLink';
import CollectionList from '@/components/_draft/CollectionList';
import Typography from '@/components/_draft/Typography';
import SemanticBox from '@/components/_draft/SemanticBox';

type Props = {
  menu: ToolkitMenu;
  collections: ToolkitCollection[];
};

const MenuDrawer = ({ menu, collections }: Props) => {
  const [{ isActive }, { deactivate }] = usePortalRecoil('menu-drawer');
  const dictionary = useGetDictioanry().menu.MenuDrawer;

  return (
    <Drawer anchor="left" open={isActive} onClose={() => deactivate()}>
      <Drawer.Backdrop>
        {({ closeDrawer }) => (
          <SemanticBox
            fill="glassy-backdrop"
            onClick={() => closeDrawer()}
            className={classNames('isolate w-full h-full')}
          />
        )}
      </Drawer.Backdrop>

      <Drawer.Contents>
        {({ isOpen, closeDrawer }) => (
          <aside
            className={classNames(
              'isolate w-screen max-w-md  h-screen overflow-hidden ',
              'flex flex-col  divide-y divide-gray-200',
            )}
          >
            <SemanticBox
              as="header"
              p={[{ dir: 'xy', size: 'sm' }]}
              fill="glassy-default-accent"
              className={classNames('flex items-center justify-between md:p-4 ')}
            >
              <h2 className="sr-only">Menu navigation panel</h2>
              <div className="relative w-full" onClick={() => closeDrawer()}>
                <SearchFakeInputTrigger />
              </div>
              <div className={classNames('ml-4 flex items-center border rounded-lg', 'border-default-muted')}>
                <IconButton
                  srName="close panel"
                  className={classNames('text-default-muted hover:text-default-accent')}
                  onClick={() => closeDrawer()}
                >
                  <HiXMark className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">{dictionary.closeBtn.sr}</span>
                </IconButton>
              </div>
            </SemanticBox>

            <SemanticBox
              as="section"
              fill="glassy-default-base"
              p={[{ dir: 'xy', size: 'sm' }]}
              className={classNames(' flex-1 overflow-y-auto md:p-4 ')}
            >
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="mt-2 flex flex-1 flex-col gap-y-14">
                  <li>
                    <Typography as="h4" size="xs" color="default-muted" className=" tracking-wider">
                      Menu
                    </Typography>
                    <div className="mt-2">
                      <ul role="list" className="space-y-4">
                        {[{ title: 'home', url: '/' }, ...menu].map(({ title, url }) => (
                          <li key={`side-menu-${title}`} className="py-1">
                            <Link
                              href={url}
                              className={classNames(
                                'text-default-base hover:text-primary-base  ',
                                'group flex gap-x-3 rounded-md items-center',
                              )}
                              onClick={() => closeDrawer()}
                            >
                              <InitialIcon initial={title[0] || 'c'} />
                              <Typography as="span" size="sm" noWarn className="truncate">
                                {title.toUpperCase()}
                              </Typography>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  <li>
                    <Typography as="h4" size="xs" color="default-muted" className=" tracking-wider">
                      Collections
                    </Typography>
                    <div className="mt-2">
                      <CollectionList
                        collections={collections}
                        variant="small"
                        subProps={{ Link: { onClick: closeDrawer } }}
                      />
                    </div>
                  </li>
                </ul>
              </nav>
            </SemanticBox>

            <SemanticBox
              as="footer"
              fill="glassy-default-accent"
              p={{ dir: 'xy', size: 'sm' }}
              className="md:p-4 divide-y divide-default-muted"
            >
              <div onClick={() => closeDrawer()}>
                <LocaleIconTrigger />
              </div>

              <div className={classNames('mt-2 pt-2', 'flex flex-col space-y-3 ')}>
                <GithubLink href="https://github.com/marulloc/Marulloc-shopify-headless-monorepo">
                  <span className=" ">{dictionary.githubMonorepoLink}</span>
                </GithubLink>

                <GithubLink href="https://github.com/marulloc/Marulloc-shopify-headless-monorepo/tree/master/apps-example/international-example">
                  <span className=" ">{dictionary.githubRepoLink}</span>
                </GithubLink>
              </div>
            </SemanticBox>
          </aside>
        )}
      </Drawer.Contents>
    </Drawer>
  );
};

export default MenuDrawer;
