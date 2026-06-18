'use client';

import Image from 'next/image';
import Button from '@/app/components/ui/Button';
import section1 from '@/app/assets/homepage/Frame_2121318156.jpg';

export default function BonnesPratiquesHero() {
  return (
    <section
      aria-label="Nos bonnes pratiques"
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden noise"
    >
      {/* Background image */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={section1}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-24 gap-6 md:gap-8 pt-28 pb-16 md:py-36">
        <h1 className="title-home font-primary text-secondary flex flex-col gap-2 leading-none">
          <span className="block leading-none">
            <span className="inline-block bg-white px-3 py-1.5 md:px-6 md:py-3">Nos bonnes</span>
          </span>
          <span className="block leading-none">
            <span className="inline-block bg-white px-3 py-1.5 md:px-6 md:py-3 text-primary">pratiques</span>
          </span>
        </h1>

        <p className="max-w-xl text-secondary/70 text-sm md:text-lg leading-relaxed font-secondary">
          Du site internet jusqu&apos;au jour de l&apos;événement, nous accompagnons les
          organisateurs de festivals pour que chaque festivalier vive l&apos;expérience pleinement
          et sans barrière.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full sm:w-auto">
          <Button href="#recommandations" variant="outline">
            Découvrir les recommandations
          </Button>
          <Button href="/mise-a-niveau" variant="primary">
            Réaliser un audit
          </Button>
        </div>
      </div>
    </section>
  );
}
