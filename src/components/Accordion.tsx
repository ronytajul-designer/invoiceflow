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
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-[8px] transition-[transform,background-color] duration-300 ${isOpen ? 'rotate-45 bg-midnight text-white' : 'bg-green text-midnight'}`}
                  aria-hidden="true"
                >
                  <Plus className="size-4" strokeWidth={2.5} />
                </span>
                {it.q}
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
                <p className="max-w-[64ch] pr-5 pb-6 pl-16 text-[15.5px] leading-[1.65] text-muted sm:pr-7 sm:pl-[72px]">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
