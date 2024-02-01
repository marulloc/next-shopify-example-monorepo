export const getShopInfoQuery = `
  query getShopInfo {
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
