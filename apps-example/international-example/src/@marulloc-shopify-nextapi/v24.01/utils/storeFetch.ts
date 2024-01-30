const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION || '';
const endPoint = `https://${storeDomain}/api/${apiVersion}/graphql.json`;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

(function checkEnvVariables() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN',
    'NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION',
    'NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN',
  ];

  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
  }
})();

export type StoreFetchParams<T> = {
  headers?: HeadersInit;
  cache?: RequestCache;
  tags?: string[];
  query: string;
  variables?: T extends { variables: object } ? T['variables'] : never;
};

export const storeFetch = async <T>(params: StoreFetchParams<T>): Promise<{ status: number; body: T }> => {
  const method = 'POST';
  const headers = {
    'X-Shopify-Storefront-Access-Token': accessToken,
    'Content-Type': 'application/json',
    ...params.headers,
  };
  const body = JSON.stringify({
    ...(params.query && { query: params.query }),
    ...(params.variables && { variables: params.variables }),
  });
  const cache = params.cache || 'force-cache';
  const tags = { ...(params.tags && { next: { tags: params.tags } }) };

  try {
    const response = await fetch(endPoint, { method, headers, body, cache, ...tags });
    const { data, errors } = await response.json();

    if (errors) throw errors[0];

    return {
      status: response.status,
      body: { data } as T,
    };
  } catch (e) {
    throw { error: e, query: params.query, variables: params.variables };
  }
};
