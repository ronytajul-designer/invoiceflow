import { useRef, useState } from 'react';
import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion';
import { Clock3, CreditCard, Eye } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Reveal, EASE_OUT_SOFT } from '../components/ui/Reveal';
import { InvoiceDetailView, InvoicesView, PaidListView } from '../components/dashboard/ShowcaseViews';
import { steps } from '../data/content';

/* Full product view shown in the large panel for each step. All three are left-aligned lists or documents, so they crop alike. */
const views = [InvoiceDetailView, InvoicesView, PaidListView];
/* One concrete detail per step, pinned to the card foot so the space carries information. */
const meta = [
  { icon: Clock3, text: 'Ready in about a minute' },
  { icon: Eye, text: 'See when it’s opened' },
  { icon: CreditCard, text: 'Card or bank transfer' },
];
/** Seconds each step stays active before the next one plays. */
const STEP_SECONDS = 6;

/** Step number inside a ring; on the active step the ring fills over the step's time. */
function StepNumber({ n, on, playing, reduced, onDone }: { n: string; on: boolean; playing: boolean; reduced: boolean; onDone: () => void }) {
  return (
    <span className="relative grid size-12 shrink-0 place-items-center">
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="24" cy="24" r="22.5" fill="none" strokeWidth="2.5" className={`transition-colors duration-300 ${on ? 'stroke-green/25' : 'stroke-transparent'}`} />
        {on && (
          <circle
            cx="24"
            cy="24"
            r="22.5"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1}
            className="step-ring stroke-green-ink"
            style={{ animationDuration: `${STEP_SECONDS}s`, animationPlayState: playing ? 'running' : 'paused', strokeDashoffset: reduced ? 0 : undefined }}
            onAnimationEnd={onDone}
          />
        )}
      </svg>
      <span className={`tabular grid size-10 place-items-center rounded-full text-[15px] font-bold transition-colors duration-300 ${on ? 'bg-green text-midnight' : 'bg-green-wash text-green-ink group-hover:bg-green/30'}`}>
        {n}
      </span>
    </span>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = !!useReducedMotion();
  // Auto-advance only while visible, not hovered, and when motion is allowed.
  const playing = inView && !hovering && !reduced;
  const View = views[active];
  const next = () => setActive((i) => (i + 1) % steps.length);

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-[680px] flex-col items-center gap-5 text-center">
          <h2 id="how-title" className="text-[34px] leading-[1.08] font-bold tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[54px]">
            From invoice to payment in three simple steps.
          </h2>
        </Reveal>

        <div ref={ref} className="mt-14 grid gap-8 sm:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-24">
          {/* Product panel: brand gradient with the app view cropped by the panel edge. */}
          <Reveal className="relative order-1 h-[360px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#2FA678_0%,#55C99A_45%,#D3EFE2_100%)] sm:h-[460px] lg:h-auto lg:min-h-[560px]">
            <div className="absolute top-10 -bottom-24 left-6 w-[620px] sm:top-16 sm:left-10 sm:w-[980px]" aria-hidden="true">
              <AnimatePresence mode="wait">
                <m.div
                  key={active}
                  className="h-full [&>div]:h-full [&>div>div]:h-full"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
                >
                  <View />
                </m.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Steps: each is a button; the active step's ring fills, then the next step plays. Hover pauses. */}
          <ol className="order-2 flex flex-col gap-4" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            {steps.map((st, i) => {
              const on = i === active;
              const Meta = meta[i].icon;
              return (
                <li key={st.n} className="lg:flex lg:flex-1">
                  <button
                    type="button"
                    aria-current={on ? 'step' : undefined}
                    onClick={() => setActive(i)}
                    className={`group flex w-full flex-col rounded-[24px] p-5 text-left ring-1 transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] sm:p-6 ${on ? 'bg-[radial-gradient(60%_80%_at_100%_0%,rgb(168_197_236/0.35),transparent_70%)] bg-[#F1F5F3] ring-ink/[0.06]' : 'bg-white ring-line hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-18px_rgb(20_39_70/0.35)] hover:ring-green/40'}`}
                  >
                    <span className="flex items-start gap-4">
                      <StepNumber n={st.n} on={on} playing={playing} reduced={reduced} onDone={next} />
                      <span>
                        <span className="block text-[20px] font-bold tracking-[-0.02em] text-ink sm:text-[22px]">{st.title}</span>
                        <span className="mt-1 block text-[15px] leading-[1.55] text-muted">{st.body}</span>
                      </span>
                    </span>
                    <span className={`mt-5 flex items-center gap-2 pl-16 text-[13px] font-medium transition-colors duration-300 lg:mt-auto lg:pt-5 ${on ? 'text-green-ink' : 'text-faint'}`}>
                      <Meta className="size-4" strokeWidth={2} aria-hidden="true" />
                      {meta[i].text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
