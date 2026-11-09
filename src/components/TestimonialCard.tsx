import { Star } from 'lucide-react';
import { Reveal } from './ui/Reveal';

type Props = {
  quote: string;
  name: string;
  role: string;
  /** Short outcome tag, e.g. "Saves admin time". */
  theme: string;
  className?: string;
  delay?: number;
};

/** Quote card: tinted shell with a soft corner glow, quote on top; name, role, star rating and outcome at the foot. */
export function TestimonialCard({ quote, name, role, theme, className = '', delay = 0 }: Props) {
  return (
    <Reveal as="figure" delay={delay} className={`h-full ${className}`}>
      <div className="flex h-full flex-col justify-between gap-10 rounded-[26px] bg-[#F1F5F3] bg-[radial-gradient(45%_60%_at_100%_0%,rgb(168_197_236/0.35),transparent_70%)] p-7 ring-1 ring-ink/[0.04] sm:p-8">
        <blockquote className="text-[17px] leading-[1.6] text-ink sm:text-[18px]">
          <p>“{quote}”</p>
        </blockquote>
        <figcaption className="flex items-end justify-between gap-4">
          <span>
            <span className="block text-[16px] font-bold tracking-[-0.01em] text-ink">{name}</span>
            <span className="mt-1 block text-[14px] text-muted">{role}</span>
          </span>
          <span className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-4 fill-green text-green" strokeWidth={1.5} aria-hidden="true" />
              ))}
            </span>
            <span className="text-[12.5px] text-muted">{theme}</span>
          </span>
        </figcaption>
      </div>
    </Reveal>
  );
}
