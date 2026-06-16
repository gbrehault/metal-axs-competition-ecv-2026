import Link from 'next/link';

type Props = {
  label: string;
  href: string;
  active: boolean;
  onClick?: () => void;
};

export default function NavLink({ label, href, active, onClick }: Props) {
  return (
    <li className="flex items-center gap-1.5">
      {active && (
        <span className="block w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
      )}
      <Link
        href={href}
        onClick={onClick}
        className="text-sm font-medium uppercase text-secondary hover:text-primary transition-colors font-mono"
      >
        {label}
      </Link>
    </li>
  );
}
