import { useRef, useState, type ComponentType, type KeyboardEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { BarChart3, CreditCard, FileText, ReceiptText, type LucideIcon } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Reveal, EASE_OUT_SOFT } from '../components/ui/Reveal';
import { ArcMotif } from '../components/ui/ArcMotif';
import { AnalyticsView, InvoiceDetailView, InvoicesView, PaymentsView } from '../components/dashboard/ShowcaseViews';

type Tab = { id: string; icon: LucideIcon; label: string; caption: string; view: ComponentType };

const tabs: Tab[] = [
  { id: 'invoices', icon: FileText, label: 'Invoices', caption: 'Every invoice in one list, filtered by status.', view: InvoicesView },
  { id: 'detail', icon: ReceiptText, label: 'Details', caption: 'Line items, totals and a full activity trail.', view: InvoiceDetailView },
  { id: 'payments', icon: CreditCard, label: 'Payments', caption: 'What’s pending, overdue and paid this week.', view: PaymentsView },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', caption: 'Revenue trends and how fast clients pay.', view: AnalyticsView },
];

/**
 * Product showcase: centred heading, a pill tab bar, and one wide atmosphere
 * panel holding the selected app view, cropped by the panel's bottom edge.
 */
export function Showcase() {
  const [active, setActive] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active];
  const View = tab.view;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    let next = active;
    if (e.key in keys) next = (active + keys[e.key] + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    btns.current[next]?.focus();
  };

  return (
    <section aria-labelledby="showcase-title" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-[680px] flex-col items-center text-center">
          <h2 id="showcase-title" className="text-[34px] leading-[1.08] font-bold tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[54px]">
            Your entire invoicing workflow. One clear view.
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-10 flex flex-col items-center gap-4">
          <div role="tablist" aria-label="Product views" onKeyDown={onKey} className="flex max-w-full gap-0.5 overflow-x-auto rounded-full bg-[#F1F5F3] p-1 sm:gap-1 sm:p-1.5 ring-1 ring-ink/[0.05]">
            {tabs.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    btns.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={on}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`relative flex h-11 shrink-0 items-center gap-2 rounded-full px-2.5 text-[13.5px] sm:px-5 sm:text-[14.5px] font-semibold transition-colors duration-300 sm:px-5 ${on ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {on && (
                    <m.span
                      layoutId="showcase-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgb(20_39_70/0.06),0_6px_16px_-8px_rgb(20_39_70/0.25)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <t.icon className={`relative hidden size-4 sm:block ${on ? 'text-green-ink' : ''}`} strokeWidth={2} aria-hidden="true" />
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
          <p className="h-6 text-[15px] text-muted" aria-live="polite">
            {tab.caption}
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-8">
          <div
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            className="relative isolate h-[420px] overflow-hidden rounded-[28px] sm:h-[520px] lg:h-[600px]"
          >
            {/* Atmosphere, matching the hero: mint and sky glows on a pale base. */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#EEF6F2_0%,#DDEFE6_100%)]" aria-hidden="true" />
            <div
              className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_8%_100%,rgb(85_201_154/0.5),transparent_70%),radial-gradient(45%_55%_at_95%_90%,rgb(138_176_232/0.55),transparent_70%)]"
              aria-hidden="true"
            />
            <ArcMotif className="absolute -top-px right-0 -z-10 w-[640px] lg:w-[860px]" stroke="rgb(255 255 255 / 0.9)" />

            <div className="absolute inset-x-4 top-10 sm:inset-x-10 sm:top-14 lg:inset-x-20 lg:top-16" aria-hidden="true">
              <AnimatePresence mode="wait">
                <m.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
                >
                  <View />
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
