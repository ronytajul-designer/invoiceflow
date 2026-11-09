import northwind from '../../assets/avatars/northwind.webp';
import halcyon from '../../assets/avatars/halcyon.webp';
import brightline from '../../assets/avatars/brightline.webp';
import fernwood from '../../assets/avatars/fernwood.webp';
import atlas from '../../assets/avatars/atlas.webp';
import kestrel from '../../assets/avatars/kestrel.webp';
import { invoices, usd, type Invoice } from '../../data/dashboard';
import { StatusBadge } from '../ui/StatusBadge';


/**
 * Headshot of each client's contact (Unsplash photos, Unsplash License).
 * Same square crop, size and colour grade for consistency. Sample data.
 */
const photos: Record<string, string> = {
  'Northwind Studio': northwind,
  'Halcyon & Co.': halcyon,
  'Brightline Consulting': brightline,
  'Fernwood Bakery': fernwood,
  'Atlas Field Labs': atlas,
  'Kestrel Media': kestrel,
};

export function ClientAvatar({ invoice, size = 'sm' }: { invoice: Invoice; size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'size-6' : 'size-8';
  const src = photos[invoice.client];
  if (!src) {
    return (
      <span className={`grid shrink-0 place-items-center rounded-full bg-ink text-[10px] font-bold text-white ${box}`} aria-hidden="true">
        {invoice.initials}
      </span>
    );
  }
  return <img src={src} alt="" width={32} height={32} loading="lazy" decoding="async" className={`shrink-0 rounded-full object-cover ring-2 ring-white ${box}`} />;
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
