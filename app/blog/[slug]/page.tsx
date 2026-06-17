import Image from 'next/image';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getApolloClient } from '@/app/lib/apolloClient';
import { formatDate } from '@/app/lib/utils';

type ArticleImage = {
  node?: {
    sourceUrl?: string | null;
    altText?: string | null;
    mediaDetails?: {
      width?: number | null;
      height?: number | null;
    } | null;
  } | null;
} | null;

type PostDetail = {
  id: string;
  slug: string;
  title: string;
  date: string;
  article?: {
    texteSection1?: string | null;
    texteSection2?: string | null;
    texteSection3?: string | null;
    titreSection1?: string | null;
    titreSection2?: string | null;
    titreSection3?: string | null;
    imageDeMiseEnAvant?: ArticleImage;
    imagesSection1?: ArticleImage;
    imagesSection2?: ArticleImage;
    imagesSection3?: ArticleImage;
  } | null;
};

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      article {
        texteSection1
        texteSection2
        texteSection3
        titreSection1
        titreSection2
        titreSection3
        imageDeMiseEnAvant {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        imagesSection1 {
          node {
            altText
            sourceUrl
          }
        }
        imagesSection2 {
          node {
            altText
            sourceUrl
          }
        }
        imagesSection3 {
          node {
            altText
            sourceUrl
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
  const result = await client.query<{ post: PostDetail | null }>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });
  const post = result.data?.post ?? null;

  if (!post) notFound();

  const title = post.title;
  const date = post.date;
  const imgSrc = post.article?.imageDeMiseEnAvant?.node?.sourceUrl;

  return (
    <section className="z-10 h-full w-full flex flex-col items-center justify-start gap-6 px-8 pt-30 md:px-16">
      <div className="w-full h-80 flex items-start justify-center gap-4 bg-amber-200">
        <div className="h-auto w-1/2 flex flex-col items-stretch justify-between pt-10 gap-8">
          <div className="mb-3 flex items-center gap-2 text-sm">
            <Link href="/blog" className="text-secondary/60 transition-colors hover:text-primary">
              Blog
            </Link>
            <span className="text-secondary/30">/</span>
            <span className="text-secondary/60">{title}</span>
          </div>
          <div>
            <p className="text-sm text-secondary/60 pb-2">{formatDate(date)}</p>
            <h1 className="mb-4 text-4xl font-regular font-primary text-secondary leading-snug">
              {title}
            </h1>
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center">
          <Image
            src={post.article?.imageDeMiseEnAvant?.node?.sourceUrl ?? ''}
            alt={post.article?.imageDeMiseEnAvant?.node?.altText ?? title}
            width={800}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
