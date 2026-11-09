import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Logo } from '../components/ui/Logo';
import { ButtonLink } from '../components/ui/Button';
import { LINKS } from '../data/links';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: Escape closes and returns focus; body scroll locks while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  // Close the menu first, then scroll once the body scroll lock is released.
  const goTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', href);
    });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${open ? 'bg-paper shadow-[0_1px_0_var(--color-line)]' : scrolled ? 'bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : 'bg-transparent'}`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold">
        Skip to content
      </a>
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <a href="#top" className="shrink-0 rounded-md" aria-label="InvoiceFlow home">
          <Logo className="h-7 w-auto" />
        </a>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative rounded-md px-3.5 py-2 text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {l.label}
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-green transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={LINKS.login} className="hidden rounded-md px-3 py-2 text-[15px] font-semibold text-ink transition-colors hover:text-green-ink sm:inline-block">
            Log In
          </a>
          <ButtonLink href={LINKS.signup} size="sm" variant="dark" shape="pill" className="hidden sm:inline-flex">
            Start Free Trial
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center rounded-[var(--radius-md)] text-ink transition-colors hover:bg-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <Container className="flex min-h-full flex-col py-6">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href} className="border-b border-line">
                  <a href={l.href} onClick={(e) => goTo(e, l.href)} className="flex items-center justify-between py-4 text-[20px] font-semibold tracking-[-0.01em] text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <ButtonLink href={LINKS.signup} size="lg" className="w-full">
              Start Free Trial
            </ButtonLink>
            <ButtonLink href={LINKS.login} variant="secondary" size="lg" className="w-full">
              Log In
            </ButtonLink>
            <p className="text-center text-[13px] text-muted">Free to get started. No credit card required.</p>
          </div>
        </Container>
      </div>
    </header>
  );
}
