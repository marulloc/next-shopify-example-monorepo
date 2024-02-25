const ko = {
  /** Cart Components Localization */
  cart: {
    CartIconTrigger: {
      sr: '',
    },
    CartContents: {
      title: '내 장바구니',
      closeBtn: {
        sr: '',
      },
      footer: {
        taxes: {
          title: '세금',
          sr: '',
        },
        shipping: {
          title: '배송비',
          p: 'Calculated at checkout',
          sr: '',
        },
        total: {
          title: '총 상품금액',
          sr: '',
        },
        checkout: {
          title: '결제하기',
          sr: '',
        },
      },
    },

    CartLine: {
      removeBtn: {
        title: 'Remove',
        sr: '',
      },
      plusBtn: {
        sr: '',
      },
      minusBtn: {
        sr: '',
      },
    },
  },

  /** Collectioon Components Localization */
  collection: {},

  /** Locale Components Localization */
  locale: {
    'locale-seletor-trigger': {
      title: 'Change Country/Language',
      sr: '',
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

export default ko;
