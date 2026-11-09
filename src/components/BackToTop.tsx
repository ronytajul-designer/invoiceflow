import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { getLenis } from '../lib/smoothScroll';

/**
 * Floating back-to-top button. Appears after one screen of scrolling, and its
 * ring shows how far down the page the reader is. Scrolls through Lenis when
 * active, otherwise natively.
 */
export function BackToTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const visible = progress > 0 && window.scrollY > window.innerHeight;

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.34, 1.45, 0.64, 1] }}
          className="group fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-40 grid size-12 place-items-center rounded-full bg-white shadow-[0_10px_30px_-12px_rgb(11_25_48/0.45)] ring-1 ring-ink/10 transition-transform duration-200 hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" strokeWidth="2.5" className="stroke-green/20" />
            <circle cx="24" cy="24" r="22" fill="none" strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress} className="stroke-green-ink" />
          </svg>
          <ArrowUp className="size-[18px] text-ink transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={2.25} aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
