import type { ReactNode } from 'react';
import { m, type Variants } from 'framer-motion';

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

/* Motion: a soft spring for the entrance, a firmer one for hover so it feels responsive. */
const enter = { type: 'spring', stiffness: 70, damping: 18, mass: 0.9 } as const;
const lift = { type: 'spring', stiffness: 320, damping: 26 } as const;

const card: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  shown: (delay: number) => ({ opacity: 1, y: 0, scale: 1, transition: { ...enter, delay } }),
};
const shell: Variants = { rest: { y: 0 }, hover: { y: -4, transition: lift } };
const panel: Variants = {
  rest: { y: 0, boxShadow: '0 1px 2px rgb(20 39 70 / 0.04), 0 10px 30px -16px rgb(20 39 70 / 0.25)' },
  hover: { y: -4, boxShadow: '0 1px 2px rgb(20 39 70 / 0.04), 0 22px 44px -18px rgb(20 39 70 / 0.32)', transition: lift },
};

type Props = {
  title: string;
  body: string;
  /** Product UI shown on the white inset panel. Decorative; the title and body carry the meaning. */
  children: ReactNode;
  glow?: Glow;
  /** "split" puts text beside the panel on wide desktop cards; it stacks below 1024px. */
  layout?: 'stack' | 'split';
  className?: string;
  /** Entrance delay in ms, used to stagger cards in reading order. */
  delay?: number;
};

/**
 * Feature card: a tinted shell holding the copy, with the product UI on a
 * white inset panel. In the bento grid every card fills its cell and the
 * panel takes the remaining height. Panel content within a row is kept to
 * similar heights so no panel is left with a large empty area. On wide
 * "split" cards the panel hugs its content and centres beside the copy.
 * Enters on a spring when scrolled into view; on hover the shell and the
 * panel lift by slightly different amounts for a sense of depth.
 */
export function FeatureCard({ title, body, children, glow = 'top-right', layout = 'stack', className = '', delay = 0 }: Props) {
  const split = layout === 'split';
  return (
    <m.article
      className={`h-full ${className}`}
      variants={card}
      custom={delay / 1000}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
    >
      <m.div
        className={`flex h-full flex-col gap-5 rounded-[26px] bg-[#F1F5F3] p-4 ring-1 ring-ink/[0.04] ${glows[glow]} ${split ? 'lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6' : ''}`}
        variants={shell}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <div className={`flex flex-col gap-2.5 px-3 pt-3 ${split ? 'lg:self-center lg:pt-0 lg:pl-5' : ''}`}>
          <h3 className="text-[20px] leading-[1.25] font-bold tracking-[-0.02em] text-ink sm:text-[21px]">{title}</h3>
          <p className="max-w-[40ch] text-[15px] leading-[1.6] text-muted">{body}</p>
        </div>
        <m.div
          className={`flex flex-1 flex-col rounded-[20px] bg-white p-4 sm:p-5 `}
          variants={panel}
          aria-hidden="true"
        >
          {/* Panel content stretches; each panel pins its last row to the bottom with mt-auto. */}
          <div className="flex flex-1 flex-col">{children}</div>
        </m.div>
      </m.div>
    </m.article>
  );
}
