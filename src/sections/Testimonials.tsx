import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TestimonialCard } from '../components/TestimonialCard';
import { testimonials } from '../data/content';

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section aria-labelledby="testimonials-title" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading id="testimonials-title" eyebrow="Stories" title="Less admin. More time for what matters." />
          <p className="shrink-0 text-[13px] text-faint sm:pb-2">Illustrative sample testimonials, not real customers.</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-5">
          <TestimonialCard {...lead} featured />
          <div className="grid gap-4 lg:gap-5">
            {rest.map((t, i) => (
              <TestimonialCard key={t.name} {...t} delay={(i + 1) * 80} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
