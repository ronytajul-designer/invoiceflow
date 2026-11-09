import { useId, useState } from 'react';
import { m } from 'framer-motion';
import { EASE_OUT_SOFT } from './ui/Reveal';

type Item = { q: string; a: string };

/** Plus that becomes a minus: the vertical bar collapses when open. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`relative grid size-7 shrink-0 place-items-center rounded-[8px] transition-colors duration-300 ${open ? 'bg-midnight text-white' : 'bg-green text-midnight'}`}
      aria-hidden="true"
    >
      <span className="absolute h-[2px] w-3 rounded-full bg-current" />
      <m.span className="absolute h-3 w-[2px] rounded-full bg-current" initial={false} animate={{ scaleY: open ? 0 : 1 }} transition={{ duration: 0.3, ease: EASE_OUT_SOFT }} />
    </span>
  );
}

/**
 * Disclosure-pattern accordion: each question is a real <button> with
 * aria-expanded/aria-controls. The answer animates its measured height
 * (opening slower than closing) and the text settles in with a short fade.
 * MotionConfig in App turns the movement off under reduced motion.
 */
export function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="flex flex-col gap-4">
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={it.q} className={`rounded-[20px] transition-colors duration-300 ${isOpen ? 'bg-[#EAF3EE]' : 'bg-[#F1F5F3] hover:bg-[#ECF2EF]'}`}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left text-[16px] font-semibold text-ink sm:px-7 sm:py-6 sm:text-[17px]"
              >
                <ToggleIcon open={isOpen} />
                {it.q}
              </button>
            </h3>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!isOpen}
              className="overflow-hidden"
              initial={false}
              animate={isOpen ? 'open' : 'closed'}
              variants={{
                open: { height: 'auto', transition: { duration: 0.45, ease: EASE_OUT_SOFT } },
                closed: { height: 0, transition: { duration: 0.3, ease: EASE_OUT_SOFT } },
              }}
            >
              <m.p
                className="max-w-[64ch] pr-5 pb-6 pl-16 text-[15.5px] leading-[1.65] text-muted sm:pr-7 sm:pl-[72px]"
                variants={{
                  open: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.08, ease: EASE_OUT_SOFT } },
                  closed: { opacity: 0, y: -6, transition: { duration: 0.2 } },
                }}
              >
                {it.a}
              </m.p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
