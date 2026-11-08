import { ArrowRight, BellRing, Check, CheckCircle2 } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { LINKS } from '../data/links';
import { ButtonLink } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { ArcMotif } from '../components/ui/ArcMotif';
import { DashboardPreview } from '../components/dashboard/DashboardPreview';

function PaymentToast() {
  return (
    <div className="flex w-[288px] items-center gap-3 rounded-[var(--radius-lg)] border border-line bg-white p-3 shadow-[var(--shadow-float)]">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-green-wash text-green-ink">
        <CheckCircle2 className="size-[18px]" strokeWidth={2.25} />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-[12.5px] font-semibold text-ink">Payment received</span>
        <span className="block truncate text-[11.5px] text-muted">Northwind Studio · just now</span>
      </span>
      <span className="tabular text-[13px] font-bold text-green-ink">+$4,250</span>
    </div>
  );
}

function ReminderToast() {
  return (
    <div className="flex w-[236px] items-start gap-3 rounded-[var(--radius-lg)] border border-white/10 bg-midnight p-3 text-white shadow-[var(--shadow-float)]">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-green-soft">
        <BellRing className="size-[17px]" strokeWidth={2.25} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[12.5px] font-semibold">Auto-reminder sent</span>
        <span className="mt-0.5 block text-[11.5px] text-white/60">Brightline · 3 days overdue</span>
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-[linear-gradient(to_bottom,var(--color-paper)_0%,var(--color-paper)_72%,var(--color-white)_72%)] sm:bg-[linear-gradient(to_bottom,var(--color-paper)_0%,var(--color-paper)_66%,var(--color-white)_66%)]">
      <ArcMotif className="pointer-events-none absolute -top-px right-0 w-[520px] text-ink/[0.07] sm:w-[760px] lg:w-[920px]" />
      <Container className="relative pt-10 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 p-1 sm:pr-3 text-[13px] font-medium text-ink-soft">
                <span className="rounded-full bg-green-wash px-2 py-0.5 text-[11.5px] font-semibold text-green-ink">For freelancers & small teams</span>
                <span className="hidden sm:inline">Invoicing without the spreadsheet</span>
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h1 id="hero-title" className="text-[42px] leading-[1.02] font-bold tracking-[-0.04em] text-ink sm:text-[60px] lg:text-[72px]">
                Get paid faster.
                <br />
                <span className="text-ink/55">Manage invoices smarter.</span>
              </h1>
            </Reveal>
          </div>
          <Reveal delay={120} className="flex flex-col gap-6 lg:col-span-5 lg:pb-2">
            <p className="max-w-[460px] text-[17px] leading-[1.6] text-muted sm:text-[18px]">
              Create professional invoices, automate payment reminders, and track every payment in one simple workspace.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={LINKS.signup} size="lg">
                Start Free Trial
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </ButtonLink>
              <ButtonLink href="#features" size="lg" variant="secondary">
                Explore Features
              </ButtonLink>
            </div>
            <p className="flex items-center gap-2 text-[14px] text-muted">
              <Check className="size-4 text-green-ink" strokeWidth={2.5} />
              Free to get started. No credit card required.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mt-12 sm:mt-16 lg:mt-20">
          <div className="absolute -inset-x-4 -top-6 bottom-10 -z-10 rounded-[28px] bg-[radial-gradient(60%_60%_at_70%_20%,rgb(85_201_154/0.16),transparent_70%)] blur-2xl" aria-hidden="true" />
          <DashboardPreview />
          <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 md:block lg:left-[41%] lg:translate-x-0">
            <PaymentToast />
          </div>
          <div className="absolute top-[47%] -left-8 hidden xl:block">
            <ReminderToast />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
