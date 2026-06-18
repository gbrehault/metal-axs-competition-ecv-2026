import { gql } from '@apollo/client';
import { connection } from 'next/server';
import { getApolloClient } from '@/app/lib/apolloClient';
import ArticleCard, { type PostWithCategories } from '@/app/components/blog/ArticleCard';
import FilterTabs from '@/app/components/blog/FilterTabs';
import Pagination from '@/app/components/blog/Pagination';
import BlogHeroSection from '@/app/components/blog/HeroSection';

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
          bioAuteur
          fieldGroupName
          nomAuteur
          posteAuteur
          texteIntroduction
          texteSection1
          texteSection2
          texteSection3
          titreSection1
          titreSection2
          titreSection3
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

const POSTS_PER_PAGE = 6;

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Articles', value: 'articles' },
  { label: 'Reports', value: 'reports' },
];

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; page?: string }>;
}) {
  await connection();

  const { filter = 'all', page = '1' } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  const client = getApolloClient();
  const postsResult = await client.query<{
    posts: {
      nodes: PostWithCategories[];
    };
  }>({
    query: GET_POSTS,
  });
  const allPosts = postsResult.data?.posts.nodes ?? [];

  const filtered =
    filter === 'all'
      ? allPosts
      : allPosts.filter((p) =>
          p.categories?.nodes.some((c) => c.slug === filter || c.name.toLowerCase() === filter),
        );

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <>
      <BlogHeroSection />
      <main className="mx-auto w-full max-w-6xl px-6 pt-16 pb-16">
      <FilterTabs
        tabs={FILTERS}
        active={filter}
        buildHref={(value) => `/blog?filter=${value}&page=1`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-10">
        {paginated.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          buildHref={(p) => `/blog?filter=${filter}&page=${p}`}
        />
      )}
    </main>
    </>
  );
}
