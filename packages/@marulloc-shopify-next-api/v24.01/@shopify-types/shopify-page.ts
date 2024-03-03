import { ShopifyGid, ShopifySEO } from './shopify-common';

export type ShopifyPage = {
  id: ShopifyGid;
  title: string;
  handle: string;
  body: string | TrustedHTML;
  bodySummary: string;
  seo: ShopifySEO;
  createdAt: string;
  updatedAt: string;
};
