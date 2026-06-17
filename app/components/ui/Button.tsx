import Link from 'next/link';

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'disabled';
  size?: 'sm' | 'lg';
  className?: string;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  disabled?: never;
  onClick?: () => void;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClass = 'inline-flex items-center gap-2 font-medium uppercase transition-colors font-mono';

const variants: Record<string, string> = {
  primary:   'bg-primary text-black hover:bg-primary/90',
  secondary: 'bg-secondary text-white hover:bg-secondary/80',
  disabled:  'bg-secondary/40 text-white cursor-not-allowed',
};

const sizes: Record<string, string> = {
  sm: 'text-[14px] px-3 py-2',
  lg: 'text-[20px] px-3 py-2',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
  href,
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `${baseClass} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
           disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
