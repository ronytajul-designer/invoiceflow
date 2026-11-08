import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { footerColumns } from '../data/content';
import { LINKS } from '../data/links';

const socials = [
  { label: 'InvoiceFlow on X', href: '#', icon: Twitter },
  { label: 'InvoiceFlow on LinkedIn', href: '#', icon: Linkedin },
  { label: 'InvoiceFlow on Instagram', href: '#', icon: Instagram },
  { label: 'InvoiceFlow on GitHub', href: '#', icon: Github },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setState('error');
      return;
    }
    setState('done');
  };

  if (state === 'done') {
    return (
      <p className="flex items-center gap-2 rounded-[var(--radius-md)] border border-green/30 bg-green/10 px-4 py-3 text-[14px] text-green-soft" role="status">
        <CheckCircle2 className="size-4 shrink-0" strokeWidth={2.25} aria-hidden="true" />
        You’re subscribed. Check your inbox to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') setState('idle');
          }}
          aria-invalid={state === 'error'}
          aria-describedby="newsletter-msg"
          className={`h-11 min-w-0 flex-1 rounded-[var(--radius-md)] border bg-white/5 px-4 text-[15px] text-white placeholder:text-white/40 transition-colors outline-none focus:bg-white/10 ${state === 'error' ? 'border-[#F2A36B]' : 'border-white/15 focus:border-green'}`}
        />
        <Button type="submit" size="md">
          Subscribe
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </Button>
      </div>
      <p id="newsletter-msg" className={`text-[13px] ${state === 'error' ? 'text-[#F2A36B]' : 'text-white/50'}`} aria-live="polite">
        {state === 'error' ? 'Enter a valid email address, like name@company.com.' : 'One practical email a month. Unsubscribe anytime.'}
      </p>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-midnight pt-16 pb-10 text-white sm:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Logo tone="dark" className="h-8 w-auto self-start" />
            <p className="max-w-[340px] text-[15px] leading-[1.6] text-white/60">
              Invoicing and payment tracking for freelancers, agencies and small businesses. Send invoices, automate reminders, get paid.
            </p>
            <ul className="mt-2 flex gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-[13px] font-semibold tracking-[0.08em] text-white/45 uppercase">{col.title}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-[15px] text-white/75 transition-colors hover:text-green-soft">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <h2 className="text-[20px] font-bold tracking-[-0.015em]">Get smarter about your business.</h2>
            <p className="mt-1 text-[15px] text-white/60">Pricing tips, cash-flow habits and product updates for people who bill clients.</p>
          </div>
          <Newsletter />
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[13.5px] text-white/50 sm:flex-row">
          <p>© 2026 InvoiceFlow. All rights reserved.</p>
          <p className="flex gap-5">
            <a href={LINKS.privacy} className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href={LINKS.terms} className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="#top" className="transition-colors hover:text-white">
              Back to top ↑
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
