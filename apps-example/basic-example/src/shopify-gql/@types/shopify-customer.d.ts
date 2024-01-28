/**
 * @docs https://shopify.dev/docs/api/storefront/2024-01/objects/Customer
 */
type ShopifyCustomer = {
  acceptsMarketing: boolean;
  displayName: srting;
  firstName: string;
  lastName: string;

  id: string;
  email: string;
  phone: string;

  lastIncompleteCheckout: ShopifyCheckout;
  numberOfOrders: number;
  tags: Array<string>;

  addresses: Connection<ShopifyMailingAddress>;
  orders: Connection<ShopifyOrder>;
};
