import { ShopifyLocalization, ShopifyMenuItem } from '../../@shopify-types/shopify-shop';

export const parseMenu = (menuItems?: Array<ShopifyMenuItem>) => {
  return (
    menuItems?.map((item) => ({
      title: item.title,
      url: item.url.replace(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`, ''),
    })) || []
  );
};

export const parseLocale = (locale: ShopifyLocalization) => {
  const { availableCountries, availableLanguages } = locale;

  const combinations = availableCountries.flatMap((country) =>
    availableLanguages.map((language) => `${country.isoCode}-${language.isoCode}`.toLowerCase()),
  );

  return {
    availableLanguages,
    availableCountries,
    locales: combinations,
    supportedCountries: availableCountries.map(({ isoCode }) => isoCode.toLowerCase()),
    supportedLanguages: availableLanguages.map(({ isoCode }) => isoCode.toLowerCase()),
  };
};
