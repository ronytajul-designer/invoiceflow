import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'outline-inverse';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-soft)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  // Fresh green with navy text: 7.25:1 contrast and the "paid" colour of the logo.
  primary:
    'bg-green text-midnight shadow-[inset_0_-1px_0_rgb(11_25_48/0.12),0_1px_2px_rgb(11_25_48/0.08)] hover:bg-green-hover hover:shadow-[inset_0_-1px_0_rgb(11_25_48/0.12),0_6px_16px_-6px_rgb(35_122_87/0.55)]',
  secondary: 'bg-white text-ink border border-line-strong hover:border-ink/30 hover:bg-paper',
  ghost: 'text-ink hover:bg-ink/5',
  inverse: 'bg-white text-midnight hover:bg-paper',
  'outline-inverse': 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 rounded-[var(--radius-md)] px-3.5 text-[14px]',
  md: 'h-11 rounded-[var(--radius-md)] px-5 text-[15px]',
  lg: 'h-13 rounded-[var(--radius-md)] px-6 text-[16px]',
};

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function ButtonLink({ variant, size, className, children, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}

export function Button({ variant, size, className, children, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
