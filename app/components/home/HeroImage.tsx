'use client';

import Image from 'next/image';

type Props = {
  src?: string;
};

export default function HeroImage({ src }: Props) {
  return (
    <div data-hero-image className="w-[85vw] md:w-[55vw] h-[40vh] md:h-[55vh] overflow-hidden relative z-[2]">
      {src ? (
        <Image
          src={src}
          alt="Concert festival Metal AXS"
          fill
          className="object-cover object-center grayscale"
          sizes="60vw"
          priority
        />
      ) : (
        <div className="w-full h-full bg-neutral-800" />
      )}
    </div>
  );
}
