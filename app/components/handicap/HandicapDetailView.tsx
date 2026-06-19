'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HandicapData } from '@/app/data/handicaps/handicapsData';

type Tab = 'besoins' | 'amenagements';

export default function HandicapDetailView({ handicap }: { handicap: HandicapData }) {
  const [activeTab, setActiveTab] = useState<Tab>('besoins');

  const section = activeTab === 'besoins' ? handicap.besoins : handicap.amenagements;
  const sectionTitle = activeTab === 'besoins' ? 'Leurs besoins' : 'Les aménagements';

  return (
    <div className="bg-bg min-h-screen pt-36">
      <div className="px-6 md:px-16 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-base text-secondary/60 font-secondary">
          <Link
            href="/handicaps"
            className="hover:text-primary transition-colors underline underline-offset-2"
          >
            Handicaps
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-secondary font-semibold" aria-current="page">
            Handicap {handicap.label}
          </span>
        </nav>
      </div>

      <section
        aria-label={`Présentation du handicap ${handicap.label}`}
        className="px-6 md:px-16 pb-0"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="relative flex items-center justify-center aspect-square max-w-[480px] w-full mx-auto md:mx-0">
            <Image
              src={handicap.image}
              alt={`Illustration handicap ${handicap.label}`}
              width={400}
              height={400}
              className="w-3/4 h-3/4 object-contain mix-blend-luminosity opacity-90"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="font-primary text-[clamp(2.5rem,6vw,5rem)] leading-none flex flex-col gap-2">
              <span className="inline-block bg-white px-3 py-1.5 md:px-6 md:py-3 text-secondary">
                Handicap
              </span>
              <span className="inline-block bg-white px-3 py-1.5 md:px-6 md:py-3 text-primary">
                {handicap.label}
              </span>
            </h1>

            <div className="flex flex-col gap-3">
              {handicap.description.map((p, i) => (
                <p key={i} className="text-secondary/70 text-xl leading-relaxed font-secondary">
                  {p}
                </p>
              ))}
            </div>

            <div
              role="tablist"
              aria-label="Informations sur ce profil"
              className="flex flex-wrap items-stretch mt-2 gap-1"
            >
              <button
                role="tab"
                id="tab-besoins"
                aria-selected={activeTab === 'besoins'}
                aria-controls="tabpanel-content"
                onClick={() => setActiveTab('besoins')}
                className={`flex items-center gap-2 px-3 py-2.5 md:px-5 md:py-3 text-base font-secondary font-semibold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                  activeTab === 'besoins'
                    ? 'bg-secondary text-white'
                    : 'bg-white text-secondary hover:bg-secondary/10'
                }`}
              >
                <span>Leurs besoins</span>
                <EyeIcon />
              </button>
              <button
                role="tab"
                id="tab-amenagements"
                aria-selected={activeTab === 'amenagements'}
                aria-controls="tabpanel-content"
                onClick={() => setActiveTab('amenagements')}
                className={`flex items-center gap-2 px-3 py-2.5 md:px-5 md:py-3 text-base font-secondary font-semibold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                  activeTab === 'amenagements'
                    ? 'bg-secondary text-white'
                    : 'bg-white text-secondary hover:bg-secondary/10'
                }`}
              >
                <span>Les aménagements</span>
                <EyeIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tabpanel-content"
        role="tabpanel"
        aria-labelledby={activeTab === 'besoins' ? 'tab-besoins' : 'tab-amenagements'}
        className="noise mt-16 px-6 md:px-16 pb-24"
      >
        <h2 className="font-primary text-[clamp(1.8rem,4vw,3rem)] text-secondary mb-12 inline-block bg-white px-4 py-2 md:px-6 md:py-3">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <p className="text-secondary/70 text-xl leading-relaxed font-secondary self-start">
            {section.intro}
          </p>

          <ul className="flex flex-col gap-3">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-secondary/80 text-lg font-secondary leading-relaxed"
              >
                <span className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
