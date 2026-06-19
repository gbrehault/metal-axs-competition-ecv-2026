import { Suspense } from 'react';
import type { Metadata } from 'next';
import BonnesPratiquesHero from '@/app/components/bonnes-pratiques/HeroSection';
import BonnesPratiquesSearch from '@/app/components/bonnes-pratiques/BonnesPratiquesSearch';
import FooterLight from '@/app/components/FooterLight';

export const metadata: Metadata = {
  title: 'Nos bonnes pratiques — Metal AXS',
  description:
    "Découvrez les bonnes pratiques d'accessibilité pour rendre votre festival inclusif : handicaps visuels, auditifs, moteurs, cognitifs et invisibles.",
};

export default function BonnesPratiquesPage() {
  return (
    <main>
      <BonnesPratiquesHero />
      <Suspense>
        <BonnesPratiquesSearch />
      </Suspense>
      <FooterLight />
    </main>
  );
}
