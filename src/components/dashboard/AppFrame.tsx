import type { ReactNode } from 'react';
import { BarChart3, CreditCard, FileText, LayoutDashboard, Plus, Search, Settings, Users, type LucideIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';

export type NavKey = 'Dashboard' | 'Invoices' | 'Clients' | 'Payments' | 'Reports';

const nav: { key: NavKey | 'Settings'; icon: LucideIcon }[] = [
  { key: 'Dashboard', icon: LayoutDashboard },
  { key: 'Invoices', icon: FileText },
  { key: 'Clients', icon: Users },
  { key: 'Payments', icon: CreditCard },
  { key: 'Reports', icon: BarChart3 },
];

type Props = { active: NavKey; title: string; subtitle?: string; children: ReactNode; className?: string };

/**
 * The InvoiceFlow app chrome used by every product mockup. It is a container-query
 * root, so the sidebar and columns adapt to the mockup's own width, not the viewport.
 */
export function AppFrame({ active, title, subtitle, children, className = '' }: Props) {
  return (
    <div
      className={`@container overflow-hidden rounded-[var(--radius-xl)] border border-ink/10 bg-white shadow-[var(--shadow-product)] ${className}`}
      aria-hidden="true"
    >
      <div className="flex">
        <aside className="hidden w-[184px] shrink-0 flex-col gap-1 border-r border-line bg-paper/70 px-3 py-4 @4xl:flex">
          <Logo className="mb-4 ml-1.5 h-[22px] w-auto self-start" />
          {nav.map(({ key, icon: Icon }) => (
            <span
              key={key}
              className={`flex items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-[12.5px] font-semibold ${key === active ? 'bg-white text-ink shadow-[0_1px_2px_rgb(20_39_70/0.08)] ring-1 ring-line' : 'text-muted'}`}
            >
              <Icon className={`size-4 ${key === active ? 'text-green-ink' : ''}`} strokeWidth={2} />
              {key}
            </span>
          ))}
          <span className="mt-3 flex items-center gap-2.5 px-2.5 py-2 text-[12.5px] font-semibold text-muted">
            <Settings className="size-4" strokeWidth={2} />
            Settings
          </span>
          <div className="mt-auto flex items-center gap-2 rounded-[var(--radius-md)] border border-line bg-white p-2">
            <span className="grid size-7 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">MC</span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[11.5px] font-semibold text-ink">Maya Chen</span>
              <span className="block truncate text-[10.5px] text-muted">Chen Design Studio</span>
            </span>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col bg-[#FBFCFC]">
          <header className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3 @3xl:px-5">
            <div className="min-w-0">
              <p className="truncate text-[14px] font-bold tracking-[-0.01em] text-ink @3xl:text-[15px]">{title}</p>
              {subtitle && <p className="hidden truncate text-[11.5px] text-muted @xl:block">{subtitle}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden h-8 w-44 items-center gap-2 rounded-[var(--radius-md)] border border-line bg-paper px-2.5 text-[11.5px] text-faint @3xl:flex">
                <Search className="size-3.5" strokeWidth={2} />
                Search invoices
                <kbd className="ml-auto rounded border border-line bg-white px-1 font-sans text-[10px]">⌘K</kbd>
              </span>
              <span className="flex h-8 items-center gap-1.5 rounded-[var(--radius-md)] bg-green px-3 text-[11.5px] font-semibold text-midnight">
                <Plus className="size-3.5" strokeWidth={2.5} />
                New invoice
              </span>
            </div>
          </header>
          <div className="flex flex-col gap-3 p-3 @xl:p-4 @3xl:gap-4 @3xl:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
