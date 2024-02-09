import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';
import Link from 'next/link';
import { localTheme } from '../theme/local-theme';

type Props = {
  country: ShopifyLocaleContext['country'];
  language: ShopifyLocaleContext['language'];
};
const Logo = async ({ country, language }: Props) => {
  const shopInfo = await getShopInfo({ country, language });

  return (
    <Link href={'/'}>
      <span className="sr-only">{shopInfo.name}</span>
      {shopInfo.brand.logo && false ? (
        <Image
          src={shopInfo.brand.logo.image.url || ''}
          alt="Marulloc Storefront"
          width={shopInfo.brand.logo.image.width || 14}
          height={shopInfo.brand.logo.image.height || 14}
          className="  rounded-md  hover:text-red-500 w-10 h-10"
        />
      ) : (
        <div
          className={classNames(
            localTheme.text.size.small,
            localTheme.text.color.primary.main,
            localTheme.text.color.primary.hover,
            ' leading-3 md:leading-3 text-center',
          )}
        >
          {shopInfo.name}
        </div>
      )}
    </Link>
  );
};

export default Logo;
