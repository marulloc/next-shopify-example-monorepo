# International Example Storefront

[한국어 버전](README.ko.md)

This project is a custom storefront that supports multilingual and multinational features, built with Next.js and leveraging the Shopify GraphQL API.

<a href="YOUR_DEMO_LINK" target="_blank" style="background-color: #5a67d8; color: #f7fafc; padding: 8px 16px; border-radius: 0.25rem; text-decoration: none; box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);">
  View Demo
</a>

<br>

## Getting Started

To run the project, use the command:
`pnpm run dev --filter international-example`

#### Required !!

1. The project relies on three environment variables, as outlined in the `env.example` file.
2. For a detailed look at our custom library for Shopify's API, refer to the `@marulloc-shopify-next-api` project within the monorepo.

<br>

## Features

### 1. API Integration

While the Shopify GraphQL API is used directly, our custom library, located in the monorepo's shared library (`@marulloc-shopify-next-api`), enhances the multilingual and multinational support. This library includes parsers and types that simplify the API response structure, making it easier to work with.

<br>

### 2. Multilingual and Multinational Support

Although Shopify provides multilingual data via the GraphQL API's `@inContext` directive, we have implemented our dictionary for other content (see second screenshot for implementation details).

Localization is determined by the user agent's preferred language and geoIP. The available locales from Shopify are fetched via API. Our middleware uses the `negotiator` library to assign and redirect locales, optimizing performance by relying on a static list of locales.

The `apps/[locale]` dynamic routing initializes the locale context (implemented with Recoil atoms) upon route assignment.

To alert users of potential differences in shipping or currency, we detect geoIP discrepancies and inform the user accordingly. Client-side cookie reading is handled by the `apps/api/locale-detection` API.

<br>

### 3. Dynamic Language Support

We support dynamic insertion of variables and components in multiple languages through a function named `dictionaryReplace` located in `/dictionary/utils.tsx`.

<br>

### 4. State Management with Recoil

All Shopify API-related contexts depend on the `atomLocale` for storing locale information.

The `cartAtom` uses an optimistic UI approach, syncing with the cart via atom effects. It leverages local storage and Recoil's state management to provide an efficient and responsive cart experience.

<br>

### 5. Hooks Pattern

We separate view logic from business logic using custom React hooks to keep our components clean and maintainable.

<br>

### 6. Styling with Tailwind CSS

The project uses Tailwind CSS for styling, with a set of commonly used utility classes defined in `theme-constant.ts`. We minimize repetitive classes by using style variants through components like `<SemanticBox />` and `<Typography />`.

---

For a detailed look at our custom library for Shopify's API, refer to the `@marulloc-shopify-next-api` project within the monorepo.
