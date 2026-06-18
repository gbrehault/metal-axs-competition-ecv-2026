export type DiagnosticArticleSection = {
  title: string;
  content: string;
};

export type DiagnosticQuestion = {
  id: number;
  question: string;
  options: string[];
  title: string;
  shortDescription: string;
  imageSrc: string;
  article: {
    title: string;
    imageSrc: string;
    intro: string;
    sections: DiagnosticArticleSection[];
  };
};

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    question: "Un diagnostic d'accessibilité a-t-il déjà été réalisé par un expert indépendant ?",
    options: ['Oui', 'Non', 'Je ne sais pas'],
    title: "Le diagnostic d'accessibilité, c'est quoi ?",
    shortDescription:
      'Rendre accessible un équipement existant coûte bien plus cher que de le penser accessible dès le départ.',
    imageSrc: '/questionnaire/Q1.png',
    article: {
      title: "Le diagnostic d'accessibilité, c'est quoi ?",
      imageSrc: '/questionnaire/Q1.png',
      intro:
        "Rendre accessible un équipement existant coûte bien plus cher que de le penser accessible dès le départ. Le diagnostic est ce qui rend cette anticipation possible. Concrètement, c'est un état des lieux complet de votre festival qui identifie les freins rencontrés par les publics en situation de handicap, à chaque étape de leur parcours : achat du billet, arrivée sur site, circulation, accès aux scènes, sanitaires, restauration et information.",
      sections: [
        {
          title: 'Pourquoi réaliser un diagnostic ?',
          content:
            "Un festival se construit souvent dans l'urgence, avec des contraintes de site, de budget et de temps. Le diagnostic permet d'identifier les points bloquants en amont, de les hiérarchiser et de planifier les aménagements au bon moment.",
        },
        {
          title: 'Qui le réalise ?',
          content:
            "Le diagnostic peut être mené en interne avec une grille d'auto-évaluation, ou confié à un expert indépendant qui apporte un regard extérieur, une expertise réglementaire et une légitimité utile.",
        },
      ],
    },
  },
  {
    id: 2,
    question: 'Avez-vous désigné un référent accessibilité au sein de votre organisation ?',
    options: ['Oui', 'Non', 'Je ne sais pas'],
    title: "Le référent accessibilité, c'est quoi ?",
    shortDescription: "C'est la personne qui pilote la démarche d'accessibilité du festival.",
    imageSrc: '/questionnaire/Q2.png',
    article: {
      title: "Le référent accessibilité, c'est quoi ?",
      imageSrc: '/questionnaire/Q2.png',
      intro:
        "C'est la personne qui pilote la démarche d'accessibilité du festival. L'accessibilité touche tous les pôles : communication, billetterie, accueil, logistique, technique, restauration et programmation.",
      sections: [
        {
          title: 'Son rôle',
          content:
            "Il centralise les besoins, fait le lien entre les équipes, dialogue avec les associations et veille à ce que l'accessibilité ne soit pas oubliée.",
        },
        {
          title: 'Pourquoi le désigner ?',
          content:
            'Un point de contact clair évite la dilution des responsabilités et facilite les échanges avec les festivaliers en situation de handicap.',
        },
      ],
    },
  },
  {
    id: 3,
    question:
      'Les cheminements vers les zones principales sont-ils accessibles aux personnes à mobilité réduite ?',
    options: ['Oui', 'Non', 'Je ne sais pas'],
    title: "Un cheminement accessible, c'est quoi ?",
    shortDescription:
      'Il permet de circuler de façon autonome et sécurisée entre les points clés du site.',
    imageSrc: '/questionnaire/Q3.png',
    article: {
      title: "Un cheminement accessible, c'est quoi ?",
      imageSrc: '/questionnaire/Q3.png',
      intro:
        'Un cheminement accessible permet à une personne en fauteuil, avec une poussette ou à mobilité réduite de circuler de façon autonome et sécurisée entre les points clés du site.',
      sections: [
        {
          title: 'Les obstacles fréquents',
          content:
            'Herbe, gravier, boue, câbles, dénivelés ou marches temporaires peuvent rendre certaines zones inaccessibles.',
        },
        {
          title: 'Les zones à relier',
          content:
            'Les entrées, scènes, sanitaires adaptés, zones de restauration et postes de secours doivent être reliés par un parcours continu.',
        },
      ],
    },
  },
  {
    id: 4,
    question: 'Disposez-vous de sanitaires adaptés aux personnes en situation de handicap ?',
    options: ['Oui', 'Non', 'Je ne sais pas'],
    title: "Les sanitaires adaptés, c'est quoi ?",
    shortDescription:
      'Ce sont des toilettes utilisables en autonomie par une personne à mobilité réduite.',
    imageSrc: '/questionnaire/Q4.png',
    article: {
      title: "Les sanitaires adaptés, c'est quoi ?",
      imageSrc: '/questionnaire/Q4.png',
      intro:
        "Ce sont des toilettes conçues pour être utilisées en autonomie par une personne en fauteuil roulant ou à mobilité réduite : espace de manœuvre, barres d'appui et accès de plain-pied.",
      sections: [
        {
          title: 'Ce qu’il faut prévoir',
          content:
            "Un espace de rotation, une barre d'appui, une hauteur d'assise correcte, une porte facile à ouvrir et un cheminement stable.",
        },
        {
          title: 'L’entretien compte aussi',
          content:
            'Un sanitaire adapté mal entretenu ou utilisé comme stockage devient inaccessible dans les faits.',
        },
      ],
    },
  },
  {
    id: 5,
    question: 'Une billetterie dédiée ou un tarif accompagnateur est-il proposé ?',
    options: ['Oui', 'Non', 'Je ne sais pas'],
    title: "La billetterie accessible, c'est quoi ?",
    shortDescription:
      "Elle permet d'acheter sa place facilement et de venir accompagné si nécessaire.",
    imageSrc: '/questionnaire/Q5.png',
    article: {
      title: "La billetterie accessible, c'est quoi ?",
      imageSrc: '/questionnaire/Q5.png',
      intro:
        "C'est l'ensemble des dispositions qui permettent à une personne en situation de handicap d'acheter sa place facilement et de venir accompagnée si elle en a besoin.",
      sections: [
        {
          title: 'Tarif accompagnateur',
          content:
            "Un tarif gratuit ou réduit pour l'accompagnateur lève un frein financier important.",
        },
        {
          title: 'Parcours d’achat',
          content:
            "Le site de billetterie doit être clair, compréhensible et accompagné d'informations accessibles.",
        },
      ],
    },
  },
  {
    id: 6,
    question: 'Des places ou zones de visibilité réservées sont-elles prévues face aux scènes ?',
    options: ['Oui', 'Non', 'Je ne sais pas'],
    title: "Les zones de visibilité réservées, c'est quoi ?",
    shortDescription: 'Ce sont des espaces qui garantissent une vue dégagée sur le spectacle.',
    imageSrc: '/questionnaire/Q6.png',
    article: {
      title: "Les zones de visibilité réservées, c'est quoi ?",
      imageSrc: '/questionnaire/Q6.png',
      intro:
        'Ce sont des espaces aménagés face aux scènes, souvent surélevés, qui garantissent aux personnes en fauteuil ou à mobilité réduite une vue dégagée sur le spectacle.',
      sections: [
        {
          title: 'Pourquoi c’est important ?',
          content: 'Dans une foule debout, une personne assise en fauteuil ne voit souvent rien.',
        },
        {
          title: 'À prévoir',
          content:
            "Un accès adapté, une capacité suffisante et la possibilité d'accueillir un accompagnateur.",
        },
      ],
    },
  },
  {
    id: 7,
    question:
      "Vos supports de communication intègrent-ils des informations d'accessibilité claires ?",
    options: ['Oui', 'Non', 'Je ne sais pas'],
    title: "La communication accessible, c'est quoi ?",
    shortDescription: 'Elle rend visibles les informations utiles pour préparer et vivre sa venue.',
    imageSrc: '/questionnaire/Q7.png',
    article: {
      title: "La communication accessible, c'est quoi ?",
      imageSrc: '/questionnaire/Q7.png',
      intro:
        "C'est le fait de rendre visibles et compréhensibles toutes les informations dont une personne en situation de handicap a besoin pour préparer et vivre sa venue.",
      sections: [
        {
          title: 'Avant l’événement',
          content:
            'Une rubrique accessibilité claire permet aux festivaliers concernés de venir en confiance.',
        },
        {
          title: 'Sur place',
          content:
            'La signalétique doit être lisible, contrastée, bien placée et accompagnée de pictogrammes universels.',
        },
      ],
    },
  },
  {
    id: 8,
    question:
      "Votre personnel et vos bénévoles sont-ils sensibilisés à l'accueil des publics en situation de handicap ?",
    options: ['Oui', 'Non', 'Je ne sais pas'],
    title: "La sensibilisation des équipes, c'est quoi ?",
    shortDescription: 'Elle prépare les équipes à accueillir correctement les publics concernés.',
    imageSrc: '/questionnaire/Q8.png',
    article: {
      title: "La sensibilisation des équipes, c'est quoi ?",
      imageSrc: '/questionnaire/Q8.png',
      intro:
        "C'est le fait de préparer le personnel et les bénévoles à accueillir et à aider correctement les publics en situation de handicap, avec les bons réflexes et la bonne posture.",
      sections: [
        {
          title: 'Pourquoi former les équipes ?',
          content:
            'Les meilleurs aménagements ne suffisent pas si les équipes ne savent pas comment réagir.',
        },
        {
          title: 'Les bons réflexes',
          content:
            "Savoir proposer son aide sans l'imposer, communiquer simplement et orienter vers les bons dispositifs.",
        },
      ],
    },
  },
  {
    id: 9,
    question: 'Des dispositifs sont-ils prévus pour les handicaps sensoriels ?',
    options: ['Oui', 'Non', 'Je ne sais pas'],
    title: "L'accessibilité sensorielle, c'est quoi ?",
    shortDescription:
      'Elle permet aux personnes sourdes, malentendantes, aveugles ou malvoyantes de profiter du festival.',
    imageSrc: '/questionnaire/Q9.png',
    article: {
      title: "L'accessibilité sensorielle, c'est quoi ?",
      imageSrc: '/questionnaire/Q9.png',
      intro:
        'Ce sont les dispositifs qui permettent aux personnes sourdes, malentendantes, aveugles ou malvoyantes de profiter pleinement du festival, au-delà de la seule accessibilité physique.',
      sections: [
        {
          title: 'Pour les personnes sourdes ou malentendantes',
          content:
            "Interprétation LSF, boucles magnétiques ou gilets vibrants peuvent améliorer l'expérience.",
        },
        {
          title: 'Pour les personnes déficientes visuelles',
          content:
            'Signalétique contrastée, informations audio et accompagnement humain peuvent être essentiels.',
        },
      ],
    },
  },
  {
    id: 10,
    question: 'Un parking adapté et une dépose-minute sont-ils prévus à proximité de l’entrée ?',
    options: ['Oui', 'Non', 'Je ne sais pas'],
    title: "Le stationnement adapté, c'est quoi ?",
    shortDescription: "Il facilite l'arrivée et le départ des personnes à mobilité réduite.",
    imageSrc: '/questionnaire/Q10.png',
    article: {
      title: "Le stationnement adapté, c'est quoi ?",
      imageSrc: '/questionnaire/Q10.png',
      intro:
        "C'est un ensemble de dispositions — places réservées, dépose-minute, cheminement court — qui facilitent l'arrivée et le départ des personnes à mobilité réduite.",
      sections: [
        {
          title: 'Parking adapté',
          content: "Les places doivent être larges, signalées et situées au plus près de l'entrée.",
        },
        {
          title: 'Dépose-minute',
          content:
            "Une dépose-minute proche de l'entrée permet à un accompagnateur de déposer une personne avant d'aller se garer.",
        },
      ],
    },
  },
];
