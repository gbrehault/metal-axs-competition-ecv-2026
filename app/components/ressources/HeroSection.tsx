import Image from 'next/image';
import bgHero from '@/app/assets/bg-hero-handicap.png';
import Button from '@/app/components/ui/Button';

export default function RessourcesHeroSection() {
  return (
    <section
      aria-label="Toutes les ressources"
      className="relative h-[90vh] w-full flex flex-col z-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={bgHero}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 md:px-24">
        <h1 className="title-home font-primary leading-none tracking-tight text-secondary flex flex-col gap-2">
          <span className="flex flex-wrap leading-none">
            <span className="inline-block bg-white px-3 py-1.5 md:px-6 md:py-3">Toutes les</span>
          </span>
          <span className="flex flex-wrap leading-none">
            <span className="inline-block bg-white px-3 py-1.5 md:px-6 md:py-3">ressources</span>
          </span>
        </h1>
      </div>

      <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/2">
        <Button href="/mise-a-niveau" variant="primary">
          Réaliser un audit
        </Button>
      </div>
    </section>
  );
}
