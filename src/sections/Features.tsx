import { BellRing, Send } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { FeatureCard } from '../components/FeatureTile';
import { ClientAvatar } from '../components/dashboard/InvoiceTable';
import { invoices, usd } from '../data/dashboard';

/*
 * Inset panels. Each one makes a single point with one focal element
 * (an amount, a chart, a status) and at most four supporting rows, so a
 * visitor can read the card at a glance. Sample data, fictional clients.
 */

function PanelHeader({ title, aside }: { title: string; aside?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span className="text-[14px] font-semibold text-ink">{title}</span>
      {aside}
    </div>
  );
}

function InvoicePanel() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p className="text-[12px] text-muted">INV-0418 · Northwind Studio</p>
      <p className="tabular mt-1 text-[30px] leading-tight font-bold tracking-[-0.03em] text-ink">$4,250.00</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="tabular text-[12.5px] text-muted">Due Nov 30</span>
        <span className="flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[12.5px] font-semibold text-white">
          <Send className="size-3.5" strokeWidth={2.25} />
          Send invoice
        </span>
      </div>
    </div>
  );
}

function RemindersPanel() {
  const items = [
    { when: '3 days before due', on: true },
    { when: 'On the due date', on: true },
    { when: '7 days overdue', on: true },
  ];
  return (
    <div className="flex flex-1 flex-col">
      <PanelHeader title="Reminders" aside={<span className="rounded-full bg-green-wash px-2.5 py-0.5 text-[11.5px] font-semibold text-green-ink">Automatic</span>} />
      <ul className="flex flex-col gap-5">
        {items.map(({ when, on }) => (
          <li key={when} className="flex items-center justify-between text-[13px]">
            <span className={`flex items-center gap-2.5 ${on ? 'text-ink-soft' : 'text-faint'}`}>
              <BellRing className={`size-4 ${on ? 'text-green-ink' : 'text-faint'}`} strokeWidth={2} />
              {when}
            </span>
            <span className={`relative h-5 w-[34px] rounded-full ${on ? 'bg-green' : 'bg-line-strong'}`}>
              <span className={`absolute top-[3px] size-[14px] rounded-full bg-white shadow-sm ${on ? 'left-[17px]' : 'left-[3px]'}`} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActivityPanel() {
  const feed = [
    { inv: invoices[0], status: 'Paid · $4,250', tone: 'text-green-ink' },
    { inv: invoices[1], status: 'Viewed invoice', tone: 'text-pending' },
    { inv: invoices[2], status: 'Reminder sent', tone: 'text-overdue' },
    { inv: invoices[3], status: 'Paid · $980', tone: 'text-green-ink' },
    { inv: invoices[4], status: 'Invoice sent', tone: 'text-muted' },
    { inv: invoices[5], status: 'Viewed invoice', tone: 'text-pending' },
    { inv: invoices[1], status: 'Paid · $2,800', tone: 'text-green-ink' },
  ];
  return (
    <div className="flex flex-1 flex-col">
      <PanelHeader
        title="Payment activity"
        aside={
          <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-green-ink">
            <span className="size-1.5 animate-pulse rounded-full bg-green" />
            Live
          </span>
        }
      />
      <ul className="flex flex-1 flex-col justify-between gap-1">
        {feed.map((f, i) => (
          <li key={i} className={`flex items-center gap-3 rounded-[14px] px-3 py-2.5 ${i === 0 ? 'bg-green-wash/70' : ''}`}>
            <ClientAvatar invoice={f.inv} size="md" />
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] leading-5 font-semibold text-ink">{f.inv.client}</span>
              <span className={`mt-1 block text-[12.5px] leading-4 ${f.tone}`}>{f.status}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OverviewPanel() {
  const parts = [
    { label: 'Paid', pct: 63, amount: 31280, color: 'bg-green' },
    { label: 'Pending', pct: 25, amount: 12330, color: 'bg-pending' },
    { label: 'Overdue', pct: 12, amount: 6120, color: 'bg-overdue' },
  ];
  return (
    <div className="flex flex-1 flex-col justify-center gap-6">
      <div>
      <p className="text-[12px] text-muted">Invoiced this month</p>
      <p className="tabular mt-1 text-[30px] leading-tight font-bold tracking-[-0.03em] text-ink">$49,730</p>
      <div className="mt-4 flex h-2.5 gap-1">
        {parts.map((p) => (
          <span key={p.label} className={`${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
        ))}
      </div>
      </div>
      <ul className="grid grid-cols-3 gap-3 border-t border-line pt-4">
        {parts.map((p) => (
          <li key={p.label} className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5 text-[12px] text-muted">
              <span className={`size-2 rounded-full ${p.color}`} />
              {p.label} <span className="tabular">{p.pct}%</span>
            </span>
            <span className="tabular text-[15px] font-bold text-ink">{usd(p.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ClientsPanel() {
  const rows = [
    { inv: invoices[0], balance: 0 },
    { inv: invoices[1], balance: 2800 },
    { inv: invoices[2], balance: 6120 },
  ];
  return (
    <ul className="flex flex-1 flex-col justify-center gap-3.5">
      {rows.map((r) => (
        <li key={r.inv.id} className="flex items-center gap-3 text-[13px]">
          <ClientAvatar invoice={r.inv} size="md" />
          <span className="min-w-0 flex-1 truncate font-semibold text-ink">{r.inv.client}</span>
          <span className={`tabular font-semibold ${r.balance ? 'text-ink' : 'text-green-ink'}`}>{r.balance ? usd(r.balance) : 'Settled'}</span>
        </li>
      ))}
    </ul>
  );
}

function ReportPanel() {
  const q = [
    { label: 'Q1', v: 58 },
    { label: 'Q2', v: 74 },
    { label: 'Q3', v: 81 },
    { label: 'Q4', v: 92 },
  ];
  return (
    <div className="flex flex-1 flex-col">
      <PanelHeader title="Collected by quarter" />
      <div className="flex h-36 items-end gap-3">
        {q.map((x, i) => (
          <div key={x.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <span className={`w-full max-w-11 rounded-t-[8px] ${i === q.length - 1 ? 'bg-green' : 'bg-ink/10'}`} style={{ height: `${x.v}%` }} />
            <span className="text-[11.5px] font-semibold text-muted">{x.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12.5px] text-muted">
        Clients pay in <span className="tabular font-semibold text-ink">9.2 days</span> on average
      </p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-green-wash py-1.5 pr-3.5 pl-2 text-[13px] font-semibold text-green-ink">
            <span className="size-2 rounded-full bg-green" aria-hidden="true" />
            Features
          </p>
          <h2 id="features-title" className="text-[34px] leading-[1.08] font-bold tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[54px]">
            Everything you need to stay on top of your invoices.
          </h2>
          <p className="max-w-[520px] text-[17px] leading-[1.6] text-muted sm:text-[18px]">
            From creating your first invoice to tracking your latest payment, InvoiceFlow keeps everything simple.
          </p>
        </Reveal>

        {/*
          Bento grid, one 24px gap everywhere. Desktop: three cards on top with
          payment tracking running two rows tall; rows 2 and 3 share one height
          (1fr each), so the overview matches reporting and the tracking card
          ends level with the overview. Tablet: two columns. Mobile: one.
        */}
        <div className="mt-14 grid gap-6 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_1fr_1fr]">
          <FeatureCard
            className="lg:col-start-1 lg:row-start-1"
            glow="top-left"
            title="Create Professional Invoices"
            body="Design and send polished invoices in seconds using customizable templates."
          >
            <InvoicePanel />
          </FeatureCard>
          <FeatureCard
            className="lg:col-start-2 lg:row-start-1"
            delay={80}
            glow="bottom-right"
            title="Automated Payment Reminders"
            body="Automatically remind clients about upcoming and overdue payments."
          >
            <RemindersPanel />
          </FeatureCard>
          <FeatureCard
            className="md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1"
            delay={160}
            glow="top-right"
            title="Real-Time Payment Tracking"
            body="Know exactly which invoices are paid, pending, or overdue, the moment it happens."
          >
            <ActivityPanel />
          </FeatureCard>
          <FeatureCard className="lg:col-start-1 lg:row-start-3" glow="top-left" title="Client Management" body="Keep client information, invoice history, and payment records organized.">
            <ClientsPanel />
          </FeatureCard>
          <FeatureCard
            className="md:col-span-2 lg:col-start-1 lg:row-start-2"
            layout="split"
            glow="bottom-left"
            title="Smart Financial Overview"
            body="Get a clear overview of revenue, outstanding balances, and payment activity."
          >
            <OverviewPanel />
          </FeatureCard>
          <FeatureCard
            className="lg:col-span-2 lg:col-start-2 lg:row-start-3"
            layout="split"
            delay={80}
            glow="top-right"
            title="Simple Reporting"
            body="Understand your business performance with clear financial reports."
          >
            <ReportPanel />
          </FeatureCard>
        </div>
      </Container>
    </section>
  );
}
