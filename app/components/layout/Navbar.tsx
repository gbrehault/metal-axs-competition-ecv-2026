'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useScrollDirection } from '@/app/hooks/useScrollDirection';
import Button from '@/app/components/ui/Button';
import NavLogo from './navbar/NavLogo';
import NavLinks from './navbar/NavLinks';
import Hamburger from './navbar/Hamburger';
import MobileDrawer from './navbar/MobileDrawer';

export default function Navbar() {
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
            <NavLinks pathname={pathname} />
          </div>

          <Button href="/faire-un-audit" variant="primary" className="hidden md:inline-flex shrink-0">
            → RÉALISER UN AUDIT
          </Button>

          <div className="md:hidden">
            <Hamburger open={open} onToggle={() => setOpen((v) => !v)} />
          </div>
        </nav>
      </div>

      <MobileDrawer open={open} pathname={pathname} onClose={() => setOpen(false)} />
    </header>
  );
}
