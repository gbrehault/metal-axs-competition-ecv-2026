'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import LogoNav from '@/app/assets/logo_metal-axs_vertical.svg';
import Button from '@/app/components/ui/Button';
import TransitionLink from '@/app/components/ui/TransitionLink';
import src from '@/app/assets/photo_festival.webp';
import { X } from '@phosphor-icons/react';

const NAV_LINKS = [
  { label: 'Bonnes pratiques', href: '/bonnes-pratiques' },
  { label: 'Handicaps', href: '/handicaps' },
  { label: 'Ressources', href: '/ressources' },
  { label: 'Blog', href: '/blog' },
  { label: 'Fédération', href: '/federation' },
] as const;

function BurgerIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
      <rect y="0" width="22" height="2" fill="currentColor" />
      <rect y="7" width="22" height="2" fill="currentColor" />
      <rect y="14" width="22" height="2" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <line
        x1="1"
        y1="1"
        x2="15"
        y2="15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="15"
        y1="1"
        x2="1"
        y2="15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden>
      <path
        d="M1 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeaderV2() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const pathname = usePathname();
  const [open, setOpen] = useState(pathname === '/');

  useEffect(() => {
    setIsPopupOpen(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    let accumulated = 0;
    const THRESHOLD = 1200;
    const THRESHOLD_DOWN = 60;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      lastY = currentY;

      if (delta < 0) {
        accumulated = Math.min(0, accumulated + delta);
        if (accumulated <= -THRESHOLD) {
          setOpen(true);
          accumulated = 0;
        }
      } else {
        accumulated = Math.max(0, accumulated + delta);
        if (accumulated >= THRESHOLD_DOWN) {
          setOpen(false);
          accumulated = 0;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 md:top-8 md:left-16 md:translate-x-0 z-100 flex flex-col w-4/5 md:w-1/4">
        <div className="bg-tertiary flex items-center justify-between px-6 py-3">
          <Link
            href="/"
            aria-label="Metal AXS — accueil"
            onClick={() => setOpen(false)}
            className="flex-1 flex justify-center"
          >
            <Image src={LogoNav} alt="Metal AXS" className="object-contain" width={120} />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="text-secondary hover:text-primary transition-colors ml-4 flex-shrink-0 w-9 h-9 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {open ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>

        <nav
          aria-label="Navigation principale"
          className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[600px] opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;

            return (
              <div key={href} className="bg-tertiary">
                <TransitionLink
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-6 py-3 text-base transition-colors ${
                    active ? 'text-primary' : 'text-secondary hover:text-primary'
                  }`}
                >
                  <span>{label}</span>
                  <ChevronRight />
                </TransitionLink>
              </div>
            );
          })}

          <div className="bg-tertiary px-6 py-3">
            <Button
              href="/mise-a-niveau"
              variant="primary"
              className="w-full justify-center"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                setIsPopupOpen(true);
              }}
            >
              Réaliser une mise à niveau
            </Button>
          </div>
        </nav>
      </header>

      {isPopupOpen && (
        <div
          className="fixed inset-0 z-10000 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="relative h-auto b-10 w-1/2 overflow-hidden bg-tertiary text-secondary shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPopupOpen(false)}
              className="absolute right-5 top-5 z-20 text-2xl bg-tertiary text-secondary p-2 hover:text-primary"
              aria-label="Fermer la popup"
            >
              <X size={24} weight="bold" />
            </button>

            <div ref={imageRef} id="section2" data-hero-image className="relative h-64 w-full">
              <div className="absolute inset-0 z-10 bg-secondary/50" />

              {src ? (
                <Image
                  src={src}
                  alt="Concert festival Metal AXS"
                  fill
                  className="object-cover object-center grayscale mb-10"
                  sizes="100vw"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-secondary" />
              )}
            </div>

            <div className="relative p-8">
              <h2 className="mb-4 font-primary text-center text-3xl font-regular">
                Commencez vos premiers pas <br /> dans l’accessibilité ?
              </h2>
              <h5 className="mb-6 text-center text-xl leading-relaxed text-secondary/70">
                Cette mise à niveau vous permettra de respecter au maximum l’accessibilité de vos
                futurs festivaliers au sein de votre évènement.
              </h5>
              <Button
                href="/mise-a-niveau"
                variant="primary"
                className="w-full font-light justify-center"
              >
                Commencer le diagnostic
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
