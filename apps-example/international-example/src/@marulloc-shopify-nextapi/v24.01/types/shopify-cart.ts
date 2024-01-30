import { Connection, ShopifyMoney } from './shopify-common';
import { ShopifyCustomer } from './shopify-customer';
import { ShopifyProduct } from './shopify-product';
import { ShopifyCountryIsoCode } from './shopify-shop';

export type ShopifyCart = {
  id: string;
  buyerIdentity: {
    countryCode: ShopifyCountryIsoCode;
    customer: ShopifyCustomer;
    email: string;
    phone: string;
  };
  checkoutUrl: string;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount: ShopifyMoney;
  };
  lines: Connection<ShopifyBaseCartLine>;
  totalQuantity: number;
};

export type ShopifyBaseCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Omit<ShopifyProduct, 'seo'>;
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
};
