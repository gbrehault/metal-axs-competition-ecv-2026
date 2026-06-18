'use client';

import { useState } from 'react';
import Image from 'next/image';
import LogoMetal from '@/app/assets/Logo-Hero.svg';

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M8 2v8M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RESOURCES = [
  {
    id: 'guide-pratique',
    title: 'Guide Pratique',
    description: "Toutes les recommandations du label réunies dans un document pratique pour vous accompagner étape par étape dans la mise en accessibilité de votre festival.",
    downloadHref: '#',
    consultHref: '#',
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="12" y="8" width="40" height="52" rx="3" stroke="#C0C0C0" strokeWidth="3"/>
        <rect x="18" y="16" width="12" height="14" rx="2" stroke="#C0C0C0" strokeWidth="2.5"/>
        <line x1="18" y1="36" x2="42" y2="36" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="18" y1="44" x2="36" y2="44" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="50" cy="50" r="10" fill="white" stroke="#C0C0C0" strokeWidth="2.5"/>
        <path d="M50 44v8" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="50" cy="55" r="1.5" fill="#C0C0C0"/>
      </svg>
    ),
  },
  {
    id: 'pack-signaletique',
    title: "Pack Signalétique",
    description: "Un ensemble de visuels prêts à l'emploi pour indiquer clairement les aménagements accessibles sur votre site, à télécharger et imprimer librement.",
    downloadHref: '#',
    consultHref: '#',
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M36 10L62 54H10L36 10Z" stroke="#C0C0C0" strokeWidth="3" strokeLinejoin="round" fill="none"/>
        <line x1="36" y1="28" x2="36" y2="42" stroke="#C0C0C0" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="36" cy="48" r="2" fill="#C0C0C0"/>
      </svg>
    ),
  },
];

function ResourceCard({ resource }: { resource: typeof RESOURCES[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="cursor-pointer"
      onClick={() => setOpen((v) => !v)}
    >
      {/* Default state */}
      <div
        className={`bg-white border border-secondary/10 p-10 flex flex-col items-center gap-6 transition-all duration-300 ${open ? 'hidden' : 'flex'}`}
      >
        <div className="flex items-center justify-center w-28 h-28">
          {resource.icon}
        </div>
        <p className="font-primary text-secondary text-xl font-semibold text-center">
          {resource.title}
        </p>
      </div>

      {/* Expanded state */}
      <div
        className={`bg-secondary p-10 flex flex-col items-center gap-6 transition-all duration-300 ${open ? 'flex' : 'hidden'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-primary text-white text-xl font-bold text-center">
          {resource.title}
        </p>
        <p className="text-white/80 text-sm leading-relaxed text-center max-w-xs">
          {resource.description}
        </p>
        <div className="flex flex-col gap-3 w-full max-w-[220px]">
          <a
            href={resource.downloadHref}
            className="group inline-flex gap-1 items-stretch font-medium uppercase font-mono text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="bg-black text-white px-5 py-3 flex-1 text-center">Télécharger</span>
            <span className="bg-primary text-black flex items-center justify-center px-4">
              <DownloadIcon />
            </span>
          </a>
          <a
            href={resource.consultHref}
            className="group inline-flex gap-1 items-stretch font-medium uppercase font-mono text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="bg-black text-white px-5 py-3 flex-1 text-center">Consulter</span>
            <span className="bg-primary text-black flex items-center justify-center px-4">
              <DownloadIcon />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesSection() {
  return (
    <section className="noise relative w-full min-h-screen bg-[#F5F5F5] flex flex-col overflow-hidden px-10 md:px-16 py-20 pt-36 z-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <Image src={LogoMetal} alt="" width={900} height={500} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 mb-16">
        <h2
          className="font-primary text-secondary leading-tight max-w-2xl"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
        >
          Toutes les ressources pour passer à l&apos;action.
        </h2>
        <p className="text-secondary/70 text-base leading-relaxed max-w-xl">
          Des outils concrets, gratuits et prêts à l&apos;emploi pour vous aider à rendre votre festival accessible à tous.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
        {RESOURCES.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
