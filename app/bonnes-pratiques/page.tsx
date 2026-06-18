import type { Metadata } from 'next';
import BonnesPratiquesHero from '@/app/components/bonnes-pratiques/HeroSection';
import CardsGridSection from '@/app/components/bonnes-pratiques/CardsGridSection';
import HandicapTabsSection from '@/app/components/bonnes-pratiques/HandicapTabsSection';
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
      <CardsGridSection />
      <HandicapTabsSection />
      <FooterLight />
    </main>
  );
}
