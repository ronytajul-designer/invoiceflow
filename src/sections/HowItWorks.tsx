import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Reveal, EASE_OUT_SOFT } from '../components/ui/Reveal';
import { InvoiceDetailView, InvoicesView, PaymentsView } from '../components/dashboard/ShowcaseViews';
import { steps } from '../data/content';

/* Full product view shown in the large panel for each step. */
const views = [InvoiceDetailView, InvoicesView, PaymentsView];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const View = views[active];
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-[680px] flex-col items-center gap-5 text-center">
          <h2 id="how-title" className="text-[34px] leading-[1.08] font-bold tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[54px]">
            From invoice to payment in three simple steps.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-24">
          {/* Product panel: brand gradient with the app view cropped by the panel edge. */}
          <Reveal className="relative order-1 h-[360px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#2FA678_0%,#55C99A_45%,#D3EFE2_100%)] sm:h-[460px] lg:h-auto lg:min-h-[560px]">
            <div className="absolute top-10 left-6 w-[620px] sm:top-16 sm:left-10 sm:w-[980px]" aria-hidden="true">
              <AnimatePresence mode="wait">
                <m.div
                  key={active}
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

          {/* Steps are text only; the panel is the single visual and follows the selected step. */}
          <ol className="order-2 flex flex-col gap-4">
            {steps.map((st, i) => {
              const on = i === active;
              return (
                <li key={st.n} className="lg:flex lg:flex-1">
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setActive(i)}
                    className={`flex w-full items-start rounded-[24px] p-5 text-left ring-1 transition-[background-color,box-shadow] duration-300 sm:p-6 ${on ? 'bg-[radial-gradient(60%_80%_at_100%_0%,rgb(168_197_236/0.35),transparent_70%)] bg-[#F1F5F3] ring-ink/[0.06]' : 'bg-white ring-line hover:ring-line-strong'}`}
                  >
                    <span className="flex items-start gap-4">
                      <span className={`tabular grid size-12 shrink-0 place-items-center rounded-full text-[16px] font-bold transition-colors ${on ? 'bg-green text-midnight' : 'bg-green-wash text-green-ink'}`}>
                        {st.n}
                      </span>
                      <span>
                        <span className="block text-[20px] font-bold tracking-[-0.02em] text-ink sm:text-[22px]">{st.title}</span>
                        <span className="mt-1 block text-[15px] leading-[1.55] text-muted">{st.body}</span>
                      </span>
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
