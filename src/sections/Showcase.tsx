import { useRef, useState, type ComponentType, type KeyboardEvent } from 'react';
import { BarChart3, CreditCard, FileText, ReceiptText, type LucideIcon } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { AnalyticsView, InvoiceDetailView, InvoicesView, PaymentsView } from '../components/dashboard/ShowcaseViews';

type Tab = { id: string; icon: LucideIcon; title: string; body: string; view: ComponentType };

const tabs: Tab[] = [
  { id: 'invoices', icon: FileText, title: 'Invoice management', body: 'Every invoice in one list. Filter by status, search by client, and duplicate last month’s invoice in a click.', view: InvoicesView },
  { id: 'detail', icon: ReceiptText, title: 'Invoice details', body: 'Line items, totals and a full activity trail: when it was sent, viewed, reminded and paid.', view: InvoiceDetailView },
  { id: 'payments', icon: CreditCard, title: 'Payment tracking', body: 'See what’s pending, what’s overdue and what landed this week, with card and bank transfer payments matched automatically.', view: PaymentsView },
  { id: 'analytics', icon: BarChart3, title: 'Financial analytics', body: 'Revenue trends, average days to pay and your top clients, without building a spreadsheet.', view: AnalyticsView },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const View = tabs[active].view;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
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
    <section aria-labelledby="showcase-title" className="relative overflow-hidden bg-midnight py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_85%_10%,rgb(85_201_154/0.12),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgb(43_61_92/0.6),transparent_70%)]" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading
          id="showcase-title"
          tone="dark"
          title="Your entire invoicing workflow. One clear view."
          lede="Stop switching between spreadsheets, emails, and payment records. Keep everything organized in one place."
        />
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col">
            <Reveal>
              <div role="tablist" aria-label="Product views" aria-orientation="vertical" onKeyDown={onKey} className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-1">
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
                      className={`group relative flex flex-col gap-1 rounded-[var(--radius-lg)] border p-3 text-left transition-[background-color,border-color] duration-300 lg:border-transparent lg:p-4 lg:pl-5 ${on ? 'border-white/15 bg-white/[0.06]' : 'border-white/10 hover:bg-white/[0.03]'}`}
                    >
                      <span className={`absolute top-4 bottom-4 left-0 hidden w-[2px] rounded-full transition-colors lg:block ${on ? 'bg-green' : 'bg-white/10'}`} aria-hidden="true" />
                      <span className={`flex items-center gap-2.5 text-[14px] font-semibold lg:text-[15px] ${on ? 'text-white' : 'text-white/60 group-hover:text-white/85'}`}>
                        <t.icon className={`size-4 shrink-0 ${on ? 'text-green-soft' : ''}`} strokeWidth={2} aria-hidden="true" />
                        {t.title}
                      </span>
                      <span className={`hidden text-[14px] leading-[1.55] text-white/60 lg:block ${on ? '' : 'lg:hidden'}`}>{t.body}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="min-w-0">
            <div role="tabpanel" id={`panel-${tabs[active].id}`} aria-labelledby={`tab-${tabs[active].id}`} tabIndex={0} className="rounded-[var(--radius-xl)] focus-visible:outline-green-soft">
              <p className="mb-4 text-[15px] leading-[1.6] text-white/65 lg:sr-only">{tabs[active].body}</p>
              <div key={tabs[active].id} className="animate-view-in">
                <View />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
