import Image from 'next/image';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getApolloClient } from '@/app/lib/apolloClient';
import { formatDate } from '@/app/lib/utils';
import AnimatedBackground from '@/app/components/ui/AnimatedBackground';
import type { Post } from '@/app/types/post';

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      content
      article {
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
`;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();

  const { slug } = await params;
  const client = getApolloClient();
  const result = await client.query<{ post: Post | null }>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });
  const post = result.data?.post ?? null;

  if (!post) notFound();

  const imgSrc = post.article?.imageArticle?.node?.sourceUrl;
  const imgAlt = post.article?.imageArticle?.node?.altText ?? post.title;
  const title = post.article?.titreArticle ?? post.title;

  return (
    <>
      <AnimatedBackground />

      <main className="relative z-10 min-h-screen">

        {imgSrc ? (
          <div className="relative h-[55vh] w-full overflow-hidden">
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-16">
              <div className="mx-auto max-w-4xl">
                <time className="text-xs font-medium uppercase text-white/50">
                  {formatDate(post.date)}
                </time>
                <h1 className="mt-2 text-4xl font-bold leading-tight text-white sm:text-6xl font-primary">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-b border-white/10 px-6 py-16 md:px-16">
            <div className="mx-auto max-w-4xl">
              <time className="text-xs font-medium uppercase text-white/50">
                {formatDate(post.date)}
              </time>
              <h1 className="mt-2 text-4xl font-bold leading-tight text-white sm:text-6xl font-primary">
                {title}
              </h1>
            </div>
          </div>
        )}

        <div className="px-6 py-12 md:px-16">
          <div className="mx-auto max-w-4xl">

            <Link
              href="/articles"
              className="mb-10 inline-flex text-xs font-medium uppercase text-white/40 transition-colors hover:text-primary"
            >
              ← Retour aux articles
            </Link>

            <div className="mb-10 h-px w-16 bg-primary" />

            <div
              className="gutenberg-content prose prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-white prose-headings:uppercase
                prose-p:text-white/70 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-blockquote:border-l-primary prose-blockquote:text-white/60 prose-blockquote:not-italic
                prose-li:text-white/70
                prose-hr:border-white/10
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.article?.contenuArticle ?? '' }}
            />
          </div>
        </div>

      </main>
    </>
  );
}
