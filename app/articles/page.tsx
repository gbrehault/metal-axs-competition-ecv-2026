import { gql } from '@apollo/client';
import { connection } from 'next/server';
import Image from 'next/image';
import { getApolloClient } from '@/app/lib/apolloClient';
import { formatDate, toPlainText } from '@/app/lib/utils';
import Button from '@/app/components/ui/Button';
import type { Post } from '@/app/types/post';

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

export default async function Home() {
  await connection();

  const client = getApolloClient();
  const result = await client.query<{ posts: { nodes: Post[] } }>({
    query: GET_POSTS,
  });
  const posts = result.data?.posts.nodes ?? [];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      {posts.map((post) => {
        const img = post.article?.imageArticle?.node;
        return (
          <article key={post.id} className="rounded-2xl border border-zinc-200 p-6 shadow-sm">
            {img?.sourceUrl ? (
              <Image
                src={img.sourceUrl}
                alt={img.altText ?? post.title}
                width={img.mediaDetails?.width ?? 600}
                height={img.mediaDetails?.height ?? 400}
                className="rounded-lg object-cover"
              />
            ) : null}
            <p className="text-sm text-secondary/50 mt-4">{formatDate(post.date)}</p>
            <h2 className="mt-2 text-2xl font-semibold font-primary">{post.article?.titreArticle ?? post.title}</h2>
            <p className="mt-3 text-secondary/70">{toPlainText(post.article?.contenuArticle)}</p>
            {post.article?.fieldGroupName && (
              <p className="mt-3 rounded-lg bg-zinc-100 px-3 py-2 text-sm text-secondary/60">
                Groupe ACF récupéré : {post.article.fieldGroupName}
              </p>
            )}
            <div className="mt-4">
              <Button href={`/articles/${post.slug}`} variant="secondary" size="sm">
                Lire l&apos;article →
              </Button>
            </div>
          </article>
        );
      })}
    </main>
  );
}
