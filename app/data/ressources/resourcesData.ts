export type RessourceData = {
  id: string;
  title: string;
  description: string;
  downloadHref: string;
  consultHref: string;
};

export const RESSOURCES_DATA: RessourceData[] = [
  {
    id: 'guide-pratique',
    title: 'Guide Pratique',
    description:
      "Toutes les recommandations du label réunies dans un document pratique pour vous accompagner étape par étape dans la mise en accessibilité de votre festival.",
    downloadHref: '/GUIDE-PRATIQUE.pdf',
    consultHref: '/GUIDE-PRATIQUE.pdf',
  },
  {
    id: 'pack-signaletique',
    title: 'Pack Signalétique',
    description:
      "Un ensemble de visuels prêts à l'emploi pour indiquer clairement les aménagements accessibles sur votre site, à télécharger et imprimer librement.",
    downloadHref: '/SIGNALÉTIQUE ET PICTOGRAMMES.zip',
    consultHref: '/SIGNALÉTIQUE ET PICTOGRAMMES.zip',
  },
];
