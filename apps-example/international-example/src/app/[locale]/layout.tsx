import type { Metadata } from 'next';
import '../globals.css';
import { getLocale, getMenu, getShopInfo } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { splitLocale } from '@/utils/locale';
import Header from '../../components/shop/Header';
import FloatingGithubLink from '../../components/github/FloatingGithubLink';
import { classNames } from '@marulloc/components-library/utils';
import RecoilProvider from '@/context/RecoilProvider';
import MenuDrawer from '@/components/shop/MenuDrawer';
import { getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';
import LocaleSelectorModal from '@/components/locale/LocaleSelectModal';
import SearchModal from '@/components/search/SearchModal';
import CartDrawer from '@/components/cart/CartDrawer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import LocaleDetectionModal from '@/components/locale/LocaleDetectionModal';
import { TDictionaries, getDictionary } from '@/dictionaries';
import Footer from '@/components/shop/Footer';
import { Suspense } from 'react';
import SemanticBox from '@/components/SemanticBox';

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

  const [localeData, menu, collections, dictionary] = await Promise.all([
    getLocale({ country, language }),
    getMenu('international-example-menu', language),
    getCollections({ country, language }),
    getDictionary(language.toLowerCase() as TDictionaries),
  ]);

  return (
    <html lang={language} className=" scroll-smooth">
      <body className={classNames('relative   overflow-hidden')}>
        <SemanticBox as="div" fill="default-muted" className={classNames(' ')}>
          <RecoilProvider locale={{ country, language }} dictionary={dictionary}>
            <Suspense>
              <MenuDrawer menu={menu} collections={collections} />
              <LocaleSelectorModal
                availableCountries={localeData.availableCountries}
                availableLanguages={localeData.availableLanguages}
              />
              <SearchModal />
              <CartDrawer />
              <LocaleDetectionModal localeData={localeData} />
              <FloatingGithubLink locale={{ country, language }} />
              <SpeedInsights />
            </Suspense>

            <SemanticBox
              as="div"
              fill="default-base"
              className={classNames('max-w-7xl mx-auto shadow-2xl relative min-h-screen', 'flex flex-col')}
            >
              <Header locale={{ country, language }} />
              <div className=" flex-1  flex flex-col">{children}</div>
              <Footer locale={{ country, language }} />
            </SemanticBox>
          </RecoilProvider>
        </SemanticBox>
      </body>
    </html>
  );
};

export default RootLayout;
