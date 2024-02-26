import { classNames } from '@marulloc/components-library/utils';
import MenuIconTrigger from './menu/MenuDrawer/triggers/MenuIconTrigger';
import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';
import SearchIconTrigger from './search/SearchModal/triggers/SearchIconTrigger';
import Logo from './Logo';
import { localTheme } from '@/theme/local-theme';
import CartIconTrigger from './cart/CartDrawer/triggers/CartIconTrigger';

type Props = {
  locale?: ShopifyLocaleContext;
};

const Header = async ({ locale }: Props) => {
  return (
    <header className=" isolate sticky top-0 w-full z-30 ">
      <nav
        aria-label="Top"
        className={classNames(
          localTheme.spacing.container,
          localTheme.fill.base.main,
          localTheme.border.base.main,
          'border-b',
          'bg-opacity-40 backdrop-blur-sm',
          'px-4 sm:px-6 lg:px-8',
        )}
      >
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center -ml-2">
            <MenuIconTrigger />
            <Logo country={locale?.country} language={locale?.language} />
          </div>

          <div className="flex flex-1 items-center justify-end -mr-2">
            <div className=" ">
              <SearchIconTrigger />
            </div>

            <div className=" ml-1 ">
              <CartIconTrigger />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
