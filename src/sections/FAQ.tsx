import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { Accordion } from '../components/Accordion';
import { faqs } from '../data/content';
import { LINKS } from '../data/links';

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          <h2 id="faq-title" className="text-[34px] leading-[1.08] font-bold tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[54px]">
            Questions? We&apos;ve got answers.
          </h2>
        </Reveal>
        <Reveal delay={80} className="mx-auto mt-12 max-w-[860px] sm:mt-14">
          <Accordion items={faqs} defaultOpen={null} />
          <p className="mt-8 text-center text-[15px] text-muted">
            Still have questions?{' '}
            <a href={LINKS.contact} className="font-semibold text-green-ink underline decoration-green/40 underline-offset-4 hover:decoration-green-ink">
              Contact support
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
