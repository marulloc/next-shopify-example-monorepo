import { getPredictiveSearch } from './service';

type PredictiveSearch = {
  products: Product[];
  collections: Collection[];
};

type GetPredictiveSearchService = {
  data: {
    predictiveSearch: {
      products: ShopifyProduct[];
      collections: ShopifyCollection[];
    };
  };
  variables: {
    query: string;
  };
};

type GetProductsSearchService = {
  data: {
    search: Connection<ShopifyProduct>;
  };
  variables: {
    query: string;
    productFilters: ShopifyProductFilter[];
    sortKey?: ShopifySortKey;
    reverse?: boolean;
  };
};

type GetProductsInCollectionSearchService = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    productFilters: ShopifyProductFilter[];
    sortKey?: ShopifySortKey;
    reverse?: boolean;
  };
};

type SortKey = 'relevance' | 'plth' | 'phtl';
