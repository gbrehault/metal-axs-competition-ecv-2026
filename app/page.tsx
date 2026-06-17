import HomeLoader from '@/app/components/home/HomeLoader';
import HeroSection from '@/app/components/home/HeroSection';
import InteractiveShape from '@/app/components/home/InteractiveShape';
import HandicapSection from '@/app/components/home/HandicapSection';
import Image from 'next/image';
import src from '@/app/assets/photo_festival.webp';

export default function Home() {
  return (
    <>
      <HomeLoader />
      <section className="relative w-full overflow-x-hidden bg-tertiary">
        <HeroSection />
        <div
          id="section3"
          className="relative flex min-h-screen w-full items-center justify-center overflow-hidden -mt-204 px-6 py-20 md:px-16"
        >
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
            <span className="bg-primary px-3 py-1 text-sm font-secondary font-bold uppercase tracking-[0.2em] text-secondary">
              Section texte
            </span>
            <p className="font-primary text-2xl leading-tight text-tertiary md:text-5xl">
              De plus en plus de festivals voient le jour chaque année, mais l&apos;accessibilité
              pour les personnes en situation de handicap reste encore trop souvent oubliée.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-tertiary/80 md:text-lg">
              [Metal Axs] accompagne les organisateurs qui veulent vraiment changer ça, du site
              internet jusqu&apos;au jour de l&apos;événement, pour que chacun puisse vivre
              l&apos;expérience pleinement.
            </p>
          </div>
        </div>

        <div id="section4" className="w-full h-200 bg-tertiary z-100000">
          <div className="top-0 overflow-hidden">
            <InteractiveShape />
          </div>
        </div>
      </section>
      <HandicapSection />
    </>
  );
}
