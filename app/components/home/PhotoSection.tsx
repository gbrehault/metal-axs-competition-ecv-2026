'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PhotoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const text = textRef.current;
    const floating = floatingRef.current;
    const heroImage = document.querySelector<HTMLElement>('[data-hero-image]');
    const heroSection = document.querySelector<HTMLElement>('[data-hero]');

    if (!section || !text || !floating || !heroImage) return;

    const heroRect = heroImage.getBoundingClientRect();

    const ctx = gsap.context(() => {
      // Le floating remplace visuellement heroImage dès le départ → on cache l'original
      gsap.set(heroImage, { opacity: 0 });

      gsap.set(floating, {
        position: 'fixed',
        top: heroRect.top,
        left: heroRect.left,
        width: heroRect.width,
        height: heroRect.height,
        zIndex: 20,
        opacity: 1,
      });

      // Scrub : l'image flottante grandit pendant le scroll du hero
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection ?? section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.to(floating, { top: 0, left: 0, width: '100vw', height: '100vh', ease: 'none' }, 0);

      // Cache l'image fixe une fois que PhotoSection sort du viewport
      ScrollTrigger.create({
      
        trigger: section,
        start: 'bottom top',
        onEnter: () => gsap.set(floating, { autoAlpha: 0 }),
        onLeaveBack: () => gsap.set(floating, { autoAlpha: 1 }),
      });

      // Texte
      gsap.fromTo(
        text,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-photo-section
      className="relative h-screen w-full"
    >
      {/* Image flottante — positionnée fixed via GSAP */}
      <div ref={floatingRef} className="overflow-hidden">
        <Image
          src="/photo_festival.webp"
          alt="Concert festival Metal AXS"
          fill
          className="object-cover object-center grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div
        ref={textRef}
        className="relative z-[21] h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <p className=" w-2/3 text-white text-sm  md:text-lg font-primary  leading-tight">
        De plus en plus de festivals voient le jour chaque année, mais l'accessibilité pour les personnes en situation de handicap reste encore trop souvent oubliée. [Metal Axs] accompagne les organisateurs qui veulent vraiment changer ça, du site internet jusqu'au jour de l'événement, pour que chacun puisse vivre l'expérience pleinement.
        </p>
      </div>
    </section>
  );
}
