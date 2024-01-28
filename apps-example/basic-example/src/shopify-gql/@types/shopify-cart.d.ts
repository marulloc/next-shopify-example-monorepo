/**
 * @docs https://shopify.dev/docs/api/storefront/2024-01/objects/Cart
 */
type ShopifyCart = {
  id: string;
  buyerIdentity: {
    countryCode: ShopifyCountryCode;
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

type ShopifyBaseCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: ShopifyProduct;
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
};
