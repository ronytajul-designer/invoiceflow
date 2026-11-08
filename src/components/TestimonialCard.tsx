import { Quote } from 'lucide-react';
import { Reveal } from './ui/Reveal';

type Props = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  hue: string;
  theme: string;
  featured?: boolean;
  delay?: number;
};

export function TestimonialCard({ quote, name, role, initials, hue, theme, featured = false, delay = 0 }: Props) {
  return (
    <Reveal
      as="figure"
      delay={delay}
      className={`flex h-full flex-col justify-between gap-8 rounded-[var(--radius-xl)] p-6 sm:p-8 ${featured ? 'bg-ink text-white' : 'border border-line bg-white'}`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Quote className={`size-6 ${featured ? 'text-green' : 'text-green-ink'}`} strokeWidth={2} aria-hidden="true" />
          <span className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${featured ? 'bg-white/10 text-green-soft' : 'bg-green-wash text-green-ink'}`}>
            {theme}
          </span>
        </div>
        <blockquote className={featured ? 'text-[22px] leading-[1.45] font-semibold tracking-[-0.015em] sm:text-[26px]' : 'text-[17px] leading-[1.6] text-ink'}>
          <p>“{quote}”</p>
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full text-[13px] font-bold text-ink-soft" style={{ background: hue }} aria-hidden="true">
          {initials}
        </span>
        <span className="leading-tight">
          <span className={`block text-[15px] font-semibold ${featured ? 'text-white' : 'text-ink'}`}>{name}</span>
          <span className={`block text-[13.5px] ${featured ? 'text-white/60' : 'text-muted'}`}>{role}</span>
        </span>
      </figcaption>
    </Reveal>
  );
}
