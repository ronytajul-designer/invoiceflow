import { Check, Eye, Mail, Send } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { steps } from '../data/content';

function CreateCard() {
  return (
    <div className="flex flex-col gap-2.5 text-[12px]">
      {[
        ['Client', 'Northwind Studio'],
        ['Service', 'Brand identity system'],
      ].map(([k, v]) => (
        <div key={k} className="rounded-[var(--radius-md)] border border-line bg-white px-3 py-2">
          <span className="block text-[10.5px] font-medium text-faint">{k}</span>
          <span className="font-semibold text-ink">{v}</span>
        </div>
      ))}
      <div className="flex gap-2.5">
        <div className="flex-1 rounded-[var(--radius-md)] border border-line bg-white px-3 py-2">
          <span className="block text-[10.5px] font-medium text-faint">Amount</span>
          <span className="tabular font-semibold text-ink">$4,250.00</span>
        </div>
        <div className="flex-1 rounded-[var(--radius-md)] border border-green bg-white px-3 py-2 ring-3 ring-green/15">
          <span className="block text-[10.5px] font-medium text-faint">Due in</span>
          <span className="font-semibold text-ink">14 days</span>
        </div>
      </div>
    </div>
  );
}

function TrackCard() {
  const events = [
    { icon: Send, label: 'Sent to accounts@northwind.studio', time: '9:02' },
    { icon: Mail, label: 'Delivered', time: '9:02' },
    { icon: Eye, label: 'Viewed by client', time: '11:47' },
  ];
  return (
    <div className="rounded-[var(--radius-md)] border border-line bg-white p-3">
      <div className="mb-3 flex items-center justify-between text-[12px]">
        <span className="font-semibold text-ink">INV-0418</span>
        <span className="rounded-full bg-pending-wash px-2 py-0.5 text-[11px] font-semibold text-pending">Viewed</span>
      </div>
      <ol className="flex flex-col gap-2">
        {events.map(({ icon: Icon, label, time }) => (
          <li key={label} className="flex items-center gap-2.5 text-[11.5px]">
            <Icon className="size-3.5 shrink-0 text-faint" strokeWidth={2.25} />
            <span className="min-w-0 flex-1 truncate text-ink-soft">{label}</span>
            <span className="tabular text-faint">{time}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PaidCard() {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-md)] bg-midnight p-4 text-white">
      <svg className="absolute -top-px -right-px size-24 text-green" viewBox="0 0 104 104" aria-hidden="true">
        <path d="M0 0H104V104A104 104 0 0 1 0 0Z" fill="currentColor" opacity="0.9" />
      </svg>
      <span className="relative grid size-9 place-items-center rounded-full bg-white/10 text-green-soft">
        <Check className="size-4" strokeWidth={3} />
      </span>
      <p className="relative mt-6 text-[11.5px] text-white/60">Paid by card · Nov 12</p>
      <p className="tabular relative text-[24px] leading-tight font-bold tracking-[-0.02em]">$4,250.00</p>
      <p className="relative mt-1 text-[11.5px] font-semibold text-green-soft">2 reminders sent automatically</p>
    </div>
  );
}

const visuals = [<CreateCard key="c" />, <TrackCard key="t" />, <PaidCard key="p" />];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative bg-paper py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="how-title" eyebrow="How it works" title="From invoice to payment in three simple steps." />
          <Reveal className="max-w-[340px] text-[16px] leading-[1.6] text-muted lg:pb-2">
            No setup call and no accounting jargon. If you can write an email, you can send an invoice.
          </Reveal>
        </div>

        <ol className="relative mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {/* Connector: one continuous line that flows through every step on desktop. */}
          <span aria-hidden="true" className="absolute top-[22px] right-[16%] left-[16%] hidden h-[2px] bg-[linear-gradient(90deg,var(--color-line-strong),var(--color-green))] md:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 100} className="relative flex flex-col">
              <div className="flex items-center gap-3 md:flex-col md:gap-4">
                <span
                  className={`tabular relative z-10 grid size-11 shrink-0 place-items-center rounded-full border text-[14px] font-bold ${i === 2 ? 'border-green bg-green text-midnight' : 'border-line-strong bg-white text-ink'}`}
                >
                  {s.n}
                </span>
                <h3 className="text-[20px] font-bold tracking-[-0.015em] text-ink md:text-center">{s.title}</h3>
              </div>
              <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.6] text-muted md:mx-auto md:text-center">{s.body}</p>
              <div className="mt-6 flex-1 rounded-[var(--radius-xl)] border border-line bg-[#F1F4F3] p-4 sm:p-5" aria-hidden="true">
                {visuals[i]}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
