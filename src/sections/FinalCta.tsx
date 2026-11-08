import { ArrowRight, Check } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { LINKS } from '../data/links';
import { ButtonLink } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { ArcMotif } from '../components/ui/ArcMotif';

export function FinalCta() {
  return (
    <section id="get-started" aria-labelledby="cta-title" className="bg-paper pb-20 sm:pb-28">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[28px] bg-ink px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          {/* The logo's paid corner, scaled up: a solid green quarter disc inside the arcs. */}
          <svg className="absolute -top-px -right-px -z-10 w-[180px] text-green sm:w-[260px] lg:w-[340px]" viewBox="0 0 104 104" aria-hidden="true">
            <path d="M0 0H104V104A104 104 0 0 1 0 0Z" fill="currentColor" />
          </svg>
          <ArcMotif className="absolute top-0 right-0 -z-20 w-[560px] text-white/10 sm:w-[820px] lg:w-[1040px]" rings={8} />
          <div className="max-w-[640px]">
            <h2 id="cta-title" className="text-[34px] leading-[1.08] font-bold tracking-[-0.035em] text-white sm:text-[48px] lg:text-[56px]">
              Ready to make getting paid easier?
            </h2>
            <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-white/70 sm:text-[18px]">
              Join InvoiceFlow and spend less time managing invoices and more time growing your business.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href={LINKS.signup} size="lg">
                Start Your Free Trial
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </ButtonLink>
              <p className="flex items-center gap-2 text-[14px] text-white/70">
                <Check className="size-4 text-green" strokeWidth={2.5} aria-hidden="true" />
                No credit card required. Get started in minutes.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
