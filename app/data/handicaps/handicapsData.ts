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
    id: "auditif",
    label: "Auditif",
    image: "/handicaps/chrome/Auditif1.png",
    practicesTitle: {
      line1: "Les bonnes pratiques",
      line2: "à adopter pour les",
      highlight: "handicaps auditifs",
    },
    description: [
      "Comme pour la déficience visuelle, le champ du handicap auditif est très large. Il concerne officiellement 4 millions de personnes en France et se manifeste sous forme de faible acuité auditive, d'acouphènes ou, plus rarement, de surdité complète. Certaines personnes malentendantes sont appareillées, d'autres non. Certaines pratiquent la Langue des Signes Française, le Langage Parlé Complété et/ou la lecture labiale ; d'autres non.",
      "Il faut garder à l'esprit que le vocabulaire et la syntaxe de la LSF diffèrent totalement du français courant : pour une personne sourde de naissance et élevée en LSF, le français sera une langue étrangère, avec un niveau de maîtrise variable selon les personnes.",
    ],
    besoins: {
      intro:
        "Les personnes malentendantes ou sourdes ont des besoins spécifiques pour accéder à l'information et à l'expérience musicale par d'autres canaux que l'ouïe.",
      items: [
        "Un bon éclairage pour voir les informations écrites et les visages de leurs interlocuteurs",
        "Des espaces de repos, à l'écart du bruit et du brouhaha",
        "Une information visuelle plutôt qu'orale",
      ],
    },
    amenagements: {
      intro:
        "Pour rendre l'expérience festival pleinement accessible aux personnes sourdes et malentendantes, des dispositifs concrets peuvent transformer leur venue.",
      items: [
        "Du papier et un crayon pour écrire ou dessiner en cas d'incompréhension",
        "Des boucles magnétiques connectées aux prothèses auditives, pour amplifier le son et le nettoyer des bruits environnants",
        "Des informations visuelles, du sous-titrage ou du surtitrage des spectacles et vidéos",
        "Une application permettant de retranscrire les discussions, par exemple avec le personnel d'accueil",
        "Un bon éclairage, notamment aux points d'information",
        "Des alertes de sécurité lumineuses (gyrophares...)",
        "Une formation des équipes d'accueil à la Langue des Signes Française",
        "Des interprètes LSF pour les spectacles, conférences et ateliers",
        "Des gilets vibrants permettant de ressentir la musique via des vibrations",
        'Des spectacles "chansignés"',
      ],
    },
  },
  {
    id: "visuel",
    label: "Visuel",
    image: "/handicaps/chrome/Visuel1.png",
    practicesTitle: {
      line1: "Les bonnes pratiques",
      line2: "à adopter pour les",
      highlight: "handicaps visuels",
    },
    description: [
      "Le champ du handicap visuel est extrêmement large. Il touche officiellement 1,3 million de personnes en France, dont seulement 2 à 3% de personnes non-voyantes. Certaines ont une acuité visuelle très faible, ne distinguent pas les couleurs, manquent de vision périphérique ou frontale, ou ne perçoivent que les contrastes lumineux. Parmi elles, 7 à 8 000 personnes utilisent le Braille.",
      "Pour s'orienter, ces personnes s'appuient sur la vision réduite qui leur reste ainsi que sur des indices environnementaux comme les textures, les couleurs contrastantes, les odeurs et les sons.",
    ],
    besoins: {
      intro:
        "Les personnes malvoyantes ou non voyantes ont besoin de repères physiques et sonores pour se déplacer en autonomie sur le site.",
      items: [
        "Une absence d'obstacle sur leur chemin",
        "Un accès simple à l'information",
        "La possibilité de se repérer dans l'espace",
      ],
    },
    amenagements: {
      intro:
        "Aménager un festival pour les personnes déficientes visuelles, c'est leur permettre de se repérer, de circuler et de profiter de l'événement sans dépendre entièrement d'une tierce personne.",
      items: [
        "Un site web et des supports digitaux conformes aux normes d'accessibilité, lisibles par synthèse vocale",
        "Des informations transmises à l'oral",
        "Un cheminement dégagé de tout obstacle",
        "Des mains courantes avec indications en braille",
        "Un guidage au sol et des bandes de vigilance pour prévenir les ruptures de cheminement",
        "Une signalétique bien visible, en gros caractères et aux couleurs contrastées",
        "Une audiodescription des spectacles",
      ],
    },
  },
  {
    id: "moteur",
    label: "Moteur",
    image: "/handicaps/chrome/Moteur1.png",
    practicesTitle: {
      line1: "Les bonnes pratiques",
      line2: "à adopter pour les",
      highlight: "handicaps moteurs",
    },
    description: [
      "Les personnes en situation de handicap moteur ne forment pas un groupe homogène. Elles peuvent être regroupées en trois catégories : celles qui se déplacent en fauteuil roulant, celles qui s'appuient sur une canne, des béquilles ou un déambulateur, et celles qui marchent sans aide mais manquent d'endurance ou de force.",
      "Autant de situations différentes qui appellent des réponses adaptées.",
    ],
    besoins: {
      intro:
        "Rendre un festival accessible aux personnes en situation de handicap moteur demande une réflexion globale, depuis l'arrivée sur site jusqu'au retour chez soi.",
      items: [
        "Des déplacements les plus courts possibles",
        "Des surfaces planes et non glissantes",
        "Un bon éclairage",
        "Une signalétique visible, y compris depuis un fauteuil roulant",
        "La possibilité de faire des pauses dans leurs parcours",
        "La possibilité d'être autonomes dans leur expérience du festival",
        "Des places offrant une bonne visibilité aux personnes en fauteuil roulant",
      ],
    },
    amenagements: {
      intro:
        "Pour les personnes à mobilité réduite, l'accessibilité d'un festival se joue sur la totalité du parcours. Chaque détail compte, de l'arrivée en voiture jusqu'à la vue sur scène.",
      items: [
        "Une information sur l'accessibilité des transports pour se rendre au festival",
        "Un stationnement réservé très près de l'entrée et/ou une navette reliant les parkings aux accès du festival et aux spectacles",
        "Des cheminements accessibles clairement indiqués, sans marches",
        "Des plaques de roulage pour éviter les terrains glissants, boueux ou accidentés",
        "Des plateformes dédiées aux personnes en fauteuil roulant et à leur accompagnant",
        "Des pentes inférieures à 5% sur les longues montées, pour limiter l'effort en fauteuil manuel",
        "Des comptoirs abaissés, utiles aux personnes en fauteuil roulant mais aussi aux personnes de petite taille et aux enfants",
        "Des cabines de toilettes adaptées",
        "Des bornes de recharge et de réparation pour fauteuils électriques",
        "Des mains courantes",
        "Des points d'étape pour faire des pauses",
        "Un recensement des hébergements accessibles à proximité",
      ],
    },
  },
  {
    id: "cognitif",
    label: "Cognitif",
    image: "/handicaps/chrome/Mental1.png",
    practicesTitle: {
      line1: "Les bonnes pratiques",
      line2: "à adopter pour les",
      highlight: "handicaps cognitifs",
    },
    description: [
      "Les personnes atteintes de déficience intellectuelle ont un QI très inférieur à la moyenne. Elles sont officiellement 700 000 en France. Elles éprouvent des difficultés à mobiliser leur attention, à maîtriser le calcul et le raisonnement, à comprendre les informations et, par conséquent, à s'adapter ou se repérer dans un environnement inconnu.",
      "Elles ont besoin d'indices simples : symboles graphiques, couleurs simples, signalétique répétitive et repères clairs.",
    ],
    besoins: {
      intro:
        "Les personnes en situation de déficience intellectuelle ont besoin de clarté, de simplicité et d'un environnement rassurant pour vivre sereinement leur expérience.",
      items: [
        "Un accès à des informations simples",
        "Des contacts calmes et bienveillants",
      ],
    },
    amenagements: {
      intro:
        "Accueillir les personnes avec une déficience intellectuelle, c'est avant tout leur permettre de se repérer facilement et d'interagir sans stress.",
      items: [
        "Des programmes rédigés en français Facile à Lire et à Comprendre (FALC)",
        "Des informations sous forme de pictogrammes (bar, restaurant, toilettes, salles de spectacle, infirmerie, sortie, parking...)",
        "Un personnel d'accueil formé",
      ],
    },
  },
  {
    id: "invisible",
    label: "Invisible",
    image: "/handicaps/chrome/Invisible1.png",
    practicesTitle: {
      line1: "Les bonnes pratiques",
      line2: "à adopter pour les",
      highlight: "handicaps invisibles",
    },
    description: [
      "L'Organisation Mondiale de la Santé estime que 20 à 25% de la population sera touchée par un trouble psychique au cours de sa vie. Ces troubles (addictions, troubles obsessionnels compulsifs, bipolarité, schizophrénie, troubles du comportement alimentaire, anxiété, dépression...) se traduisent par des difficultés de relation à l'autre et font souvent l'objet d'un déni.",
      "Les troubles du spectre autistique, qui concernent selon la Haute Autorité de Santé plus de 100 000 jeunes de moins de 20 ans et 600 000 adultes en France, peuvent quant à eux entraîner des comportements inhabituels et d'importantes difficultés à établir des relations sociales ou à comprendre ce qui n'est pas explicite (sous-entendus, plaisanteries...). Dans les deux cas, l'écoute et l'accueil sont essentiels, et toute situation de stress, d'attente ou de proximité avec la foule doit être réduite au maximum, car potentiellement anxiogène. Le personnel d'accueil doit savoir distinguer l'incivilité, acte volontaire et conscient, de la \"bizarrerie\", qui peut être caractéristique de ces handicaps.",
    ],
    besoins: {
      intro:
        "Les personnes en situation de handicap psychique ou de troubles du spectre autistique ont besoin de pouvoir gérer leur niveau d'exposition à la foule et au bruit, et de savoir qu'elles pourront quitter une situation difficile à tout moment.",
      items: [
        "Un accueil bienveillant et des bénévoles à l'écoute",
        "Des espaces de repos",
        "Des lumières et des bruits peu agressifs",
      ],
    },
    amenagements: {
      intro:
        "Rendre un festival accessible aux personnes en situation de handicap psychique ou autistique, c'est créer des espaces de respiration et former des équipes capables d'accompagner discrètement.",
      items: [
        "Un accueil bienveillant et des bénévoles à l'écoute",
        "Des espaces de repos",
        "Des lumières et des bruits peu agressifs",
      ],
    },
  },
];

export function getHandicapById(id: string): HandicapData | undefined {
  return HANDICAPS_DATA.find((h) => h.id === id);
}
