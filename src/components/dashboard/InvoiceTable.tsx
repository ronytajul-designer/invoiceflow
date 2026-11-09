import { invoices, usd, type Invoice } from '../../data/dashboard';
import { StatusBadge } from '../ui/StatusBadge';


/**
 * Logos for the fictional clients. Each is a distinct mark in its own colour
 * on one shared tile (white, hairline ring, same size and inner padding), so
 * they read like real company logos while staying a consistent set.
 */
export const logos: Record<string, JSX.Element> = {
  // Two wind strokes curling into a gust.
  'Northwind Studio': (
    <g fill="none" stroke="#142746" strokeWidth="2.8" strokeLinecap="round">
      <path d="M3 9h11a3.2 3.2 0 1 0-3.2-3.2" />
      <path d="M3 15h15a3.2 3.2 0 1 1-3.2 3.2" />
    </g>
  ),
  // Kingfisher: a solid bird with swept wings.
  'Halcyon & Co.': <path d="M2 10c4-3 7-2 10 2 3-4 6-5 10-2-3 1-5 3-6 6-1.3 2.5-6.7 2.5-8 0-1-3-3-5-6-6Z" fill="#2F5BD3" />,
  // Sun rising over a horizon line.
  'Brightline Consulting': (
    <g fill="#237A57">
      <path d="M6 16a6 6 0 0 1 12 0Z" />
      <rect x="2" y="18" width="20" height="2.6" rx="1.3" />
    </g>
  ),
  // Leaf with a central vein cut out.
  'Fernwood Bakery': (
    <g>
      <path d="M12 2c6 4 8 10 0 20-8-10-6-16 0-20Z" fill="#B4540A" />
      <path d="M12 7v12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  ),
  // Solid globe with white meridians.
  'Atlas Field Labs': (
    <g>
      <circle cx="12" cy="12" r="10" fill="#3D6B8F" />
      <path d="M2 12h20M12 2c3.5 3.5 3.5 16.5 0 20M12 2c-3.5 3.5-3.5 16.5 0 20" fill="none" stroke="#fff" strokeWidth="1.5" />
    </g>
  ),
  // Swept falcon wing.
  'Kestrel Media': <path d="M2 19c6-1 10-6 20-15-1 9-6 14-13 15l3-4-10 4Z" fill="#2FA678" />,
};

export function ClientAvatar({ invoice, size = 'sm' }: { invoice: Invoice; size?: 'sm' | 'md' }) {
  const logo = logos[invoice.client];
  const box = size === 'sm' ? 'size-6 rounded-[7px]' : 'size-8 rounded-[9px]';
  return (
    <span className={`grid shrink-0 place-items-center bg-white ring-1 ring-ink/10 ${box}`} aria-hidden="true">
      {logo ? (
        <svg viewBox="0 0 24 24" className={size === 'sm' ? 'size-4' : 'size-[22px]'}>
          {logo}
        </svg>
      ) : (
        <span className="text-[10px] font-bold text-ink">{invoice.initials}</span>
      )}
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
