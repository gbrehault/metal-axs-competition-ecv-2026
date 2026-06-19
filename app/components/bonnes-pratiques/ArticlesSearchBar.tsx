'use client';

import { MagnifyingGlass } from '@phosphor-icons/react';

export default function ArticlesSearchBar({
  defaultValue,
  currentFilter,
  currentProfil,
}: {
  defaultValue: string;
  currentFilter: string;
  currentProfil: string;
}) {
  return (
    <form action="/bonnes-pratiques" method="get" className="flex border border-secondary/30 bg-white mb-8">
      <input type="hidden" name="filter" value={currentFilter} />
      <input type="hidden" name="profil" value={currentProfil} />
      <input type="hidden" name="page" value="1" />
      <div className="flex items-center gap-3 flex-1 px-4 py-3 min-w-0">
        <MagnifyingGlass size={20} className="text-secondary/40 shrink-0" aria-hidden="true" />
        <input
          type="search"
          name="search"
          placeholder="Rechercher un article..."
          defaultValue={defaultValue}
          className="flex-1 min-w-0 bg-transparent outline-none text-secondary placeholder:text-secondary/40 font-secondary text-lg"
          aria-label="Rechercher un article"
        />
      </div>
      <button
        type="submit"
        className="bg-secondary text-white px-5 flex items-center justify-center shrink-0 hover:bg-secondary/80 transition-colors"
        aria-label="Lancer la recherche"
      >
        <MagnifyingGlass size={20} weight="bold" aria-hidden="true" />
      </button>
    </form>
  );
}
