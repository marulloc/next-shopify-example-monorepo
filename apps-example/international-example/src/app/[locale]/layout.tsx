import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { getLocale, getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { splitLocale } from '@/utils/locale';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  const shopInfo = await getShopInfo();

  return {
    title: shopInfo.name,
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
  const { languageCode } = splitLocale(params.locale);
  const shopInfo = await getShopInfo();
  return (
    <html lang={languageCode}>
      <body className={inter.className}>
        <Image
          src={shopInfo.brand.logo.image.url}
          alt={shopInfo.brand.logo.previewImage.altText}
          width={shopInfo.brand.logo.previewImage.width}
          height={shopInfo.brand.logo.previewImage.height}
          className="w-20 h-20   p-1 border border-gray-400"
        />

        <Image
          src={shopInfo.brand.squareLogo.image.url}
          alt={shopInfo.brand.squareLogo.image.altText}
          width={shopInfo.brand.squareLogo.image.width}
          height={shopInfo.brand.squareLogo.image.height}
          className="w-40 h-24   "
        />
        {params.locale}
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
