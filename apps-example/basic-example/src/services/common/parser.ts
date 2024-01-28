export const parseMenuRoute = (menuItems?: Array<ShopifyMenuItem>) => {
  return (
    menuItems?.map((item) => ({
      title: item.title,
      url: item.url.replace(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`, ''),
    })) || []
  );
};
