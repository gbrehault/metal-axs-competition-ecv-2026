'use client';

import TransitionLink from '@/app/components/ui/TransitionLink';
import type { MouseEventHandler, ReactNode } from 'react';

type ButtonBaseProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-disabled'?: boolean | 'true' | 'false';
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
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
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const sizeArrow: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

function Arrow({ size = 'sm', variant = 'primary' }: { size?: string; variant?: string }) {
  return (
    <span
      className={`${arrowVariants[variant]} ${sizeArrow[size]} transition-transform duration-200 group-hover:translate-x-1`}
    >
      <svg
        className=""
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
    </span>
  );
}

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'sm',
    className = '',
    'aria-disabled': ariaDisabled,
  } = props;

  const inner = (
    <>
      <span className={`${textVariants[variant]} ${sizeText[size]}`}>{children}</span>
      <Arrow size={size} variant={variant} />
    </>
  );

  if (typeof props.href === 'string') {
    const { href, onClick } = props as ButtonAsLink;

    return (
      <TransitionLink href={href} className={`${wrapperBase} ${className}`} onClick={onClick}>
        {inner}
      </TransitionLink>
    );
  }

  const { disabled, onClick } = props as ButtonAsButton;

  return (
    <button
      type="button"
      className={`${wrapperBase} ${className}`}
      disabled={disabled}
      aria-disabled={ariaDisabled ?? disabled}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
