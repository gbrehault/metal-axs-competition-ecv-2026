'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import LogoNav from '@/app/assets/logo-horizontal.svg';
import Button from '@/app/components/ui/Button';
import TransitionLink from '@/app/components/ui/TransitionLink';
import { useScrollDirection } from '@/app/hooks/useScrollDirection';
import { X, CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import src from '@/app/assets/photo_festival.webp';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'BONNES PRATIQUES', href: '/bonnes-pratiques' },
  { label: 'RESSOURCES', href: '/ressources' },
] as const;

const HANDICAP_LINKS = [
  { label: 'Auditif', href: '/handicaps/auditif' },
  { label: 'Visuel', href: '/handicaps/visuel' },
  { label: 'Moteur', href: '/handicaps/moteur' },
  { label: 'Cognitif', href: '/handicaps/cognitif' },
  { label: 'Invisible', href: '/handicaps/invisible' },
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

function HandicapsDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const isActive = pathname.startsWith('/handicaps');

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <li ref={ref} className="relative flex items-center gap-1.5">
      {isActive && (
        <span className="block w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium uppercase text-secondary hover:text-primary transition-colors font-mono"
        aria-expanded={open}
        aria-haspopup="true"
      >
        HANDICAPS
        {open ? (
          <CaretUpIcon size={12} weight="bold" />
        ) : (
          <CaretDownIcon size={12} weight="bold" />
        )}
      </button>
      {open && (
        <ul className="absolute top-full left-0 mt-8 bg-white shadow-md min-w-[200px] z-50 py-1">
          <li>
            <TransitionLink
              href="/handicaps"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-xs font-medium uppercase text-secondary hover:text-primary hover:bg-gray-50 transition-colors font-mono"
            >
              Tous les handicaps
            </TransitionLink>
          </li>
          {HANDICAP_LINKS.map(({ label, href }) => (
            <li key={href}>
              <TransitionLink
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-xs font-medium uppercase transition-colors font-mono ${
                  pathname === href
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary hover:bg-gray-50'
                }`}
              >
                {label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function MobileHandicapsAccordion({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = pathname.startsWith('/handicaps');

  return (
    <li className="flex flex-col gap-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {isActive && (
            <span className="block w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
          )}
          <TransitionLink
            href="/handicaps"
            onClick={onClose}
            className="text-sm font-medium uppercase text-secondary hover:text-primary transition-colors font-mono"
          >
            HANDICAPS
          </TransitionLink>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="p-1 text-secondary hover:text-primary transition-colors"
          aria-expanded={open}
          aria-label="Afficher les types de handicaps"
        >
          {open ? <CaretUpIcon size={12} weight="bold" /> : <CaretDownIcon size={12} weight="bold" />}
        </button>
      </div>
      {open && (
        <ul className="flex flex-col gap-3 mt-3 pl-4 border-l border-secondary/20">
          {HANDICAP_LINKS.map(({ label, href }) => (
            <li key={href} className="flex items-center gap-1.5">
              {pathname === href && (
                <span className="block w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
              )}
              <TransitionLink
                href={href}
                onClick={onClose}
                className="text-sm font-medium uppercase text-secondary hover:text-primary transition-colors font-mono"
              >
                {label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      )}
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
      className={`w-full md:hidden overflow-hidden flex flex-col transition-all duration-300 bg-tertiary ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <ul className="flex flex-col gap-5 px-6 py-6">
        {NAV_LINKS.slice(0, 1).map(({ label, href }) => (
          <NavLink key={href} label={label} href={href} active={pathname === href} onClick={onClose} />
        ))}
        <MobileHandicapsAccordion pathname={pathname} onClose={onClose} />
        {NAV_LINKS.slice(1).map(({ label, href }) => (
          <NavLink key={href} label={label} href={href} active={pathname === href} onClick={onClose} />
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
        className={`fixed top-0 left-0 right-0 z-200 transition-transform duration-300 ease-in-out p-2 md:p-4 mt-2 md:mt-8 w-full ${
          hidden ? '-translate-y-[calc(100%+2rem)]' : 'translate-y-0'
        }`}
      >
        <div className="flex flex-col w-full md:flex-row items-center gap-2 justify-center py-4">
          <div className="flex items-center justify-center bg-white w-full md:w-auto p-2 md:p-5 h-auto">
            <NavLogo />
          </div>

          <nav className="flex items-center justify-between w-full md:w-auto bg-white gap-8 p-4">
            <div className="hidden md:flex flex-1 items-center">
              <ul className="flex items-center gap-6">
                {NAV_LINKS.slice(0, 1).map(({ label, href }) => (
                  <NavLink key={href} label={label} href={href} active={pathname === href} />
                ))}
                <HandicapsDropdown pathname={pathname} />
                {NAV_LINKS.slice(1).map(({ label, href }) => (
                  <NavLink key={href} label={label} href={href} active={pathname === href} />
                ))}
              </ul>
            </div>
            <div className="flex md:hidden">
              <Button
                variant="primary"
                className="justify-center flex md:hidden"
                size="xs"
                onClick={(e) => {
                  e.preventDefault();

                  setOpen(false);

                  setIsPopupOpen(true);
                }}
              >
                Réaliser une mise <br /> à niveau
              </Button>
            </div>
            <div className="hidden md:flex">
              <Button
                variant="primary"
                className="justify-center hidden md:flex"
                size="xs"
                onClick={(e) => {
                  e.preventDefault();

                  setOpen(false);

                  setIsPopupOpen(true);
                }}
              >
                Introduction à l’accessibilité
              </Button>
            </div>
            <Hamburger open={open} onToggle={() => setOpen((v) => !v)} />
          </nav>

          <MobileDrawer open={open} pathname={pathname} onClose={() => setOpen(false)} />
        </div>
      </header>
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-10000 flex items-center justify-center bg-black/40 px-2 md:px-4"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="relative h-auto w-1/1 md:w-1/2 overflow-hidden bg-tertiary text-secondary shadow-2xl"
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
