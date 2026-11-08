import { BarChart3, BellRing, FileText, LineChart, Radar, Users } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FeatureTile } from '../components/FeatureTile';
import { ClientAvatar } from '../components/dashboard/InvoiceTable';
import { invoices, usd } from '../data/dashboard';

/* ---- Small, purpose-built visuals for each feature ---- */

function InvoiceSheet() {
  return (
    <div className="relative h-[230px] overflow-hidden px-6 sm:px-7 md:h-full md:min-h-[300px] md:px-0 md:pt-7">
      <div className="absolute inset-x-6 top-0 rounded-t-[var(--radius-lg)] border border-b-0 border-line bg-white p-5 shadow-[var(--shadow-card)] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 sm:inset-x-7 md:top-7 md:right-0 md:left-0 md:rounded-tr-none md:border-r-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.1em] text-faint uppercase">Invoice</p>
            <p className="tabular text-[15px] font-bold text-ink">INV-0418</p>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
            <span className="size-4 rounded-[4px] bg-ink" />
            Chen Design Studio
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
          <div>
            <p className="text-faint">Billed to</p>
            <p className="font-semibold text-ink">Northwind Studio</p>
          </div>
          <div>
            <p className="text-faint">Due</p>
            <p className="tabular font-semibold text-ink">Nov 30, 2026</p>
          </div>
        </div>
        <ul className="mt-4 divide-y divide-line border-y border-line text-[11.5px]">
          {[
            ['Brand identity system', 3200],
            ['Website design, 4 pages', 850],
            ['Revisions round', 200],
          ].map(([l, v]) => (
            <li key={l as string} className="flex justify-between py-2">
              <span className="text-ink-soft">{l}</span>
              <span className="tabular font-semibold text-ink">{usd(v as number)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11.5px] text-muted">Total due</span>
          <span className="tabular text-[17px] font-bold text-ink">$4,250.00</span>
        </div>
      </div>
    </div>
  );
}

function ReminderTimeline() {
  const items = [
    { when: '3 days before due', what: 'Friendly heads-up', on: true },
    { when: 'On the due date', what: 'Payment due today', on: true },
    { when: '7 days overdue', what: 'Polite follow-up', on: true },
    { when: '14 days overdue', what: 'Final reminder', on: false },
  ];
  return (
    <div className="flex flex-col gap-4 px-6 pb-6 sm:px-7 sm:pb-7">
      <div className="rounded-[var(--radius-lg)] border border-line bg-paper p-4 text-[12.5px] leading-[1.55]">
        <p className="mb-2 flex items-center justify-between text-[11px] text-faint">
          <span>To: Halcyon &amp; Co.</span>
          <span>Preview</span>
        </p>
        <p className="font-semibold text-ink">Friendly reminder: INV-0417 is due Friday</p>
        <p className="mt-1 text-muted">
          Hi Lena, just a heads-up that invoice INV-0417 for <span className="tabular font-semibold text-ink">$2,800</span> is due on Nov 24. You can pay by card or bank transfer from the link below.
        </p>
        <span className="mt-3 inline-flex h-7 items-center rounded-md bg-ink px-3 text-[11.5px] font-semibold text-white">View &amp; pay invoice</span>
      </div>
    <ol className="relative flex flex-col gap-2">
      <span className="absolute top-4 bottom-4 left-[15px] w-px bg-line" />
      {items.map((it) => (
        <li key={it.when} className="relative flex items-center gap-3 rounded-[var(--radius-md)] border border-line bg-white p-2.5 pr-3">
          <span className={`relative z-10 grid size-[30px] shrink-0 place-items-center rounded-full ${it.on ? 'bg-green-wash text-green-ink' : 'bg-paper text-faint'}`}>
            <BellRing className="size-3.5" strokeWidth={2.25} />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-[12.5px] font-semibold text-ink">{it.when}</span>
            <span className="block text-[11.5px] text-muted">{it.what}</span>
          </span>
          <span className={`relative h-[18px] w-[30px] shrink-0 rounded-full transition-colors ${it.on ? 'bg-green' : 'bg-line-strong'}`}>
            <span className={`absolute top-[2px] size-[14px] rounded-full bg-white shadow-sm transition-[left] ${it.on ? 'left-[14px]' : 'left-[2px]'}`} />
          </span>
        </li>
      ))}
    </ol>
    </div>
  );
}

function StatusPipeline() {
  const stages = [
    { label: 'Sent', n: 12, w: '100%' },
    { label: 'Viewed', n: 10, w: '83%' },
    { label: 'Paid', n: 8, w: '67%' },
  ];
  return (
    <div className="flex flex-col gap-2 px-6 pb-6 sm:px-7 sm:pb-7">
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3 text-[12px]">
          <span className="w-12 shrink-0 font-semibold text-ink-soft">{s.label}</span>
          <span className="h-7 flex-1 overflow-hidden rounded-[var(--radius-sm)] bg-paper">
            <span
              className={`flex h-full items-center justify-end rounded-[var(--radius-sm)] pr-2 text-[11px] font-bold transition-[width] duration-700 ease-[var(--ease-out-soft)] ${i === 2 ? 'bg-green text-midnight' : 'bg-ink/10 text-ink'}`}
              style={{ width: s.w }}
            >
              {s.n}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function OverviewMini() {
  const bars = [38, 52, 44, 61, 57, 70, 66, 78];
  return (
    <div className="flex items-end justify-between gap-4 px-6 pb-6 sm:px-7 sm:pb-7">
      <div>
        <p className="text-[11.5px] text-muted">Net cash this month</p>
        <p className="tabular text-[24px] leading-tight font-bold tracking-[-0.02em] text-ink">$24,830</p>
        <p className="text-[11.5px] font-semibold text-green-ink">+8.1% vs October</p>
      </div>
      <div className="flex h-14 items-end gap-1">
        {bars.map((b, i) => (
          <span key={i} className={`w-2.5 rounded-t-[3px] transition-[height] duration-500 ${i === bars.length - 1 ? 'bg-green' : 'bg-ink/12 group-hover:bg-ink/20'}`} style={{ height: `${b}%` }} />
        ))}
      </div>
    </div>
  );
}

function ClientList() {
  const rows = [invoices[0], invoices[1], invoices[2]];
  const balances = [0, 2800, 6120];
  return (
    <ul className="mx-6 mb-6 divide-y divide-line rounded-[var(--radius-lg)] border border-line bg-white sm:mx-7 sm:mb-7">
      {rows.map((r, i) => (
        <li key={r.id} className="flex items-center gap-3 px-3 py-2.5 text-[12px]">
          <ClientAvatar invoice={r} size="md" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate font-semibold text-ink">{r.client}</span>
            <span className="block text-[11px] text-muted">{[14, 6, 9][i]} invoices</span>
          </span>
          <span className="tabular text-right font-semibold text-ink">{balances[i] ? usd(balances[i]) : 'Settled'}</span>
        </li>
      ))}
    </ul>
  );
}

function ReportMini() {
  const q = [
    { label: 'Q1', paid: 58, open: 12 },
    { label: 'Q2', paid: 74, open: 9 },
    { label: 'Q3', paid: 81, open: 11 },
    { label: 'Q4', paid: 92, open: 7 },
  ];
  return (
    <div className="grid gap-6 px-6 pb-6 sm:grid-cols-[1fr_auto] sm:items-end sm:px-7 sm:pb-7">
      <div className="flex h-32 items-end gap-4 border-b border-line">
        {q.map((x) => (
          <div key={x.label} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full max-w-12 flex-col-reverse overflow-hidden rounded-t-[4px]" style={{ height: `${x.paid + x.open}px` }}>
              <span className="bg-green" style={{ height: `${(x.paid / (x.paid + x.open)) * 100}%` }} />
              <span className="bg-pending/35" style={{ height: `${(x.open / (x.paid + x.open)) * 100}%` }} />
            </div>
            <span className="pb-1 text-[11px] font-semibold text-muted">{x.label}</span>
          </div>
        ))}
      </div>
      <dl className="grid grid-cols-3 gap-4 text-[11.5px] sm:grid-cols-1 sm:gap-2.5 sm:text-right">
        <div>
          <dt className="text-muted">Avg. days to pay</dt>
          <dd className="tabular text-[16px] font-bold text-ink">9.2</dd>
        </div>
        <div>
          <dt className="text-muted">Collected</dt>
          <dd className="tabular text-[16px] font-bold text-ink">96%</dd>
        </div>
        <div>
          <dt className="text-muted">Written off</dt>
          <dd className="tabular text-[16px] font-bold text-ink">0%</dd>
        </div>
      </dl>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="features-title"
          eyebrow="Features"
          title="Everything you need to stay on top of your invoices."
          lede="From creating your first invoice to tracking your latest payment, InvoiceFlow keeps everything simple."
        />
        <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <FeatureTile
            className="md:col-span-2"
            layout="split"
            icon={FileText}
            title="Create Professional Invoices"
            body="Design and send polished invoices in seconds using customizable templates. Your logo, your terms, a pay button built in."
            visual={<InvoiceSheet />}
          />
          <FeatureTile
            className="md:col-span-2 lg:col-span-1 lg:row-span-2"
            delay={80}
            icon={BellRing}
            title="Automated Payment Reminders"
            body="Automatically remind clients about upcoming and overdue payments, in your words and on your schedule."
            visual={<ReminderTimeline />}
          />
          <FeatureTile delay={60} icon={Radar} title="Real-Time Payment Tracking" body="Know exactly which invoices are paid, pending, or overdue." visual={<StatusPipeline />} />
          <FeatureTile delay={120} icon={LineChart} title="Smart Financial Overview" body="See revenue, outstanding balances and payment activity at a glance." visual={<OverviewMini />} />
          <FeatureTile delay={60} icon={Users} title="Client Management" body="Keep client details, invoice history and payment records organized." visual={<ClientList />} />
          <FeatureTile
            className="lg:col-span-2"
            delay={120}
            icon={BarChart3}
            title="Simple Reporting"
            body="Understand your business performance with clear financial reports you can export in one click."
            visual={<ReportMini />}
          />
        </div>
      </Container>
    </section>
  );
}
