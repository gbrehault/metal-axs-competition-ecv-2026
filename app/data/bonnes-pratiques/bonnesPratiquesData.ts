export type BonnePratiqueCard = {
  id: string;
  title: string;
  icon: string;
  intro: string;
  items: string[];
};

export const BONNES_PRATIQUES_CARDS: BonnePratiqueCard[] = [
  {
    id: 'visuel',
    title: 'Handicaps visuels',
    icon: '/handicaps/chrome/VIsuel1.png',
    intro:
      "Sur un festival, s'orienter sur un site inconnu et trouver les scènes ou les buvettes sans aide extérieure peut être difficile. Ces pratiques permettent aux festivaliers malvoyants ou non voyants de profiter de l'événement en autonomie.",
    items: [
      'Signalétique en gros caractères et en braille, bandes de guidage au sol vers les points-clés.',
      'Audiodescription ou médiation humaine pour certains spectacles/expositions.',
      'Plans tactiles ou maquettes du site, visites tactiles des scénographies/installations.',
      'Accès facilité pour chiens guides, accompagnateurs disponibles sur demande.',
    ],
  },
  {
    id: 'auditif',
    title: 'Handicap auditif',
    icon: '/handicaps/chrome/Auditif1.png',
    intro:
      "Ressentir la musique est possible autrement. Ces dispositifs et pratiques permettent aux personnes sourdes ou malentendantes d'accéder à l'expérience musicale et à toutes les informations du festival.",
    items: [
      "Boucles à induction magnétique aux points d'information et zones d'écoute.",
      "Interprétation en langue des signes (LSF) sur certains concerts/temps forts, annoncée à l'avance.",
      "Surtitrage ou affichage LSF des annonces (changements d'horaires, sécurité).",
      'Dispositifs vibrants/sensoriels pour ressentir la musique (plateformes, gilets vibrants).',
    ],
  },
  {
    id: 'moteur',
    title: 'Handicaps moteurs',
    icon: '/handicaps/chrome/Moteur1.png',
    intro:
      "Des sols stabilisés aux sanitaires adaptés, chaque étape du parcours festival doit être pensée pour les personnes à mobilité réduite. Ces aménagements couvrent l'ensemble du séjour, de l'arrivée au départ.",
    items: [
      'Cheminements stabilisés et sans marches entre les différents espaces.',
      'Zones de spectacle surélevées ou réservées en fauteuil avec vue dégagée sur la scène.',
      'Sanitaires adaptés et comptoirs (bar, billetterie, stands) à hauteur accessible.',
      "Parking PMR proche de l'entrée et navette accessible si le site est étendu.",
    ],
  },
  {
    id: 'cognitif',
    title: 'Handicaps cognitifs & troubles psychiques',
    icon: '/handicaps/chrome/Mental1.png',
    intro:
      "La foule, le bruit permanent et les imprévus peuvent être particulièrement difficiles à gérer. Ces pratiques permettent aux personnes avec un handicap cognitif de préparer leur venue et de traverser l'événement sereinement.",
    items: [
      'Espaces calmes/sensoriels en retrait du bruit et de la foule, accessibles à tout moment.',
      'Kits sensoriels disponibles (casques anti-bruit, lunettes teintées, balles antistress).',
      "Signalétique pictographique claire sur l'ensemble du site.",
      'Carnet de visite/photos du lieu envoyés en amont pour préparer la venue.',
      'Créneaux ou horaires "affluence réduite" identifiés pour les visiteurs sensibles au bruit/à la foule.',
    ],
  },
  {
    id: 'invisible',
    title: 'Handicaps invisibles & troubles psychiques',
    icon: '/handicaps/chrome/Invisible1.png',
    intro:
      "Le handicap psychique est souvent invisible, ce qui le rend particulièrement mal compris. Ces pratiques permettent d'accueillir dignement les personnes concernées sans les obliger à se justifier visuellement.",
    items: [
      "File d'attente prioritaire avec la Carte Mobilité Inclusion (CMI), sans justification supplémentaire.",
      'Personnel formé à repérer et accompagner discrètement les besoins non visibles.',
      'Accès libre aux espaces calmes pour toute personne qui en ressent le besoin.',
    ],
  },
];

export const SPECIAL_CARD = {
  title: "Un doute sur l'accessibilité de votre festival ?",
  description:
    "Faites tester votre site web ainsi que vos infrastructures physiques par l'équipe de Metal AXS pour obtenir votre label d'accessibilité",
  downloadHref: '/documents/guide-accessibilite-metal-axs.pdf',
  downloadLabel: 'Télécharger',
} as const;

// ─── Domain-based data for the search interface ──────────────────────────────

export type BPDomain = {
  id: string;
  title: string;
  iconKey: string;
};

export type BPRecommandation = {
  id: string;
  domainId: string;
  description: string;
  profiles: string[];
};

export const BP_DOMAINS: BPDomain[] = [
  { id: 'billetterie', title: 'Billetterie & réservation', iconKey: 'ticket' },
  { id: 'hebergement', title: 'Hébergement & camping', iconKey: 'tent' },
  { id: 'cheminements', title: 'Cheminements & circulation', iconKey: 'footprints' },
  { id: 'information', title: 'Information & site web', iconKey: 'globe' },
  { id: 'transport', title: 'Transport & stationnement', iconKey: 'bus' },
  { id: 'spectacle', title: 'Espaces de spectacle', iconKey: 'music' },
  { id: 'restauration', title: 'Restauration & buvettes', iconKey: 'fork' },
  { id: 'sante', title: 'Santé & assistance', iconKey: 'firstaid' },
];

export const BP_RECOMMANDATIONS: BPRecommandation[] = [
  // Billetterie
  { id: 'bill-1', domainId: 'billetterie', description: "File prioritaire avec la Carte Mobilité Inclusion (CMI), sans justification supplémentaire ni obligation de signalement.", profiles: ['moteur', 'visuel', 'invisible'] },
  { id: 'bill-2', domainId: 'billetterie', description: "Site de billetterie en ligne conforme WCAG AA : navigation clavier, contraste suffisant, alternatives textuelles.", profiles: ['visuel', 'cognitif'] },
  { id: 'bill-3', domainId: 'billetterie', description: "Option « préciser ses besoins » à l'inscription : type de handicap, accompagnateur, fauteuil roulant, chien guide.", profiles: ['moteur', 'visuel', 'auditif', 'cognitif', 'invisible'] },

  // Hébergement
  { id: 'heb-1', domainId: 'hebergement', description: "Emplacements de camping PMR stabilisés et plats, proches des sanitaires adaptés et de l'entrée principale.", profiles: ['moteur'] },
  { id: 'heb-2', domainId: 'hebergement', description: "Sanitaires PMR répartis sur l'ensemble du camping, avec espace de retournement et barres d'appui.", profiles: ['moteur'] },
  { id: 'heb-3', domainId: 'hebergement', description: "Hébergements pré-montés (cabanes, tentes de glamping) accessibles de plain-pied, sans escalier.", profiles: ['moteur', 'cognitif'] },

  // Cheminements
  { id: 'chem-1', domainId: 'cheminements', description: "Sols stabilisés, compactés et sans marches sur l'ensemble des cheminements entre les différents espaces.", profiles: ['moteur'] },
  { id: 'chem-2', domainId: 'cheminements', description: "Bandes de guidage podotactiles et balisage sonore vers les points-clés : scènes, sanitaires, sorties.", profiles: ['visuel'] },
  { id: 'chem-3', domainId: 'cheminements', description: "Signalétique pictographique claire et en gros caractères, à hauteur de lecture pour fauteuil roulant.", profiles: ['cognitif', 'visuel', 'moteur'] },
  { id: 'chem-4', domainId: 'cheminements', description: "Plans tactiles ou maquettes du site disponibles à l'accueil ; visite guidée sonore sur demande.", profiles: ['visuel', 'cognitif'] },

  // Information
  { id: 'info-1', domainId: 'information', description: "Site web conforme WCAG AA : navigation clavier, lecteur d'écran, sous-titres vidéo, audiodescription.", profiles: ['visuel', 'cognitif', 'auditif'] },
  { id: 'info-2', domainId: 'information', description: "Boucles à induction magnétique (BIM) aux points d'information et aux caisses de billetterie.", profiles: ['auditif'] },
  { id: 'info-3', domainId: 'information', description: "Carnet de visite illustré (photos du site, plan, horaires) envoyé par e-mail avant l'événement.", profiles: ['cognitif', 'invisible'] },
  { id: 'info-4', domainId: 'information', description: "Affichage LSF et sous-titrage en direct des annonces importantes (sécurité, changements de programme).", profiles: ['auditif'] },

  // Transport
  { id: 'transp-1', domainId: 'transport', description: "Parking PMR signalisé et sécurisé à proximité immédiate de l'entrée principale, gratuit sur présentation de la CMI.", profiles: ['moteur'] },
  { id: 'transp-2', domainId: 'transport', description: "Navette entre le parking et le site avec rampe d'accès, espace fauteuil roulant sécurisé et annonces sonores.", profiles: ['moteur', 'visuel'] },
  { id: 'transp-3', domainId: 'transport', description: "Partenariat avec des services de transport adapté (VSL, taxi PMR) avec tarif préférentiel pour les festivaliers.", profiles: ['moteur', 'visuel'] },

  // Spectacle
  { id: 'spec-1', domainId: 'spectacle', description: "Zones surélevées ou réservées pour fauteuil roulant avec vue dégagée sur la scène, avec emplacements pour accompagnateurs.", profiles: ['moteur'] },
  { id: 'spec-2', domainId: 'spectacle', description: "Dispositifs vibrants (plateformes, gilets haptiques) permettant de ressentir la musique par les vibrations.", profiles: ['auditif'] },
  { id: 'spec-3', domainId: 'spectacle', description: "Interprétation en Langue des Signes Française (LSF) sur certains concerts et temps forts, annoncée au programme.", profiles: ['auditif'] },
  { id: 'spec-4', domainId: 'spectacle', description: "Audiodescription des spectacles visuels et médiation humaine pour les expositions ou installations artistiques.", profiles: ['visuel'] },

  // Restauration
  { id: 'rest-1', domainId: 'restauration', description: "Comptoirs de bar et stands de restauration avec un espace à hauteur accessible (max. 80 cm) pour les personnes en fauteuil.", profiles: ['moteur'] },
  { id: 'rest-2', domainId: 'restauration', description: "Menus en gros caractères ou affichage numérique avec fort contraste ; description audio disponible sur demande.", profiles: ['visuel', 'cognitif'] },
  { id: 'rest-3', domainId: 'restauration', description: "Personnel formé à l'accueil et à la communication avec les personnes sourdes, malentendantes ou non voyantes.", profiles: ['auditif', 'visuel'] },

  // Santé
  { id: 'san-1', domainId: 'sante', description: "Espaces calmes et sensoriels (lumière tamisée, bruit limité) accessibles à tout moment, sans condition.", profiles: ['cognitif', 'invisible'] },
  { id: 'san-2', domainId: 'sante', description: "Kits sensoriels disponibles à l'accueil : casques anti-bruit, lunettes teintées, balles antistress.", profiles: ['cognitif', 'invisible'] },
  { id: 'san-3', domainId: 'sante', description: "Personnel formé à repérer et accompagner discrètement les situations de détresse liées aux handicaps invisibles.", profiles: ['invisible', 'cognitif'] },
  { id: 'san-4', domainId: 'sante', description: "Créneaux à affluence réduite identifiés et communiqués à l'avance pour les personnes sensibles au bruit ou à la foule.", profiles: ['cognitif', 'invisible'] },
];
