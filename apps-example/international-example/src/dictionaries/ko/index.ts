const ko = {
  /** Cart Components Localization */
  cart: {
    CartIconTrigger: {
      sr: '장바구니 열기',
    },

    CartContents: {
      title: '내 장바구니',
      closeBtn: {
        sr: '장바구니 닫기',
      },
      footer: {
        taxes: {
          title: '세금',
        },
        shipping: {
          title: '배송비',
          p: '결제 페이지에서 계산됩니다.',
        },
        total: {
          title: '총 상품금액',
        },
        checkout: {
          title: '결제하기',
        },
      },
    },

    CartLine: {
      removeBtn: {
        title: '상품 제거',
        sr: '상품 제거',
      },
      plusBtn: {
        sr: '상품 수량 하나 추가하기',
      },
      minusBtn: {
        sr: '상품 수량 하나 줄이기',
      },
    },

    AddToCart: {
      sr: '장바구니에 담기',
      title: '장바구니에 담기',
      states: {
        notYet: '옵션을 선택해주세요',
        soldOut: '품절',
        adding: '장바구니에 담고 있습니다.',
        waiting: '장바구니에 담기',
        error: '뭔가가 잘못되었네요. 새로고침해주세요',
      },
    },
  },

  /** Collectioon Components Localization */
  collection: {
    CollectionProducts: {
      title: `컬렉션 : `,
      summary: {
        p1: ` `,
        p2: `개의 상품목록`,
      },
    },
  },

  SortingDropdown: {
    decription: `상품 정렬 `,
    keys: [
      { name: 'sort', title: '추천순', value: 'relevance' },
      { name: 'sort', title: '가격 낮은 순', value: 'plth' },
      { name: 'sort', title: '가격 높은 순', value: 'phtl' },
    ],
  },

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
