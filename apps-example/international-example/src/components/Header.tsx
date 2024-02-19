import { Fragment, useState } from 'react';
import { classNames } from '@marulloc/components-library/utils';
import { HiMenu, HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi';
import CartTriggerIcon from './cart/triggers/CartIconTrigger';
import MenuIconTrigger from './menu/triggers/MenuIconTrigger';
import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';
import { getLocale, getMenu } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import SearchIconTrigger from './search/triggers/SearchIconTrigger';
import Logo from './Logo';
import { localTheme } from '@/theme/local-theme';

type Props = {
  locale?: ShopifyLocaleContext;
};

const Header = async ({ locale }: Props) => {
  const menu = await getMenu('custom-storefront-menu', { country: locale?.country, language: locale?.language });
  const collections = await getCollections({ country: locale?.country, language: locale?.language });
  const localeData = await getLocale();

  return (
    <div className=" isolate fixed top-0 w-full z-30 ">
      <header
        className={classNames(
          localTheme.spacing.container,
          localTheme.fill.base.main,
          localTheme.border.base.main,
          'border-b',
          'bg-opacity-40 backdrop-blur-sm',
        )}
      >
        <nav aria-label="Top">
          {/* Secondary navigation */}
          <div className="  ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className=" ">
                <div className="flex h-16 items-center justify-between">
                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center -ml-2">
                    <MenuIconTrigger menu={menu} collections={collections} localeData={localeData} />
                    <Logo country={locale?.country} language={locale?.language} />
                  </div>

                  <div className="flex flex-1 items-center justify-end -mr-2">
                    <div className=" ">
                      <SearchIconTrigger />
                    </div>

                    <div className=" ml-1 ">
                      <CartTriggerIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
