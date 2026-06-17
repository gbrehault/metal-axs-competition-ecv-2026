import Image from 'next/image';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';
import LogoHero from '@/app/assets/Logo-Hero.svg';

export default function HeroSection() {
  return (
    <section
      data-hero
      className="noise relative min-h-screen w-full flex flex-col gap-6 md:gap-24 before:absolute before:inset-0 before:bg-black/[0.16] before:pointer-events-none before:z-[1]"
    >
      <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none">
        <Image
          src={LogoHero}
          alt=""
          aria-hidden
          className="w-auto h-auto scale-150"
        />
      </div>

      <HeroContent />

      <HeroImage src='/photo_festival.webp' />
    </section>
  );
}
