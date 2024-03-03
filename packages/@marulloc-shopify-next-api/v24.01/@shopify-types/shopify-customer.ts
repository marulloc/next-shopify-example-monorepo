import { Connection } from './shopify-common';

export type ShopifyCustomer = {
  acceptsMarketing: boolean;
  displayName: string;
  firstName: string;
  lastName: string;

  id: string;
  email: string;
  phone: string;

  // lastIncompleteCheckout: ShopifyCheckout;
  numberOfOrders: number;
  tags: Array<string>;

  // addresses: Connection<ShopifyMailingAddress>;
  // orders: Connection<ShopifyOrder>;
};
