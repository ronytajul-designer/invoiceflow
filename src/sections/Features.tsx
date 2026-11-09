import { BarChart3, BellRing, FileText, LineChart, Plus, Radar, Send, Users } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { FeatureCard } from '../components/FeatureTile';
import { ClientAvatar } from '../components/dashboard/InvoiceTable';
import { invoices, usd } from '../data/dashboard';

/* ---- Inset panel content, one per feature (sample data, fictional clients) ---- */

function InvoicePanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-faint">Invoice</p>
          <p className="tabular text-[17px] font-bold text-ink">INV-0418</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11.5px] font-semibold text-ink-soft">
          <span className="size-3 rounded-[3px] bg-ink" />
          Your logo
        </span>
      </div>
      <ul className="flex flex-col gap-2.5 text-[12.5px]">
        {[
          ['Brand identity system', 3200],
          ['Website design, 4 pages', 850],
          ['Revisions round', 200],
        ].map(([l, v]) => (
          <li key={l as string} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-ink-soft">
              <span className="size-1.5 rounded-full bg-green" />
              {l}
            </span>
            <span className="tabular text-muted">{usd(v as number)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-line pt-3">
        <span className="tabular text-[18px] font-bold text-ink">$4,250.00</span>
        <span className="flex h-8 items-center gap-1.5 rounded-full bg-ink px-3.5 text-[12px] font-semibold text-white">
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
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-semibold text-ink">Reminder schedule</span>
        <span className="text-[11.5px] font-semibold text-green-ink">Edit</span>
      </div>
      <div className="rounded-[14px] bg-paper p-3">
        <p className="text-[11px] font-semibold text-pending">Halcyon &amp; Co. · INV-0417</p>
        <p className="mt-1 text-[12.5px] leading-[1.5] text-ink-soft">“Hi Lena, a friendly heads-up that $2,800 is due on Nov 24.”</p>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={it.when} className="flex items-center justify-between text-[12.5px]">
            <span className="flex items-center gap-2 text-ink-soft">
              <BellRing className="size-3.5 text-green-ink" strokeWidth={2.25} />
              {it.when}
            </span>
            <span className="relative h-[18px] w-[30px] rounded-full bg-green">
              <span className="absolute top-[2px] left-[14px] size-[14px] rounded-full bg-white shadow-sm" />
            </span>
          </li>
        ))}
      </ul>
      <span className="flex h-9 items-center justify-center gap-1.5 rounded-[12px] border border-dashed border-green/60 bg-green-wash/50 text-[12px] font-semibold text-green-ink">
        <Plus className="size-3.5" strokeWidth={2.5} />
        Add reminder
      </span>
    </div>
  );
}

function ActivityPanel() {
  const feed = [
    { inv: invoices[0], what: 'Paid', detail: '+$4,250.00', tone: 'text-green-ink', time: '9:42' },
    { inv: invoices[1], what: 'Viewed invoice', detail: 'INV-0417', tone: 'text-pending', time: '9:30' },
    { inv: invoices[2], what: 'Reminder sent', detail: '3 days overdue', tone: 'text-overdue', time: '9:00' },
    { inv: invoices[3], what: 'Paid', detail: '+$980.00', tone: 'text-green-ink', time: 'Yesterday' },
    { inv: invoices[4], what: 'Invoice sent', detail: 'INV-0414', tone: 'text-muted', time: 'Yesterday' },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
          Payment activity
          <span className="grid size-5 place-items-center rounded-full bg-green text-[10.5px] font-bold text-midnight">2</span>
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-green-ink">
          <span className="size-1.5 animate-pulse rounded-full bg-green" />
          Live
        </span>
      </div>
      <ul className="flex flex-col gap-1">
        {feed.map((f, i) => (
          <li key={i} className={`flex items-center gap-3 rounded-[12px] px-2.5 py-2.5 ${i === 0 ? 'bg-green-wash/60' : ''}`}>
            <ClientAvatar invoice={f.inv} size="md" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[12.5px] font-semibold text-ink">{f.inv.client}</span>
              <span className={`block truncate text-[11.5px] ${f.tone}`}>
                {f.what} · <span className="tabular">{f.detail}</span>
              </span>
            </span>
            <span className="tabular shrink-0 text-[11px] text-faint">{f.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OverviewPanel() {
  const parts = [
    { label: 'Paid', amount: 31280, n: 14, pct: 63, color: 'bg-green', dot: 'bg-green' },
    { label: 'Pending', amount: 12330, n: 7, pct: 25, color: 'bg-pending', dot: 'bg-pending' },
    { label: 'Overdue', amount: 6120, n: 2, pct: 12, color: 'bg-overdue', dot: 'bg-overdue' },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-faint">Invoiced this month</p>
          <p className="tabular text-[22px] leading-tight font-bold tracking-[-0.02em] text-ink">$49,730</p>
        </div>
        <span className="rounded-full border border-line px-2.5 py-1 text-[11.5px] font-semibold text-ink-soft">November</span>
      </div>
      <ul className="flex flex-col gap-2.5 text-[12.5px]">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-semibold text-ink">
              <span className={`size-2 rounded-full ${p.dot}`} />
              {p.label}
            </span>
            <span className="tabular text-muted">
              {usd(p.amount)} · {p.n} invoices
            </span>
          </li>
        ))}
      </ul>
      <div className="flex h-2.5 gap-1">
        {parts.map((p) => (
          <span key={p.label} className={`${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
        ))}
      </div>
    </div>
  );
}

function ClientsPanel() {
  const rows = [
    { inv: invoices[0], count: 14, balance: 0 },
    { inv: invoices[1], count: 6, balance: 2800 },
    { inv: invoices[2], count: 9, balance: 6120 },
  ];
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[14px] font-semibold text-ink">Clients</span>
      <ul className="flex flex-col divide-y divide-line">
        {rows.map((r) => (
          <li key={r.inv.id} className="flex items-center gap-3 py-2.5 text-[12.5px] first:pt-0 last:pb-0">
            <ClientAvatar invoice={r.inv} size="md" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate font-semibold text-ink">{r.inv.client}</span>
              <span className="block text-[11px] text-muted">{r.count} invoices</span>
            </span>
            <span className={`tabular font-semibold ${r.balance ? 'text-ink' : 'text-green-ink'}`}>{r.balance ? usd(r.balance) : 'Settled'}</span>
          </li>
        ))}
      </ul>
    </div>
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-semibold text-ink">Collected by quarter</span>
        <span className="rounded-full border border-line px-2.5 py-1 text-[11.5px] font-semibold text-ink-soft">Export PDF</span>
      </div>
      <div className="flex h-28 items-end gap-3">
        {q.map((x, i) => (
          <div key={x.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <span className={`w-full max-w-11 rounded-t-[8px] ${i === q.length - 1 ? 'bg-green' : 'bg-ink/10'}`} style={{ height: `${x.v}%` }} />
            <span className="text-[11px] font-semibold text-muted">{x.label}</span>
          </div>
        ))}
      </div>
      <dl className="grid grid-cols-3 gap-3 border-t border-line pt-3 text-[11px]">
        {[
          ['Avg. days to pay', '9.2'],
          ['Collected', '96%'],
          ['Written off', '0%'],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-muted">{k}</dt>
            <dd className="tabular text-[16px] font-bold text-ink">{v}</dd>
          </div>
        ))}
      </dl>
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
          payment tracking running two rows tall, then two wide cards that put
          copy beside the panel. Tablet: two columns. Mobile: one.
        */}
        <div className="mt-14 grid gap-6 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            className="lg:col-start-1 lg:row-start-1"
            icon={FileText}
            glow="top-left"
            title="Create Professional Invoices"
            body="Design and send polished invoices in seconds using customizable templates."
          >
            <InvoicePanel />
          </FeatureCard>
          <FeatureCard
            className="lg:col-start-2 lg:row-start-1"
            delay={80}
            icon={BellRing}
            glow="bottom-right"
            title="Automated Payment Reminders"
            body="Automatically remind clients about upcoming and overdue payments."
          >
            <RemindersPanel />
          </FeatureCard>
          <FeatureCard
            className="md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1"
            delay={160}
            icon={Radar}
            glow="top-right"
            title="Real-Time Payment Tracking"
            body="Know exactly which invoices are paid, pending, or overdue, the moment it happens."
          >
            <ActivityPanel />
          </FeatureCard>
          <FeatureCard
            className="md:col-span-2 lg:col-start-1 lg:row-start-2"
            layout="split"
            icon={LineChart}
            glow="bottom-left"
            title="Smart Financial Overview"
            body="Get a clear overview of revenue, outstanding balances, and payment activity."
          >
            <OverviewPanel />
          </FeatureCard>
          <FeatureCard className="lg:col-start-1 lg:row-start-3" icon={Users} glow="top-left" title="Client Management" body="Keep client information, invoice history, and payment records organized.">
            <ClientsPanel />
          </FeatureCard>
          <FeatureCard
            className="lg:col-span-2 lg:col-start-2 lg:row-start-3"
            layout="split"
            delay={80}
            icon={BarChart3}
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
