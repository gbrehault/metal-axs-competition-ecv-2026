export type HandicapCardBase = {
  id: string;
  title: string;
  image: string;
};

export const HANDICAP_CARDS_BASE: HandicapCardBase[] = [
  { id: 'auditif', title: 'Handicap\nAuditif', image: '/handicaps/auditif.svg' },
  { id: 'visuel', title: 'Handicap\nVisuel', image: '/handicaps/visuel.svg' },
  { id: 'moteur', title: 'Handicap\nMoteur', image: '/handicaps/moteur.svg' },
  { id: 'cognitif', title: 'Handicap\nCognitif', image: '/handicaps/cognitif.svg' },
  { id: 'invisible', title: 'Handicap\nInvisible', image: '/handicaps/Invisible-psychique.svg' },
];
