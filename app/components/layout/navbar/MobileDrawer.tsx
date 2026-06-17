import Button from '@/app/components/ui/Button';
import { NAV_LINKS } from './nav-links';
import NavLink from './NavLink';

type Props = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export default function MobileDrawer({ open, pathname, onClose }: Props) {
  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${
        open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <ul className="flex flex-col gap-5 px-6 py-6">
        {NAV_LINKS.map(({ label, href }) => (
          <NavLink
            key={href}
            label={label}
            href={href}
            active={pathname === href}
            onClick={onClose}
          />
        ))}
        <li className="mt-2">
          <Button href="/faire-un-audit" variant="primary" onClick={onClose}>
            → RÉALISER UN AUDIT
          </Button>
        </li>
      </ul>
    </div>
  );
}
