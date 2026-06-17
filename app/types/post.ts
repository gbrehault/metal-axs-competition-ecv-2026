export type Post = {
  id: string;
  slug: string;
  title: string;
  uri: string;
  excerpt: string | null;
  date: string;
  content: string | null;
  featuredImage?: {
    node?: {
      altText?: string | null;
      sourceUrl?: string | null;
      mediaDetails?: {
        width?: number | null;
        height?: number | null;
      } | null;
    } | null;
  } | null;
};
