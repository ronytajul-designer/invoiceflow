import type { ReactNode } from 'react';
import { m } from 'framer-motion';

export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;

const tags = {
  div: m.div,
  article: m.article,
  li: m.li,
  figure: m.figure,
  section: m.section,
} as const;

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  /** Milliseconds, so call sites can stagger siblings with simple numbers. */
  delay?: number;
  /** Distance travelled upward while fading in, in px. */
  y?: number;
  className?: string;
};

/**
 * Fades and lifts its children in the first time they enter the viewport.
 * Uses Framer Motion so the transition runs on the compositor with one easing
 * curve everywhere. Under reduced motion, MotionConfig in App removes the
 * movement and only a quick fade remains.
 */
export function Reveal({ children, as = 'div', delay = 0, y = 24, className = '' }: RevealProps) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: EASE_OUT_SOFT, delay: delay / 1000 }}
    >
      {children}
    </Tag>
  );
}
