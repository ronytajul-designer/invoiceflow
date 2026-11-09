import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal } from './ui/Reveal';

/** Where the card's soft colour glow sits. Varying it keeps a grid of cards from looking stamped. */
type Glow = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

const glows: Record<Glow, string> = {
  'top-right':
    'bg-[radial-gradient(55%_45%_at_100%_0%,rgb(168_197_236/0.45),transparent_70%),radial-gradient(45%_40%_at_0%_100%,rgb(139_214_176/0.18),transparent_70%)]',
  'top-left':
    'bg-[radial-gradient(55%_45%_at_0%_0%,rgb(139_214_176/0.42),transparent_70%),radial-gradient(45%_40%_at_100%_100%,rgb(168_197_236/0.2),transparent_70%)]',
  'bottom-right':
    'bg-[radial-gradient(55%_50%_at_100%_100%,rgb(139_214_176/0.4),transparent_70%),radial-gradient(40%_40%_at_0%_0%,rgb(168_197_236/0.22),transparent_70%)]',
  'bottom-left':
    'bg-[radial-gradient(55%_50%_at_0%_100%,rgb(168_197_236/0.42),transparent_70%),radial-gradient(40%_40%_at_100%_0%,rgb(139_214_176/0.2),transparent_70%)]',
};

type Props = {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Product UI shown on the white inset panel. Decorative; the title and body carry the meaning. */
  children: ReactNode;
  glow?: Glow;
  /** "split" puts text beside the panel on wide desktop cards; it stacks below 1024px. */
  layout?: 'stack' | 'split';
  className?: string;
  delay?: number;
};

/**
 * Feature card: a tinted shell holding the copy, with the product UI on a
 * white inset panel. In the bento grid every card fills its cell and the
 * panel takes the remaining height, so rows line up and gaps stay even.
 * The panel lifts on hover.
 */
export function FeatureCard({ icon: Icon, title, body, children, glow = 'top-right', layout = 'stack', className = '', delay = 0 }: Props) {
  const split = layout === 'split';
  return (
    <Reveal as="article" delay={delay} className={`group h-full ${className}`}>
      <div
        className={`flex h-full flex-col gap-5 rounded-[26px] bg-[#F1F5F3] p-4 ring-1 ring-ink/[0.04] ${glows[glow]} ${split ? 'lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6' : ''}`}
      >
        <div className={`flex flex-col gap-2.5 px-3 pt-3 ${split ? 'lg:self-center lg:pt-0 lg:pl-5' : ''}`}>
          <h3 className="flex items-center gap-2.5 text-[20px] font-bold tracking-[-0.02em] text-ink sm:text-[21px]">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/80 text-green-ink ring-1 ring-white">
              <Icon className="size-4" strokeWidth={2.25} aria-hidden="true" />
            </span>
            {title}
          </h3>
          <p className="max-w-[40ch] text-[15px] leading-[1.6] text-muted">{body}</p>
        </div>
        <div
          className="flex flex-1 flex-col rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgb(20_39_70/0.04),0_10px_30px_-16px_rgb(20_39_70/0.25)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:shadow-[0_1px_2px_rgb(20_39_70/0.04),0_18px_40px_-16px_rgb(20_39_70/0.3)] sm:p-5"
          aria-hidden="true"
        >
          {/* Panel content stretches; each panel pins its last row to the bottom with mt-auto. */}
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
      </div>
    </Reveal>
  );
}
