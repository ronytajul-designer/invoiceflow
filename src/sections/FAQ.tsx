import { MessageCircle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { Accordion } from '../components/Accordion';
import { faqs } from '../data/content';
import { LINKS } from '../data/links';

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions? We've got answers." />
          <Reveal className="flex items-start gap-4 rounded-[var(--radius-xl)] border border-line bg-white p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-green-wash text-green-ink">
              <MessageCircle className="size-5" strokeWidth={2} aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-ink">Still deciding?</p>
              <p className="mt-1 text-[14.5px] leading-[1.55] text-muted">
                Ask a real person and we’ll reply within one business day.{' '}
                <a href={LINKS.contact} className="font-semibold text-green-ink underline decoration-green/40 underline-offset-4 hover:decoration-green-ink">
                  Contact support
                </a>
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <Accordion items={faqs} />
        </Reveal>
      </Container>
    </section>
  );
}
