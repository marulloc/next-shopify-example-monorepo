interface ShopfiyNextConfig {
  storeDomain: string;
  apiVersion: string;
  accessToken: string;
  endPoint: string;
}

let config: ShopfiyNextConfig;

export const setShopifyNextConfig = (newConfig: Omit<ShopfiyNextConfig, 'endPoint'>) => {
  config = {
    ...newConfig,
    endPoint: `https://${newConfig.storeDomain}/api/${newConfig.apiVersion}/graphql.json`,
  };
};

export const getShopfiyNextConfig = () => {
  if (!config) throw Error('shopify-next-api : Config has not been set !!');

  return config;
};
