'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoNav from '@/app/assets/logo_metal-axs_vertical.svg';
import Button from '@/app/components/ui/Button';
import TransitionLink from '@/app/components/ui/TransitionLink';
import { useScrollDirection } from '@/app/hooks/useScrollDirection';

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

function NavLink({ label, href, active, onClick }: {
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
      className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      aria-expanded={open}
    >
      <span className={`block w-6 h-0.5 bg-secondary origin-center transition-transform duration-200 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
      <span className={`block w-6 h-0.5 bg-secondary transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
      <span className={`block w-6 h-0.5 bg-secondary origin-center transition-transform duration-200 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
    </button>
  );
}

function MobileDrawer({ open, pathname, onClose }: { open: boolean; pathname: string; onClose: () => void }) {
  return (
    <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
      <ul className="flex flex-col gap-5 px-6 py-6">
        {NAV_LINKS.map(({ label, href }) => (
          <NavLink key={href} label={label} href={href} active={pathname === href} onClick={onClose} />
        ))}
        <li className="mt-2">
          <Button href="/faire-un-audit" variant="primary" onClick={onClose}>
            RÉALISER UN AUDIT
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const direction = useScrollDirection();
  const [open, setOpen] = useState(false);

  const hidden = direction === 'down' && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out mt-8 ${
        hidden ? '-translate-y-[calc(100%+2rem)]' : 'translate-y-0'
      }`}
    >
      <div className="flex items-center gap-2 justify-center">
        <div className="flex items-center bg-white p-4 h-[stretch]">
          <NavLogo />
        </div>

        <nav className="flex items-center bg-white p-4 gap-8">
          <div className="hidden md:flex flex-1 items-center">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map(({ label, href }) => (
                <NavLink key={href} label={label} href={href} active={pathname === href} />
              ))}
            </ul>
          </div>

          <Button href="/faire-un-audit" variant="primary" className="hidden md:inline-flex shrink-0">
            RÉALISER UN AUDIT
          </Button>

          <Hamburger open={open} onToggle={() => setOpen((v) => !v)} />
        </nav>
      </div>

      <MobileDrawer open={open} pathname={pathname} onClose={() => setOpen(false)} />
    </header>
  );
}
