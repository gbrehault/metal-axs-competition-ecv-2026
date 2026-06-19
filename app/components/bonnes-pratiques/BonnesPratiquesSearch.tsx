'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  MagnifyingGlass,
  CaretDown,
  Ticket,
  Tent,
  Footprints,
  GlobeSimple,
  Bus,
  MusicNotes,
  ForkKnife,
  FirstAid,
} from '@phosphor-icons/react';
import { BP_DOMAINS, BP_RECOMMANDATIONS } from '@/app/data/bonnes-pratiques/bonnesPratiquesData';
import { HANDICAP_PROFILES } from '@/app/data/handicaps/profilesData';

const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  billetterie: <Ticket size={28} weight="light" />,
  hebergement: <Tent size={28} weight="light" />,
  cheminements: <Footprints size={28} weight="light" />,
  information: <GlobeSimple size={28} weight="light" />,
  transport: <Bus size={28} weight="light" />,
  spectacle: <MusicNotes size={28} weight="light" />,
  restauration: <ForkKnife size={28} weight="light" />,
  sante: <FirstAid size={28} weight="light" />,
};

export default function BonnesPratiquesSearch() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [profile, setProfile] = useState('');
  const [openDomain, setOpenDomain] = useState<string | null>(null);

  useEffect(() => {
    const profil = searchParams.get('profil');
    if (profil) setProfile(profil);
  }, [searchParams]);
  const filteredDomains = useMemo(() => {
    return BP_DOMAINS.filter((domain) => {
      const recs = BP_RECOMMANDATIONS.filter((r) => r.domainId === domain.id);

      if (profile && !recs.some((r) => r.profiles.includes(profile))) return false;

      if (query.trim()) {
        const q = query.toLowerCase();
        const titleMatch = domain.title.toLowerCase().includes(q);
        const recMatch = recs.some((r) => r.description.toLowerCase().includes(q));
        if (!titleMatch && !recMatch) return false;
      }

      return true;
    });
  }, [query, profile]);

  const totalRecs = filteredDomains.length;

  return (
    <section
      id="recherche"
      aria-label="Rechercher une bonne pratique"
      className="bg-bg px-4 md:px-16 py-10 md:py-16"
    >
      <div className="max-w-3xl mx-auto">
        {/* Search bar */}
        <div className="flex border border-secondary/30 bg-white mb-8">
          <div className="flex items-center gap-3 flex-1 px-4 py-3 min-w-0">
            <MagnifyingGlass
              size={20}
              className="text-secondary/40 shrink-0"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Rechercher une bonne pratique..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 min-w-0 bg-transparent outline-none text-secondary placeholder:text-secondary/40 font-secondary text-lg"
              aria-label="Rechercher"
            />
          </div>

          <div className="border-l border-secondary/20 relative flex items-center px-4 gap-2 shrink-0">
            <select
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              className="appearance-none bg-transparent outline-none text-secondary font-secondary text-lg pr-5 cursor-pointer"
              aria-label="Filtrer par profil de handicap"
            >
              <option value="">Profil de handicap</option>
              {HANDICAP_PROFILES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nav}
                </option>
              ))}
            </select>
            <CaretDown
              size={13}
              className="text-secondary/50 absolute right-3 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          <button
            type="button"
            className="bg-secondary text-white px-5 flex items-center justify-center shrink-0 hover:bg-secondary/80 transition-colors"
            aria-label="Lancer la recherche"
          >
            <MagnifyingGlass size={20} weight="bold" aria-hidden="true" />
          </button>
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-secondary text-lg text-secondary">
            <span className="font-semibold">{totalRecs}</span> bonnes pratiques trouvées
          </p>

          
        </div>

        {/* Accordion list */}
        <ul className="border-t border-secondary/10">
          {filteredDomains.length === 0 ? (
            <li className="py-12 text-center text-secondary/50 font-secondary text-lg">
              Aucun résultat pour cette recherche.
            </li>
          ) : (
            filteredDomains.map((domain) => {
              const recs = BP_RECOMMANDATIONS.filter((r) => {
                if (r.domainId !== domain.id) return false;
                if (profile && !r.profiles.includes(profile)) return false;
                if (query.trim() && !r.description.toLowerCase().includes(query.toLowerCase())) return false;
                return true;
              });
              const isOpen = openDomain === domain.id;

              return (
                <li key={domain.id} className="border-b border-secondary/10">
                  <button
                    type="button"
                    onClick={() => setOpenDomain(isOpen ? null : domain.id)}
                    className="flex w-full items-center gap-4 py-4 px-2 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="shrink-0 text-secondary" aria-hidden="true">
                      {DOMAIN_ICONS[domain.id]}
                    </span>
                    <span className="flex-1 font-secondary font-medium text-secondary text-lg md:text-xl">
                      {domain.title}
                    </span>
                    <CaretDown
                      size={15}
                      className={`text-secondary/40 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <ul className="pb-4 px-2 flex flex-col gap-3">
                      {recs.map((rec) => (
                        <li key={rec.id} className="flex items-start gap-3">
                          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                          <p className="font-secondary text-secondary/80 text-base leading-relaxed">
                            {rec.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </section>
  );
}
