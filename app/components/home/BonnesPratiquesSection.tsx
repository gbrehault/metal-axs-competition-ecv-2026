'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import TransitionLink from '@/app/components/ui/TransitionLink';
import Button from '@/app/components/ui/Button';
import CardFond from '@/app/assets/Card-fond.png';
import statsImg from '@/app/assets/homepage/Desktop - 16.jpg';
import { HANDICAP_CARDS_BASE } from '@/app/data/handicaps/cardsData';

const CARDS = HANDICAP_CARDS_BASE.map((card, i) => ({
  ...card,
  rotate: [8, 4, -2, 1, -5][i],
  offsetX: [-380, -200, -20, 160, 340][i],
  offsetY: [0, 60, 0, 60, 0][i],
}));

const CARD_W = 225;
const CARD_H = 280;

export default function BonnesPratiquesSection() {
  // Two refs per card: outer (position + zIndex) and inner (GSAP transform)
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    CARDS.forEach((card, i) => {
      const el = innerRefs.current[i];
      if (!el) return;
      gsap.set(el, { rotation: card.rotate, transformOrigin: 'bottom center' });
    });
  }, []);

  const handleMouseEnter = (hoveredIdx: number) => {
    CARDS.forEach((card, i) => {
      const outer = outerRefs.current[i];
      const inner = innerRefs.current[i];
      if (!outer || !inner) return;

      // zIndex on the outer div so stacking works correctly
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
    <section className="relative w-full min-h-screen  noise flex flex-col -mt-4 overflow-hidden bg-secondary px-10 md:px-16 py-16 z-10 ">
      {/* Header row */}
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-10 md:gap-20">
        <h2 className="font-primary text-secondary flex flex-col gap-2 leading-none">
          <span className="block leading-none">
            <span className="inline-block bg-white px-2 py-1">Bonnes</span>
          </span>
          <span className="block leading-none">
            <span className="inline-block bg-white px-2 py-1">pratiques</span>
          </span>
        </h2>

        <div className="flex flex-col gap-6 max-w-lg">
          <p className="text-tertiary text-base leading-relaxed">
            Du site web à l&apos;expérience sur site, il existe des solutions concrètes pour chaque
            type de handicap. Nous avons réuni les bonnes pratiques essentielles pour vous
            accompagner dans cette démarche.
          </p>
          <Button variant="outline" href="/handicaps">
            Découvrir
          </Button>
        </div>
      </div>

      {/* Fan of cards */}
      <div className="relative w-full" style={{ height: 480 }} onMouseLeave={handleMouseLeave}>
        {CARDS.map((card, i) => (
          // Outer: owns absolute position + zIndex (never touched by GSAP)
          <div
            key={card.id}
            ref={(el) => {
              outerRefs.current[i] = el;
            }}
            style={{
              position: 'absolute',
              left: `calc(50% + ${card.offsetX - CARD_W / 2}px)`,
              bottom: 40,
              width: CARD_W,
              height: CARD_H,
              zIndex: i + 1,
            }}
          >
            {/* Inner: GSAP animates rotation / x / y / scale */}
            <div
              ref={(el) => {
                innerRefs.current[i] = el;
              }}
              onMouseEnter={() => handleMouseEnter(i)}
              className="w-full h-full cursor-pointer select-none"
            >
              <div
                className="w-full h-full overflow-hidden flex flex-col bg-secondary border-2 border-white"
                style={{
                  backgroundImage: `url(${CardFond.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="pt-3 px-3">
                  <h4 className="text-white font-primary text-3xl leading-snug whitespace-pre-line drop-shadow">
                    {card.title}
                  </h4>
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

                <TransitionLink
                  href={`/handicaps#handicap-${card.id}`}
                  className="bg-secondary/90 text-white text-xs font-secondary font-semibold uppercase tracking-wide px-3 py-3 hover:bg-primary transition-colors duration-200 text-center"
                >
                  Découvrir les pré-requis
                </TransitionLink>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-20 w-full h-80"></div>
      <div className="flex p-4 overflow-hidden">
        <Image
          src={statsImg}
          className="h-auto w-full object-cover"
          alt="Illustration des bonnes pratiques"
        />
        <div />
        <div className=" absolute flex flex-col z-100 p-20">
          <h3 className="text-tertiary">Pensez votre évènement pour eux</h3>
          <div className="flex gap-10 w-150">
            <div className="w-55 flex flex-col justify-start items-start">
              <h2 className="text-tertiary">20%</h2>
              <p className="text-tertiary/50">
                Ne se rendent pas à un festival à cause de son manque d’accessibilité
              </p>
            </div>
            <div className="w-60 flex flex-col justify-start items-start">
              <h2 className="text-tertiary">52%</h2>
              <p className="text-tertiary/50">
                Des personnes en situations de handicap trouve l'accès à la cultutre diﬃcile
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
