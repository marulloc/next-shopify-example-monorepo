import { pageFragment } from '../fragments/page';

export const getPagesQuery = `
  query getPages ($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    pages(first: 100) {
      edges {
        node {
          ...page
        }
      }
    }
  }
  ${pageFragment}
`;

export const getPageQuery = `
  query getPage($handle: String!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language){
    pageByHandle(handle: $handle) {
      ...page
    }
  }
  ${pageFragment}
`;
