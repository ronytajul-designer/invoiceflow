import type { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { ArcMotif } from '../components/ui/ArcMotif';
import { TestimonialCard } from '../components/TestimonialCard';
import { ClientAvatar } from '../components/dashboard/InvoiceTable';
import { invoices } from '../data/dashboard';
import { testimonials } from '../data/content';
import teamLaptops from '../assets/photos/team-laptops.webp';
import clientMeeting from '../assets/photos/client-meeting.webp';

/**
 * Product tiles fill the bento slots the reference gives to photos. They show
 * a moment from the product instead of a face, so no person is implied.
 */
function ProductTile({ tone, children, className = '', delay = 0 }: { tone: 'mint' | 'sky'; children: ReactNode; className?: string; delay?: number }) {
  const bg =
    tone === 'mint'
      ? 'bg-[linear-gradient(180deg,#2FA678_0%,#55C99A_55%,#BFE8D3_100%)]'
      : 'bg-[linear-gradient(180deg,#EEF4FB_0%,#D7E6F7_55%,#E3F3EA_100%)]';
  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <div className={`relative isolate flex h-full min-h-[240px] items-center justify-center overflow-hidden rounded-[26px] p-6 ${bg}`} aria-hidden="true">
        <ArcMotif className="absolute -top-px right-0 -z-10 w-[360px]" stroke={tone === 'mint' ? 'rgb(255 255 255 / 0.35)' : 'rgb(255 255 255 / 0.9)'} rings={5} />
        {children}
      </div>
    </Reveal>
  );
}

function PaymentToast() {
  return (
    <div className="flex w-full max-w-[280px] items-center gap-3 rounded-[18px] bg-white p-3.5 shadow-[0_18px_40px_-18px_rgb(11_25_48/0.45)]">
      <ClientAvatar invoice={invoices[0]} size="md" />
      <span className="min-w-0 flex-1 leading-tight">
        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
          <CheckCircle2 className="size-3.5 text-green-ink" strokeWidth={2.5} />
          Payment received
        </span>
        <span className="mt-1 block truncate text-[12px] text-muted">Northwind Studio</span>
      </span>
      <span className="tabular text-[14px] font-bold text-green-ink">+$4,250</span>
    </div>
  );
}

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
          wide quote, quote, photo / photo, quote, wide product tile.
        */}
        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-12">
          <TestimonialCard {...a} className="md:col-span-2 lg:col-span-5" />
          <TestimonialCard {...b} delay={80} className="lg:col-span-4" />
          <PhotoTile src={teamLaptops} delay={160} className="lg:col-span-3" />
          <PhotoTile src={clientMeeting} className="hidden lg:col-span-3 lg:block" />
          <TestimonialCard {...c} delay={80} className="lg:col-span-4" />
          <ProductTile tone="mint" delay={160} className="md:col-span-2 lg:col-span-5">
            <PaymentToast />
          </ProductTile>
        </div>
      </Container>
    </section>
  );
}
