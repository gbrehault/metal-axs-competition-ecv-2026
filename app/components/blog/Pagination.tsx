'use client';

import Link from 'next/link';

function buildPageList(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '...')[] = [];
  pages.push(1);
  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('...');
  pages.push(total);

  return pages;
}

function PageButton({
  page,
  active,
  disabled,
  children,
  href,
  onClick,
  ariaLabel,
}: {
  page?: number;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  href: string;
  onClick?: (page: number) => void;
  ariaLabel?: string;
}) {
  const base =
    'w-9 h-9 flex items-center justify-center text-sm border transition-colors rounded-full';
  const activeClass = 'bg-secondary text-white border-secondary';
  const inactiveClass = 'text-secondary border-none hover:border-secondary';
  const disabledClass = 'text-secondary/20 border-none cursor-default pointer-events-none';

  if (disabled) {
    return (
      <span className={`${base} ${disabledClass}`} aria-label={ariaLabel} aria-disabled="true">
        {children}
      </span>
    );
  }

  if (onClick && page !== undefined) {
    return (
      <button
        type="button"
        onClick={() => onClick(page)}
        aria-label={ariaLabel}
        aria-current={active ? 'page' : undefined}
        className={`${base} ${active ? activeClass : inactiveClass}`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} ${active ? activeClass : inactiveClass}`}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  buildHref,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
  onPageChange?: (page: number) => void;
}) {
  const pages = buildPageList(currentPage, totalPages);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const chevronLeft = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m15 18-6-6 6-6"/></svg>
  );
  const chevronRight = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m9 18 6-6-6-6"/></svg>
  );

  return (
    <nav className="mt-14 flex items-center justify-center gap-1" aria-label="Pagination">
      <PageButton
        page={prevPage ?? undefined}
        disabled={!prevPage}
        href={prevPage ? buildHref(prevPage) : '#'}
        onClick={onPageChange}
        ariaLabel="Page précédente"
      >
        {chevronLeft}
      </PageButton>

      {pages.map((item, i) =>
        item === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-secondary/40 text-xl"
            aria-hidden="true"
          >
            &hellip;
          </span>
        ) : (
          <PageButton
            key={item}
            page={item as number}
            active={item === currentPage}
            href={buildHref(item as number)}
            onClick={onPageChange}
            ariaLabel={`Page ${item}`}
          >
            {item}
          </PageButton>
        ),
      )}

      <PageButton
        page={nextPage ?? undefined}
        disabled={!nextPage}
        href={nextPage ? buildHref(nextPage) : '#'}
        onClick={onPageChange}
        ariaLabel="Page suivante"
      >
        {chevronRight}
      </PageButton>
    </nav>
  );
}
