import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  id?: string;
};

export function SectionHeading({ eyebrow, title, lede, align = 'left', tone = 'light', id }: Props) {
  const center = align === 'center';
  return (
    <Reveal className={`flex flex-col gap-4 ${center ? 'mx-auto items-center text-center' : ''} max-w-[680px]`}>
      {eyebrow && <p className={tone === 'dark' ? 'eyebrow !text-green-soft' : 'eyebrow'}>{eyebrow}</p>}
      <h2
        id={id}
        className={`text-[32px] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[40px] lg:text-[44px] ${tone === 'dark' ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {lede && (
        <p className={`text-[17px] leading-[1.6] sm:text-[18px] ${tone === 'dark' ? 'text-white/70' : 'text-muted'}`}>{lede}</p>
      )}
    </Reveal>
  );
}
