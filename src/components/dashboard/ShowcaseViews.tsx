import { ArrowDownLeft, Check, CreditCard, Eye, FileText, Landmark, Send } from 'lucide-react';
import { invoices, usd } from '../../data/dashboard';
import { StatusBadge } from '../ui/StatusBadge';
import { AppFrame } from './AppFrame';
import { InvoiceTable } from './InvoiceTable';
import { RevenueChart } from './RevenueChart';

export function InvoicesView() {
  const filters = [
    ['All', 48],
    ['Paid', 37],
    ['Pending', 7],
    ['Overdue', 2],
    ['Draft', 2],
  ] as const;
  return (
    <AppFrame active="Invoices" title="Invoices" subtitle="48 invoices · $18,450 outstanding">
      <div className="flex flex-wrap gap-1.5">
        {filters.map(([f, n], i) => (
          <span
            key={f}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold ${i === 0 ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-soft'}`}
          >
            {f}
            <span className={`tabular ${i === 0 ? 'text-white/60' : 'text-faint'}`}>{n}</span>
          </span>
        ))}
      </div>
      <InvoiceTable rows={6} title="November 2026" />
    </AppFrame>
  );
}

export function InvoiceDetailView() {
  const lines = [
    ['Brand identity system', 1, 3200],
    ['Website design, 4 pages', 1, 850],
    ['Revisions round', 1, 200],
  ] as const;
  const activity = [
    { icon: FileText, label: 'Created', time: 'Nov 2' },
    { icon: Send, label: 'Sent to client', time: 'Nov 2' },
    { icon: Eye, label: 'Viewed 3 times', time: 'Nov 4' },
    { icon: Check, label: 'Paid by card', time: 'Nov 12', done: true },
  ];
  return (
    <AppFrame active="Invoices" title="INV-0418" subtitle="Northwind Studio · Brand identity">
      <div className="grid gap-3 @2xl:grid-cols-[minmax(0,1fr)_210px] @2xl:gap-4">
        <div className="rounded-[var(--radius-lg)] border border-line bg-white p-4 @xl:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="size-7 rounded-[6px] bg-ink" />
              <span className="leading-tight">
                <span className="block text-[12.5px] font-bold text-ink">Chen Design Studio</span>
                <span className="block text-[11px] text-muted">hello@chen.studio</span>
              </span>
            </div>
            <StatusBadge status="Paid" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-[11.5px] @xl:grid-cols-3">
            <div>
              <p className="text-faint">Billed to</p>
              <p className="font-semibold text-ink">Northwind Studio</p>
            </div>
            <div>
              <p className="text-faint">Issued</p>
              <p className="tabular font-semibold text-ink">Nov 2, 2026</p>
            </div>
            <div className="hidden @xl:block">
              <p className="text-faint">Due</p>
              <p className="tabular font-semibold text-ink">Nov 30, 2026</p>
            </div>
          </div>
          <table className="mt-5 w-full text-[11.5px]">
            <thead>
              <tr className="border-b border-line text-left text-[10.5px] tracking-wide text-faint uppercase">
                <th className="pb-2 font-semibold">Item</th>
                <th className="hidden pb-2 text-right font-semibold @xl:table-cell">Qty</th>
                <th className="pb-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {lines.map(([l, q, v]) => (
                <tr key={l} className="border-b border-line/70">
                  <td className="py-2 text-ink-soft">{l}</td>
                  <td className="tabular hidden py-2 text-right text-muted @xl:table-cell">{q}</td>
                  <td className="tabular py-2 text-right font-semibold text-ink">{usd(v, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <dl className="mt-3 ml-auto flex max-w-[220px] flex-col gap-1.5 text-[11.5px]">
            <div className="flex justify-between text-muted">
              <dt>Subtotal</dt>
              <dd className="tabular">$4,250.00</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Tax (0%)</dt>
              <dd className="tabular">$0.00</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-[13px] font-bold text-ink">
              <dt>Total</dt>
              <dd className="tabular">$4,250.00</dd>
            </div>
          </dl>
        </div>
        <div className="hidden rounded-[var(--radius-lg)] border border-line bg-white p-4 @2xl:block">
          <p className="mb-4 text-[13px] font-semibold text-ink">Activity</p>
          <ol className="relative flex flex-col gap-4">
            <span className="absolute top-2 bottom-2 left-[11px] w-px bg-line" />
            {activity.map(({ icon: Icon, label, time, done }) => (
              <li key={label} className="relative flex items-center gap-3 text-[11.5px]">
                <span className={`z-10 grid size-6 place-items-center rounded-full ${done ? 'bg-green text-midnight' : 'border border-line bg-white text-muted'}`}>
                  <Icon className="size-3" strokeWidth={2.5} />
                </span>
                <span className="flex-1 font-semibold text-ink">{label}</span>
                <span className="text-faint">{time}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-[var(--radius-md)] bg-green-wash p-3 text-[11.5px] text-green-ink">
            Paid 18 days early. Reminders were cancelled automatically.
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

export function PaymentsView() {
  const cols = [
    { title: 'Pending', status: 'Pending' as const, items: [invoices[1], invoices[4]] },
    { title: 'Overdue', status: 'Overdue' as const, items: [invoices[2]] },
    { title: 'Paid this week', status: 'Paid' as const, items: [invoices[0], invoices[3]] },
  ];
  const payments = [
    { client: 'Northwind Studio', method: 'Card ·· 4242', icon: CreditCard, amount: 4250 },
    { client: 'Fernwood Bakery', method: 'Bank transfer', icon: Landmark, amount: 980 },
  ];
  return (
    <AppFrame active="Payments" title="Payments" subtitle="Expected this week: $6,200">
      <div className="grid gap-3 @2xl:grid-cols-3">
        {cols.map((c) => (
          <div key={c.title} className="flex flex-col gap-2 rounded-[var(--radius-lg)] border border-line bg-paper/60 p-2.5">
            <div className="flex items-center justify-between px-1 py-0.5">
              <span className="text-[12px] font-semibold text-ink">{c.title}</span>
              <span className="tabular text-[11px] text-muted">{usd(c.items.reduce((a, b) => a + b.amount, 0))}</span>
            </div>
            {c.items.map((inv) => (
              <div key={inv.id} className="rounded-[var(--radius-md)] border border-line bg-white p-2.5 shadow-[0_1px_2px_rgb(20_39_70/0.04)]">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[12px] font-semibold text-ink">{inv.client}</span>
                  <StatusBadge status={c.status} />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span className="tabular text-muted">
                    {inv.id} · {inv.due}
                  </span>
                  <span className="tabular font-bold text-ink">{usd(inv.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="rounded-[var(--radius-lg)] border border-line bg-white">
        <p className="border-b border-line px-4 py-3 text-[13px] font-semibold text-ink">Recent payments</p>
        <ul>
          {payments.map(({ client, method, icon: Icon, amount }) => (
            <li key={client} className="flex items-center gap-3 border-t border-line/70 px-4 py-2.5 text-[12px] first:border-t-0">
              <span className="grid size-7 place-items-center rounded-full bg-green-wash text-green-ink">
                <ArrowDownLeft className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="min-w-0 flex-1 truncate font-semibold text-ink">{client}</span>
              <span className="hidden items-center gap-1.5 text-muted @xl:flex">
                <Icon className="size-3.5" strokeWidth={2} />
                {method}
              </span>
              <span className="tabular font-bold text-green-ink">+{usd(amount)}</span>
            </li>
          ))}
        </ul>
      </div>
    </AppFrame>
  );
}

export function AnalyticsView() {
  const kpis = [
    ['Collected this year', '$284,920', '+12.4%'],
    ['Avg. days to pay', '9.2 days', '−3.1 days'],
    ['Collection rate', '96%', '+4 pts'],
  ];
  const top = [
    ['Northwind Studio', 62400, 100],
    ['Brightline Consulting', 48150, 77],
    ['Halcyon & Co.', 31900, 51],
    ['Atlas Field Labs', 22300, 36],
  ] as const;
  return (
    <AppFrame active="Reports" title="Reports" subtitle="Jan 1 to Nov 30, 2026">
      <div className="grid grid-cols-2 gap-2.5 @xl:grid-cols-3 @3xl:gap-4">
        {kpis.map(([l, v, d], i) => (
          <div key={l} className={`min-w-0 rounded-[var(--radius-lg)] border border-line bg-white p-3 @3xl:p-4 ${i === 2 ? 'hidden @xl:block' : ''}`}>
            <p className="truncate text-[11px] text-muted">{l}</p>
            <p className="tabular mt-1 truncate text-[15px] font-bold tracking-[-0.02em] text-ink @3xl:text-[20px]">{v}</p>
            <p className="tabular text-[11px] font-semibold text-green-ink">{d}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 @2xl:grid-cols-[minmax(0,1fr)_220px] @2xl:gap-4">
        <div className="min-w-0 rounded-[var(--radius-lg)] border border-line bg-white p-4">
          <p className="mb-3 text-[13px] font-semibold text-ink">Revenue by month</p>
          <RevenueChart height={170} />
        </div>
        <div className="hidden rounded-[var(--radius-lg)] border border-line bg-white p-4 @2xl:block">
          <p className="mb-4 text-[13px] font-semibold text-ink">Top clients</p>
          <ul className="flex flex-col gap-3.5">
            {top.map(([c, v, w]) => (
              <li key={c} className="text-[11.5px]">
                <div className="mb-1.5 flex justify-between gap-2">
                  <span className="truncate font-semibold text-ink">{c}</span>
                  <span className="tabular text-muted">{usd(v)}</span>
                </div>
                <span className="block h-1.5 rounded-full bg-paper">
                  <span className="block h-full rounded-full bg-ink/70" style={{ width: `${w}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppFrame>
  );
}
