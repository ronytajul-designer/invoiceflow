import type { ReactNode } from 'react';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';

type Mark = { name: string; glyph: ReactNode; cls: string };

/** Fictional demo company wordmarks, drawn with type and simple shapes. */
const marks: Mark[] = [
  { name: 'Northwind', glyph: <circle cx="8" cy="8" r="7" />, cls: 'font-bold tracking-[-0.02em]' },
  { name: 'Halcyon & Co.', glyph: <path d="M1 15 8 1l7 14z" />, cls: 'font-semibold tracking-[0.01em]' },
  { name: 'BRIGHTLINE', glyph: <rect x="1" y="1" width="14" height="14" rx="3" />, cls: 'font-bold tracking-[0.16em] text-[15px] sm:text-[16px]' },
  { name: 'fernwood', glyph: <path d="M8 1c4 3 6 7 0 14C2 8 4 4 8 1Z" />, cls: 'font-semibold tracking-[-0.03em] lowercase' },
  { name: 'Atlas Field', glyph: <path d="M1 8h14M8 1v14" strokeWidth="3.5" stroke="currentColor" />, cls: 'font-medium' },
  { name: 'Kestrel', glyph: <path d="M1 12 8 3l7 9H1Z" />, cls: 'font-bold italic tracking-[-0.02em]' },
  { name: 'Lumen', glyph: <path d="M8 1a7 7 0 1 0 0 14A5 5 0 0 1 8 1Z" />, cls: 'font-bold tracking-[-0.01em]' },
];

function Wordmark({ m }: { m: Mark }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 text-ink/40 transition-colors duration-300 hover:text-ink/75">
      <svg viewBox="0 0 16 16" className="size-[18px] shrink-0 sm:size-5" fill="currentColor" aria-hidden="true">
        {m.glyph}
      </svg>
      <span className={`text-[18px] whitespace-nowrap sm:text-[20px] ${m.cls}`}>{m.name}</span>
    </span>
  );
}

/**
 * Trust strip: a short statement beside a slow, edge-faded marquee of
 * fictional customer wordmarks. The marquee pauses on hover and stops
 * entirely for people who prefer reduced motion.
 */
export function SocialProof() {
  return (
    <section aria-labelledby="proof-title" className="bg-white py-14 sm:py-16">
      <Container>
        <Reveal className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          <div className="max-w-[300px] shrink-0 text-center lg:max-w-[240px] lg:text-left">
            <h2 id="proof-title" className="text-[17px] leading-[1.5] font-medium text-ink-soft">
              Built for people who get paid.
            </h2>
          </div>

          <span className="hidden h-16 w-px shrink-0 bg-line-strong lg:block" aria-hidden="true" />

          <div className="marquee relative w-full min-w-0 overflow-hidden">
            <ul className="sr-only" aria-label="Example customers (fictional)">
              {marks.map((m) => (
                <li key={m.name}>{m.name}</li>
              ))}
            </ul>
            {/* Two identical runs; the track slides by exactly one run, so the loop is seamless. */}
            <div className="marquee-track flex w-max items-center" aria-hidden="true">
              {[0, 1].map((run) => (
                <div key={run} className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
                  {marks.map((m) => (
                    <Wordmark key={`${run}-${m.name}`} m={m} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
