import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Logo } from '../components/ui/Logo';
import { footerColumns } from '../data/content';
import { LINKS } from '../data/links';

const socials = [
  { label: 'InvoiceFlow on X', href: '#', icon: Twitter },
  { label: 'InvoiceFlow on LinkedIn', href: '#', icon: Linkedin },
  { label: 'InvoiceFlow on Instagram', href: '#', icon: Instagram },
  { label: 'InvoiceFlow on GitHub', href: '#', icon: Github },
];

/**
 * Light footer: logo and one line on the left, link columns on the right,
 * then socials beside a large, very faint logo watermark, and the copyright.
 */
export function Footer() {
  return (
    <footer className="overflow-hidden bg-white pt-4 pb-10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="flex flex-col justify-between gap-6">
            <Logo className="h-8 w-auto self-start" />
            <p className="max-w-[340px] text-[15px] leading-[1.6] text-muted">Invoicing and payment tracking for freelancers, agencies and small businesses.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-[17px] font-bold tracking-[-0.01em] text-ink">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-[15px] text-ink-soft transition-colors hover:text-green-ink">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </Container>

      <div className="mt-14 border-t border-line">
        <Container className="flex flex-col gap-8 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex gap-2.5">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full bg-[#F1F5F3] text-ink transition-colors hover:bg-green-wash hover:text-green-ink"
                >
                  <Icon className="size-[18px]" strokeWidth={1.9} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          {/* Watermark: the full logo, large and nearly transparent. */}
          <Logo className="pointer-events-none h-auto w-full max-w-[640px] opacity-[0.06] brightness-0 select-none sm:w-[60%]" />
        </Container>
      </div>

      <Container className="mt-10 flex flex-col items-center justify-center gap-x-6 gap-y-2 text-[13.5px] text-muted sm:flex-row">
        <p>© 2026 InvoiceFlow. All rights reserved.</p>
        <p className="flex gap-5">
          <a href={LINKS.privacy} className="transition-colors hover:text-ink">
            Privacy
          </a>
          <a href={LINKS.terms} className="transition-colors hover:text-ink">
            Terms
          </a>
        </p>
      </Container>
    </footer>
  );
}
