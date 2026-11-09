import type { CSSProperties } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { LINKS } from '../data/links';
import { ButtonLink } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { ArcMotif } from '../components/ui/ArcMotif';
import { DashboardPreview } from '../components/dashboard/DashboardPreview';

/**
 * Audience chips that float around the product shot. They name who InvoiceFlow
 * is for, so the decoration still carries information.
 */
function AudienceChip({ label, dot, delay = 0, className = '' }: { label: string; dot: string; delay?: number; className?: string }) {
  return (
    <span
      className={`animate-drift pointer-events-none absolute z-20 hidden items-center gap-2 rounded-full border border-white/80 bg-white/75 py-2 pr-4 pl-2.5 text-[15px] font-medium text-ink shadow-[0_8px_24px_-12px_rgb(11_25_48/0.35)] backdrop-blur-md lg:inline-flex ${className}`}
      style={{ '--drift-delay': `${delay}s` } as CSSProperties}
      aria-hidden="true"
    >
      <span className="size-4 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}

/**
 * Atmosphere for the hero panel: layered brand-tinted glows and soft white
 * "haze" shapes, drawn in CSS so no image is needed.
 */
function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1F7F4_0%,#DDEFE6_50%,#C6E7D7_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_6%_58%,rgb(85_201_154/0.55),transparent_70%),radial-gradient(42%_42%_at_96%_52%,rgb(138_176_232/0.7),transparent_70%),radial-gradient(30%_30%_at_80%_8%,rgb(139_214_176/0.45),transparent_70%),radial-gradient(70%_40%_at_50%_105%,rgb(85_201_154/0.5),transparent_70%)]" />
      {/* Haze: blurred white shapes that soften the glows, like light cloud cover. */}
      <div className="absolute top-[44%] -left-[10%] h-[26%] w-[30%] rounded-full bg-white/70 blur-3xl" />
      <div className="absolute top-[36%] -right-[8%] h-[22%] w-[26%] rounded-full bg-white/60 blur-3xl" />
      <div className="absolute top-[4%] left-1/2 h-[36%] w-[56%] -translate-x-1/2 rounded-full bg-white/75 blur-3xl" />
      <ArcMotif className="absolute -top-px right-0 w-[520px] text-white sm:w-[760px] lg:w-[980px]" stroke="rgb(255 255 255 / 0.85)" />
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="-mt-[72px] bg-white px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[40px]">
        <HeroAtmosphere />
        <Container className="relative flex flex-col items-center pt-[120px] text-center sm:pt-[148px] lg:pt-[164px]">
          <Reveal>
            <h1 id="hero-title" className="text-[42px] leading-[1.06] font-bold tracking-[-0.04em] text-ink sm:text-[60px] lg:text-[76px]">
              Get paid faster.
              <br />
              Manage invoices smarter.
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-ink-soft sm:mt-6 sm:text-[19px]">
              Create professional invoices, automate payment reminders, and track every payment in one simple workspace.
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-8 flex w-full flex-col items-center gap-4 sm:mt-10">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href={LINKS.signup} size="lg" shape="pill">
                Start Free Trial
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </ButtonLink>
              <ButtonLink href="#features" size="lg" shape="pill" variant="secondary" className="!border-ink/25 !bg-white/40 backdrop-blur-sm hover:!bg-white/80">
                Explore Features
              </ButtonLink>
            </div>
            <p className="flex items-center gap-2 text-[14px] text-ink-soft">
              <Check className="size-4 text-green-ink" strokeWidth={2.5} aria-hidden="true" />
              Free to get started. No credit card required.
            </p>
          </Reveal>

          <div className="relative mt-14 w-full max-w-[1080px] sm:mt-16 lg:mt-20">
            <AudienceChip label="Freelancers" dot="linear-gradient(135deg,#8BD6B0,#237A57)" className="-top-[150px] left-[4%]" />
            <AudienceChip label="Agencies" dot="linear-gradient(135deg,#A8C5EC,#2F5BD3)" delay={1.2} className="-top-[150px] right-[4%]" />
            <AudienceChip label="Consultants" dot="linear-gradient(135deg,#FCD9B8,#B4540A)" delay={2.1} className="top-[170px] -left-[132px] !hidden xl:!inline-flex" />
            <AudienceChip label="Small businesses" dot="linear-gradient(135deg,#55C99A,#142746)" delay={0.6} className="top-[270px] -right-[150px] !hidden xl:!inline-flex" />

            <Reveal delay={220}>
              {/* Glass frame; the panel's bottom edge crops the product shot. */}
              <div className="h-[440px] overflow-hidden rounded-t-[22px] border border-b-0 border-white/80 bg-white/40 p-2 text-left shadow-[0_-8px_40px_-12px_rgb(11_25_48/0.18)] backdrop-blur-md sm:h-[480px] sm:rounded-t-[28px] sm:p-3 lg:h-[560px]">
                <DashboardPreview />
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
