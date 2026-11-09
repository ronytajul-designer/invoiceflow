import { useRef, useState, type KeyboardEvent } from 'react';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { ButtonLink } from '../components/ui/Button';
import { LINKS } from '../data/links';
import { PricingCard } from '../components/PricingCard';
import { plans } from '../data/content';

/** Monthly / yearly switch, built as an accessible radio group. */
function BillingToggle({ yearly, onChange }: { yearly: boolean; onChange: (v: boolean) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    e.preventDefault();
    onChange(!yearly);
    refs.current[yearly ? 0 : 1]?.focus();
  };
  const options = [
    { value: false, label: 'Monthly' },
    { value: true, label: 'Yearly' },
  ];
  return (
    <div role="radiogroup" aria-label="Billing period" onKeyDown={onKey} className="relative grid grid-cols-2 rounded-full border border-line bg-white p-1">
      <span
        aria-hidden="true"
        className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-500 ease-[var(--ease-elastic)] ${yearly ? 'translate-x-full' : ''}`}
      />
      {options.map((o, i) => {
        const on = yearly === o.value;
        return (
          <button
            key={o.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(o.value)}
            className={`relative z-10 flex h-10 items-center justify-center gap-2 rounded-full px-5 text-[14px] font-semibold transition-colors duration-300 ${on ? 'text-white' : 'text-ink-soft hover:text-ink'}`}
          >
            {o.label}
            {o.value && (
              <span className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold transition-colors ${on ? 'bg-green text-midnight' : 'bg-green-wash text-green-ink'}`}>
                −17%
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const free = plans.find((p) => p.monthly === 0)!;
  const paid = plans.filter((p) => p.monthly > 0);
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-[680px] flex-col items-center gap-5 text-center">
          <h2 id="pricing-title" className="text-[34px] leading-[1.08] font-bold tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[54px]">
            Simple pricing. No surprises.
          </h2>
          <p className="text-[17px] leading-[1.6] text-muted sm:text-[18px]">Start free and upgrade as your business grows.</p>
        </Reveal>
        <Reveal delay={80} className="mt-8 flex flex-col items-center gap-2">
          <BillingToggle yearly={yearly} onChange={setYearly} />
          <p className="text-[13px] text-muted" aria-live="polite">
            {yearly ? 'Two months free with yearly billing.' : 'Save 17% with yearly billing.'}
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[1080px] gap-6 lg:mt-14 lg:grid-cols-2">
          {paid.map((p, i) => (
            <PricingCard key={p.name} plan={p} yearly={yearly} delay={i * 80} />
          ))}
        </div>

        {/* Free plan as a quiet strip: always available, never competing with the paid cards. */}
        <Reveal delay={160} className="mx-auto mt-6 max-w-[1080px]">
          <div className="flex flex-col items-start justify-between gap-4 rounded-[22px] px-6 py-5 ring-1 ring-line sm:flex-row sm:items-center">
            <p className="text-[15px] text-ink-soft">
              <span className="font-bold text-ink">Just starting?</span> {free.name} for up to 5 invoices a month, with client management and payment tracking.
            </p>
            <ButtonLink href={`${LINKS.signup}?plan=free`} variant="secondary" size="md" className="shrink-0">
              {free.cta}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
