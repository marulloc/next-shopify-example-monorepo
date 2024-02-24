import { ShopifyLocalization } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-shop';
import { getLocale } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { TDetectionStatus } from '@/middleware';
import { splitLocale } from '@/utils/locale';
import { cookies } from 'next/headers';
import Child from './Child';

type TCountry = ShopifyLocalization['availableCountries'][number];
type TLanguage = ShopifyLocalization['availableLanguages'][number];

type TProps = {
  locale: string;
};

const ServerWrapper = async ({ locale }: TProps) => {
  const { countryCode: currentCountryCode, languageCode: currentLanguageCode } = splitLocale(locale);
  const { availableCountries, availableLanguages } = await getLocale({
    country: currentCountryCode,
    language: currentLanguageCode,
  });

  /**
   * Current
   */
  const currentCountry = availableCountries.find(
    ({ isoCode, name }) => isoCode.toUpperCase() === currentCountryCode.toUpperCase(),
  ) as TCountry;

  const currentLanguage = availableLanguages.find(
    ({ isoCode, name }) => isoCode.toUpperCase() === currentLanguageCode.toUpperCase(),
  ) as TLanguage;

  /**
   * Detected
   */
  // const detectionStatus = String(cookies().get('detectionStatus')?.value) as TDetectionStatus;
  const detectedCountryCode = String(cookies().get('detectedCountry')?.value);
  const detectedCountry: TCountry = availableCountries.find(
    ({ isoCode, name }) => isoCode.toUpperCase() === detectedCountryCode.toUpperCase(),
  ) || { name: '', isoCode: '' };

  console.log('>>>> Server >>>> detectedCountry >>>> \n', detectedCountryCode, detectedCountry);
  console.log('>>>> Server >>>> currentCountry >>>> \n', currentCountry);
  console.log('>>>> Server >>>> currentLanguage >>>> \n', currentLanguage);

  return <Child detectedCountry={detectedCountry} currentCountry={currentCountry} currentLanguage={currentLanguage} />;
};

export default ServerWrapper;
