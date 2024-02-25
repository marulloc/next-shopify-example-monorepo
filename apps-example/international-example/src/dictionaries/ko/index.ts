const ko = {
  /** Cart Components Localization */
  cart: {
    CartIconTrigger: { sr: '장바구니 열기' },

    CartContents: {
      title: '내 장바구니',
      closeBtn: { sr: '장바구니 닫기' },
      footer: {
        taxes: { title: '세금' },
        shipping: { title: '배송비', p: '결제 페이지에서 계산됩니다.' },
        total: { title: '총 상품금액' },
        checkout: { title: '결제하기' },
      },
    },

    CartLine: {
      removeBtn: { title: '상품 제거', sr: '상품 제거' },
      plusBtn: { sr: '상품 수량 하나 추가하기' },
      minusBtn: { sr: '상품 수량 하나 줄이기' },
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
    CollectionProducts: { title: `컬렉션 : `, p: `검색된 상품목록 : $[number] 개` },
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
      subTitles: { country: '국가 선택', language: '언어 선택' },
    },

    LocaleDetectionModal: {
      MatchedContents: {
        h: '안녕하세요! 현재 $[detectedCountry]에서 접속중이시군요.',
        p: `$[detectedCountry]에 계신 것을 확인하였고, $[currentCountry] 쇼핑몰에서 쇼핑 중이십니다. \n 우리는 귀하의 IP 주소와 브라우저 언어 설정을 통해 귀하의 시장과 언어를 할당합니다. 하지만, 시장을 변경하실 수 있습니다.`,
        keepShopingBtn: { title: '$[currentCountry] 에서 쇼핑 계속하기' },
        changeMarketBtn: { title: '국가 또는 언어 변경하기' },
      },

      NotMatchedContents: {
        h: `접속 국가를 확인해주세요`,
        p: `우리 기록에 의하면, $[detectedCountry]에 계신 것으로 나타나지만, 현재는 $[currentCountry] 시장을 이용하고 계십니다. \n 선호하는 언어로 시장을 둘러보고 온라인 스토어의 모든 기능을 이용할 수 있습니다. 다만, 결제할 때 주소를 선택할 수 없거나, 구매하신 상품이 배송되지 않을 수도 있다는 점을 유의해 주세요.`,
        keepShopingBtn: { title: '$[currentCountry]에서 계속 쇼핑' },
        changeMarketBtn: { title: '$[detectedCountry]에서 쇼핑' },
      },

      NotDetectedContents: {
        h: '접속 위치를 확인할 수 없습니다',
        p: `위치 확인이 불가능하지만, $[currentCountry]에서 접속 중인 것으로 보입니다. \n 선호하는 언어로 시장을 탐색하고 온라인 스토어의 모든 기능을 이용할 수 있습니다. 그러나, 결제 시 주소 선택에 제한이 있거나 주문한 상품의 배송 문제가 발생할 수 있습니다.`,
        keepShopingBtn: { title: '$[currentCountry]에서 계속하기' },
        changeMarketBtn: { title: '접속 국가 선택하기' },
      },
    },
  },

  /** Menu Components Localization */
  menu: {
    MenuDrawer: {
      closeBtn: { sr: '메뉴패널 닫기' },
      githubMonorepoLink: 'Github : 모노레포 저장소',
      githubRepoLink: 'Github : 국제화 예시 저장소',
    },

    MenuTrigger: { sr: '메뉴패널 열기' },
  },

  /** Product Components Localization */
  product: {
    Description: {
      title: '상품 상세 설명',
      mock: {
        warning: [
          '본 상품 설명은 ChatGPT에 의해 생성되었으며, 일부 상품 이미지는 Midjourney로 제작되었습니다.',
          // '이 앱은 다양한 언어와 국가에 맞춰 Shopify API 사용을 시연하기 위해 제작되었으며, 주로 Shopify에서 제공하는 데이터를 기반으로 합니다.',
          'Shopify에서 기본적으로 제공하는 상품 설명은 대체로 간단하거나 없습니다. 따라서, 우리는 임의로 생성된 텍스트로 상품 설명을 대체합니다. 실제 Shopify 데이터를 사용하고자 한다면, Description 컴포넌트 내의 주석 처리된 코드를 활성화하고 현재 생성된 설명을 제거하면 됩니다.',
        ],
        summary: {
          intro:
            '겨울 산을 정복할 준비가 되셨나요? 최고 성능 스노우보드로 어떤 경사에서도 비교할 수 없는 컨트롤을 경험해보세요. 초보자부터 프로까지 모든 레벨의 라이더에게 적합한 이 보드는 눈 위에서 최상의 성능을 발휘하도록 해줍니다.',
          outro:
            '정비된 슬로프를 carving하든, 백컨트리 지형을 탐험하든, 파크를 즐기든, 우리의 스노우보드는 필요한 다양성과 성능을 제공합니다. 혁신적인 디자인은 최신 스노우보딩 기술과 시대를 초월한 스타일을 결합하여, 세련된 라이더에게 완벽한 선택이 됩니다.',
        },
        features: {
          title: '특징',
          li: [
            '경량 코어 소재로 민첩성 향상',
            '모든 산악 조건에 최적화된 디자인',
            '환경 보호에 기여하는 지속 가능한 소재 사용',
            '날카로운 회전과 속도 관리를 위한 고급 에지 컨트롤',
            '개인의 편안함과 스탠스에 맞춰 조정 가능한 바인딩',
          ],
        },
        specifications: {
          title: '사양',
          li: [
            '길이 옵션: 155cm / 160cm / 165cm',
            '폭: 중간',
            '유형: 올마운틴 / 프리스타일',
            '유연성: 중간에서 강함, 반응형 라이딩을 위함',
            '베이스: 고속 및 내구성을 위한 소결',
          ],
        },
      },
    },

    VariantSelector: { title: '상품 옵션 선택' },

    Recommendations: { title: '추천 상품' },
  },

  /** Search Components Localization */
  search: {
    SearchIconTrigger: { sr: '클릭해서 검색창 열기' },

    SearchFakeInputTrigger: { sr: '클릭해서 검색창 열기', placeholder: '검색어 입력...' },

    SearchModal: {
      input: { sr: '상품 검색', placeholder: '검색어 입력...' },
      closeBtn: { sr: '검색창 닫기' },
    },

    SearchResult: {
      summary: `$[query] 에 대한 검색결과 : $[number] 개 상품 `,
    },
  },

  FloatingActionBtn: { sr: 'Github 레포 방문하기' },

  pages: {
    Main: {
      information: {
        h: 'Shopify Custom Storefront 예시',
        p: '이 앱은 다양한 언어와 국가에 맞춰 Shopify API 사용을 시연하기 위해 제작되었으며, 주로 Shopify에서 제공하는 데이터를 기반으로 합니다. ',
      },
    },
  },
} as const;

export default ko;
