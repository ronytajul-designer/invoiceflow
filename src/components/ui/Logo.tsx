import horizontalLight from '../../assets/logo/logo-horizontal-light.svg';
import horizontalDark from '../../assets/logo/logo-horizontal-dark.svg';
import symbolLight from '../../assets/logo/symbol-light.svg';
import symbolDark from '../../assets/logo/symbol-dark.svg';

type LogoProps = {
  /** "light" = for light backgrounds (navy sheet); "dark" = for dark backgrounds. */
  tone?: 'light' | 'dark';
  variant?: 'horizontal' | 'symbol';
  className?: string;
};

/** Folded Ledger logo. Uses the master SVGs from /brand without modification. */
export function Logo({ tone = 'light', variant = 'horizontal', className = '' }: LogoProps) {
  const src =
    variant === 'symbol'
      ? tone === 'light'
        ? symbolLight
        : symbolDark
      : tone === 'light'
        ? horizontalLight
        : horizontalDark;
  const ratio = variant === 'symbol' ? 1 : 1188.04 / 256;
  return (
    <img
      src={src}
      alt={variant === 'symbol' ? '' : 'InvoiceFlow'}
      aria-hidden={variant === 'symbol' ? true : undefined}
      className={className}
      style={{ aspectRatio: String(ratio) }}
      draggable={false}
    />
  );
}
