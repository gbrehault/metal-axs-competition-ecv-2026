import { NAV_LINKS } from './nav-links';
import NavLink from './NavLink';

type Props = {
  pathname: string;
  onLinkClick?: () => void;
};

export default function NavLinks({ pathname, onLinkClick }: Props) {
  return (
    <ul className="flex items-center gap-6">
      {NAV_LINKS.map(({ label, href }) => (
        <NavLink
          key={href}
          label={label}
          href={href}
          active={pathname === href}
          onClick={onLinkClick}
        />
      ))}
    </ul>
  );
}
