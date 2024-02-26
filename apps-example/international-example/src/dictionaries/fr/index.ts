const fr = {
  /** Cart Components Localization */
  cart: {
    CartIconTrigger: { sr: 'Ouvrir mon panier' },

    CartContents: {
      title: 'Panier',
      closeBtn: { sr: 'fermer le panier' },
      footer: {
        taxes: { title: 'Taxes' },
        shipping: { title: 'Livraison', p: 'Calculé à la caisse' },
        total: { title: 'Total' },
        checkout: { title: 'Paiement' },
      },
    },

    CartLine: {
      removeBtn: { title: 'Supprimer', sr: 'supprimer des articles du panier' },
      plusBtn: { sr: 'ajouter 1 article' },
      minusBtn: { sr: 'soustraire 1 article' },
    },

    AddToCart: {
      sr: 'ajouter cet article au panier',
      title: 'Ajouter au Panier',
      states: {
        notYet: 'Veuillez sélectionner des options',
        soldOut: 'Épuisé',
        adding: 'Ajout en cours',
        waiting: 'Ajouter au Panier',
        error: "Une erreur s'est produite",
      },
    },
  },

  /** Collectioon Components Localization */
  collection: {
    CollectionProducts: { title: `Collection : `, p: `Affichage de $[number] produits` },
  },

  SortingDropdown: {
    decription: `Trier par `,
    keys: [
      { name: 'sort', title: 'Pertinence', value: 'relevance' },
      { name: 'sort', title: 'Prix : du plus bas au plus élevé', value: 'plth' },
      { name: 'sort', title: 'Prix : du plus élevé au plus bas', value: 'phtl' },
    ],
  },

  /** Locale Components Localization */
  locale: {
    LocaleSelectorTrigger: { title: 'Changer de pays / langue' },
    LocaleSelectModal: {
      title: 'Sélectionner Pays/Langue',
      closeBtn: { sr: 'fermer le sélecteur' },
      subTitles: { country: 'Sélectionner un pays', language: 'Sélectionner une langue' },
    },

    LocaleDetectionModal: {
      MatchedContents: {
        h: 'Salut ! Vous êtes actuellement dans $[detectedCountry]',
        p: `Nous avons détecté que vous êtes dans $[detectedCountry] et vous magasinez sur le site $[currentCountry]. \n Votre localisation et langue ont été définies en fonction de votre adresse IP et des paramètres de votre navigateur, mais vous avez l'option de magasiner dans un autre pays ou langue.`,
        keepShopingBtn: { title: 'Continuer les achats dans $[currentCountry]' },
        changeMarketBtn: { title: 'Changer de pays ou langue' },
      },

      NotMatchedContents: {
        h: `Incohérence de localisation !`,
        p: `Nos enregistrements indiquent que vous êtes dans $[detectedCountry], mais vous naviguez actuellement sur le marché $[currentCountry]. \n  Vous pouvez parcourir le marché dans votre langue préférée et utiliser toutes les fonctionnalités de notre magasin en ligne. Cependant, vous pourriez rencontrer des limitations lors de la sélection de votre adresse lors du paiement, ou vos articles pourraient ne pas être livrables après l'achat.`,
        keepShopingBtn: { title: 'Continuer dans $[currentCountry]' },
        changeMarketBtn: { title: 'Passer à $[detectedCountry]' },
      },

      NotDetectedContents: {
        h: 'Impossible de déterminer votre emplacement',
        p: `Nous ne pouvons pas détecter votre emplacement, mais il semble que vous naviguiez depuis $[currentCountry]. \n Vous pouvez explorer le marché dans votre langue préférée et accéder à toutes les fonctionnalités de notre magasin en ligne. Cependant, vous pourriez faire face à des limitations lors de la sélection de votre adresse lors du paiement, ou il pourrait y avoir des problèmes de livraison avec vos commandes.`,
        keepShopingBtn: { title: 'Continuer dans $[currentCountry]' },
        changeMarketBtn: { title: 'Choisir un autre emplacement' },
      },
    },
  },

  /** Menu Components Localization */
  menu: {
    MenuDrawer: {
      closeBtn: { sr: 'fermer le menu' },
      githubMonorepoLink: 'Aller au Monorepo',
      githubRepoLink: 'Repo International',
    },

    MenuTrigger: { sr: 'Ouvrir le navigateur de menu' },
  },

  /** Product Components Localization */
  product: {
    Description: {
      title: 'Description',
      mock: {
        warning: [
          'Cette description de produit a été générée par ChatGPT, et certaines images de produit ont été créées avec Midjourney.',
          'Les descriptions de produit fournies par Shopify sont généralement brèves ou inexistantes, donc nous les remplaçons par du texte généré automatiquement. Si vous souhaitez utiliser les données réelles de Shopify, vous pouvez décommenter le code dans le composant Description et supprimer les descriptions actuellement générées.',
        ],
        summary: {
          intro:
            'Prêt à conquérir les montagnes en hiver ? Expérimentez un contrôle inégalé sur toute pente avec notre Snowboard de Performance Ultime. Adapté à tous les niveaux de riders, du débutant au pro, ce board vous assure de performer au mieux sur la neige.',
          outro: `Que vous fassiez du carving sur des pistes damées, exploriez des terrains en backcountry ou passiez du temps dans le park, notre snowboard offre la polyvalence et la performance dont vous avez besoin. Son design innovant combine la dernière technologie en matière de snowboard avec un style intemporel, le rendant le choix parfait pour le rider exigeant.`,
        },
        features: {
          title: 'Caractéristiques',
          li: [
            'Agilité améliorée avec des matériaux de noyau légers',
            'Design optimisé pour toutes les conditions de montagne',
            "Fabriqué avec des matériaux durables, contribuant à la conservation de l'environnement",
            'Contrôle des bords avancé pour des virages serrés et la gestion de la vitesse',
            'Fixations personnalisables pour un confort et une position personnalisés',
          ],
        },
        specifications: {
          title: 'Spécifications',
          li: [
            'Options de longueur : 155cm / 160cm / 165cm',
            'Largeur : Moyenne',
            'Type : Tout-terrain / Freestyle',
            'Flexibilité : Moyenne à rigide, pour des réponses rapides',
            'Base : Frittée pour une grande vitesse et durabilité',
          ],
        },
      },
    },

    VariantSelector: { title: 'Sélectionner les options' },

    Recommendations: { title: 'Recommandations' },
  },

  /** Search Components Localization */
  search: {
    SearchIconTrigger: { sr: 'ouvrir le panneau de recherche' },

    SearchFakeInputTrigger: { sr: 'cliquer & ouvrir le panneau de recherche', placeholder: 'Rechercher...' },

    SearchModal: {
      input: { sr: 'rechercher des articles', placeholder: 'Rechercher...' },
      closeBtn: { sr: 'fermer le panneau de recherche' },
      noResult: { title: 'Aucun résultat trouvé' },
    },

    SearchResult: {
      summary: `Affichage de $[number] 'produits' pour $[query]`,
    },
  },

  FloatingActionBtn: { sr: 'Aller à github' },

  pages: {
    Main: {
      information: {
        h: 'Exemple de boutique personnalisée Shopify',
        p: "Cette application est conçue pour démontrer l'utilisation de l'API Shopify dans différentes langues et pays, en présentant principalement les données fournies par Shopify.",
      },
    },
  },
} as const;

export default fr;
