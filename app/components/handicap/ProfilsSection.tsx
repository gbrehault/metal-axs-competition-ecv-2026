'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import TransitionLink from '@/app/components/ui/TransitionLink';
import CardFond from '@/app/assets/Card.png';
import LogoMetal from '@/app/assets/Logo-Hero.svg';
import { HANDICAP_CARDS_BASE } from '@/app/data/handicaps/cardsData';

const CARDS = HANDICAP_CARDS_BASE.map((card, i) => ({
  ...card,
  rotate: [8, 4, -2, 1, -5][i],
  offsetX: [-480, -250, -50, 200, 440][i],
  offsetY: [0, 60, 0, 60, 0][i],
}));

const CARD_W = 325;
const CARD_H = 380;

export default function ProfilsSection() {
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    CARDS.forEach((card, i) => {
      const el = innerRefs.current[i];
      if (!el) return;
      gsap.set(el, { rotation: card.rotate, transformOrigin: 'bottom center' });
    });
  }, []);

  const getCardScrollWidth = () => {
    const firstChild = carouselRef.current?.children[0] as HTMLElement | undefined;
    return firstChild ? firstChild.offsetWidth + 16 : CARD_W + 16;
  };

  const handleMouseEnter = (hoveredIdx: number) => {
    CARDS.forEach((card, i) => {
      const outer = outerRefs.current[i];
      const inner = innerRefs.current[i];
      if (!outer || !inner) return;

      outer.style.zIndex = i === hoveredIdx ? '20' : String(i + 1);

      if (i === hoveredIdx) {
        gsap.to(inner, {
          rotation: 0,
          y: -24,
          x: 0,
          scale: 1.08,
          duration: 0.45,
          ease: 'back.out(2)',
          overwrite: true,
        });
      } else {
        const shift = i < hoveredIdx ? -60 : 60;
        gsap.to(inner, {
          x: shift,
          y: 0,
          rotation: card.rotate,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: true,
        });
      }
    });
  };

  const handleMouseLeave = () => {
    CARDS.forEach((card, i) => {
      const outer = outerRefs.current[i];
      const inner = innerRefs.current[i];
      if (!outer || !inner) return;

      outer.style.zIndex = String(i + 1);

      gsap.to(inner, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: card.rotate,
        duration: 0.5,
        ease: 'back.out(1.5)',
        overwrite: true,
      });
    });
  };

  return (
    <section
      aria-labelledby="profils-titre"
      className="noise relative w-full min-h-screen bg-tertiary flex flex-col overflow-hidden px-4 md:px-16 py-20 pt-36 z-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <Image
          src={LogoMetal}
          alt=""
          width={900}
          height={500}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center text-center gap-6 mb-4">
        <h2 id="profils-titre" className="title-home font-primary text-secondary leading-none">
          <span className="bg-white px-3 py-1.5 md:px-6 md:py-3">Les 5 profils handicaps</span>
        </h2>
        <p className="text-secondary/70 text-xl leading-relaxed max-w-xl">
          Découvrez les différents profils de handicap pris en compte dans notre démarche,
          les obstacles du quotidien auxquels ces personnes font face
        </p>
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden flex flex-col gap-4">
        <div
          ref={carouselRef}
          role="region"
          aria-label="Carrousel des profils handicaps"
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2"
          style={{ scrollbarWidth: 'none' }}
          onScroll={(e) => {
            const el = e.currentTarget;
            const cardW = getCardScrollWidth();
            setActiveIdx(Math.round(el.scrollLeft / cardW));
          }}
        >
          {CARDS.map((card) => (
            <TransitionLink
              key={card.id}
              href={`/handicaps/${card.id}`}
              aria-label={`Découvrir le profil ${card.title.replace('\n', ' ')}`}
              className="snap-center shrink-0 mx-auto block"
              style={{ width: 'min(300px, 82vw)', height: CARD_H }}
            >
              <div
                className="w-full h-full overflow-hidden flex flex-col bg-secondary border-2 border-white"
                style={{ backgroundImage: `url(${CardFond.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="pt-3 px-3">
                  <h3 className="text-white font-primary text-3xl leading-snug whitespace-pre-line drop-shadow">
                    {card.title}
                  </h3>
                </div>
                <div className="flex-1 flex items-end justify-end overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title.replace('\n', ' ')}
                    width={CARD_W}
                    height={CARD_H}
                    className="w-full max-h-full object-contain object-right-bottom mix-blend-luminosity opacity-90"
                  />
                </div>
                <span aria-hidden="true" className="bg-secondary/90 text-white text-xs font-secondary font-semibold uppercase tracking-wide px-3 py-3 hover:bg-primary transition-colors duration-200 text-center">
                  Découvrir les pré-requis
                </span>
              </div>
            </TransitionLink>
          ))}
        </div>

        <div role="tablist" aria-label="Navigation carrousel" className="flex justify-center gap-2">
          {CARDS.map((card, i) => (
            <button
              key={card.id}
              role="tab"
              aria-selected={i === activeIdx}
              aria-label={`Aller au profil ${card.title.replace('\n', ' ')}`}
              onClick={() => {
                setActiveIdx(i);
                carouselRef.current?.scrollTo({ left: i * getCardScrollWidth(), behavior: 'smooth' });
              }}
              className={`w-2 h-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${i === activeIdx ? 'bg-secondary' : 'bg-secondary/30'}`}
            />
          ))}
        </div>
      </div>

      {/* Fan de cartes — desktop uniquement */}
      <div
        className="hidden md:block relative w-full"
        style={{ height: 480 }}
        onMouseLeave={handleMouseLeave}
      >
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => { outerRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              left: `calc(50% + ${card.offsetX - CARD_W / 2}px)`,
              bottom: 40,
              width: CARD_W,
              height: CARD_H,
              zIndex: i + 1,
            }}
          >
            <div
              ref={(el) => { innerRefs.current[i] = el; }}
              onMouseEnter={() => handleMouseEnter(i)}
              className="w-full h-full cursor-pointer select-none"
            >
              <TransitionLink
                href={`/handicaps/${card.id}`}
                aria-label={`Découvrir le profil ${card.title.replace('\n', ' ')}`}
                className="w-full h-full flex flex-col focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                <div
                  className="w-full h-full overflow-hidden flex flex-col bg-secondary border-2 border-white"
                  style={{ backgroundImage: `url(${CardFond.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="pt-3 px-3">
                    <h3 className="text-white font-primary text-3xl leading-snug whitespace-pre-line drop-shadow">
                      {card.title}
                    </h3>
                  </div>

                  <div className="flex-1 flex items-end justify-end overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title.replace('\n', ' ')}
                      width={CARD_W}
                      height={CARD_H}
                      className="w-full max-h-full object-contain object-right-bottom mix-blend-luminosity opacity-90"
                    />
                  </div>

                  <span aria-hidden="true" className="bg-secondary/90 text-white text-xs font-secondary font-semibold uppercase tracking-wide px-3 py-3 hover:bg-primary transition-colors duration-200 text-center">
                    Découvrir les pré-requis
                  </span>
                </div>
              </TransitionLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
