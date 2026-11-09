import Lenis from 'lenis';

/**
 * Site-wide smooth scrolling with Lenis. Skipped entirely for people who
 * prefer reduced motion; the browser's native scroll is used instead.
 */

let lenis: Lenis | null = null;

/** Space kept above an anchor target so the sticky header never covers it. */
const HEADER_OFFSET = -100;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function getLenis() {
  return lenis;
}

/** Scroll to an in-page anchor such as "#pricing" and update the URL hash. */
export function scrollToAnchor(href: string) {
  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;
  if (lenis) {
    // Pass an absolute pixel position, not the element: in lenis 1.1.18,
    // scrollTo(element) counts the current scroll offset twice when the page
    // is already scrolled, which overshoots the target.
    const y = target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    lenis.scrollTo(Math.max(0, y));
  } else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  history.replaceState(null, '', href);
}

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    autoRaf: true,
  });

  // Route same-page anchor links through Lenis. Handlers that already took
  // over the click (for example the mobile menu) call preventDefault first.
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const href = link?.getAttribute('href');
    if (!href || href.length < 2 || !document.querySelector(href)) return;
    e.preventDefault();
    scrollToAnchor(href);
  };
  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('click', onClick);
    lenis?.destroy();
    lenis = null;
  };
}
