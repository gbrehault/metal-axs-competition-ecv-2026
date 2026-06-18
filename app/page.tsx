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
          className="relative flex min-h-screen w-full items-center justify-center overflow-hidden -mt-190 md:-mt-204 px-6 py-20 md:px-16"
        >
          <div className="relative z-1000 mx-auto flex w-full flex-col items-center gap-8 text-center">
            <h2 className="font-primary text-2xl leading-tight text-tertiary md:text-5xl">
              Chaque année, de nouveaux festivals émergent, mais l’accessibilité reste souvent
              négligée.
            </h2>
            <h2 className="text-2xl z-1000 leading-relaxed text-tertiary md:text-5xl">
              Metal Axs accompagne les organisateurs, du site web à l’événement, pour offrir une
              expérience inclusive à tous.
            </h2>
          </div>
        </div>
        <HandicapSection />
        <div className="relative flex h-100 md:h-screen w-full items-center justify-center overflow-hidden px-6 py-20 md:px-16"></div>
        <InteractiveShape />
      </section>
    </>
  );
}
