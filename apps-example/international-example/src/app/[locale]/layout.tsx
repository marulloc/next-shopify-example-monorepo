import type { Metadata } from 'next';
import '../globals.css';
import { getLocale, getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { splitLocale } from '@/utils/locale';
import Header from '../../components/Header';
import FloatingActionButton from '../../components/FloatingAction';
import CartProvider from '@/context/cart/CartProvider';
import { classNames } from '@marulloc/components-library/utils';
import { localTheme } from '@/theme/local-theme';
import LocaleAlertModal from '../../components/locale/LocaleAlertModal';
import { cookies } from 'next/headers';
import { TDetectionStatus } from '@/middleware';

export const generateStaticParams = async () => {
  const { locales } = await getLocale();
  return locales.map((locale) => ({ locale }));
};

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

const RootLayout = async ({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) => {
  const { countryCode: country, languageCode: language } = splitLocale(params.locale);

  const { availableCountries, availableLanguages } = await getLocale({ country, language });
  const detectedCountry = String(cookies().get('detectedCountry')?.value);
  const detectionStatus = String(cookies().get('detectionStatus')?.value) as TDetectionStatus;

  return (
    <html lang={language} className=" scroll-smooth">
      <CartProvider locale={{ country, language }} storageKey="marulloc-cart">
        <body className={classNames('relative   overflow-hidden', localTheme.fill.base.muted)}>
          <LocaleAlertModal
            detectionStatus={detectionStatus}
            detectedCountry={detectedCountry}
            routingCountry={country}
            routingLanguage={language}
            availableCountries={availableCountries}
            availableLanguages={availableLanguages}
          />
          <Header locale={{ country, language }} />
          {children}
          <FloatingActionButton />
        </body>
      </CartProvider>
    </html>
  );
};

export default RootLayout;
