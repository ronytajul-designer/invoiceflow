import { Check } from 'lucide-react';
import type { Plan } from '../data/content';
import { ButtonLink } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { LINKS } from '../data/links';

export function PricingCard({ plan, yearly, delay = 0 }: { plan: Plan; yearly: boolean; delay?: number }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const f = plan.featured;
  const note = plan.monthly === 0 ? 'Free forever' : yearly ? `Billed $${plan.yearly * 12} yearly` : 'Billed monthly';
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`relative flex flex-col rounded-[var(--radius-xl)] p-6 sm:p-8 ${f ? 'order-first bg-midnight text-white shadow-[var(--shadow-float)] lg:order-none lg:-my-4 lg:py-12' : 'border border-line bg-white'}`}
    >
      {f && (
        <span className="absolute top-6 right-6 rounded-full bg-green px-2.5 py-1 text-[12px] font-bold text-midnight sm:top-8 sm:right-8 lg:top-12">
          Recommended
        </span>
      )}
      <h3 className={`text-[18px] font-bold ${f ? 'text-white' : 'text-ink'}`}>{plan.name}</h3>
      <p className={`mt-1 text-[14.5px] ${f ? 'text-white/65' : 'text-muted'}`}>{plan.blurb}</p>
      <div className="mt-6 flex items-end gap-1.5">
        <span className={`tabular text-[48px] leading-none font-bold tracking-[-0.04em] ${f ? 'text-white' : 'text-ink'}`}>${price}</span>
        <span className={`pb-1.5 text-[15px] ${f ? 'text-white/60' : 'text-muted'}`}>/month</span>
      </div>
      <p className={`mt-2 h-5 text-[13px] ${f ? 'text-green-soft' : 'text-muted'}`}>{note}</p>
      <ButtonLink href={`${LINKS.signup}?plan=${plan.name.toLowerCase()}`} variant={f ? 'primary' : 'secondary'} size="lg" className="mt-6 w-full">
        {plan.cta}
      </ButtonLink>
      <div className={`mt-8 border-t pt-6 ${f ? 'border-white/10' : 'border-line'}`}>
        {plan.lead && <p className={`mb-4 text-[13.5px] font-semibold ${f ? 'text-white' : 'text-ink'}`}>{plan.lead}</p>}
        <ul className="flex flex-col gap-3">
          {plan.features.map((feat) => (
            <li key={feat} className={`flex items-start gap-3 text-[14.5px] leading-snug ${f ? 'text-white/80' : 'text-ink-soft'}`}>
              <span className={`mt-px grid size-[18px] shrink-0 place-items-center rounded-full ${f ? 'bg-green text-midnight' : 'bg-green-wash text-green-ink'}`}>
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
