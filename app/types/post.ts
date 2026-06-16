export type Post = {
  id: string;
  slug: string;
  title: string;
  uri: string;
  excerpt: string | null;
  date: string;
  article?: {
    fieldGroupName?: string;
    titreArticle?: string | null;
    contenuArticle?: string | null;
    imageArticle?: {
      node?: {
        altText?: string | null;
        sourceUrl?: string | null;
        mediaDetails?: {
          width?: number | null;
          height?: number | null;
        } | null;
      } | null;
    } | null;
  } | null;
};
