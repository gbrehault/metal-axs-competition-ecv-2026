import { gql } from '@apollo/client';
import Link from 'next/link';
import { connection } from 'next/server';
import { getApolloClient } from '@/app/lib/apolloClient';
import Image from 'next/image';

type Post = {
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

const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        slug
        title
        uri
        excerpt
        date
        article {
          fieldGroupName
          titreArticle
          contenuArticle
          imageArticle {
            node {
              altText
              sourceUrl
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

function toPlainText(value: string | null | undefined) {
  if (!value) {
    return '';
  }

  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default async function Home() {
  await connection();

  const client = getApolloClient();
  const result = await client.query<{
    posts: {
      nodes: Post[];
    };
  }>({
    query: GET_POSTS,
  });
  const posts = result.data?.posts.nodes ?? [];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      {posts.map((post) => (
        <article key={post.id} className="rounded-2xl border border-zinc-200 p-6 shadow-sm">
          {post.article?.image_article?.node?.sourceUrl ? (
            <Image
              src={post.article.image_article.node.sourceUrl}
              alt={post.article.image_article.node.altText || post.title}
              width={post.article.image_article.node.mediaDetails?.width || 600}
              height={post.article.image_article.node.mediaDetails?.height || 400}
              className="rounded-lg object-cover"
            />
          ) : null}
          <p className="text-sm text-zinc-500">{post.date}</p>
          <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
          <p className="mt-3 text-zinc-600">{toPlainText(post.article?.contenu_article)}</p>
          {post.article?.fieldGroupName && (
            <p className="mt-3 rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-700">
              Groupe ACF récupéré : {post.article.fieldGroupName}
            </p>
          )}
          <Link
            href={`/articles/${post.slug}`}
            className="mt-4 inline-flex text-sm font-medium text-blue-600"
          >
            Lire l&apos;article
          </Link>
        </article>
      ))}
    </main>
  );
}
