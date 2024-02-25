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
    LocaleSelectorTrigger: {
      title: '국가 / 언어 변경',
    },
    LocaleSelectModal: {
      title: '국가 / 언어 선택',
      closeBtn: { sr: '선택창 닫기' },
      subTitles: {
        country: '국가 선택',
        language: '언어 선택',
      },
    },

    LocaleDetectionModal: {
      MatchedContents: {
        h: '안녕하세요! 현재 $[detectedCountry]에 계십니다.',
        p: `$[detectedCountry]에 계신 것을 확인하였고, $[currentCountry] 쇼핑몰에서 쇼핑 중이십니다. \n 우리는 귀하의 IP 주소와 브라우저 언어 설정을 통해 귀하의 시장과 언어를 할당합니다. 하지만, 시장을 변경하실 수 있습니다.`,
        keepShopingBtn: {
          title: '$[currentCountry] 에서 쇼핑 계속하기',
        },
        changeMarketBtn: {
          title: '국가 또는 언어 변경하기',
        },
      },

      NotMatchedContents: {
        h: 'Hi! You are currently in $[detectedCountry]',
        p: `We've detected that you are in $[detectedCountry] and are shopping on the $[currentCountry] storefront. \n Your locale and language have been set based on your IP address and browser settings, but you have the option to shop in a different country or language.`,
        keepShopingBtn: {
          title: 'Continue shopping in $[currentCountry]',
        },
        changeMarketBtn: {
          title: 'Change country or language',
        },
      },

      NotDetectedContents: {
        h: 'Hi! You are currently in $[detectedCountry]',
        p: `We've detected that you are in $[detectedCountry] and are shopping on the $[currentCountry] storefront. \n Your locale and language have been set based on your IP address and browser settings, but you have the option to shop in a different country or language.`,
        keepShopingBtn: {
          title: 'Continue shopping in $[currentCountry]',
        },
        changeMarketBtn: {
          title: 'Change country or language',
        },
      },
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
