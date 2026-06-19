import Image from 'next/image';
import Link from 'next/link';
import Degrade from '@/app/assets/Footer-bg.jpg';

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/bonnes-pratiques', label: 'Bonnes pratiques' },
  { href: '/handicaps', label: 'Handicaps' },
  { href: '/ressources', label: 'Ressources' },
  { href: '/federation', label: 'Fédération' },
];

const SOCIAL_LINKS = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'Linkedin' },
];

const LEGAL_LINKS = [
  { href: '#', label: 'Politique de confidentialité' },
  { href: '#', label: 'Mentions légales' },
  { href: '#', label: 'Conditions générales de ventes' },
];

export default function Footer() {
  return (
    <footer id="federation" className="noise relative overflow-hidden bg-secondary pb-86">
      {/* Gradient background image */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={Degrade}
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary from-20% via-secondary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 px-8 xl:px-20 pt-16 pb-12">
          {/* Left: nav + copyright */}
          <div className="flex flex-col justify-between gap-10 pb-10 md:pb-0 md:pr-12 border-b md:border-b-0 md:border-r border-white/20">
            <nav aria-label="Navigation principale" className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors text-xl"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="text-white/40 text-sm">©2026 Musthane, tous droits réservés</p>
          </div>

          {/* Center: initiative + social */}
          <div className="flex flex-col justify-between gap-10 py-10 md:py-0 md:px-12 border-b md:border-b-0 md:border-r border-white/20">
            <p className="text-white/80 text-xl">
              Une initiative de la Fédération Musique Métallique
            </p>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors text-xl"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: FMM logo + legal */}
          <div className="flex flex-col justify-between gap-10 pt-10 md:pt-0 md:pl-12">
            {/* FMM logo */}
            <div aria-label="Fédération Musique Métallique">
              <Image src="/logo-FMM.svg" alt="Logo FFM" width={90} height={90} />
            </div>

            <div className="flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors text-xl"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Metal AXS logo */}
       
      </div>
    </footer>
  );
}
