import Image from 'next/image';

export default function PhotoSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/photo_festival.webp"
        alt="Concert festival Metal AXS"
        fill
        className="object-cover object-center grayscale"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="w-2/3 text-white text-sm md:text-lg font-primary leading-tight">
          De plus en plus de festivals voient le jour chaque année, mais l'accessibilité pour les personnes en situation de handicap reste encore trop souvent oubliée. [Metal Axs] accompagne les organisateurs qui veulent vraiment changer ça, du site internet jusqu'au jour de l'événement, pour que chacun puisse vivre l'expérience pleinement.
        </p>
      </div>
    </section>
  );
}
