import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';

/** Fictional demo company wordmarks, drawn with type and simple shapes. */
const marks = [
  { name: 'Northwind', glyph: <circle cx="8" cy="8" r="7" />, cls: 'font-bold tracking-[-0.02em]' },
  { name: 'Halcyon & Co.', glyph: <path d="M1 15 8 1l7 14z" />, cls: 'font-semibold tracking-[0.02em]' },
  { name: 'BRIGHTLINE', glyph: <rect x="1" y="1" width="14" height="14" rx="3" />, cls: 'font-bold tracking-[0.14em] text-[14px]' },
  { name: 'fernwood', glyph: <path d="M8 1c4 3 6 7 0 14C2 8 4 4 8 1Z" />, cls: 'font-semibold tracking-[-0.03em] lowercase' },
  { name: 'Atlas Field', glyph: <path d="M1 8h14M8 1v14" strokeWidth="3" stroke="currentColor" />, cls: 'font-medium tracking-[0.01em]' },
  { name: 'Kestrel', glyph: <path d="M1 12 8 3l7 9H1Z" />, cls: 'font-bold italic tracking-[-0.02em]' },
];

export function SocialProof() {
  return (
    <section aria-labelledby="proof-title" className="bg-white pb-6 sm:pb-8">
      <Container>
        <Reveal className="flex flex-col items-center gap-8 border-t border-line pt-12 sm:pt-14">
          <h2 id="proof-title" className="text-center text-[15px] font-semibold text-ink">
            Built for people who make business happen.
            <span className="mt-1 block text-[14px] font-normal text-muted">Designers, developers, consultants, agencies and local service businesses.</span>
          </h2>
          <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-6" aria-label="Example customer types (fictional company names)">
            {marks.map((m) => (
              <li key={m.name} className="flex items-center justify-center gap-2 text-ink/45 transition-colors duration-300 hover:text-ink/80">
                <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
                  {m.glyph}
                </svg>
                <span className={`text-[17px] whitespace-nowrap ${m.cls}`}>{m.name}</span>
              </li>
            ))}
          </ul>
          <p className="text-[12px] text-faint">Company names above are fictional and shown for illustration.</p>
        </Reveal>
      </Container>
    </section>
  );
}
