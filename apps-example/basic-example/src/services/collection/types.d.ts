type Collection = ShopifyCollection & {
  handleRoute: string;
  gidRoute: string;
};

type GetCollectionsService = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

type GetCollectionService = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

type GetCollectionProductsService = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};
