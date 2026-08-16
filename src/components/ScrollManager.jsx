import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores scroll position on navigation: jump to the hash target when there
 * is one, otherwise back to the top. Waits a frame so lazily mounted sections
 * exist before we measure them.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';

    if (!hash) {
      window.scrollTo({ top: 0, behavior });
      return;
    }

    let frame = 0;
    let attempts = 0;

    const scrollToHash = () => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior, block: 'start' });
        return;
      }
      if (attempts++ < 30) {
        frame = requestAnimationFrame(scrollToHash);
      }
    };

    frame = requestAnimationFrame(scrollToHash);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
