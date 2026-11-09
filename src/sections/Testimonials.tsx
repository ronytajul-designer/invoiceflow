import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { TestimonialCard } from '../components/TestimonialCard';
import { testimonials } from '../data/content';
import headshot1 from '../assets/photos/headshot-1.webp';
import headshot2 from '../assets/photos/headshot-2.webp';

/** Decorative headshot in the brand duotone (Unsplash License). Not tied to any quote or name. */
function PhotoTile({ src, className = '', delay = 0 }: { src: string; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <img src={src} alt="" loading="lazy" decoding="async" className="h-full min-h-[280px] w-full rounded-[26px] object-cover object-top" />
    </Reveal>
  );
}

export function Testimonials() {
  const [a, b, c, d] = testimonials;
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
          wide quote with stars, quote, photo / photo, quote, wide quote with stars.
        */}
        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2 lg:auto-rows-[minmax(340px,auto)] lg:grid-cols-12">
          <TestimonialCard {...a} stars className="md:col-span-2 lg:col-span-6" />
          <TestimonialCard {...b} delay={80} className="lg:col-span-3" />
          <PhotoTile src={headshot1} delay={160} className="lg:col-span-3" />
          <PhotoTile src={headshot2} className="hidden lg:col-span-3 lg:block" />
          <TestimonialCard {...d} delay={80} className="lg:col-span-3" />
          <TestimonialCard {...c} stars delay={160} className="md:col-span-2 lg:col-span-6" />
        </div>
      </Container>
    </section>
  );
}
