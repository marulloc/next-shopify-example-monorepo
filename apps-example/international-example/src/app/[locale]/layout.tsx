import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { getLocale, getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { splitLocale } from '@/utils/locale';
import Image from 'next/image';
import Header from '../Header';

const inter = Inter({ subsets: ['latin'] });

/**
 * @TODO @inContext(country, language)
 * @param param0
 * @returns
 */
export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  const { countryCode, languageCode } = splitLocale(params.locale);

  const shopInfo = await getShopInfo({ country: countryCode, language: languageCode });

  return {
    title: shopInfo.name + '-international',
    metadataBase: new URL('http://localhost:3000'),
    description: shopInfo.description,
    icons: {
      icon: shopInfo.brand.logo.image.url,
    },
    openGraph: {
      title: shopInfo.name,
      description: shopInfo.description,
      images: [
        {
          url: shopInfo.brand.squareLogo.image.url,
          width: shopInfo.brand.squareLogo.image.width,
          height: shopInfo.brand.squareLogo.image.height,
        },
      ],
    },
  };
};

export const generateStaticParams = async () => {
  const { locales } = await getLocale();
  return locales.map((locale) => ({ locale }));
};

const RootLayout = async ({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const shopInfo = await getShopInfo({ country: countryCode, language: languageCode });
  return (
    <html lang={languageCode}>
      <body className={inter.className + 'relative'}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
