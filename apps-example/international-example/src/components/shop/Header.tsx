import { classNames } from '@marulloc/components-library/utils';
import MenuIconTrigger from '../menu/MenuDrawer/triggers/MenuIconTrigger';
import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';
import SearchIconTrigger from '../search/SearchModal/triggers/SearchIconTrigger';
import Logo from '../Logo';
import CartIconTrigger from '../cart/CartDrawer/triggers/CartIconTrigger';
import SemanticBox from '@/components/_draft/SemanticBox';

type Props = {
  locale?: ShopifyLocaleContext;
};

const Header = async ({ locale }: Props) => {
  return (
    <SemanticBox
      as="header"
      fill="glassy-default-muted"
      p={{ dir: 'x', size: 'md' }}
      className={classNames('border-b border-default-base  ', 'isolate sticky top-0 w-full z-30')}
    >
      <nav>
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
    </SemanticBox>
  );
};

export default Header;
