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
    <div className="flex gap-2">
      {tabs.map(({ label, value }) => {
        const isActive = active === value;
        return (
          <Link
            key={value}
            href={buildHref(value)}
            className={`px-4 py-1.5 text-sm font-medium border transition-colors ${
              isActive
                ? 'bg-secondary text-white border-secondary'
                : 'bg-transparent text-secondary border-secondary/30 hover:border-secondary'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
