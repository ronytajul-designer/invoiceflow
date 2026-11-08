export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';

const styles: Record<InvoiceStatus, string> = {
  Paid: 'bg-green-wash text-green-ink',
  Pending: 'bg-pending-wash text-pending',
  Overdue: 'bg-overdue-wash text-overdue',
  Draft: 'bg-draft-wash text-draft',
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
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-semibold whitespace-nowrap ${styles[status]} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${dots[status]}`} aria-hidden="true" />
      {status}
    </span>
  );
}
