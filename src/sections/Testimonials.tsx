import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { TestimonialCard } from '../components/TestimonialCard';
import { testimonials } from '../data/content';
import teamLaptops from '../assets/photos/team-laptops.webp';
import clientMeeting from '../assets/photos/client-meeting.webp';

/** Decorative work photo in the brand duotone. Not tied to any quote or name. */
function PhotoTile({ src, className = '', delay = 0 }: { src: string; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <img src={src} alt="" loading="lazy" decoding="async" className="h-full min-h-[240px] w-full rounded-[26px] object-cover" />
    </Reveal>
  );
}

export function Testimonials() {
  const [a, b, c] = testimonials;
  return (
    <section aria-labelledby="testimonials-title" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          <h2 id="testimonials-title" className="text-[34px] leading-[1.08] font-bold tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[54px]">
            Less admin. More time for what matters.
          </h2>
        </Reveal>

        {/*
          Bento on a 12-column grid, one 24px gap, matching the reference rhythm:
          wide quote, quote, photo / photo, wide quote.
        */}
        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-12">
          <TestimonialCard {...a} className="md:col-span-2 lg:col-span-5" />
          <TestimonialCard {...b} delay={80} className="lg:col-span-4" />
          <PhotoTile src={teamLaptops} delay={160} className="lg:col-span-3" />
          <PhotoTile src={clientMeeting} className="hidden lg:col-span-3 lg:block" />
          <TestimonialCard {...c} delay={80} className="md:col-span-2 lg:col-span-9" />
        </div>
      </Container>
    </section>
  );
}
