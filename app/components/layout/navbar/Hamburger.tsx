type Props = {
  open: boolean;
  onToggle: () => void;
};

export default function Hamburger({ open, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      aria-expanded={open}
    >
      <span
        className={`block w-6 h-0.5 bg-secondary origin-center transition-transform duration-200 ${
          open ? 'rotate-45 translate-y-[7px]' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-secondary transition-opacity duration-200 ${
          open ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-secondary origin-center transition-transform duration-200 ${
          open ? '-rotate-45 -translate-y-[7px]' : ''
        }`}
      />
    </button>
  );
}
