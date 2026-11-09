import { invoices, usd, type Invoice } from '../../data/dashboard';
import { StatusBadge } from '../ui/StatusBadge';

/**
 * Company marks for the fictional clients, matching the glyphs in the trust
 * strip so each company looks the same everywhere. One tile shape, one size
 * ratio and one muted brand palette keep the set consistent.
 */
const marks: Record<string, { bg: string; glyph: JSX.Element }> = {
  'Northwind Studio': { bg: '#142746', glyph: <circle cx="8" cy="8" r="5" /> },
  'Halcyon & Co.': { bg: '#2F5BD3', glyph: <path d="M8 3 13.5 13h-11z" /> },
  'Brightline Consulting': { bg: '#237A57', glyph: <rect x="3.5" y="3.5" width="9" height="9" rx="2" /> },
  'Fernwood Bakery': { bg: '#B4540A', glyph: <path d="M8 2.5c3 2.4 4.4 5.4 0 11-4.4-5.6-3-8.6 0-11Z" /> },
  'Atlas Field Labs': { bg: '#3D6B8F', glyph: <path d="M3 8h10M8 3v10" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" /> },
  'Kestrel Media': { bg: '#55C99A', glyph: <path d="M2.5 12 8 4l5.5 8z" /> },
};

export function ClientAvatar({ invoice, size = 'sm' }: { invoice: Invoice; size?: 'sm' | 'md' }) {
  const mark = marks[invoice.client];
  const box = size === 'sm' ? 'size-6 rounded-[7px]' : 'size-8 rounded-[9px]';
  if (!mark) {
    return (
      <span className={`grid shrink-0 place-items-center bg-ink font-bold text-white ${box} ${size === 'sm' ? 'text-[9.5px]' : 'text-[11px]'}`} aria-hidden="true">
        {invoice.initials}
      </span>
    );
  }
  return (
    <span className={`grid shrink-0 place-items-center ${box}`} style={{ background: mark.bg }} aria-hidden="true">
      <svg viewBox="0 0 16 16" className={size === 'sm' ? 'size-3.5' : 'size-[18px]'} fill="#fff">
        {mark.glyph}
      </svg>
    </span>
  );
}

/** Compact invoice list used inside dashboard mockups. Collapses columns by container width. */
export function InvoiceTable({ rows = 5, title = 'Recent invoices' }: { rows?: number; title?: string }) {
  return (
    <div className="min-w-0 rounded-[var(--radius-lg)] border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="text-[13px] font-semibold text-ink">{title}</span>
        <span className="text-[11.5px] font-semibold text-green-ink">View all</span>
      </div>
      <table className="w-full table-fixed text-left text-[12px]">
        <thead className="sr-only @xl:not-sr-only">
          <tr className="text-[10.5px] font-semibold tracking-wide text-faint uppercase">
            <th className="py-2 pl-4 font-semibold">Client</th>
            <th className="hidden w-[84px] py-2 font-semibold @2xl:table-cell">Invoice</th>
            <th className="hidden w-[64px] py-2 font-semibold @xl:table-cell">Due</th>
            <th className="hidden w-[76px] py-2 pr-2 text-right font-semibold @sm:table-cell @xl:w-[84px]">Amount</th>
            <th className="w-[82px] py-2 pr-4 text-right font-semibold @xl:w-[92px]">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.slice(0, rows).map((inv) => (
            <tr key={inv.id} className="border-t border-line/70 first:border-t-0 @xl:first:border-t">
              <td className="py-2.5 pl-4">
                <span className="flex min-w-0 items-center gap-2.5">
                  <ClientAvatar invoice={inv} />
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate font-semibold text-ink">{inv.client}</span>
                    <span className="tabular block text-[11px] text-muted @sm:hidden">{usd(inv.amount)}</span>
                  </span>
                </span>
              </td>
              <td className="tabular hidden py-2.5 text-muted @2xl:table-cell">{inv.id}</td>
              <td className="tabular hidden py-2.5 text-muted @xl:table-cell">{inv.due}</td>
              <td className="tabular hidden py-2.5 pr-2 text-right font-semibold text-ink @sm:table-cell">{usd(inv.amount)}</td>
              <td className="py-2.5 pr-4 text-right">
                <StatusBadge status={inv.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
