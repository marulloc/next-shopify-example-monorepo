export const getLocaleQuery = `
  query getLocale ($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language)  {
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

export const getShopInfoQuery = `
  query getShopInfo ($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    shop {
      name
      description
      brand {
        slogan
        shortDescription
        coverImage {
          image {
            url
            width
            height
          }
        }
        squareLogo {
          image {
            url
            altText
            width
            height
          }
        }
        logo {
          previewImage{
            url
            altText
            width
            height
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export const getMenuQuery = `
  query getMenu($handle: String!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;
