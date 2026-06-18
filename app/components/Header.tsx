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
      className={`w-auto md:hidden overflow-hidden flex flex-col transition-all duration-300 bg-tertiary ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
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
        className={`fixed top-0 left-0 right-0 z-200 items-center justify-center transition-transform duration-300 ease-in-out p-2 md:p-4 mt-8 w-full${
          hidden ? '-translate-y-[calc(100%+2rem)]' : 'translate-y-0'
        }`}
      >
        <div className="flex flex-col w-full md:flex-row items-center gap-2 justify-center py-4">
          <div className="flex items-center justify-center bg-white w-full md:w-auto p-2 md:p-4 h-[stretch]">
            <NavLogo />
          </div>

          <nav className="flex items-center justify-between w-full md:w-auto bg-white gap-8 p-4">
            <div className="hidden md:flex flex-1 items-center">
              <ul className="flex items-center gap-6">
                {NAV_LINKS.map(({ label, href }) => (
                  <NavLink key={href} label={label} href={href} active={pathname === href} />
                ))}
              </ul>
            </div>

          <div className="hidden md:block ml-auto">
            <Button
              href="/mise-a-niveau"
              variant="primary"
              className="justify-center block md:hidden"
              size="xs"
              onClick={() => {
                setOpen(false);
                setIsPopupOpen(true);
              }}
            >
              Réaliser une mise <br /> à niveau
            </Button>
            <Button
              href="/mise-a-niveau"
              variant="primary"
              className="justify-center hidden md:block"
              size="xs"
              onClick={() => {
                setOpen(false);
                setIsPopupOpen(true);
              }}
            >
              Réaliser une mise à niveau
            </Button>
          </div>

          <nav className="flex items-center justify-between w-full md:w-auto bg-white gap-8 p-4">
            <div className="hidden md:flex flex-1 items-center">
              <ul className="flex items-center gap-6">
                {NAV_LINKS.map(({ label, href }) => (
                  <NavLink key={href} label={label} href={href} active={pathname === href} />
                ))}
              </ul>
            </div>
            <div className="justify-center flex md:hidden">
              <Button
                href="/mise-a-niveau"
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
            <div className="justify-center hidden md:flex">
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
                Réaliser une mise à niveau
              </Button>
            </div>
            <Hamburger open={open} onToggle={() => setOpen((v) => !v)} />
          </nav>
        </div>

        <MobileDrawer open={open} pathname={pathname} onClose={() => setOpen(false)} />
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
