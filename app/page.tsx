import HomeLoader from '@/app/components/home/HomeLoader';
import HeroSection from '@/app/components/home/HeroSection';
import InteractiveShape from '@/app/components/home/InteractiveShape';
import PhotoSection from '@/app/components/home/PhotoSection';

export default function Home() {
  return (
    <>
      <HomeLoader />
      <section className="relative flex h-1000 w-screen flex-col items-center justify-start overflow-hidden bg-tertiary">
        <InteractiveShape />
        <HeroSection />
        <PhotoSection />
      </section>
    </>
  );
}
