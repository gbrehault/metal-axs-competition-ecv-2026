'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import LogoNav from '@/app/assets/logo_metal-axs_vertical.svg';
import Button from '@/app/components/ui/Button';
import TransitionLink from '@/app/components/ui/TransitionLink';
import { useScrollDirection } from '@/app/hooks/useScrollDirection';
import { X } from '@phosphor-icons/react';
import src from '@/app/assets/photo_festival.webp';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'BONNES PRATIQUES', href: '/bonnes-pratiques' },
  { label: 'HANDICAPS', href: '/handicaps' },
  { label: 'RESSOURCES', href: '/ressources' },
  { label: 'BLOG', href: '/blog' },
] as const;

function NavLogo() {
  return (
    <Link href="/" aria-label="Metal AXS — accueil">
      <Image
        src={LogoNav}
        alt="Metal AXS"
        height={32}
        width={120}
        className="object-contain"
        style={{ height: '32px', width: 'auto' }}
      />
    </Link>
  );
}

function NavLink({
  label,
  href,
  active,
  onClick,
}: {
  label: string;
  href: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <li className="flex items-center gap-1.5">
      {active && (
        <span className="block w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
      )}
      <TransitionLink
        href={href}
        onClick={onClick}
        className="text-sm font-medium uppercase text-secondary hover:text-primary transition-colors font-mono"
      >
        {label}
      </TransitionLink>
    </li>
  );
}

function Hamburger({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}

      aria-expanded={open}
    >
      <span
        className={`block w-6 h-0.5 bg-secondary origin-center transition-transform duration-200 ${open ? 'rotate-45 translate-y-[7px]' : ''}`}
      />
      <span
        className={`block w-6 h-0.5 bg-secondary transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
      />
      <span
        className={`block w-6 h-0.5 bg-secondary origin-center transition-transform duration-200 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}
      />
    </button>
  );
}

function MobileDrawer({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <ul className="flex flex-col gap-5 px-6 py-6">
        {NAV_LINKS.map(({ label, href }) => (
          <NavLink
            key={href}
            label={label}
            href={href}
            active={pathname === href}
            onClick={onClose}
          />
        ))}
      </ul>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const direction = useScrollDirection();
  const [open, setOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const hidden = direction === 'down' && !open;
  const imageRef = useRef<HTMLDivElement>(null);

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
      <header
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-200 transition-transform duration-300 ease-in-out mt-8 w-4/5 md:left-8 md:right-8 md:translate-x-0 md:w-3/4 mx-auto ${
          hidden ? '-translate-y-[calc(100%+2rem)]' : 'translate-y-0'
        }`}
      >
        <nav aria-label="Navigation principale" className="flex items-center bg-white px-6 py-4 gap-6">
          <NavLogo />

          <ul className="hidden md:flex items-center gap-6 flex-1">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={href} label={label} href={href} active={pathname === href} />
            ))}
          </ul>

          <div className="hidden md:block ml-auto">
            <Button
              href="/mise-a-niveau"
              variant="primary"
              className="justify-center"
              onClick={() => {
                setOpen(false);
                setIsPopupOpen(true);
              }}
            >
              Réaliser une mise à niveau
            </Button>
          </div>

          <Hamburger open={open} onToggle={() => setOpen((v) => !v)} />
        </nav>

        <MobileDrawer open={open} pathname={pathname} onClose={() => setOpen(false)} />
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
              <h3 className="mb-4 font-primary text-center text-3xl font-regular">
                Commencez vos premiers pas <br /> dans l’accessibilité ?
              </h3>
              <h5 className="mb-6 text-center text-xl leading-relaxed text-secondary/70">
                Cette mise à niveau vous permettra de respecter au maximum l’accessibilité de vos
                futurs festivaliers au sein de votre évènement.
              </h5>
              <Button
                href="/mise-a-niveau"
                variant="primary"
                className="w-full font-light justify-center"
                onClick={() => setIsPopupOpen(false)}
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
