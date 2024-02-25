import type { Metadata } from 'next';
import '../globals.css';
import { getLocale, getMenu, getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { splitLocale } from '@/utils/locale';
import Header from '../../components/Header';
import FloatingActionButton from '../../components/FloatingAction';
import { classNames } from '@marulloc/components-library/utils';
import { localTheme } from '@/theme/local-theme';
import CartMutationToast from '@/components/cart/CartMutationToast';
import ToastController from './ToastController';
import RecoilProvider from '@/context/RecoilProvider';
import MenuDrawer from '@/components/menu/MenuDrawer';
import { getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import LocaleSelectorModal from '@/components/locale/LocaleSelectModal';
import SearchModal from '@/components/search/SearchModal';
import CartDrawer from '@/components/cart/CartDrawer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import LocaleDetectionModal from '@/components/locale/LocaleDetectionModal';
import SuspenseWrapper from '@/components/SuspenseWrapper';

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

  const { availableCountries, availableLanguages, ...restLocaleData } = await getLocale({ country, language });
  const menu = await getMenu('custom-storefront-menu', { country, language });
  const collections = await getCollections({ country, language });

  return (
    <html lang={language} className=" scroll-smooth">
      <body className={classNames('relative   overflow-hidden', localTheme.fill.base.muted)}>
        <RecoilProvider>
          <SuspenseWrapper>
            <MenuDrawer menu={menu} collections={collections} />
            <LocaleSelectorModal availableCountries={availableCountries} availableLanguages={availableLanguages} />
            <SearchModal />
            <CartDrawer />
            <LocaleDetectionModal localeData={{ availableCountries, availableLanguages, ...restLocaleData }} />
            <FloatingActionButton />
            <SpeedInsights />
          </SuspenseWrapper>

          {/* <CartMutationToast /> */}
          <Header locale={{ country, language }} />
          {children}
        </RecoilProvider>
      </body>
    </html>
  );
};

export default RootLayout;
