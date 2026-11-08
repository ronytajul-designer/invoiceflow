import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal } from './ui/Reveal';

type Props = {
  icon: LucideIcon;
  title: string;
  body: string;
  visual?: ReactNode;
  className?: string;
  delay?: number;
  /** Puts the visual beside the text on wide tiles. */
  layout?: 'stack' | 'split';
};

export function FeatureTile({ icon: Icon, title, body, visual, className = '', delay = 0, layout = 'stack' }: Props) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-white transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[var(--shadow-card)] ${layout === 'split' ? 'md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]' : ''} ${className}`}
    >
      <div className="flex flex-col gap-3 p-6 sm:p-7">
        <span className="grid size-10 place-items-center rounded-[var(--radius-md)] bg-green-wash text-green-ink transition-transform duration-300 group-hover:-translate-y-0.5">
          <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="mt-2 text-[19px] font-bold tracking-[-0.015em] text-ink">{title}</h3>
        <p className="max-w-[44ch] text-[15px] leading-[1.6] text-muted">{body}</p>
      </div>
      {visual && (
        <div className={`relative mt-auto ${layout === 'split' ? 'md:mt-0 md:h-full' : ''}`} aria-hidden="true">
          {visual}
        </div>
      )}
    </Reveal>
  );
}
