import Image from 'next/image';
import Link from 'next/link';
import LogoMetalAxs from '@/app/assets/logo_metal-axs_vertical.svg';

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

export default function FooterLight() {
  return (
    <footer id="federation" className="bg-tertiary border-t border-secondary/10">
      <div className="grid grid-cols-1 md:grid-cols-3 px-8 xl:px-20 pt-16 pb-12">
        <div className="flex flex-col justify-between gap-10 pb-10 md:pb-0 md:pr-12 border-b md:border-b-0 md:border-r border-secondary/15">
          <nav aria-label="Navigation principale" className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-secondary/70 hover:text-secondary transition-colors text-xl focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-secondary/40 text-sm">©2026 Musthane, tous droits réservés</p>
        </div>

        <div className="flex flex-col justify-between gap-10 py-10 md:py-0 md:px-12 border-b md:border-b-0 md:border-r border-secondary/15">
          <p className="text-secondary/70 text-xl">
            Une initiative de la Fédération Musique Métallique
          </p>
          <nav aria-label="Réseaux sociaux" className="flex flex-col gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={`Metal AXS sur ${link.label}`}
                className="text-secondary/70 hover:text-secondary transition-colors text-xl focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-10 pt-10 md:pt-0 md:pl-12">
          <Image
            src="/logo-FMM.svg"
            alt="Logo Fédération Musique Métallique"
            width={90}
            height={90}
            className="brightness-0"
          />
          <nav aria-label="Liens légaux" className="flex flex-col gap-3">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-secondary/70 hover:text-secondary transition-colors text-xl focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex justify-center px-8 xl:px-20 pb-8 pt-4 overflow-hidden">
        <Image
          src={LogoMetalAxs}
          alt="Metal AXS"
          width={220}
          height={60}
          className="brightness-0"
        />
      </div>
    </footer>
  );
}
