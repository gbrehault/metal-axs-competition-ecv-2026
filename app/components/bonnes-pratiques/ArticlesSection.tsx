'use client';

import { useState, useMemo } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import ArticleCard, { type PostWithCategories } from '@/app/components/blog/ArticleCard';
import Pagination from '@/app/components/blog/Pagination';
import { HANDICAP_PROFILES } from '@/app/data/handicaps/profilesData';

const POSTS_PER_PAGE = 6;

const HANDICAP_FILTERS = [
  { label: 'Tous', value: 'all' },
  ...HANDICAP_PROFILES.map((p) => ({ label: p.nav, value: p.id })),
];

export default function ArticlesSection({ posts }: { posts: PostWithCategories[] }) {
  const [profil, setProfil] = useState('all');
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts;

    if (profil !== 'all') {
      result = result.filter((p) =>
        p.categories?.nodes.some((c) => c.slug === profil || c.name.toLowerCase() === profil),
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.article?.texteIntroduction ?? '').toLowerCase().includes(q),
      );
    }

    return result;
  }, [posts, profil, query]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  function handleFilterChange(value: string) {
    setProfil(value);
    setCurrentPage(1);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setCurrentPage(1);
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-16">
      {/* Search bar */}
      <div className="flex border border-secondary/30 bg-white mb-8">
        <div className="flex items-center gap-3 flex-1 px-4 py-3 min-w-0">
          <MagnifyingGlass size={20} className="text-secondary/40 shrink-0" aria-hidden="true" />
          <input
            type="search"
            placeholder="Rechercher un article..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="flex-1 min-w-0 bg-transparent outline-none text-secondary placeholder:text-secondary/40 font-secondary text-lg"
            aria-label="Rechercher un article"
          />
        </div>
        <div className="bg-secondary text-white px-5 flex items-center justify-center shrink-0">
          <MagnifyingGlass size={20} weight="bold" aria-hidden="true" />
        </div>
      </div>

      {/* Handicap filters */}
      <nav aria-label="Filtrer par type de handicap" className="flex flex-wrap gap-2 mb-10">
        {HANDICAP_FILTERS.map(({ label, value }) => {
          const isActive = profil === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleFilterChange(value)}
              aria-pressed={isActive}
              className={`px-4 py-1.5 text-sm font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                isActive
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-transparent text-secondary border-secondary/30 hover:border-secondary'
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {/* Grid */}
      {paginated.length === 0 ? (
        <p className="text-center py-16 text-secondary/50 font-secondary text-lg">
          Aucun article pour cette sélection.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {paginated.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          buildHref={() => '#'}
          onPageChange={(p) => {
            setCurrentPage(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </section>
  );
}
