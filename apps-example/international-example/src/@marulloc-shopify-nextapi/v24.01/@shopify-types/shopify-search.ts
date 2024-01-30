import { ShopifyCollection } from './shopify-collection';
import { ShopifyProduct } from './shopify-product';

export type ShopifyPredictiveSearch = {
  products: Omit<ShopifyProduct, 'seo'>[];
  collections: Omit<ShopifyCollection, 'seo'>[];
};

export type ShopifySortKey = 'PRICE' | 'RELEVANCE' | null;

export type ShopifyProductFilter =
  | { variantOption: { name: string; value: string } }
  | { productType: string }
  // | { price: PriceRangeFilter }
  | { tag: string }
  | null;
