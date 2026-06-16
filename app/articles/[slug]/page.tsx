import Image from 'next/image';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getApolloClient } from '@/app/lib/apolloClient';

type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string | null;
  uri: string;
  article?: {
    titre?: string | null;
    copier?: string | null;
    image?: {
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

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      content
      uri
      article {
        titre
        copier
        image {
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
`;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();

  const { slug: slug } = await params;
  const client = getApolloClient();
  const result = await client.query<{
    post: Post | null;
  }>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });
  const post = result.data?.post ?? null;

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-12">
      <Link href="/articles" className="text-sm font-medium text-blue-600">
        Retour aux articles
      </Link>

      <article className="rounded-2xl border border-zinc-200 p-8 shadow-sm">
        {post.article?.image?.node?.sourceUrl ? (
          <Image
            src={post.article.image.node.sourceUrl}
            alt={post.article.image.node.altText || post.title}
            width={post.article.image.node.mediaDetails?.width || 600}
            height={post.article.image.node.mediaDetails?.height || 400}
            className="mb-6 rounded-lg object-cover"
          />
        ) : null}
        <p className="text-sm text-zinc-500">{post.date}</p>
        <h1 className="mt-2 text-4xl font-semibold">{post.title}</h1>
        <div
          className="prose mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />
      </article>
    </main>
  );
}
