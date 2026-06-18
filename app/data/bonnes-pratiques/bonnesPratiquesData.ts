export type BonnePratiqueCard = {
  id: string;
  title: string;
  icon: string;
  items: string[];
};

export const BONNES_PRATIQUES_CARDS: BonnePratiqueCard[] = [
  {
    id: 'visuel',
    title: 'Handicaps visuels',
    icon: '/handicaps/chrome/Visuel1.png',
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
