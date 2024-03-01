import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';
import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import Image from 'next/image';
import Link from 'next/link';
import Typography from './_draft/Typography';

type Props = {
  country: ShopifyLocaleContext['country'];
  language: ShopifyLocaleContext['language'];
};
const Logo = async ({ country, language }: Props) => {
  const shopInfo = await getShopInfo({ country, language });

  return (
    <Link href={'/'} className="p-2 ml-2">
      <span className="sr-only">{shopInfo.name}</span>
      {shopInfo.brand.logo && false ? (
        <Image
          src={shopInfo.brand.logo.image.url || ''}
          alt="Marulloc Storefront"
          width={shopInfo.brand.logo.image.width || 14}
          height={shopInfo.brand.logo.image.height || 14}
          className="  rounded-md  w-10 h-10"
        />
      ) : (
        <div>
          <Typography
            as="p"
            color="default-base"
            size="xs"
            responsive={false}
            noWarn
            className="text-center hover:text-default-accent"
          >
            {shopInfo.name.split(' ').map((token, idx) => (
              <span className=" block " key={`title-${token}-${idx}`}>
                {token}
              </span>
            ))}
          </Typography>
        </div>
      )}
    </Link>
  );
};

export default Logo;
