/**
 * @docs https://shopify.dev/docs/api/storefront/2024-01/objects/Collection
 */
type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  seo: ShopifySEO;
  updatedAt: string;
};
