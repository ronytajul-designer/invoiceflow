import type { LucideIcon } from 'lucide-react';

type Props = {
  label: string;
  value: string;
  meta: string;
  icon: LucideIcon;
  tone?: 'default' | 'positive' | 'warning';
};

const metaTone = {
  default: 'text-muted',
  positive: 'text-green-ink',
  warning: 'text-overdue',
};

export function StatCard({ label, value, meta, icon: Icon, tone = 'default' }: Props) {
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-[var(--radius-lg)] border border-line bg-white p-3.5 @3xl:p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[11.5px] font-medium text-muted">{label}</span>
        <span
          className={`hidden size-6 shrink-0 place-items-center rounded-md @sm:grid ${tone === 'warning' ? 'bg-overdue-wash text-overdue' : tone === 'positive' ? 'bg-green-wash text-green-ink' : 'bg-paper text-ink-soft'}`}
        >
          <Icon className="size-3.5" strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      <span className="tabular text-[19px] leading-none font-bold tracking-[-0.02em] text-ink @3xl:text-[22px]">{value}</span>
      <span className={`truncate text-[11px] font-medium ${metaTone[tone]}`}>{meta}</span>
    </div>
  );
}
