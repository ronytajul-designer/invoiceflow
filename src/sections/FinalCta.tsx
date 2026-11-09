import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { LINKS } from '../data/links';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { ArcMotif } from '../components/ui/ArcMotif';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Closing CTA: the hero's atmosphere in a wide rounded panel, a centred
 * headline and an email field with the trial button inside it. A valid email
 * goes to sign-up prefilled; an invalid one shows an inline message.
 */
export function FinalCta() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL.test(v)) {
      setError(true);
      return;
    }
    window.location.href = `${LINKS.signup}?email=${encodeURIComponent(v)}`;
  };

  return (
    <section id="get-started" aria-labelledby="cta-title" className="bg-white pb-20 sm:pb-28">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[28px] px-6 py-20 text-center sm:rounded-[36px] sm:px-12 sm:py-24 lg:py-28">
          {/* Atmosphere, as in the hero: mint and sky glows with white haze. */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#E4F2EB_0%,#D3ECE0_100%)]" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(45%_70%_at_0%_100%,rgb(85_201_154/0.55),transparent_70%),radial-gradient(45%_70%_at_100%_0%,rgb(138_176_232/0.6),transparent_70%),radial-gradient(40%_60%_at_100%_100%,rgb(139_214_176/0.45),transparent_70%)]"
            aria-hidden="true"
          />
          <div className="absolute top-[8%] -left-[6%] -z-10 h-[50%] w-[34%] rounded-full bg-white/75 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-[4%] bottom-[6%] -z-10 h-[46%] w-[30%] rounded-full bg-white/70 blur-3xl" aria-hidden="true" />
          <ArcMotif className="absolute -top-px right-0 -z-10 w-[560px] lg:w-[860px]" stroke="rgb(255 255 255 / 0.85)" />

          <h2 id="cta-title" className="mx-auto max-w-[760px] text-[34px] leading-[1.06] font-bold tracking-[-0.04em] text-ink sm:text-[52px] lg:text-[64px]">
            Ready to make getting paid easier?
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.6] text-ink-soft sm:text-[18px]">
            Spend less time managing invoices and more time growing your business.
          </p>

          <form onSubmit={submit} noValidate className="mx-auto mt-9 max-w-[520px]">
            <label htmlFor="cta-email" className="sr-only">
              Work email
            </label>
            <div
              className={`flex flex-col gap-2 rounded-[28px] bg-white p-2 shadow-[0_18px_40px_-20px_rgb(11_25_48/0.35)] ring-1 sm:flex-row sm:items-center sm:rounded-full ${error ? 'ring-overdue/60' : 'ring-white'}`}
            >
              <input
                id="cta-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="Your work email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(false);
                }}
                aria-invalid={error}
                aria-describedby="cta-msg"
                className="h-14 min-w-0 shrink-0 rounded-full bg-[#F4F8F6] sm:flex-1 sm:shrink px-5 text-[16px] text-ink outline-none placeholder:text-faint focus:bg-white focus:ring-2 focus:ring-green/50 sm:h-12 sm:bg-transparent sm:focus:ring-0"
              />
              <Button type="submit" size="lg" className="shrink-0 sm:!h-12">
                Start Free Trial
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </Button>
            </div>
            <p id="cta-msg" aria-live="polite" className={`mt-4 flex items-center justify-center gap-2 text-[14px] ${error ? 'text-overdue' : 'text-ink-soft'}`}>
              {error ? (
                'Enter a valid email address, like name@company.com.'
              ) : (
                <>
                  <Check className="size-4 text-green-ink" strokeWidth={2.5} aria-hidden="true" />
                  No credit card required.
                </>
              )}
            </p>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
