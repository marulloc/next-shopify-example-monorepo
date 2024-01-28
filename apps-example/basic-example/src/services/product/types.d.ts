type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ShopifyProductVariant[];
  images: ShopifyImage[];

  handleRoute: string;
  gidRoute: string;
};

type GetProductService = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

type GetProductRecommendationsService = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

type GetProductsService = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};
