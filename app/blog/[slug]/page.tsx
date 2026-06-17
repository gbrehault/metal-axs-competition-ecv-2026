import Image from 'next/image';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getApolloClient } from '@/app/lib/apolloClient';
import { formatDate } from '@/app/lib/utils';
import ArticleCard from '@/app/components/blog/ArticleCard';

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
    texteIntroduction?: string | null;
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
        texteIntroduction
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
  const title1 = 'title1';
  const title2 = 'title2';
  const title3 = 'title3';
  const date = post.date;
  const introductionHtml = post.article?.texteIntroduction?.trim();
  const section1Html = post.article?.texteSection1?.trim();
  const section2Html = post.article?.texteSection2?.trim();
  const section3Html = post.article?.texteSection3?.trim();
  const title1Html = post.article?.titreSection1?.trim();
  const title2Html = post.article?.titreSection2?.trim();
  const title3Html = post.article?.titreSection3?.trim();
  const imagesSection1 = post.article?.imagesSection1?.node;
  const imagesSection2 = post.article?.imagesSection2?.node;
  const imagesSection3 = post.article?.imagesSection3?.node;

  return (
    <section className="z-10 h-full w-full flex flex-col items-center justify-start gap-6 px-3 pt-30 md:px-6">
      {/* Articles Header Hero */}

      <div className="w-full h-auto flex items-start justify-center bg-tertiary p-8">
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

      {/* Articles textes */}

      <div className="w-full h-auto flex items-start justify-center bg-tertiary gap-24 p-8">
        <div className="relative self-stretch w-1/2 pt-10">
          <div className="sticky top-30 flex h-fit flex-col items-start justify-start gap-4">
            <h3 className="font-bold">Dans cet article</h3>
            <div className="bg-bg h-0.5 w-full mt-4 mb-4"></div>
            <div className="flex flex-col gap-2">
              <div>
                <Link
                  href={`#${title1}`}
                  className="text-secondary/60 transition-colors hover:text-primary"
                >
                  {post.article?.titreSection1}
                </Link>
              </div>
              <div>
                <Link
                  href={`#${title2}`}
                  className="text-secondary/60 transition-colors hover:text-primary"
                >
                  {post.article?.titreSection2}
                </Link>
              </div>
              <div>
                <Link
                  href={`#${title3}`}
                  className="text-secondary/60 transition-colors hover:text-primary"
                >
                  {post.article?.titreSection3}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/1 h-full flex flex-col items-start justify-center gap-6">
          {introductionHtml ? (
            <div
              className="gutenberg-content prose max-w-none text-secondary"
              dangerouslySetInnerHTML={{ __html: introductionHtml }}
            />
          ) : null}
          {imagesSection1 ? (
            <Image
              src={imagesSection1.sourceUrl ?? ''}
              alt={imagesSection1.altText ?? ''}
              width={800}
              height={500}
              className="h-auto w-full object-cover"
            />
          ) : null}
          {title1Html ? (
            <h2 className="text-2xl font-regular mb-4" id="title1">
              {title1Html}
            </h2>
          ) : null}
          {section1Html ? (
            <div
              className="gutenberg-content prose max-w-none text-secondary"
              dangerouslySetInnerHTML={{ __html: section1Html }}
            />
          ) : null}
          {imagesSection2 ? (
            <Image
              src={imagesSection2.sourceUrl ?? ''}
              alt={imagesSection2.altText ?? ''}
              width={800}
              height={500}
              className="h-auto w-full object-cover"
            />
          ) : null}
          {title2Html ? (
            <h2 className="text-2xl font-regular mb-4" id="title2">
              {title2Html}
            </h2>
          ) : null}
          {section2Html ? (
            <div
              className="gutenberg-content prose max-w-none text-secondary"
              dangerouslySetInnerHTML={{ __html: section2Html }}
            />
          ) : null}
          {imagesSection3 ? (
            <Image
              src={imagesSection3.sourceUrl ?? ''}
              alt={imagesSection3.altText ?? ''}
              width={800}
              height={500}
              className="h-auto w-full object-cover"
            />
          ) : null}
          {title3Html ? (
            <h2 className="text-2xl font-regular mb-4" id="title3">
              {title3Html}
            </h2>
          ) : null}
          {section3Html ? (
            <div
              className="gutenberg-content prose max-w-none text-secondary"
              dangerouslySetInnerHTML={{ __html: section3Html }}
            />
          ) : null}
        </div>
      </div>
      {/* Articles Grid all */}

      <div className="w-full h-auto flex items-start justify-center bg-tertiary gap-24 p-8">
        <ArticleCard key={post.id} post={post} />
      </div>
    </section>
  );
}
