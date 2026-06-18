'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/app/components/ui/Button';

const HANDICAPS = [
  {
    id: 'auditif',
    title: 'Handicap Auditif',
    image: '/handicaps/auditif.svg',
    paragraphs: [
      "Le handicap auditif concerne toutes les personnes malentendantes ou sourdes. On imagine souvent qu'un festival de musique est par définition inaccessible pour elles, c'est faux. Mais les obstacles sont réels : les annonces micro non sous-titrées, les changements d'horaires affichés uniquement sur écran sonore, les échanges avec le personnel qui deviennent compliqués dans un environnement bruyant, ou encore l'absence totale d'interprète LSF.",
      "Pourtant, ressentir la musique est possible autrement : via des plateformes ou des gilets vibrants qui transmettent les basses, des boucles à induction magnétique aux points d'information, du surtitrage sur les écrans, une interprétation en langue des signes annoncée à l'avance sur certains temps forts, et des informations pratiques toujours disponibles en version écrite.",
    ],
  },
  {
    id: 'visuel',
    title: 'Handicap Visuel',
    image: '/handicaps/visuel.svg',
    paragraphs: [
      "Le handicap visuel touche toutes les personnes ayant des difficultés à voir, qu'elles soient malvoyantes ou non voyantes. Sur un festival, s'orienter sur un site qu'on ne connaît pas, trouver les scènes, les toilettes ou les buvettes sans aide extérieure peut relever du défi.",
      "On pense rarement que les plans de site en image sont totalement inutilisables avec un lecteur d'écran, que les annonces affichées sur écran géant ne sont pas accessibles, ou que l'entrée d'un chien guide peut poser problème faute d'information claire en amont. Des réponses concrètes existent pourtant : bandes de guidage au sol, plans tactiles disponibles à l'entrée, signalétique en grands caractères et en braille, accompagnateurs disponibles sur demande, site web compatible avec les lecteurs d'écran et audiodescription pour certaines performances.",
    ],
  },
  {
    id: 'cognitif',
    title: 'Handicap Cognitif',
    image: '/handicaps/cognitif.svg',
    paragraphs: [
      "Le handicap mental et cognitif recouvre les difficultés de compréhension, de mémorisation ou de traitement de l'information, comme dans le cas de l'autisme, de la trisomie ou des troubles DYS.",
      "L'environnement d'un festival concentre tout ce qui peut être difficile à gérer : foule dense, bruit permanent, lumières stroboscopiques, imprévus, signalétique confuse. On pense rarement que ne pas savoir à quoi s'attendre peut suffire à empêcher quelqu'un de venir, ou qu'une simple modification d'horaire non communiquée clairement peut provoquer une grande détresse. Des solutions existent : envoyer en amont un carnet de visite avec photos du lieu et déroulé de la journée, identifier des créneaux à affluence réduite, proposer des kits sensoriels à l'entrée (casques anti-bruit, lunettes teintées), mettre en place des espaces calmes accessibles à tout moment, et rédiger toute la communication en langage clair (FALC).",
    ],
  },
  {
    id: 'moteur',
    title: 'Handicap Moteur',
    image: '/handicaps/moteur.svg',
    paragraphs: [
      "Le handicap moteur regroupe toutes les difficultés liées au mouvement et à la mobilité. En fauteuil roulant, avec des béquilles ou simplement avec une mobilité réduite, un festival peut vite devenir un parcours du combattant.",
      "On pense souvent aux rampes d'accès, mais on oublie que le sol en herbe ou en gravier est difficilement praticable, que les files d'attente debout sont épuisantes, que les comptoirs de bar trop hauts excluent une partie du public, ou encore que les zones debout face à la scène ne laissent aucune visibilité à quelqu'un assis. Des solutions existent : cheminements stabilisés, zones réservées surélevées avec vue dégagée, sièges disponibles dans les espaces de restauration, comptoirs adaptés, sanitaires accessibles à proximité des scènes et navette sur site si les distances sont importantes.",
    ],
  },
  {
    id: 'invisible',
    title: 'Handicap Invisible psychique',
    image: '/handicaps/Invisible-psychique.svg',
    paragraphs: [
      "Le handicap psychique regroupe les troubles durables de la santé mentale, anxiété sévère, troubles bipolaires, schizophrénie, dépression profonde. Il est souvent invisible, ce qui le rend particulièrement mal compris et peu pris en compte.",
      "Sur un festival, les défis sont nombreux et rarement anticipés : une foule imprévisible qui génère une forte anxiété, l'impossibilité de partir rapidement si on se sent mal, des agents de sécurité peu formés à ce type de situation qui peuvent réagir de manière inadaptée, ou encore la honte de devoir se justifier pour accéder à une file prioritaire sans que le handicap soit visible. Des aménagements simples changent pourtant beaucoup de choses : accès prioritaire avec la Carte Mobilité Inclusion sans justification à donner sur place, espaces de retrait calmes accessibles librement, personnel sensibilisé et formé à repérer et accompagner discrètement, et communication bienveillante qui reconnaît explicitement les handicaps invisibles comme des handicaps à part entière.",
    ],
  },
];

export default function HandicapListSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const articleRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    articleRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (i: number) => {
    articleRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    /* Wrapper relative : la nav absolute s'y ancre et sticky y reste confiné */
    <div className="relative">
      {/* Nav sticky confinée à la hauteur du wrapper */}
      <div className="absolute inset-y-0 right-0 z-10 pointer-events-none hidden md:block" style={{ paddingTop: 'calc(50vh - 140px)' }}>
        <nav
          aria-label="Navigation des types de handicap"
          className="sticky flex flex-col pointer-events-auto"
          style={{ top: 'calc(50vh - 140px)' }}
        >
          {HANDICAPS.map((h, i) => (
            <button
              key={h.id}
              onClick={() => scrollTo(i)}
              aria-label={h.title}
              aria-current={i === activeIndex ? 'true' : undefined}
              className="w-14 h-14 flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                backgroundColor: i === activeIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
              }}
            >
              <Image src={h.image} alt="" width={32} height={32} className="w-8 h-8 object-contain" aria-hidden="true" />
            </button>
          ))}
        </nav>
      </div>

      {/* Nav horizontale mobile — fixée en bas */}
      <nav
        aria-label="Navigation des types de handicap"
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden"
      >
        {HANDICAPS.map((h, i) => (
          <button
            key={h.id}
            onClick={() => scrollTo(i)}
            aria-label={h.title}
            aria-current={i === activeIndex ? 'true' : undefined}
            className="flex-1 h-12 flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{
              backgroundColor: i === activeIndex ? 'var(--color-primary)' : 'rgba(30,30,30,0.95)',
            }}
          >
            <Image src={h.image} alt="" width={24} height={24} className="w-6 h-6 object-contain" aria-hidden="true" />
          </button>
        ))}
      </nav>

      {/* Contenu */}
      <section
        aria-label="Les différents types de handicap"
        className="noise"
        style={{ background: 'linear-gradient(to bottom, #090909, #6F6F6F)' }}
      >
        {HANDICAPS.map((h, i) => {
          const imageLeft = i % 2 === 0;
          return (
            <article
              key={h.id}
              id={`handicap-${h.id}`}
              ref={(el) => { articleRefs.current[i] = el; }}
              className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10 last:border-b-0"
              style={i % 2 !== 0 ? { backgroundColor: '#191919' } : undefined}
            >
              {/* Image — masquée sur mobile, visible desktop */}
              <div
                className={`hidden md:flex items-center justify-center md:p-20 ${imageLeft ? 'md:order-1' : 'md:order-2'}`}
                aria-hidden="true"
              >
                <div
                  className="flex items-center justify-center p-10"
                  style={{
                    backgroundColor: '#262626',
                    boxShadow: '0 8px 40px 0 rgba(0,0,0,0.6)',
                  }}
                >
                  <Image
                    src={h.image}
                    alt=""
                    width={400}
                    height={400}
                    className="w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
              </div>

              {/* Texte */}
              <div
                className={`flex flex-col justify-center gap-5 px-6 py-12 md:px-16 md:py-20 pb-16 md:pb-20 ${imageLeft ? 'md:order-2' : 'md:order-1'}`}
              >
                {/* Icône visible uniquement mobile */}
                <div className="flex md:hidden justify-center mb-2" aria-hidden="true">
                  <div
                    className="flex items-center justify-center p-6"
                    style={{ backgroundColor: '#262626', boxShadow: '0 8px 40px 0 rgba(0,0,0,0.6)' }}
                  >
                    <Image src={h.image} alt="" width={120} height={120} className="w-28 h-28 object-contain" />
                  </div>
                </div>

                <h2 className="font-primary text-[clamp(1.8rem,6vw,3.5rem)] leading-tight text-white">
                  {h.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {h.paragraphs.map((p, j) => (
                    <p key={j} className="text-white/70 text-sm leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-2">
                  <Button variant="secondary" href={`/handicaps/${h.id}`}>
                    BONNES PRATIQUES HANDICAP {h.id.toUpperCase()}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
