import { useRef, useState, type KeyboardEvent } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
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
        className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-300 ease-[var(--ease-out-soft)] ${yearly ? 'translate-x-full' : ''}`}
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
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-center gap-8">
          <SectionHeading id="pricing-title" align="center" title="Simple pricing. No surprises." lede="Start free and upgrade as your business grows." />
          <div className="flex flex-col items-center gap-2">
            <BillingToggle yearly={yearly} onChange={setYearly} />
            <p className="text-[13px] text-muted" aria-live="polite">
              {yearly ? 'Yearly billing: two months free.' : 'Monthly billing. Switch to yearly to save 17%.'}
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-[440px] gap-4 lg:mt-16 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-5">
          {plans.map((p, i) => (
            <PricingCard key={p.name} plan={p} yearly={yearly} delay={i * 80} />
          ))}
        </div>
        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[14px] text-muted">
          <ShieldCheck className="size-4 text-green-ink" strokeWidth={2} aria-hidden="true" />
          Prices in USD. Change or cancel your plan anytime from settings.
        </p>
      </Container>
    </section>
  );
}
