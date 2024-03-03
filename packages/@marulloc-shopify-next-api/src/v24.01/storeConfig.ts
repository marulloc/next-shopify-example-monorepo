interface ShopfiyNextConfig {
  storeDomain: string;
  apiVersion: string;
  accessToken: string;
  endPoint: string;
}

export const getShopfiyNextConfig = () => {
  let config: ShopfiyNextConfig;

  config = {
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
    apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION || '',
    accessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    endPoint: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`,
  };

  if (!config.storeDomain)
    throw Error('shopify-next-api : Config[NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN] has not been set !!');
  if (!config.apiVersion)
    throw Error('shopify-next-api : Config[NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION] has not been set !!');
  if (!config.accessToken)
    throw Error('shopify-next-api : Config[NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN] has not been set !!');

  return config;
};
