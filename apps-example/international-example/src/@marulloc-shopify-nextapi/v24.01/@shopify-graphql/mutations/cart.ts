import { cartFragment } from '../fragments/cart';

export const addToCartMutation = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode, $language: LanguageCode)  @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const createCartMutation = `
  mutation createCart($lineItems: [CartLineInput!], $country: CountryCode, $language: LanguageCode)  @inContext(country: $country, language: $language) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const editCartItemsMutation = `
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!, $country: CountryCode, $language: LanguageCode)  @inContext(country: $country, language: $language) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!, $country: CountryCode, $language: LanguageCode)  @inContext(country: $country, language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;
