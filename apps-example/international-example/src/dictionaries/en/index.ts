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
  collection: {
    CollectionProducts: {
      title: `Collection : `,
      summary: {
        p1: `Showing `,
        p2: ` products`,
      },
    },
  },

  SortingDropdown: {
    decription: `Sort by `,
    keys: [
      { name: 'sort', title: 'Relavance', value: 'relevance' },
      { name: 'sort', title: 'Price: Low to High', value: 'plth' },
      { name: 'sort', title: 'Price: High to Low', value: 'phtl' },
    ],
  },

  /** Locale Components Localization */
  locale: {
    LocaleSelectorTrigger: {
      title: 'Change Country / Language',
    },
    LocaleSelectModal: {
      title: 'Select Country/Language',
      closeBtn: { sr: 'close selector' },
      subTitles: {
        country: 'Select Country',
        language: 'Select Language',
      },
    },

    LocaleDetectionModal: {
      MatchedContents: {
        h: 'Hi! You are currently in $[detectedCountry]',
        p: `We've detected that you are in $[detectedCountry] and are shopping on the $[currentCountry] storefront. \n Your locale and language have been set based on your IP address and browser settings, but you have the option to shop in a different country or language.`,
        keepShopingBtn: {
          title: 'Continue shopping in $[currentCountry]',
        },
        changeMarketBtn: {
          title: 'Change country or language',
        },
      },

      NotMatchedContents: {
        h: `Locale mismatch!`,
        p: `Our records indicate you're in $[detectedCountry], but you're currently browsing the $[currentCountry] market. \n  You can browse the market in your preferred language and use all the features of our online store. However, you may not be able to select your address at checkout, or your items may not be deliverable after purchase.`,
        keepShopingBtn: {
          title: 'Continue in $[currentCountry]',
        },
        changeMarketBtn: {
          title: 'Switch to $[detectedCountry]',
        },
      },

      NotDetectedContents: {
        h: 'Unable to Determine Your Location',
        p: `We're unable to detect your location, yet you seem to be browsing from $[currentCountry]. \n You can explore the market in your preferred language and access all features of our online store. However, you might face limitations when selecting your address at checkout, or there could be delivery issues with your orders. `,
        keepShopingBtn: {
          title: 'Continue in $[currentCountry]',
        },
        changeMarketBtn: {
          title: 'Choose a different location',
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

export default en;
