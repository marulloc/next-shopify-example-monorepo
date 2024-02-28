const en = {
  /** Cart Components Localization */
  cart: {
    CartIconTrigger: { sr: 'Open my shopping cart' },

    CartContents: {
      title: 'Shopping Cart',
      closeBtn: { sr: 'close the cart' },
      footer: {
        taxes: { title: 'Taxes' },
        shipping: { title: 'Shipping', p: 'Calculated at checkout' },
        total: { title: 'Total' },
        checkout: { title: 'Checkout' },
      },
    },

    CartLine: {
      removeBtn: { title: 'Remove', sr: 'remove items from cart' },
      plusBtn: { sr: 'add 1 item' },
      minusBtn: { sr: 'minus 1 item' },
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
    CollectionProducts: { title: `Collection : `, p: `Showing $[number] products` },
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
    LocaleSelectorTrigger: { title: 'Change Country / Language' },
    LocaleSelectModal: {
      title: 'Select Country/Language',
      closeBtn: { sr: 'close selector' },
      subTitles: { country: 'Select Country', language: 'Select Language' },
    },

    LocaleDetectionModal: {
      MatchedContents: {
        h: 'Hi! You are currently in $[detectedCountry]',
        p: `We've detected that you are in $[detectedCountry] and are shopping on the $[currentCountry] storefront. \n Your locale and language have been set based on your IP address and browser settings, but you have the option to shop in a different country or language.`,
        keepShopingBtn: { title: 'Continue shopping in $[currentCountry]' },
        changeMarketBtn: { title: 'Change country or language' },
      },

      NotMatchedContents: {
        h: `Locale mismatch!`,
        p: `Our records indicate you're in $[detectedCountry], but you're currently browsing the $[currentCountry] market. \n  You can browse the market in your preferred language and use all the features of our online store. However, you may not be able to select your address at checkout, or your items may not be deliverable after purchase.`,
        keepShopingBtn: { title: 'Continue in $[currentCountry]' },
        changeMarketBtn: { title: 'Switch to $[detectedCountry]' },
      },

      NotDetectedContents: {
        h: 'Unable to Determine Your Location',
        p: `We're unable to detect your location, yet you seem to be browsing from $[currentCountry]. \n You can explore the market in your preferred language and access all features of our online store. However, you might face limitations when selecting your address at checkout, or there could be delivery issues with your orders. `,
        keepShopingBtn: { title: 'Continue in $[currentCountry]' },
        changeMarketBtn: { title: 'Choose a different location' },
      },
    },
  },

  /** Menu Components Localization */
  menu: {
    MenuDrawer: {
      closeBtn: { sr: 'close the menu' },
      githubMonorepoLink: 'Go to Monorepo',
      githubRepoLink: 'International Repo',
    },

    MenuTrigger: { sr: 'Open the Menu Navigatior' },
  },

  /** Product Components Localization */
  product: {
    Description: {
      title: 'Description',
      mock: {
        warning: [
          'This product description was generated by ChatGPT, and some product images were created with Midjourney.',
          'The product descriptions provided by Shopify are typically brief or non-existent, so we replace them with text generated on the fly. If you wish to use actual Shopify data, you can uncomment the code in the Description component and remove the currently generated descriptions.',
        ],
        summary: {
          intro:
            'Ready to conquer the winter mountains? Experience unmatched control on any slope with our Ultimate Performance Snowboard. Suitable for riders of all levels, from beginners to pros, this board ensures you perform your best on the snow.',
          outro: `Whether you're carving down groomed runs, exploring backcountry terrain, or hitting the park, ousnowboard offers the versatility and performance you need. Its innovative design combines the latest isnowboarding technology with timeless style, making it the perfect choice for the discerning rider.`,
        },
        features: {
          title: 'Features',
          li: [
            'Enhanced agility with lightweight core materials',
            'Optimized design for all mountain conditions',
            'Made with sustainable materials, contributing to environmental conservation',
            'Advanced edge control for sharp turns and speed management',
            'Customizable bindings for personalized comfort and stance',
          ],
        },
        specifications: {
          title: 'Specifications',
          li: [
            'Length options: 155cm / 160cm / 165cm',
            'Width: Medium',
            'Type: All-Mountain / Freestyle',
            'Flex: Medium to Stiff, for responsive rides',
            'Base: Sintered for high speed and durability',
          ],
        },
      },
    },

    VariantSelector: { title: 'Select Options' },

    Recommendations: { title: 'Recommendations' },
  },

  /** Search Components Localization */
  search: {
    SearchIconTrigger: { sr: 'open search panel' },

    SearchFakeInputTrigger: { sr: 'clink & open search panel', placeholder: 'Search...' },

    SearchModal: {
      input: { sr: 'search items', placeholder: 'Search...' },
      closeBtn: { sr: 'close search panel' },
      noResult: { title: 'No result were found' },
    },

    SearchResult: {
      summary: `Showing $[number] 'products' for $[query]`,
    },
  },

  FloatingActionBtn: { sr: 'Move to github' },

  pages: {
    Main: {
      information: {
        h: 'Shopify Custom Storefront example',
        p: 'This app is designed to demonstrate the use of the Shopify API across different languages and countries, showcasing primarily data provided by Shopify.',
      },
    },
  },
} as const;

export default en;