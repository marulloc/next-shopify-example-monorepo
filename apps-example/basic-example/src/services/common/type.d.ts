type Page = ShopifyPage;
type Menu = Array<ShopifyMenuItem>;

type GetMenuService = {
  data: {
    menu?: {
      items: Array<ShopifyMenuItem>;
    };
  };
  variables: {
    handle: string;
  };
};

type GetPageService = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

type GetPagesService = {
  data: {
    pages: Connection<Page>;
  };
};
