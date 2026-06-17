'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoNav from '@/app/assets/logo_metal-axs_vertical.svg';
import Button from '@/app/components/ui/Button';
import TransitionLink from '@/app/components/ui/TransitionLink';

const NAV_LINKS = [
  { label: 'Bonnes pratiques', href: '/bonnes-pratiques' },
  { label: 'Handicaps', href: '/les-handicap' },
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
      <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden>
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeaderV2() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Wrapper fixe — toujours visible */}
      <div
        className="fixed top-8 left-8 z-50 flex flex-col"
        style={{ width: '440px', maxWidth: 'calc(100vw - 4rem)', backgroundColor: '#e8e8e8' }}
      >
        {/* Tuile logo + toggle — toujours visible */}
        <div className="bg-white flex items-center justify-between px-6" style={{ height: '72px' }}>
          <Link
            href="/"
            aria-label="Metal AXS — accueil"
            onClick={() => setOpen(false)}
            className="flex-1 flex justify-center"
          >
            <Image
              src={LogoNav}
              alt="Metal AXS"
              height={28}
              width={140}
              className="object-contain"
              style={{ height: '28px', width: 'auto' }}
            />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="text-secondary hover:text-primary transition-colors ml-4 flex-shrink-0"
          >
            {open ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>

        {/* Panneau nav — animé */}
        <div
          className={`flex flex-col gap-[3px] overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[600px] opacity-100 mt-[3px]' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <div key={href} className="bg-white">
                <TransitionLink
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-6 text-base transition-colors ${
                    active ? 'text-primary' : 'text-secondary hover:text-primary'
                  }`}
                  style={{ height: '68px' }}
                >
                  <span>{label}</span>
                  <ChevronRight />
                </TransitionLink>
              </div>
            );
          })}

          <div className="bg-white px-6 py-4">
            <Button
              href="/faire-un-audit"
              variant="primary"
              className="w-full justify-center"
              onClick={() => setOpen(false)}
            >
              → Réaliser une mise à niveau
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
