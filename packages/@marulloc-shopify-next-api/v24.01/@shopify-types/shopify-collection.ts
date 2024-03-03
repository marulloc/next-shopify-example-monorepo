import { ShopifyImage, ShopifySEO } from './shopify-common';

export type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  seo: ShopifySEO;
  updatedAt: string;
  image?: ShopifyImage;
};
