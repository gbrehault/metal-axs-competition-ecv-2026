'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/app/components/ui/Button';
import Image from 'next/image';
import LogoHero from '@/app/assets/Logo-Hero.svg';

gsap.registerPlugin(ScrollTrigger);

const PROFILES = [
  {
    id: 'moteur',
    nav: 'Handicap moteur',
    title: 'Handicap Moteur',
    description:
      'Toute difficulté à se déplacer ou à effectuer certains gestes du quotidien, que ce soit en fauteuil roulant ou pour des mouvements plus précis.',
    image: '/handicaps/moteur.svg',
  },
  {
    id: 'visuel',
    nav: 'Handicap visuel',
    title: 'Handicap Visuel',
    description:
      "Une perte partielle ou totale de la vision, qu'il s'agisse de malvoyance légère ou de cécité complète, impactant la lecture, l'orientation et la navigation.",
    image: '/handicaps/visuel.svg',
  },
  {
    id: 'auditif',
    nav: 'Handicap auditif',
    title: 'Handicap Auditif',
    description:
      "Une perte d'audition partielle ou totale, de la surdité légère à profonde, nécessitant des adaptations pour l'accès à l'information sonore.",
    image: '/handicaps/auditif.svg',
  },
  {
    id: 'cognitif',
    nav: 'Handicap cognitif/mental',
    title: 'Handicap Cognitif / Mental',
    description:
      'Des troubles affectant les fonctions cognitives : mémoire, concentration, compréhension, incluant les troubles DYS, TDAH, trisomie ou déficience intellectuelle.',
    image: '/handicaps/cognitif.svg',
  },
  {
    id: 'invisible',
    nav: 'Handicaps invisibles / troubles psychiques',
    title: 'Handicaps Invisibles',
    description:
      'Des maladies chroniques, troubles psychiques ou douleurs qui ne se voient pas mais impactent profondément le quotidien : épilepsie, troubles anxieux, fibromyalgie.',
    image: '/handicaps/Invisible-psychique.svg',
  },
];

export default function HandicapSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const entranceEls = useRef<(HTMLElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const stRef = useRef<ScrollTrigger | null>(null);
  const pinStartRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const scrollToProfile = (index: number) => {
    const totalDistance = PROFILES.length * window.innerHeight * 0.1;
    const segmentSize = totalDistance / PROFILES.length;
    const target = pinStartRef.current + index * segmentSize + segmentSize * 0.5;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: innerRef.current,
        start: 'top top',
        end: `+=${PROFILES.length * window.innerHeight * 0.1}`,
        pin: true,
        pinSpacing: true,
        onRefresh: (self) => {
          pinStartRef.current = self.start;
        },
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * PROFILES.length), PROFILES.length - 1);
          if (idx !== activeIndexRef.current) {
            activeIndexRef.current = idx;
            setActiveIndex(idx);
          }
        },
      });
      pinStartRef.current = stRef.current.start;
    });

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    const els = entranceEls.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const ctx = gsap.context(() => {
      gsap.from(els, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: isMobile ? els[0] : outerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    PROFILES.forEach((_, i) => {
      const isActive = i === activeIndex;
      [leftRefs.current[i], iconRefs.current[i]].forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          opacity: isActive ? 1 : 0,
          duration: 0.2,
          ease: 'power2.inOut',
        });
      });
    });
  }, [activeIndex]);

  const navOpacity = (i: number) => {
    if (i === activeIndex) return 1;
    const d = Math.abs(i - activeIndex);
    return Math.max(0.12, 0.45 - d * 0.1);
  };

  // ─── Mobile carousel ──────────────────────────────────────────────────────
  if (isMobile) {
    const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
    const next = () => setActiveIndex((i) => Math.min(PROFILES.length - 1, i + 1));
    const profile = PROFILES[activeIndex];

    return (
      <section
        className="bg-secondary noise relative min-h-screen z-1000 flex flex-col px-6 py-12 gap-8"
        aria-labelledby="handicap-title-mobile"
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <Image src={LogoHero} alt="" className="w-auto h-auto scale-150" />
        </div>

        <h2 id="handicap-title-mobile" className="relative text-white text-2xl leading-snug">
          Voici les cinq profils que nous prenons en compte dans notre démarche.
        </h2>

        {/* Icon frame */}
        <div className="relative flex justify-center" aria-hidden="true">
          <div className="border border-white w-48 h-48 flex items-center justify-center p-5">
            <Image
              src={profile.image}
              alt={profile.title}
              width={150}
              height={150}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col justify-between">
          <div aria-live="polite" aria-atomic="true">
            <h3 className="text-white text-xl uppercase font-bold mb-3">{profile.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{profile.description}</p>
          </div>

          {/* Navigation dots */}
          <div
            role="tablist"
            aria-label="Profils de handicap"
            className="flex justify-center gap-2 my-6"
          >
            {PROFILES.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={p.nav}
                onClick={() => setActiveIndex(i)}
                className="w-4 h-4 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                style={{
                  backgroundColor:
                    i === activeIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-8 justify-center mb-6">
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Profil précédent"
              className="text-white transition-opacity disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                <path
                  d="M20 6L10 16L20 26"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={activeIndex === PROFILES.length - 1}
              aria-label="Profil suivant"
              className="text-white transition-opacity disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                <path
                  d="M12 6L22 16L12 26"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 items-start">
            <Button variant="outline" href={`/handicaps/${profile.id}`}>
              CONSULTER L&apos;HANDICAP {profile.id.toUpperCase()}
            </Button>
            <Button variant="outline" href="/handicaps">
              CONSULTER LES 5 HANDICAPS
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // ─── Desktop pinned scroll ─────────────────────────────────────────────────
  return (
    <div ref={outerRef} className="relative w-full min-h-screen z-80 -mt-4">
      <div
        ref={innerRef}
        className="sticky top-0 h-screen w-full bg-secondary  overflow-hidden flex flex-col"
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <Image src={LogoHero} alt="" className="w-auto h-auto scale-150  opacity-20" />
        </div>
        {/* Section title */}
        <div className="px-16 pt-36 flex-shrink-0">
          <h2 id="handicap-title-desktop" className="text-white text-3xl max-w-xl leading-snug">
            Voici les cinq profils que nous prenons en compte dans notre démarche.
          </h2>
        </div>

        {/* Main 3-col grid */}
        <div
          className="flex-1 grid grid-cols-3 gap-8 px-16 pb-16 relative min-h-0"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Left: profile content layers */}
          <div className="relative">
            {PROFILES.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  leftRefs.current[i] = el;
                }}
                className="absolute bottom-0 left-0 right-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
                aria-hidden={i !== activeIndex}
              >
                <h3 className="text-white text-2xl uppercase font-bold mb-4">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
                  {p.description}
                </p>
                <div className="flex flex-col gap-3 items-start">
                  <Button variant="outline" href={`/handicaps/${p.id}`}>
                    CONSULTER L&apos;HANDICAP {p.id.toUpperCase()}
                  </Button>
                  <Button variant="outline" href="/handicaps">
                    CONSULTER LES 5 HANDICAPS
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Center: fixed frame + crossfading images */}
          <div className="flex items-center justify-center" aria-hidden="true">
            <div
              className="border border-white flex items-center justify-center relative"
              style={{ width: 300, height: 300 }}
            >
              {PROFILES.map((p, i) => (
                <div
                  key={p.id}
                  ref={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center p-6"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-contain"
                    sizes="300px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: vertical navigation */}
          <nav aria-label="Navigation des profils de handicap">
            <ul className="flex flex-col justify-center items-end gap-5 h-full list-none">
              {PROFILES.map((p, i) => (
                <li key={p.id}>
                  <button
                    onClick={() => scrollToProfile(i)}
                    aria-label={`Aller au profil : ${p.nav}`}
                    aria-current={i === activeIndex ? 'true' : undefined}
                    className="flex items-center gap-2 transition-opacity duration-300 text-right cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary rounded-sm"
                    style={{ opacity: navOpacity(i) }}
                  >
                    <span
                      className="text-lg tracking-wide leading-tight max-w-[200px]"
                      style={{ color: i === activeIndex ? 'var(--color-primary)' : 'white' }}
                    >
                      {p.nav}
                    </span>
                    {i === activeIndex && (
                      <span
                        aria-hidden="true"
                        style={{ color: 'var(--color-primary)', fontSize: '10px' }}
                      >
                        ■
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
