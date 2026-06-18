import Image from 'next/image';
import { BONNES_PRATIQUES_CARDS, SPECIAL_CARD } from '@/app/data/bonnes-pratiques/bonnesPratiquesData';
import Button from '@/app/components/ui/Button';

export default function CardsGridSection() {
  return (
    <section
      id="recommandations"
      aria-label="Les bonnes pratiques par type de handicap"
      className="bg-[#f2f2f2] px-6 md:px-16 py-20"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-secondary/10 border border-secondary/10">
        {BONNES_PRATIQUES_CARDS.map((card) => (
          <article
            key={card.id}
            className="bg-[#f2f2f2] p-6 md:p-8 flex flex-col gap-4 md:gap-5"
          >
            {/* Icon */}
            <div aria-hidden="true" className="w-20 h-20 md:w-24 md:h-24">
              <Image
                src={card.icon}
                alt=""
                width={96}
                height={96}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="font-primary text-secondary text-[clamp(1.1rem,2vw,1.35rem)] leading-tight">
              {card.title}
            </h3>

            {/* Items */}
            <ul className="flex flex-col gap-2 flex-1">
              {card.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-secondary/70 text-sm font-secondary leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}

        {/* Special card */}
        <article
          className="bg-secondary p-6 md:p-8 flex flex-col gap-4 md:gap-5 justify-between"
          aria-label={SPECIAL_CARD.title}
        >
          <div
            aria-hidden="true"
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="2" />
              <text
                x="16"
                y="22"
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill="white"
                fontFamily="Arial"
              >
                ?
              </text>
            </svg>
          </div>

          <h3 className="font-primary text-white text-[clamp(1.1rem,2vw,1.35rem)] leading-tight">
            {SPECIAL_CARD.title}
          </h3>

          <p className="text-white/60 text-sm font-secondary leading-relaxed flex-1">
            {SPECIAL_CARD.description}
          </p>

          <a
            href={SPECIAL_CARD.downloadHref}
            download
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-mono font-medium uppercase text-sm px-6 py-3 hover:bg-primary/90 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            aria-label={`${SPECIAL_CARD.downloadLabel} le guide d'accessibilité`}
          >
            {SPECIAL_CARD.downloadLabel}
          </a>
        </article>
      </div>

      {/* Intro CTA */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
        <div className="flex flex-col gap-4">
          <h2 className="font-primary text-secondary leading-tight">
            Les bonnes pratiques
            <br />
            par type de handicap
          </h2>
          <p className="text-secondary/70 font-secondary text-base leading-relaxed max-w-md">
            Retrouvez ci-dessous nos exigences et conseils de conception pour rendre les plateformes
            numériques de vos festivals totalement inclusives.
          </p>
          <div className="mt-2">
            <Button href="/mise-a-niveau" variant="primary">
              Réaliser un audit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
