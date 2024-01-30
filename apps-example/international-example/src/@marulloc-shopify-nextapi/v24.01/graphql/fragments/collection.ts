import { seoFragment } from './common';

export const collectionFragment = `
  fragment collection on Collection {
    id
    handle
    title
    description 
    updatedAt
  }
`;

export const collectionWithSeoFragment = `
  fragment collection on Collection {
    id
    handle
    title
    description
    seo {
      ...seo
    }
    updatedAt
  }
  ${seoFragment}
`;
