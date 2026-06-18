'use client';

import Link from 'next/link';
import { usePageTransition } from './PageTransition';
import { usePathname } from 'next/navigation';
import type { AnchorHTMLAttributes } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
};

export default function TransitionLink({ href, children, onClick, ...props }: Props) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      props.target === '_blank' ||
      props.download
    ) {
      return;
    }

    const nextUrl = new URL(href, window.location.href);
    const currentUrl = new URL(window.location.href);

    if (nextUrl.origin !== currentUrl.origin) return;
    if (nextUrl.pathname === pathname) return;

    e.preventDefault();
    navigate(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
