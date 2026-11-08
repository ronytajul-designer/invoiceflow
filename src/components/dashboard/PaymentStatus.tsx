import { usd } from '../../data/dashboard';

const parts = [
  { label: 'Paid', value: 68, amount: 31280, color: 'bg-green' },
  { label: 'Pending', value: 24, amount: 12330, color: 'bg-pending' },
  { label: 'Overdue', value: 8, amount: 6120, color: 'bg-overdue' },
];

/** Share of this month's invoiced value by status, as one stacked bar. */
export function PaymentStatus() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 rounded-[var(--radius-lg)] border border-line bg-white p-4">
      <div>
        <p className="text-[13px] font-semibold text-ink">This month</p>
        <p className="tabular text-[11.5px] text-muted">{usd(49730)} invoiced</p>
      </div>
      <div className="flex h-2.5 w-full gap-[3px] overflow-hidden rounded-full" role="img" aria-label="Paid 68 percent, pending 24 percent, overdue 8 percent">
        {parts.map((p) => (
          <span key={p.label} className={`${p.color} h-full first:rounded-l-full last:rounded-r-full`} style={{ width: `${p.value}%` }} />
        ))}
      </div>
      <ul className="flex flex-col gap-2.5">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center justify-between text-[12px]">
            <span className="flex items-center gap-2 text-muted">
              <span className={`size-2 rounded-full ${p.color}`} aria-hidden="true" />
              {p.label}
              <span className="tabular text-faint">{p.value}%</span>
            </span>
            <span className="tabular font-semibold text-ink">{usd(p.amount)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between rounded-[var(--radius-md)] bg-paper px-3 py-2.5 text-[11.5px]">
        <span className="text-muted">Payout Nov 14</span>
        <span className="tabular font-semibold text-green-ink">+{usd(4250)}</span>
      </div>
    </div>
  );
}
