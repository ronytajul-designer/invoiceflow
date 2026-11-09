export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';

const styles: Record<InvoiceStatus, string> = {
  Paid: 'bg-green-wash/70 text-green-ink ring-green/30',
  Pending: 'bg-pending-wash/70 text-pending ring-pending/20',
  Overdue: 'bg-overdue-wash/70 text-overdue ring-overdue/20',
  Draft: 'bg-white text-draft ring-line-strong',
};

const dots: Record<InvoiceStatus, string> = {
  Paid: 'bg-green',
  Pending: 'bg-pending',
  Overdue: 'bg-overdue',
  Draft: 'bg-faint',
};

export function StatusBadge({ status, className = '' }: { status: InvoiceStatus; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-semibold ring-1 ring-inset whitespace-nowrap ${styles[status]} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${dots[status]}`} aria-hidden="true" />
      {status}
    </span>
  );
}
