import { gql } from '@apollo/client';
import { connection } from 'next/server';
import type { Metadata } from 'next';
import { getApolloClient } from '@/app/lib/apolloClient';
import { type PostWithCategories } from '@/app/components/blog/ArticleCard';
import BonnesPratiquesHero from '@/app/components/bonnes-pratiques/HeroSection';
import ArticlesSection from '@/app/components/bonnes-pratiques/ArticlesSection';
import FooterLight from '@/app/components/FooterLight';

export const metadata: Metadata = {
  title: 'Nos bonnes pratiques — Metal AXS',
  description:
    "Découvrez les bonnes pratiques d'accessibilité pour rendre votre festival inclusif : handicaps visuels, auditifs, moteurs, cognitifs et invisibles.",
};

const GET_POSTS = gql`
  query GetPosts {
    posts(first: 100) {
      nodes {
        id
        slug
        title
        uri
        excerpt
        date
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            altText
            sourceUrl
            mediaDetails {
              width
              height
            }
          }
        }
        article {
          texteIntroduction
          imageDeMiseEnAvant {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export default async function BonnesPratiquesPage() {
  await connection();

  const client = getApolloClient();
  const postsResult = await client.query<{
    posts: { nodes: PostWithCategories[] };
  }>({
    query: GET_POSTS,
  });
  const posts = postsResult.data?.posts.nodes ?? [];

  return (
    <>
      <BonnesPratiquesHero />
      <ArticlesSection posts={posts} />
      <FooterLight />
    </>
  );
}
