import { CircleCheck } from 'lucide-react';
import type { Plan } from '../data/content';
import { ButtonLink } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { LINKS } from '../data/links';

/**
 * Paid plan card: tinted shell with name and blurb on the left and price on the
 * right, features in two columns on a white inset panel, and a full-width CTA.
 * The featured plan gets a badge, a mint-and-sky glow and the primary button.
 */
export function PricingCard({ plan, yearly, delay = 0 }: { plan: Plan; yearly: boolean; delay?: number }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const f = plan.featured;
  const items = plan.lead ? [plan.lead.replace(', plus:', ''), ...plan.features] : plan.features;
  return (
    <Reveal as="article" delay={delay} className="h-full">
      <div
        className={`flex h-full flex-col gap-6 rounded-[26px] p-4 ring-1 sm:p-5 ${f ? 'bg-[#EEF5F1] bg-[radial-gradient(55%_70%_at_100%_0%,rgb(139_214_176/0.55),transparent_70%),radial-gradient(40%_50%_at_80%_0%,rgb(168_197_236/0.4),transparent_70%)] ring-green/30' : 'bg-[#F1F5F3] ring-ink/[0.05]'}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 px-2 pt-2 sm:px-3 sm:pt-3">
          <div>
            <h3 className="flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.02em] text-ink">
              {plan.name}
              {f && <span className="rounded-full bg-green px-2.5 py-0.5 text-[12px] font-bold tracking-normal text-midnight">Most popular</span>}
            </h3>
            <p className="mt-1.5 text-[15px] text-muted">{plan.blurb}</p>
          </div>
          <div className="sm:text-right">
            <p className="flex items-baseline gap-1 sm:justify-end">
              <span className="tabular text-[40px] leading-none font-bold tracking-[-0.04em] text-ink">${price}</span>
              <span className="text-[14px] text-muted">/ month</span>
            </p>
            <p className="mt-1.5 text-[12.5px] text-muted">{yearly ? `Billed $${plan.yearly * 12} yearly` : 'Billed monthly'}</p>
          </div>
        </div>

        <div className="flex-1 rounded-[20px] bg-white p-5 shadow-[0_10px_30px_-18px_rgb(20_39_70/0.25)] sm:p-6">
          <p className="text-[15px] font-bold text-ink">Features included</p>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {items.map((feat) => (
              <li key={feat} className="flex items-center gap-2.5 text-[14.5px] text-ink-soft">
                <CircleCheck className="size-[18px] shrink-0 text-green-ink" strokeWidth={1.9} aria-hidden="true" />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        <ButtonLink href={`${LINKS.signup}?plan=${plan.name.toLowerCase()}`} variant={f ? 'primary' : 'dark'} size="lg" className="w-full">
          {plan.cta}
        </ButtonLink>
      </div>
    </Reveal>
  );
}
