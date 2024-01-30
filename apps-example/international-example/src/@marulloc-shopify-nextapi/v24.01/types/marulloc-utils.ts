export type StoreFetchParams<T> = {
  headers?: HeadersInit;
  cache?: RequestCache;
  tags?: string[];
  query: string;
  variables?: T extends { variables: object } ? T['variables'] : never;
};
