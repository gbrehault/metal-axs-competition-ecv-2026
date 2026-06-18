'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoHero from '@/app/assets/Logo-Hero.svg';
import src from '@/app/assets/photo_festival.webp';
import Button from '@/app/components/ui/Button';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const logo = logoRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const media = gsap.matchMedia();

    if (!section || !logo || !content || !image) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(image, { transformOrigin: 'left center' });

      media.add('(max-width: 767px)', () => {
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=120%',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            image,
            {
              transformOrigin: 'left center',
              scale: 1.45,
              xPercent: 0,
              yPercent: -70,
              bottom: 10,
              borderRadius: 0,
            },
            0,
          )
          .to(
            content,
            {
              autoAlpha: 0,
              yPercent: -16,
            },
            0.16,
          )
          .to(
            logo,
            {
              autoAlpha: 0,
              scale: 0.9,
            },
            0.3,
          );
      });

      media.add('(min-width: 768px)', () => {
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=155%',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            image,

            {
              scale: 1.45,

              xPercent: 0,

              yPercent: -140,

              bottom: 10,

              borderRadius: 0,
            },

            0,
          )
          .to(
            content,
            {
              autoAlpha: 0,
              yPercent: -18,
            },
            0.12,
          )
          .to(
            logo,
            {
              autoAlpha: 0,
              scale: 0.88,
            },
            0.32,
          );
      });
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} data-hero className="relative h-screen w-full z-10">
      <div className="noise relative h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/10" />

        <div
          ref={logoRef}
          id="section1"
          className="pointer-events-none absolute inset-0 z-100 flex items-center justify-center"
        >
          <Image src={LogoHero} alt="" aria-hidden className="h-auto w-auto scale-150" />
        </div>

        <div
          ref={contentRef}
          className="relative z-100 flex w-full flex-col items-start px-6 pt-28 md:ml-auto md:max-w-screen-2xl md:w-fit md:px-24 md:pt-36"
        >
          <h1 className="title-home font-primary text-10 text-secondary flex flex-col gap-2 leading-none">
            <span className="block leading-none">
              <span className="inline-block bg-white px-2 py-1">
                Metal Axs<span className="text-[clamp(20px,3vw,32px)]">©</span>
              </span>
            </span>
            <span className="block leading-none">
              <span className="inline-block bg-white px-2 py-1">rend vos festivals</span>
            </span>
            <span className="block leading-none">
              <span className="inline-block bg-white px-2 py-1 text-primary">accessibles</span>
              <span className="ml-1 inline-block bg-white px-2 py-1">à tous</span>
            </span>
          </h1>

          <div className="mt-8 flex z-10000 flex-wrap items-center gap-3">
            <Button href="/faire-un-audit" variant="secondary" size="lg">
              Réaliser une mise à niveau
            </Button>
          </div>
        </div>

        <div
          ref={imageRef}
          id="section2"
          data-hero-image
          className="sticky top-0 z-10000 h-full md:h-[70%] w-[70%]"
        >
          <div className="bg-secondary/50 z-100 h-full w-auto mt-120 md:mt-120 absolute inset-0" />
          {src ? (
            <Image
              src={src}
              alt="Concert festival Metal AXS"
              fill
              className="object-cover mt-120 md:mt-120 object-center grayscale"
              sizes="60vw"
              priority
            />
          ) : (
            <div className="h-full w-full bg-secondary" />
          )}
        </div>
      </div>
    </section>
  );
}
