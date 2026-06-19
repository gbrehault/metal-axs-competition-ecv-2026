'use client';

import TransitionLink from '@/app/components/ui/TransitionLink';
import type { MouseEventHandler, ReactNode } from 'react';

type ButtonBaseProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'disabled';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  'aria-disabled'?: boolean | 'true' | 'false';
  'aria-label'?: string;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  download?: boolean | string;
  target?: string;
  disabled?: never;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const wrapperBase =
  'group inline-flex gap-1 items-stretch font-medium uppercase font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed';

const textVariants: Record<string, string> = {
  primary: 'bg-black text-tertiary px-5 py-3',
  secondary: 'bg-white text-secondary px-5 py-3',
  outline: 'bg-white border border-secondary/20 text-secondary px-5 py-3',
  disabled: 'bg-black/60 text-tertiary/40 px-5 py-3 cursor-not-allowed',
};

const arrowVariants: Record<string, string> = {
  primary: 'bg-primary text-secondary flex items-center justify-center px-4',
  secondary: 'bg-primary text-black flex items-center justify-center px-4',
  outline: 'bg-secondary/80 text-white flex items-center justify-center px-4',
  disabled: 'bg-primary/40 text-black flex items-center justify-center px-4 cursor-not-allowed',
};

const sizeText: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-xl',
};

const sizeArrow: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-xl',
};

const DefaultArrow = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1 8h14M9 2l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function IconSlot({
  size = 'sm',
  variant = 'primary',
  icon,
}: {
  size?: string;
  variant?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={`${arrowVariants[variant]} ${sizeArrow[size]} transition-transform duration-200 group-hover:translate-x-1`}
    >
      {icon ?? <DefaultArrow />}
    </span>
  );
}

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'sm',
    className = '',
    icon,
    'aria-disabled': ariaDisabled,
    'aria-label': ariaLabel,
  } = props;

  const inner = (
    <>
      <span className={`${textVariants[variant]} ${sizeText[size]}`}>{children}</span>
      <IconSlot size={size} variant={variant} icon={icon} />
    </>
  );

  if (typeof props.href === 'string') {
    const { href, onClick, download, target } = props as ButtonAsLink;

    // For downloads or external links, use a plain <a> to avoid transition interception
    if (download || target) {
      return (
        <a
          href={href}
          download={download}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          aria-label={ariaLabel}
          className={`${wrapperBase} ${className}`}
          onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
        >
          {inner}
        </a>
      );
    }

    return (
      <TransitionLink
        href={href}
        aria-label={ariaLabel}
        className={`${wrapperBase} ${className}`}
        onClick={onClick}
      >
        {inner}
      </TransitionLink>
    );
  }

  const { disabled, onClick } = props as ButtonAsButton;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`${wrapperBase} ${className}`}
      disabled={disabled}
      aria-disabled={ariaDisabled ?? disabled}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
