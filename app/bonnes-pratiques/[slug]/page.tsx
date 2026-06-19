import Image from 'next/image';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getApolloClient } from '@/app/lib/apolloClient';
import { formatDate } from '@/app/lib/utils';
import ArticleCard, { type PostWithCategories } from '@/app/components/blog/ArticleCard';
import FooterLight from '@/app/components/FooterLight';

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

type RelatedPost = PostWithCategories & {
  date?: string | null;
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
    posts(first: 6) {
      nodes {
        id
        slug
        title
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

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();

  const { slug } = await params;
  const client = getApolloClient();
  const result = await client.query<{
    post: PostDetail | null;
    posts: { nodes: RelatedPost[] };
  }>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });
  const post = result.data?.post ?? null;

  if (!post) notFound();

  const POSTS_CARD = 3;
  const postsCards = (result.data?.posts.nodes ?? [])
    .filter((candidate) => candidate.slug !== slug)
    .sort((a, b) => {
      const aDate = a.date ? new Date(a.date).getTime() : 0;
      const bDate = b.date ? new Date(b.date).getTime() : 0;
      return aDate - bDate;
    })
    .slice(0, POSTS_CARD);

  const { title, date, article } = post;
  const heroSrc = article?.imageDeMiseEnAvant?.node?.sourceUrl;
  const heroAlt = article?.imageDeMiseEnAvant?.node?.altText ?? title;
  const introductionHtml = article?.texteIntroduction?.trim();
  const section1Html = article?.texteSection1?.trim();
  const section2Html = article?.texteSection2?.trim();
  const section3Html = article?.texteSection3?.trim();
  const title1Html = article?.titreSection1?.trim();
  const title2Html = article?.titreSection2?.trim();
  const title3Html = article?.titreSection3?.trim();
  const imagesSection1 = article?.imagesSection1?.node;
  const imagesSection2 = article?.imagesSection2?.node;
  const imagesSection3 = article?.imagesSection3?.node;

  const tocLinks = [
    { id: 'title1', label: title1Html },
    { id: 'title2', label: title2Html },
    { id: 'title3', label: title3Html },
  ].filter((t) => t.label);

  return (
    <>
      <main className="w-full">
        {/* Hero */}
        <div className="w-full bg-tertiary px-6 md:px-16 pt-28 md:pt-36 pb-0">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
            <div className="flex flex-col gap-4 pb-0 md:pb-12">
              <nav
                aria-label="Fil d'ariane"
                className="flex items-center gap-2 text-sm text-secondary/60 font-secondary"
              >
                <Link
                  href="/bonnes-pratiques"
                  className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  Bonnes pratiques
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-secondary/80 truncate" aria-current="page">
                  {title}
                </span>
              </nav>

              <div className="flex flex-col gap-2">
                <p className="text-sm font-secondary text-secondary/60">{formatDate(date)}</p>
                <h3 className="font-primary text-secondary leading-snug text-[clamp(1.8rem,4vw,3rem)]">
                  {title}
                </h3>
              </div>
            </div>

            {heroSrc && (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={heroSrc}
                  alt={heroAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>

        {/* Contenu */}
        <div className="w-full bg-tertiary px-6 md:px-16 py-10 md:py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20 items-start">
            {tocLinks.length > 0 && (
              <aside className="hidden md:block" aria-label="Table des matières">
                <div className="sticky top-28 flex flex-col gap-4">
                  <p className="font-bold font-primary text-secondary">Dans cet article</p>
                  <div className="h-px w-full bg-secondary/10" />
                  <nav aria-label="Sections de l'article" className="flex flex-col gap-2">
                    {tocLinks.map(({ id, label }) => (
                      <Link
                        key={id}
                        href={`#${id}`}
                        className="font-secondary text-secondary/60 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            <article className="flex flex-col gap-8 min-w-0">
              {introductionHtml && (
                <div
                  className="gutenberg-content prose max-w-none text-secondary"
                  dangerouslySetInnerHTML={{ __html: introductionHtml }}
                />
              )}

              {imagesSection1?.sourceUrl && (
                <Image
                  src={imagesSection1.sourceUrl}
                  alt={imagesSection1.altText ?? ''}
                  width={800}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              )}

              {title1Html && (
                <h3 className="font-primary font-normal text-secondary" id="title1">
                  {title1Html}
                </h3>
              )}
              {section1Html && (
                <div
                  className="prose text-lg! max-w-none text-secondary"
                  dangerouslySetInnerHTML={{ __html: section1Html }}
                />
              )}

              {imagesSection2?.sourceUrl && (
                <Image
                  src={imagesSection2.sourceUrl}
                  alt={imagesSection2.altText ?? ''}
                  width={800}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              )}

              {title2Html && (
                <h3 className="font-primary font-normal text-secondary" id="title2">
                  {title2Html}
                </h3>
              )}
              {section2Html && (
                <div
                  className="gutenberg-content prose max-w-none text-secondary"
                  dangerouslySetInnerHTML={{ __html: section2Html }}
                />
              )}

              {imagesSection3?.sourceUrl && (
                <Image
                  src={imagesSection3.sourceUrl}
                  alt={imagesSection3.altText ?? ''}
                  width={800}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              )}

              {title3Html && (
                <h3 className="font-primary font-normal text-secondary" id="title3">
                  {title3Html}
                </h3>
              )}
              {section3Html && (
                <div
                  className="gutenberg-content prose max-w-none text-secondary"
                  dangerouslySetInnerHTML={{ __html: section3Html }}
                />
              )}
            </article>
          </div>
        </div>

        {/* Articles liés */}
        {postsCards.length > 0 && (
          <div className="w-full bg-tertiary px-6 md:px-16 pb-16 pt-8 border-t border-secondary/10">
            <div className="max-w-6xl mx-auto">
              <h3 className="font-primary font-normal text-secondary mb-8">Nos autres articles</h3>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {postsCards.map((cardPost) => (
                  <ArticleCard key={cardPost.id} post={cardPost} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <FooterLight />
    </>
  );
}
