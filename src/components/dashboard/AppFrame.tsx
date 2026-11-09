import type { ReactNode } from 'react';
import { BarChart3, ChevronLeft, ChevronRight, CreditCard, FileText, LayoutDashboard, Plus, Search, Settings, Users, type LucideIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';

export type NavKey = 'Dashboard' | 'Invoices' | 'Clients' | 'Payments' | 'Reports';

type NavItem = { key: NavKey | 'Settings'; icon: LucideIcon };
const groups: { label?: string; items: NavItem[] }[] = [
  {
    items: [
      { key: 'Dashboard', icon: LayoutDashboard },
      { key: 'Invoices', icon: FileText },
      { key: 'Clients', icon: Users },
      { key: 'Payments', icon: CreditCard },
    ],
  },
  { label: 'Insights', items: [{ key: 'Reports', icon: BarChart3 }, { key: 'Settings', icon: Settings }] },
];

type Props = { active: NavKey; title: string; subtitle?: string; children: ReactNode; className?: string };

/**
 * The InvoiceFlow app chrome used by every product mockup.
 * A pale canvas holds the sidebar directly; the workspace sits in its own white
 * rounded card. The active item is a midnight pill with a green icon.
 * It is a container-query root, so the sidebar and columns adapt to the mockup's
 * own width, not the viewport.
 */
export function AppFrame({ active, title, subtitle, children, className = '' }: Props) {
  return (
    <div className={`@container overflow-hidden rounded-[var(--radius-xl)] bg-[#F3F6F5] p-1.5 shadow-[var(--shadow-product)] ring-1 ring-ink/10 ${className}`} aria-hidden="true">
      <div className="flex gap-1.5">
        <aside className="hidden w-[178px] shrink-0 flex-col px-2.5 pt-3 pb-2 @4xl:flex">
          <Logo className="mb-5 ml-2 h-[21px] w-auto self-start" />
          {groups.map((g, gi) => (
            <div key={gi} className={`flex flex-col gap-0.5 ${gi ? 'mt-4' : ''}`}>
              {g.label && <span className="mb-1 px-2.5 text-[10px] font-semibold tracking-[0.08em] text-faint uppercase">{g.label}</span>}
              {g.items.map(({ key, icon: Icon }) => {
                const on = key === active;
                return (
                  <span
                    key={key}
                    className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[12.5px] font-medium ${on ? 'bg-midnight text-white shadow-[0_4px_12px_-6px_rgb(11_25_48/0.6)]' : 'text-ink-soft'}`}
                  >
                    <Icon className={`size-4 ${on ? 'text-green-soft' : 'text-muted'}`} strokeWidth={1.9} />
                    {key}
                  </span>
                );
              })}
            </div>
          ))}
          <div className="mt-auto rounded-[12px] bg-white p-2.5 ring-1 ring-ink/[0.06]">
            <p className="text-[11px] leading-snug text-ink-soft">Automatic reminders are on for 9 invoices.</p>
            <span className="mt-2 flex h-7 items-center justify-center rounded-[8px] bg-green-wash text-[11px] font-semibold text-green-ink">View schedule</span>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col rounded-[14px] bg-white ring-1 ring-ink/[0.06]">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 @3xl:px-5">
            <span className="flex min-w-0 items-center gap-1.5 text-[11.5px] text-faint">
              <ChevronLeft className="hidden size-3.5 @xl:block" strokeWidth={2} />
              <ChevronRight className="hidden size-3.5 @xl:block" strokeWidth={2} />
              <span className="hidden whitespace-nowrap @xl:inline">Chen Design Studio</span>
              <span className="hidden @xl:inline">/</span>
              <span className="truncate text-ink-soft">{active}</span>
            </span>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden h-8 w-44 items-center gap-2 rounded-[10px] bg-paper px-2.5 text-[11.5px] text-faint ring-1 ring-line @3xl:flex">
                <Search className="size-3.5" strokeWidth={2} />
                Search
                <kbd className="ml-auto rounded border border-line bg-white px-1 font-sans text-[10px]">⌘K</kbd>
              </span>
              <span className="flex h-8 items-center gap-1.5 rounded-[10px] bg-green px-3 text-[11.5px] font-semibold text-midnight">
                <Plus className="size-3.5" strokeWidth={2.5} />
                New invoice
              </span>
            </div>
          </div>
          <div className="px-4 pt-4 @3xl:px-5 @3xl:pt-5">
            <p className="truncate text-[17px] font-bold tracking-[-0.02em] text-ink @3xl:text-[20px]">{title}</p>
            {subtitle && <p className="truncate text-[11.5px] text-muted">{subtitle}</p>}
          </div>
          <div className="flex flex-col gap-3 p-3 @xl:p-4 @3xl:gap-4 @3xl:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
