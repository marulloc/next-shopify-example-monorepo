export const getShopInfo = `ToDo`;

export const getLocaleQuery = `
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

export const getMenuQuery = `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;
