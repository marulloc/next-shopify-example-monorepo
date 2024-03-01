import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import Box from '@/components/@common/semantic/Box';
import Typography from '@/components/_draft/Typography';
import { TDictionaries, getDictionary } from '@/dictionaries';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';

type Props = {
  locale: { country: string; language: string };
};

const Footer = async ({ locale }: Props) => {
  const { country, language } = locale;

  const [shopInfo, dict] = await Promise.all([
    getShopInfo({ country, language }),
    getDictionary(language as TDictionaries),
  ]);
  const dictionary = dict.pages.Main;

  return (
    <Box as="footer" level={0} className="relative">
      <div className="absolute inset-0 group   ">
        <Image
          src={shopInfo.brand.coverImage.image.url}
          alt={shopInfo.brand.coverImage.image.altText || 'shopify-cover-image'}
          width={shopInfo.brand.coverImage.image.width}
          height={shopInfo.brand.coverImage.image.height}
          className="h-full w-full object-cover object-right-top  "
          priority={false}
        />

        <div className="absolute w-full h-1/4 top-0 bg-gradient-to-b from-gray-100 via-gray-100" />
        <div
          className={classNames('absolute inset-0', localTheme.fill.base.main, ' bg-opacity-60 md:bg-opacity-40 ')}
        />
      </div>

      <Box as="section" level={0} className=" relative px-20 py-44  w-full h-full">
        <Typography as="h3" size="3xl" className="tracking-tighter font-bold text-default-accent">
          {dictionary.information.h}
        </Typography>

        <div className="mt-4 md:w-2/3">
          <Typography as="p" size="lg" className="tracking-tighter text-default-base">
            {dictionary.information.p}
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Footer;
