import Image from 'next/image';
import { HANDICAPS_DATA } from '@/app/data/handicaps/handicapsData';
import Button from '@/app/components/ui/Button';

export default function HandicapDetailSection() {
  return (
    <section
      aria-label="Les bonnes pratiques à adopter par type de handicap"
      style={{ backgroundColor: '#f2f2f2' }}
    >
      {HANDICAPS_DATA.map((h, i) => {
        const imageLeft = i % 2 === 0;
        return (
          <div
            key={h.id}
            id={`pratiques-${h.id}`}
            className={`grid grid-cols-1 md:grid-cols-2 border-b border-secondary/10 last:border-b-0 ${i % 2 !== 0 ? 'bg-white' : ''}`}
          >
            {/* Image */}
            <div
              aria-hidden="true"
              className={`flex items-center justify-center min-h-[260px] md:min-h-[480px] py-8 md:py-0 ${imageLeft ? 'md:order-1' : 'md:order-2'}`}
            >
              <Image
                src={h.image}
                alt=""
                width={400}
                height={400}
                className="w-4/5 max-w-[300px] h-auto object-contain"
              />
            </div>

            {/* Content */}
            <div
              className={`flex flex-col justify-center gap-5 md:gap-6 px-6 py-10 md:px-16 md:py-20 ${imageLeft ? 'md:order-2' : 'md:order-1'}`}
            >
              <h2 className="font-primary text-[clamp(1.8rem,4vw,3rem)] leading-none text-secondary flex flex-col gap-2">
                <span className="block leading-none">
                  <span className="inline-block bg-white px-2 py-1">{h.practicesTitle.line1}</span>
                </span>
                <span className="block leading-none">
                  <span className="inline-block bg-white px-2 py-1">{h.practicesTitle.line2}</span>
                </span>
                <span className="block leading-none">
                  <span className="inline-block bg-white px-2 py-1 text-primary">
                    {h.practicesTitle.highlight}
                  </span>
                </span>
              </h2>

              <p className="text-secondary/60 text-sm font-secondary leading-relaxed max-w-lg">
                {h.amenagements.intro}
              </p>

              <ul className="flex flex-col" role="list">
                {h.amenagements.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 py-4 border-b border-secondary/10 last:border-b-0 text-secondary/80 text-sm font-secondary leading-relaxed"
                  >
                    <span aria-hidden="true" className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-2">
                <Button href={`/handicaps/${h.id}`} variant="primary">
                  Voir tous les détails
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
