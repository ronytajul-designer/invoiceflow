import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

type Item = { q: string; a: string };

/**
 * Disclosure-pattern accordion: each question is a real <button> with
 * aria-expanded/aria-controls. Height animates with the grid-rows technique.
 */
export function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={it.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-semibold text-ink transition-colors hover:text-green-ink sm:text-[17px]"
              >
                {it.q}
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300 ${isOpen ? 'rotate-45 border-ink bg-ink text-white' : 'border-line-strong text-ink group-hover:border-ink/40'}`}
                  aria-hidden="true"
                >
                  <Plus className="size-4" strokeWidth={2.25} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-soft)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pr-12 pb-6 text-[15.5px] leading-[1.65] text-muted">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
