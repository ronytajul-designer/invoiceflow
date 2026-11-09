import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Check, Eye, Mail, Send } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Reveal, EASE_OUT_SOFT } from '../components/ui/Reveal';
import { InvoiceDetailView, InvoicesView, PaymentsView } from '../components/dashboard/ShowcaseViews';
import { steps } from '../data/content';

/* Small inline previews shown inside the active step card. */
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


const previews = [<CreateCard key="c" />, <TrackCard key="t" />, <PaidCard key="p" />];
/* Full product view shown in the large panel for each step. */
const views = [InvoiceDetailView, InvoicesView, PaymentsView];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const View = views[active];
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-[680px] flex-col items-center gap-5 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-green-wash py-1.5 pr-3.5 pl-2 text-[13px] font-semibold text-green-ink">
            <span className="size-2 rounded-full bg-green" aria-hidden="true" />
            How it works
          </p>
          <h2 id="how-title" className="text-[34px] leading-[1.08] font-bold tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[54px]">
            From invoice to payment in three simple steps.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-2">
          {/* Product panel: brand gradient with the app view cropped by the panel edge. */}
          <Reveal className="relative order-2 hidden h-[380px] md:block overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#2FA678_0%,#55C99A_45%,#D3EFE2_100%)] sm:h-[460px] lg:order-1 lg:h-auto lg:min-h-[560px]">
            <div className="absolute top-16 left-8 w-[980px] sm:top-20 sm:left-12" aria-hidden="true">
              <AnimatePresence mode="wait">
                <m.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
                >
                  <View />
                </m.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Steps: one open at a time; the open one shows a small preview. */}
          <ol className="order-1 flex flex-col gap-4 lg:order-2">
            {steps.map((st, i) => {
              const on = i === active;
              return (
                <li key={st.n}>
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setActive(i)}
                    className={`w-full rounded-[24px] p-5 text-left ring-1 transition-[background-color,box-shadow] duration-300 sm:p-6 ${on ? 'bg-[radial-gradient(60%_80%_at_100%_0%,rgb(168_197_236/0.35),transparent_70%)] bg-[#F1F5F3] ring-ink/[0.06]' : 'bg-white ring-line hover:ring-line-strong'}`}
                  >
                    <span className="flex items-center gap-4">
                      <span className={`tabular grid size-12 shrink-0 place-items-center rounded-full text-[16px] font-bold transition-colors ${on ? 'bg-green text-midnight' : 'bg-green-wash text-green-ink'}`}>
                        {st.n}
                      </span>
                      <span>
                        <span className="block text-[20px] font-bold tracking-[-0.02em] text-ink sm:text-[22px]">{st.title}</span>
                        <span className="mt-1 block text-[15px] leading-[1.55] text-muted">{st.body}</span>
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <m.span
                          className="block overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
                          aria-hidden="true"
                        >
                          <span className="mt-5 block rounded-[18px] bg-white p-4 shadow-[0_10px_30px_-16px_rgb(20_39_70/0.25)]">{previews[i]}</span>
                        </m.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
