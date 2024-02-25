const en = {
  /** Cart Components Localization */
  cart: {
    CartIconTrigger: {
      sr: 'Open my shopping cart',
    },

    CartContents: {
      title: 'Shopping Cart',
      closeBtn: {
        sr: 'close the cart',
      },
      footer: {
        taxes: {
          title: 'Taxes',
        },
        shipping: {
          title: 'Shipping',
          p: 'Calculated at checkout',
        },
        total: {
          title: 'Total',
        },
        checkout: {
          title: 'Checkout',
        },
      },
    },

    CartLine: {
      removeBtn: {
        title: 'Remove',
        sr: 'remove items from cart',
      },
      plusBtn: {
        sr: 'add 1 item',
      },
      minusBtn: {
        sr: 'minus 1 item',
      },
    },

    AddToCart: {
      sr: 'add this item to cart',
      title: 'Add To Cart',
      states: {
        notYet: 'Please Select Options',
        soldOut: 'Sold Out',
        adding: 'Adding',
        waiting: 'Add To Cart',
        error: 'Something went wrong',
      },
    },
  },

  /** Collectioon Components Localization */
  collection: {},

  /** Locale Components Localization */
  locale: {
    'locale-seletor-trigger': {
      title: 'Change Country/Language',
    },
  },

  /** Menu Components Localization */
  menu: {
    'menu-drawer': {
      trigger: {
        sr: '',
      },
      li: {
        menus: 'Menus',
        collection: 'Collections',
      },
      links: {
        'monorepo-link': 'Go to Monorepo',
        'app-repo-link': 'Go to International Repo',
      },
    },
  },

  /** Product Components Localization */
  product: {},

  /** Search Components Localization */
  search: {
    'search-input': {
      placeholder: 'Search ...',
      sr: 'Search Items & Collections',
    },
    'search-trigger': {
      sr: 'search items',
    },
    'search-result': {
      p: {
        part1: `Showing`,
        part2: `products for`,
      },
    },
    'sorting-keys': [
      { name: 'sort', title: 'Relavance', value: 'relevance' },
      { name: 'sort', title: 'Price: Low to High', value: 'plth' },
      { name: 'sort', title: 'Price: High to Low', value: 'phtl' },
    ],
  },

  pages: {
    'main-page': {
      'information-section': {
        h: '글로벌 서비스 예시',
        p: `example of `,
        a: '',
      },
    },
  },
};

export default en;
