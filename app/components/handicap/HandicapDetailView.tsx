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
    <main className="bg-[#f2f2f2] min-h-screen pt-36">
      {/* Breadcrumb */}
      <div className="px-6 md:px-16 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-sm text-secondary/60 font-secondary">
          <Link
            href="/handicaps"
            className="hover:text-primary transition-colors underline underline-offset-2"
          >
            Handicaps
          </Link>
          <span>›</span>
          <span className="text-secondary font-semibold">Handicap {handicap.label}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="relative flex items-center justify-center aspect-square max-w-[480px] w-full mx-auto md:mx-0">
            <Image
              src={handicap.image}
              alt={`Handicap ${handicap.label}`}
              width={400}
              height={400}
              className="w-3/4 h-3/4 object-contain mix-blend-luminosity opacity-90"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="font-primary text-[clamp(2.5rem,6vw,5rem)] leading-none text-secondary">
                <span className="inline-block bg-white px-6 py-3">Handicap</span>
              </h1>
              <h2 className="font-primary text-[clamp(2.5rem,6vw,5rem)] leading-none text-primary">
                <span className="inline-block bg-white px-6 py-3">{handicap.label}</span>
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {handicap.description.map((p, i) => (
                <p key={i} className="text-secondary/70 text-base leading-relaxed font-secondary">
                  {p}
                </p>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex items-stretch mt-2">
              <button
                onClick={() => setActiveTab('besoins')}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-secondary font-semibold uppercase tracking-wide transition-colors duration-200 ${
                  activeTab === 'besoins'
                    ? 'bg-secondary text-white'
                    : 'bg-white text-secondary hover:bg-secondary/10'
                }`}
              >
                <span>Leurs besoins</span>
                <EyeIcon />
              </button>
              <button
                onClick={() => setActiveTab('amenagements')}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-secondary font-semibold uppercase tracking-wide transition-colors duration-200 ${
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

      {/* Content section */}
      <section className="noise mt-16 px-6 md:px-16 pb-24">
        <h3 className="font-primary text-[clamp(1.8rem,4vw,3rem)] text-secondary mb-12 inline-block bg-white px-6 py-3">
          {sectionTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {/* Intro */}
          <p className="text-secondary/70 text-base leading-relaxed font-secondary self-start">
            {section.intro}
          </p>

          {/* Bullet list */}
          <ul className="flex flex-col gap-3">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-secondary/80 text-sm font-secondary leading-relaxed"
              >
                <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
