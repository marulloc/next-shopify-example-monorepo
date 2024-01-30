import { ShopifyGid, ShopifySEO } from './shopify-common';

export type ShopifyPage = {
  id: ShopifyGid;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo: ShopifySEO;
  createdAt: string;
  updatedAt: string;
};
