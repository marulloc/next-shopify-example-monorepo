import { classNames } from '@marulloc/components-library/utils';
import MenuIconTrigger from '../../components/menu/MenuDrawer/triggers/MenuIconTrigger';
import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';
import SearchIconTrigger from '../../components/search/SearchModal/triggers/SearchIconTrigger';
import Logo from '../../components/Logo';
import CartIconTrigger from '../../components/cart/CartDrawer/triggers/CartIconTrigger';
import Box from '@/components/@common/semantic/Box';

type Props = {
  locale?: ShopifyLocaleContext;
};

const Header = async ({ locale }: Props) => {
  return (
    <Box
      as="header"
      variant="glassy"
      level={1}
      className={classNames(
        'bg-white/40 bg-opacity-20 shadow-md',
        'isolate sticky top-0 w-full z-30',
        'px-4 sm:px-6 lg:px-8',
      )}
    >
      <Box as="nav" level={0}>
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
      </Box>
    </Box>
  );
};

export default Header;
