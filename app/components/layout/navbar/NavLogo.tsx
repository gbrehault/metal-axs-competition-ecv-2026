import Image from 'next/image';
import Link from 'next/link';
import LogoNav from '@/app/assets/logo_metal-axs_vertical.svg';

export default function NavLogo() {
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
