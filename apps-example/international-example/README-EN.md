# International Example Storefront

- **README created by ChatGPT**
- **[View Storefront Demo](https://shopify-storefront-monorepo-example-international-example.vercel.app/)**
- **[한국어 README]()**

<br/>

## Introduction

This project is a custom storefront that supports multilingual and multinational features, built with Next.js and leveraging the Shopify GraphQL API.

<br/>

## Getting Started

To run the project, use the command:

```sh
pnpm run dev --filter international-example
```

#### Required !!

1. The project relies on three environment variables, as outlined in the `env.example` file.
2. For a detailed look at our custom library for Shopify's API,  
   refer to the `@marulloc-shopify-next-api` project within the monorepo.

<br/>

## Features

### 1. API Integration

While the Shopify GraphQL API is used directly,  
my custom library, located in the monorepo's shared library (`@marulloc-shopify-next-api`),  
enhances the multilingual and multinational support.  
This library includes parsers and types that simplify the API response structure, making it easier to work with.

<br/>

### 2. Auto Multilingual and Multinational Support

Although Shopify provides multilingual data via the GraphQL API's `@inContext` directive,  
I made `/dictionary` for other content.

Localization is determined by the user agent's preferred language and geoIP.  
The available locales from Shopify are fetched via API.  
`middleware.ts` uses the `negotiator` library to assign and redirect locales,  
optimizing performance by relying on a static list of locales.

The `apps/[locale]` dynamic routing initializes the locale context (implemented with Recoil atoms) upon route assignment.

To alert users of potential differences in shipping or currency, detect geoIP discrepancies and inform the user accordingly.  
Client-side cookie reading is handled by the `apps/api/locale-detection` API.

<br/>

### 3. Dynamic Language Support

To support dynamic insertion of variables and components in multiple languages  
through a function named `dictionaryReplace` located in `/dictionary/utils.tsx`.

<br/>

### 4. State Management with Recoil

All Shopify API-related contexts depend on the `atomLocale` for storing locale information.

The `cartAtom` uses an optimistic UI approach, syncing with the cart via atom effects.  
It leverages local storage and Recoil's state management to provide an efficient and responsive cart experience.

<br/>

### 5. Hooks Pattern

To separate view logic from business logic using custom React hooks to keep our components clean and maintainable.

<br/>

### 6. Styling with Tailwind CSS

The project uses Tailwind CSS for styling, with a set of commonly used utility classes defined in `theme-constant.ts`.  
I minimize repetitive classes by using style variants through components like `<SemanticBox />` and `<Typography />`.

---

For a detailed look at our custom library for Shopify's API, refer to the `@marulloc-shopify-next-api` project within the monorepo.
