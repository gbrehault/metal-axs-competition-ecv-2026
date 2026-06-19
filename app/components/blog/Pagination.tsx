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

function PaginationLink({
  href,
  children,
  active,
  className = '',
  'aria-label': ariaLabel,
}: {
  href: string | null;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  'aria-label'?: string;
}) {
  const base = 'w-9 h-9 flex items-center justify-center text-sm border transition-colors rounded-full';
  const activeClass = 'bg-secondary text-white border-secondary';
  const inactiveClass = 'text-secondary border-none hover:border-secondary';
  const disabledClass = 'text-secondary/20 border-none cursor-default pointer-events-none';

  if (!href) {
    return (
      <span className={`${base} ${disabledClass} ${className}`} aria-label={ariaLabel} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} ${active ? activeClass : inactiveClass} ${className}`}
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
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  const pages = buildPageList(currentPage, totalPages);

  return (
    <nav className="mt-14 flex items-center justify-center gap-1" aria-label="Pagination">
      <PaginationLink
        href={currentPage > 1 ? buildHref(currentPage - 1) : null}
        aria-label="Page précédente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m15 18-6-6 6-6"/></svg>
      </PaginationLink>

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
          <PaginationLink
            key={item}
            href={buildHref(item as number)}
            active={item === currentPage}
            aria-label={`Page ${item}`}
          >
            {item}
          </PaginationLink>
        )
      )}

      <PaginationLink
        href={currentPage < totalPages ? buildHref(currentPage + 1) : null}
        aria-label="Page suivante"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m9 18 6-6-6-6"/></svg>
      </PaginationLink>
    </nav>
  );
}
