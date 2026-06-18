import Link from 'next/link';

export type FilterTab = {
  label: string;
  value: string;
};

export default function FilterTabs({
  tabs,
  active,
  buildHref,
}: {
  tabs: FilterTab[];
  active: string;
  buildHref: (value: string) => string;
}) {
  return (
    <nav aria-label="Filtrer les articles" className="flex flex-wrap gap-2">
      {tabs.map(({ label, value }) => {
        const isActive = active === value;
        return (
          <Link
            key={value}
            href={buildHref(value)}
            aria-current={isActive ? 'page' : undefined}
            className={`px-4 py-1.5 text-sm font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
              isActive
                ? 'bg-secondary text-white border-secondary'
                : 'bg-transparent text-secondary border-secondary/30 hover:border-secondary'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
