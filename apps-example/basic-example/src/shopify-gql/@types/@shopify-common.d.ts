type Maybe<T> = T | null;

type Connection<T> = {
  edges: Array<Edge<T>>;
  pageInfo: PageInfo;
};

type Edge<T> = {
  node: T;
  cursor: string;
};

type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type ShopifyGid = Pick<URL, 'search' | 'searchParams' | 'hash'> & {
  id: string;
  resource: string | null;
  resourceId: string | null;
};

type ShopifyImage = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

type ShopifyMenuItem = {
  title: string;
  url: string;
};

type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

type ShopifyPage = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: ShopifySEO;
  createdAt: string;
  updatedAt: string;
};

type ShopifySEO = {
  title: string;
  description: string;
};

type ShopifyCountryCode = 'KR' | '...';
type ShopifyLanguageCode = 'KO' | '...';
