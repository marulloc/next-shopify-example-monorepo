import { getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { TDictionaries, getDictionary } from '@/dictionaries';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import Image from 'next/image';

type Props = {
  locale: { country: string; language: string };
};

const Footer = async ({ locale }: Props) => {
  const { country, language } = locale;

  // const shopInfo = await getShopInfo({ country, language });
  // const dictionary = await (await getDictionary(language.toLowerCase() as TDictionaries)).pages.Main;
  const [shopInfo, dict] = await Promise.all([
    getShopInfo({ country, language }),
    getDictionary(language as TDictionaries),
  ]);
  const dictionary = dict.pages.Main;

  return (
    <footer className="relative">
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
        <div className={classNames('absolute inset-0', localTheme.fill.base.main, 'bg-opacity-30 ')} />
      </div>

      <div className=" relative px-20 py-44  w-full h-full  ">
        <h2
          className={classNames(
            'font-bold tracking-tight',
            localTheme.text.size.extraLarge,
            localTheme.text.color.base.main,
          )}
        >
          {dictionary.information.h}
        </h2>
        <p
          className={classNames('mt-8 tracking-tight ', localTheme.text.size.medium, localTheme.text.color.base.muted)}
        >
          {dictionary.information.p}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
