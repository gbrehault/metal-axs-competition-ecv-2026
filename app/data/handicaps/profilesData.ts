export type HandicapProfile = {
  id: string;
  nav: string;
  title: string;
  description: string;
  image: string;
};

export const HANDICAP_PROFILES: HandicapProfile[] = [
  {
    id: 'moteur',
    nav: 'Handicap moteur',
    title: 'Moteur',
    description:
      'Toute difficulté à se déplacer ou à effectuer certains gestes du quotidien, que ce soit en fauteuil roulant ou pour des mouvements plus précis.',
    image: '/handicaps/moteur.svg',
  },
  {
    id: 'visuel',
    nav: 'Handicap visuel',
    title: 'Visuel',
    description:
      "Une perte partielle ou totale de la vision, qu'il s'agisse de malvoyance légère ou de cécité complète, impactant la lecture, l'orientation et la navigation.",
    image: '/handicaps/visuel.svg',
  },
  {
    id: 'auditif',
    nav: 'Handicap auditif',
    title: 'Auditif',
    description:
      "Une perte d'audition partielle ou totale, de la surdité légère à profonde, nécessitant des adaptations pour l'accès à l'information sonore.",
    image: '/handicaps/auditif.svg',
  },
  {
    id: 'cognitif',
    nav: 'Handicap cognitif/mental',
    title: 'Cognitif / Mental',
    description:
      'Des troubles affectant les fonctions cognitives : mémoire, concentration, compréhension, incluant les troubles DYS, TDAH, trisomie ou déficience intellectuelle.',
    image: '/handicaps/cognitif.svg',
  },
  {
    id: 'invisible',
    nav: 'Handicaps invisibles / troubles psychiques',
    title: 'Invisibles',
    description:
      'Des maladies chroniques, troubles psychiques ou douleurs qui ne se voient pas mais impactent profondément le quotidien : épilepsie, troubles anxieux, fibromyalgie.',
    image: '/handicaps/Invisible-psychique.svg',
  },
];
