type ShopifyPredictiveSearch = {
  products: ShopifyProduct[];
  collections: ShopifyCollection[];
};

type ShopifyProductFilter =
  | { variantOption: { name: string; value: string } }
  | { productType: string }
  | { price: PriceRangeFilter }
  | { tag: string }
  | null;

type ShopifySortKey = 'PRICE' | 'RELEVANCE' | null;
