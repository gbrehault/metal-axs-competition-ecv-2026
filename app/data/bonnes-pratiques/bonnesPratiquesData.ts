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
    icon: '/handicaps/chrome/Visuel1.png',
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
