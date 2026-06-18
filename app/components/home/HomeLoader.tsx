'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Logo from '@/app/assets/logo_metal_axs_2026.png';

export default function HomeLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.25,
          onComplete: () => {
            document.body.style.overflow = previousOverflow;
            setIsVisible(false);
          },
        });

        return;
      }

      gsap.set(trackRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
      });

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          setIsVisible(false);
        },
      });

      timeline
        .fromTo(
          logoRef.current,
          { autoAlpha: 0, scale: 0.82, rotate: -10 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.8 },
        )
        .fromTo(
          glowRef.current,
          { autoAlpha: 0.15, scale: 0.7 },
          { autoAlpha: 0.9, scale: 1.15, duration: 1.1, ease: 'sine.inOut' },
          0,
        )
        .to(trackRef.current, { scaleX: 1, duration: 1.05, ease: 'power2.inOut' }, '-=0.3')
        .to(
          overlayRef.current,
          { autoAlpha: 0, filter: 'blur(18px)', duration: 0.75, ease: 'power2.inOut' },
          '+=0.3',
        );
    }, overlayRef);

    return () => {
      document.body.style.overflow = previousOverflow;
      ctx.revert();
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-live="polite"
      aria-label="Chargement de la page d'accueil"
      className="fixed inset-0 z-1000 flex items-center justify-center overflow-hidden bg-[#1D1D1D]"
    >
      <div className="relative bg-[#1D1D1D]" />
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center justify-center gap-5 px-6 text-center text-tertiary">
        <div ref={logoRef}>
          <video
            src="/METAL_AXS_LOADER_2.mp4"
            autoPlay
            muted
            loop
            className="w-20 md:w-50 h-auto"
          />
        </div>
        <div className="mt-2 w-full max-w-xs overflow-hidden rounded-full">
          <div className="h-2 rounded-full">
            <div ref={trackRef} className="h-full w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
