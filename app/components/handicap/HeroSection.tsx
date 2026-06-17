'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HandicapHeroSection() {
  return (
    <section className="noise relative h-screen w-full overflow-hidden flex flex-col">
      {/* Watermark background figure */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
        aria-hidden="true"
      >
        <Image
          src="/handicaps/moteur.svg"
          alt=""
          width={900}
          height={900}
          className="w-[60vw] max-w-[700px] h-auto object-contain opacity-[0.07]"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-end gap-12 px-6 md:px-24 pb-16">
        <h1 className="font-primary text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tight text-secondary flex flex-col gap-2">
          <span className="block leading-none">
            <span className="inline-block bg-white px-2 py-1">Mieux</span>{' '}
            <span className="inline-block bg-white px-2 py-1 text-primary">comprendre</span>
          </span>
          <span className="block leading-none">
            <span className="inline-block bg-white px-2 py-1">pour mieux</span>{' '}
            <span className="inline-block bg-white px-2 py-1 text-primary">agir</span>
          </span>
        </h1>

        <Link
          href="/faire-un-audit"
          className="inline-flex items-center gap-3 bg-secondary text-tertiary uppercase tracking-widest font-mono text-sm px-8 py-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          → RÉALISER UN AUDIT
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 h-3 w-full bg-secondary flex-shrink-0" aria-hidden="true" />
    </section>
  );
}
