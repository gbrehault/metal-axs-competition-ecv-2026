'use client';

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
    if (href === pathname) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
