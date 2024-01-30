export type Connection<T> = {
  edges: Array<Edge<T>>;
  pageInfo: PageInfo;
};

export type Edge<T> = {
  node: T;
  cursor: string;
};

export type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ShopifyGid = Pick<URL, 'search' | 'searchParams' | 'hash'> & {
  id: string;
  resource: string | null;
  resourceId: string | null;
};

export type ShopifyImage = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type ShopifySEO = {
  title: string;
  description: string;
};

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};
