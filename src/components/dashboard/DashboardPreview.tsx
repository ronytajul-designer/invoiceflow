import { AlertCircle, CheckCircle2, Clock3, TrendingUp } from 'lucide-react';
import { stats, usd } from '../../data/dashboard';
import { AppFrame } from './AppFrame';
import { InvoiceTable } from './InvoiceTable';
import { PaymentStatus } from './PaymentStatus';
import { RevenueChart } from './RevenueChart';
import { StatCard } from './StatCard';

/** Hero dashboard: revenue, outstanding, paid, overdue, chart, status split, recent invoices. */
export function DashboardPreview() {
  return (
    <AppFrame active="Dashboard" title="Good morning, Maya" subtitle="Here’s where your money stands this month.">
      <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-4 @3xl:gap-4">
        <StatCard label="Revenue YTD" value={usd(stats.revenueYtd)} meta={`${stats.revenueDelta} vs last year`} icon={TrendingUp} tone="positive" />
        <StatCard label="Outstanding" value={usd(stats.outstanding)} meta={`${stats.outstandingCount} open invoices`} icon={Clock3} />
        <StatCard label="Paid this month" value={usd(stats.paidThisMonth)} meta={`${stats.paidCount} invoices settled`} icon={CheckCircle2} tone="positive" />
        <StatCard label="Overdue" value={usd(stats.overdue)} meta={`${stats.overdueCount} need a nudge`} icon={AlertCircle} tone="warning" />
      </div>
      <div className="grid gap-3 @3xl:grid-cols-[minmax(0,1fr)_260px] @3xl:gap-4">
        <div className="min-w-0 rounded-[var(--radius-lg)] border border-line bg-white p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-[13px] font-semibold text-ink">Revenue</p>
              <p className="tabular text-[11.5px] text-muted">Last 12 months · paid invoices</p>
            </div>
            <span className="flex rounded-[var(--radius-sm)] bg-paper p-0.5 text-[10.5px] font-semibold">
              <span className="rounded-[4px] px-2 py-1 text-muted">6M</span>
              <span className="rounded-[4px] bg-white px-2 py-1 text-ink shadow-sm">12M</span>
            </span>
          </div>
          <RevenueChart height={180} />
        </div>
        <div className="hidden @3xl:flex">
          <PaymentStatus />
        </div>
      </div>
      <InvoiceTable rows={4} />
    </AppFrame>
  );
}
