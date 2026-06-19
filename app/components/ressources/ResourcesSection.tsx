import Image from 'next/image';
import LogoMetal from '@/app/assets/Logo-Hero.svg';
import Button from '@/app/components/ui/Button';
import { RESSOURCES_DATA, type RessourceData } from '@/app/data/ressources/resourcesData';

const DownloadIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <path d="M8 2v8M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 2h4m0 0v4m0-4L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RESOURCE_ICONS: Record<string, React.ReactNode> = {
  'guide-pratique': (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="12" y="8" width="40" height="52" rx="3" stroke="#C0C0C0" strokeWidth="3"/>
      <rect x="18" y="16" width="12" height="14" rx="2" stroke="#C0C0C0" strokeWidth="2.5"/>
      <line x1="18" y1="36" x2="42" y2="36" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="18" y1="44" x2="36" y2="44" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="50" r="10" fill="white" stroke="#C0C0C0" strokeWidth="2.5"/>
      <path d="M50 44v8" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="55" r="1.5" fill="#C0C0C0"/>
    </svg>
  ),
  'pack-signaletique': (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M36 10L62 54H10L36 10Z" stroke="#C0C0C0" strokeWidth="3" strokeLinejoin="round" fill="none"/>
      <line x1="36" y1="28" x2="36" y2="42" stroke="#C0C0C0" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="36" cy="48" r="2" fill="#C0C0C0"/>
    </svg>
  ),
};

function ResourceCard({ resource }: { resource: RessourceData }) {
  const icon = RESOURCE_ICONS[resource.id];

  return (
    <article className="flex flex-col">
      <div className="bg-white border border-secondary/10 p-8 md:p-10 flex flex-col items-center gap-5">
        {icon && (
          <div aria-hidden="true" className="flex items-center justify-center w-24 h-24">
            {icon}
          </div>
        )}
        <h3 className="font-primary text-secondary text-xl font-semibold text-center">
          {resource.title}
        </h3>
      </div>

      <div className="bg-white border border-secondary/10 border-t-0 p-8 md:p-10 flex flex-col items-center gap-6 flex-1">
        <p className="font-secondary text-secondary/70 text-lg leading-relaxed text-center max-w-xs">
          {resource.description}
        </p>
        <div className="flex flex-col gap-3 w-full max-w-[220px] mt-auto">
          <Button
            href={resource.downloadHref}
            download
            variant="primary"
            icon={<DownloadIcon />}
            aria-label={`Télécharger ${resource.title}`}
          >
            Télécharger
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function ResourcesSection() {
  return (
    <section
      aria-labelledby="ressources-titre"
      className="noise relative w-full min-h-screen bg-white flex flex-col overflow-hidden px-4 md:px-16 py-20 pt-36 z-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <Image src={LogoMetal} alt="" width={900} height={500} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 mb-16">
        <h2 id="ressources-titre" className="font-primary text-secondary leading-tight max-w-2xl">
          Toutes les ressources pour passer à l&apos;action.
        </h2>
        <p className="font-secondary text-secondary/70 text-xl leading-relaxed max-w-xl">
          Des outils concrets, gratuits et prêts à l&apos;emploi pour vous aider à rendre votre festival accessible à tous.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
        {RESSOURCES_DATA.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
