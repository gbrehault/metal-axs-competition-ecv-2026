export type HandicapData = {
  id: string;
  label: string;
  image: string;
  practicesTitle: {
    line1: string;
    line2: string;
    highlight: string;
  };
  description: string[];
  besoins: {
    intro: string;
    items: string[];
  };
  amenagements: {
    intro: string;
    items: string[];
  };
};

export const HANDICAPS_DATA: HandicapData[] = [
  {
    id: 'auditif',
    label: 'Auditif',
    image: '/handicaps/chrome/Auditif1.png',
    practicesTitle: {
      line1: 'Les bonnes pratiques',
      line2: 'à adopter pour les',
      highlight: 'handicaps auditifs',
    },
    description: [
      "Le handicap auditif concerne toutes les personnes malentendantes ou sourdes. On imagine souvent qu'un festival de musique est par définition inaccessible pour elles — c'est faux. Mais les obstacles sont réels : annonces micro non sous-titrées, changes d'horaires affichés sur écran sonore, échanges compliqués dans un environnement bruyant.",
      'Pourtant, ressentir la musique est possible autrement : via des plateformes vibrantes, des boucles à induction magnétique, du surtitrage, une interprétation LSF, et des informations toujours disponibles en version écrite.',
    ],
    besoins: {
      intro:
        "Les personnes malentendantes ou sourdes ont besoin d'accéder à l'information et à l'expérience musicale par d'autres canaux que l'ouïe. Voici les besoins essentiels à anticiper pour les accueillir dignement.",
      items: [
        "Information sur l'accessibilité du festival disponible en version écrite avant l'événement",
        "Accès à un interprète en Langue des Signes Française (LSF) aux points d'accueil",
        'Sous-titrage en temps réel des annonces diffusées sur les écrans géants',
        'Communication visuelle claire : panneaux, affichages et signalétique sur tout le site',
        'Dispositif de transmission des basses (gilet vibrant ou plateforme vibrante) pour ressentir la musique',
        "Boucle à induction magnétique (BIM) aux points d'information et aux caisses",
        'Personnel formé à la communication avec les personnes sourdes ou malentendantes',
        "Application ou SMS d'alerte pour les informations importantes en temps réel",
      ],
    },
    amenagements: {
      intro:
        "Pour rendre l'expérience festival pleinement accessible aux personnes sourdes et malentendantes, des aménagements concrets peuvent transformer leur venue. Voici les dispositifs à mettre en place.",
      items: [
        "Interprètes LSF présents sur les temps forts annoncés à l'avance",
        'Surtitrage des annonces sur les écrans de scène',
        "Boucles à induction magnétique aux espaces d'accueil et billetteries",
        "Gilets vibrants disponibles à la location ou en prêt à l'entrée",
        'Plateforme vibrante devant la scène principale',
        'Signalétique visuelle renforcée sur tout le site (flèches, plans, pictogrammes)',
        "Équipes d'accueil formées aux bases de la communication en LSF",
        "Rubrique accessibilité auditive clairement identifiée sur le site web et l'appli",
      ],
    },
  },
  {
    id: 'visuel',
    label: 'Visuel',
    image: '/handicaps/chrome/Visuel1.png',
    practicesTitle: {
      line1: 'Les bonnes pratiques',
      line2: 'à adopter pour les',
      highlight: 'handicaps visuels',
    },
    description: [
      "Le handicap visuel touche toutes les personnes ayant des difficultés à voir, qu'elles soient malvoyantes ou non voyantes. Sur un festival, s'orienter sur un site inconnu, trouver les scènes, les toilettes ou les buvettes sans aide extérieure peut relever du défi.",
      "On pense rarement que les plans en image sont inutilisables avec un lecteur d'écran, que les entrées de chiens guides peuvent poser problème. Des réponses concrètes existent pourtant : bandes de guidage, plans tactiles, signalétique en grands caractères et accompagnateurs disponibles.",
    ],
    besoins: {
      intro:
        'Les personnes malvoyantes ou non voyantes ont besoin de repères physiques et sonores pour se déplacer en autonomie sur le site. Voici les besoins fondamentaux à considérer lors de la conception du festival.',
      items: [
        "Information accessible en amont du festival : site web compatible avec les lecteurs d'écran",
        "Acceptation des chiens guides sur l'intégralité du site, sans restriction",
        "Accompagnateurs humains disponibles à l'entrée et aux points clés du site",
        'Signalétique à fort contraste et en grands caractères sur tout le parcours',
        "Plans du site disponibles en version audio ou tactile à l'entrée",
        'Bandes podotactiles guidant vers les zones principales (scène, sanitaires, sorties)',
        'Annonces sonores régulières pour les informations importantes',
        'Tarif accompagnateur gratuit ou réduit',
      ],
    },
    amenagements: {
      intro:
        "Aménager un festival pour les personnes déficientes visuelles, c'est leur permettre de se repérer, de circuler et de profiter de l'événement sans dépendre entièrement d'une tierce personne.",
      items: [
        'Bandes podotactiles au sol entre les zones principales du site',
        "Plans tactiles disponibles à l'entrée avec description audio via QR code",
        "Signalétique en braille et grands caractères sur les points d'information",
        "Service d'accompagnateur humain disponible à l'accueil sur demande préalable",
        'Audiodescription pour certaines performances artistiques annoncées en avance',
        'Annonces sonores régulières sur les écrans et haut-parleurs de scène',
        "Site web et appli du festival compatibles avec les lecteurs d'écran (WCAG 2.1 AA)",
        "Zone prioritaire d'accueil dédiée à l'entrée pour éviter les attentes en foule",
      ],
    },
  },
  {
    id: 'moteur',
    label: 'Moteur',
    image: '/handicaps/chrome/Moteur1.png',
    practicesTitle: {
      line1: 'Les bonnes pratiques',
      line2: 'à adopter pour les',
      highlight: 'handicaps moteurs',
    },
    description: [
      'Le handicap moteur regroupe toutes les difficultés liées au mouvement et à la mobilité. En fauteuil roulant, avec des béquilles ou simplement avec une mobilité réduite, un festival peut vite devenir un parcours du combattant.',
      "On pense souvent aux rampes d'accès, mais on oublie les sols en gravier, les files d'attente debout, les comptoirs trop hauts, ou l'absence de visibilité sur scène pour une personne assise. Des solutions existent pour chaque étape du parcours.",
    ],
    besoins: {
      intro:
        "Rendre un festival accessible aux personnes en situation de handicap moteur demande une réflexion globale, depuis l'arrivée sur site jusqu'au retour chez soi. Voici les aménagements essentiels à prévoir.",
      items: [
        "Information sur l'accessibilité des transports pour se rendre au festival",
        "Stationnement réservé à proximité immédiate de l'entrée et/ou navette reliant les parkings aux accès du site",
        'Cheminements accessibles clairement indiqués, sans marches',
        'Plaques de roulage pour éviter les terrains glissants, boueux ou accidentés',
        'Plateformes dédiées aux personnes en fauteuil roulant et à leurs accompagnants',
        'Pentes inférieures à 5% sur les longues montées pour les fauteuils manuels',
        'Comptoirs abaissés aux buvettes, bars et stands pour les personnes en fauteuil',
        'Cabines de toilettes adaptées, accessibles et bien situées sur le site',
        'Bornes de recharge et de réparation pour fauteuils électriques',
        'Mains courantes le long des cheminements principaux',
        "Points d'étape pour faire des pauses tout au long du parcours",
        'Recensement des hébergements accessibles à proximité du festival',
      ],
    },
    amenagements: {
      intro:
        "Pour les personnes à mobilité réduite, l'accessibilité d'un festival se joue sur la totalité du parcours. Chaque détail compte, de l'arrivée en voiture jusqu'à la vue sur scène.",
      items: [
        'Cheminements stabilisés et continus entre toutes les zones du site',
        'Zones réservées surélevées avec vue dégagée devant chaque scène',
        'Sanitaires adaptés (PMR) à proximité des zones de spectacle',
        'Navette électrique pour les longues distances sur le site',
        "Parking PMR signalé et à distance réduite de l'entrée",
        'Comptoirs abaissés aux points de restauration et de billetterie',
        "Sièges disponibles dans les espaces de restauration et d'attente",
        "Signalétique avec pictogrammes d'accessibilité sur tout le parcours",
      ],
    },
  },
  {
    id: 'cognitif',
    label: 'Cognitif',
    image: '/handicaps/chrome/Mental1.png',
    practicesTitle: {
      line1: 'Les bonnes pratiques',
      line2: 'à adopter pour les',
      highlight: 'handicaps cognitifs',
    },
    description: [
      "Le handicap cognitif recouvre les difficultés de compréhension, de mémorisation ou de traitement de l'information, comme dans le cas de l'autisme, de la trisomie ou des troubles DYS.",
      "L'environnement festival concentre tout ce qui peut être difficile : foule, bruit permanent, lumières stroboscopiques, imprévus, signalétique confuse. Ne pas savoir à quoi s'attendre peut suffire à empêcher quelqu'un de venir.",
    ],
    besoins: {
      intro:
        "Les personnes en situation de handicap cognitif ont besoin de prévisibilité, de clarté et d'un environnement rassurant. Voici les besoins à anticiper pour les accueillir dans de bonnes conditions.",
      items: [
        "Information préalable détaillée sur le déroulement et l'environnement du festival",
        'Communication rédigée en langage clair et simple (FALC)',
        'Signalétique avec pictogrammes universels lisibles à distance',
        'Espaces calmes et retirés accessibles librement en cas de surcharge sensorielle',
        "Personnel formé à l'accompagnement bienveillant des personnes avec handicap cognitif",
        'Programmation des horaires respectée et tout changement communiqué clairement',
        'Zones à faible affluence identifiées pour les personnes sensibles à la foule',
        "Kits sensoriels disponibles à l'accueil (casque anti-bruit, lunettes teintées)",
      ],
    },
    amenagements: {
      intro:
        "Accueillir les personnes avec un handicap cognitif, c'est avant tout leur permettre de préparer leur venue et de gérer les imprévus. Des aménagements simples changent radicalement l'expérience.",
      items: [
        'Carnet de visite envoyé en amont avec photos du site et déroulé de la journée',
        'Espaces calmes dédiés signalés et accessibles sans justification',
        "Kits sensoriels prêtés à l'entrée (casque anti-bruit, lunettes filtrantes, fidget)",
        'Créneaux à faible affluence identifiés et communiqués',
        'Signalétique FALC (Facile À Lire et à Comprendre) sur tout le site',
        'Personnel spécifiquement formé aux situations de détresse cognitive',
        'Suppression ou signalement clair des effets stroboscopiques sur les scènes',
        'Application ou guide papier avec plan simple et pictogrammes',
      ],
    },
  },
  {
    id: 'invisible',
    label: 'Invisible',
    image: '/handicaps/chrome/Invisible1.png',
    practicesTitle: {
      line1: 'Les bonnes pratiques',
      line2: 'à adopter pour les',
      highlight: 'handicaps invisibles',
    },
    description: [
      'Le handicap psychique regroupe les troubles durables de la santé mentale — anxiété sévère, troubles bipolaires, schizophrénie, dépression profonde. Il est souvent invisible, ce qui le rend particulièrement mal compris.',
      'Sur un festival, les défis sont nombreux : foule imprévisible, impossibilité de partir rapidement, agents de sécurité peu formés, honte de se justifier sans handicap visible. Des aménagements simples changent pourtant beaucoup de choses.',
    ],
    besoins: {
      intro:
        "Les personnes en situation de handicap psychique ont besoin de pouvoir gérer leur niveau d'exposition à la foule et au bruit, et de savoir qu'elles pourront quitter une situation difficile à tout moment.",
      items: [
        'Accès prioritaire sans avoir à justifier visuellement son handicap',
        'Connaissance préalable des sorties de secours et voies de repli sur le site',
        'Espaces de retrait calmes accessibles sans demande préalable',
        "Personnel formé à la discrétion et à l'écoute non intrusive",
        'Acceptation de la Carte Mobilité Inclusion (CMI) mention invalidité',
        'Tarif accompagnateur gratuit ou réduit',
        'Communication bienveillante qui reconnaît explicitement les handicaps invisibles',
        'Possibilité de prévoir une sortie rapide sans franchir de zones bondées',
      ],
    },
    amenagements: {
      intro:
        "Rendre un festival accessible aux personnes en situation de handicap psychique, c'est créer des espaces de respiration et former des équipes capables de détecter et d'accompagner discrètement.",
      items: [
        "File d'entrée prioritaire acceptant la CMI sans justification supplémentaire",
        'Espaces de retrait calmes signalés sur le plan et accessibles librement',
        "Personnel de sécurité et d'accueil formé aux situations de détresse psychique",
        'Communication qui nomme explicitement les handicaps psychiques et invisibles',
        'Cheminements de sortie dégagés et signalés pour faciliter un départ rapide',
        "Présence d'un référent médical ou psychologique disponible sur le site",
        'Réduction ou suppression des stimulations sonores/visuelles agressives dans les zones de passage',
        "Application ou messagerie permettant de signaler un besoin d'aide discrètement",
      ],
    },
  },
];

export function getHandicapById(id: string): HandicapData | undefined {
  return HANDICAPS_DATA.find((h) => h.id === id);
}
