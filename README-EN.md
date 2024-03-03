# Shopify-Storefront-Monorepo-Example

- **README created by ChatGPT.**
- **[View Storefront Demo](https://shopify-storefront-monorepo-example-international-example.vercel.app/)**
- **[한국어 README](https://github.com/marulloc/shopify-storefront-monorepo-example/tree/master)**

<br/>

## Introduction

This project is a monorepo example of a custom storefront optimized for global services, built using Next.js and the Shopify API. The monorepo structure consolidates multiple storefronts for efficient development and management. It features extensive localization and multilingual support to deliver an optimized shopping experience for global users.

<br/>

## Structure

- `apps-example/international-example`: A storefront example app supporting multilingual and multinational features, based on Next.js.
- `packages/@marulloc-components-library`: A composite component library designed to facilitate the use of UI components such as Dialogs and Drawers.
- `packages/@marulloc-shopify-next-api`: A library that aids in the implementation of multilingual and multinational services using the Shopify GraphQL API.

Each app and package has its own independent features and dependencies, efficiently managed through the monorepo.

<br/>

## Start

To use the monorepo, install dependencies and start projects from the root directory using the following commands:

shCopy code

`pnpm install pnpm run dev --filter @marulloc-components-library`

<br/>

## Packages

##### `@marulloc-components-library`

This library uses the composite component pattern to increase reusability of UI components and maintain a consistent design pattern. It enables developers to easily integrate UI components like Dialogs and Drawers into their projects.

##### `@marulloc-shopify-next-api`

Provides utilities and types that enhance the effective use of Shopify's GraphQL API. Especially useful for projects requiring multilingual and multinational support, this library simplifies API responses and makes them more developer-friendly.

<br/>

---

# International Example Storefront

This project is a custom storefront based on Next.js, supporting multilingual and multinational features. It leverages the powerful capabilities of the Shopify GraphQL API.

<br/>

## Getting Started

To run the project, use the following command:

shCopy code

`pnpm run dev --filter international-example`

#### Required !!

1. The project requires three environment variables, as specified in the env.example file.
2. For detailed information about our custom library for the Shopify API, refer to the @marulloc-shopify-next-api project within the monorepo.

<br/>

## Features

### 1. API Integration

While you can use the Shopify GraphQL API directly, my custom library located in the monorepo's shared library (@marulloc-shopify-next-api) enhances the multilingual and multinational support capabilities. This library includes parsers and types that simplify the API response structure, making it easier for developers to work with.

<br/>

### 2. Auto Multilingual and Multinational Support

Although Shopify provides multilingual data through the GraphQL API's @inContext directive, I created /dictionary for other content.

Localization is determined by the user's browser language settings and geoIP. The available locales provided by Shopify are fetched via the API. middleware.ts uses the negotiator library to assign and redirect locales, optimizing performance by relying on a fixed list of locales.

Dynamic routing in apps/[locale] initializes the locale context (implemented with Recoil atoms) when a route is assigned.

To inform users about potential differences in shipping or currency due to geoIP discrepancies, the apps/api/locale-detection API manages client-side cookie reading.

<br/>

### 3. Dynamic Language Support

Supports the dynamic insertion of variables and components in multiple languages through the dictionaryReplace function located in /dictionary/utils.tsx.

<br/>

### 4. State Management with Recoil

All Shopify API-related contexts rely on atomLocale for storing locale information.

The cartAtom uses an optimistic UI approach to synchronize with the cart through atom effects. This leverages local storage and Recoil's state management features to provide an efficient and responsive cart experience.

<br/>

### 5. Hooks Pattern

Custom React hooks are used to keep components clean and maintainable, separating view logic from business logic.

<br/>

### 6. Styling with Tailwind CSS

The project uses Tailwind CSS for styling, utilizing a set of commonly used utility classes defined in theme-constant.ts. Components like <SemanticBox /> and <Typography /> use style variants to minimize the use of repetitive classes.

---

For detailed information about our custom library for the Shopify API, refer to the @marulloc-shopify-next-api project within the monorepo.
