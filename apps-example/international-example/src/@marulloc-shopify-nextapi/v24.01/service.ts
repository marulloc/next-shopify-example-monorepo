import { ShopifyLocalization } from './types/shopify-common';

const query = `
query getLocale {
  localization {
    availableCountries {
      name
      isoCode
    }
    availableLanguages {
      name
      isoCode
    }
  }
}

`;

const getLocale = async () => {
  const locale = ['CA-EN', 'CA-FR', 'KR-KO', 'US-EN', 'US-FR'];
  return;
};

const parseLocale = (
  availableCountries: ShopifyLocalization['availableCountries'],
  availableLanguages: ShopifyLocalization['availableLanguages'],
) => {
  const combinations = availableCountries.flatMap((country) =>
    availableLanguages.map((language) => `${country.isoCode}-${language.isoCode}`.toLowerCase()),
  );

  return combinations;
};
