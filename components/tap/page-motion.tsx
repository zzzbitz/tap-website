'use client';

import { useEffect } from 'react';

/** Apple-style, once-only entrances. Static HTML is always readable. */
export function PageMotion() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;

    let observer: IntersectionObserver | undefined;
    let resizeFrame = 0;
    let prepareFrame = 0;
    let startFrame = 0;

    const reveal = (element: HTMLElement, immediate = false) => {
      if (!immediate && element.dataset.revealState !== 'pending') return;
      element.dataset.revealState = immediate ? 'done' : 'visible';
      observer?.unobserve(element);
    };

    const getHashTarget = () => {
      if (!window.location.hash) return null;
      try {
        return document.getElementById(
          decodeURIComponent(window.location.hash.slice(1)),
        );
      } catch {
        return null;
      }
    };

    const showHashTarget = () => {
      const target = getHashTarget();
      if (!target) return;
      elements.forEach((element) => {
        // Reveal a heading's own block, never every child of a section anchor.
        if (element.contains(target)) reveal(element, preference.matches);
      });
    };

    const observe = () => {
      observer?.disconnect();
      if (preference.matches) {
        elements.forEach((element) => reveal(element, true));
        return;
      }
      // Pixel margins matter: IntersectionObserver percentage margins use width.
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
          });
        },
        {
          rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.15)}px 0px`,
        },
      );
      elements.forEach((element) => {
        if (element.dataset.revealState === 'pending')
          observer?.observe(element);
      });
    };

    // Ordinary first-fold content stays visible. Deep links still get entrances.
    const startsAtAnchor = !!getHashTarget();
    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      const initiallyVisible =
        (!startsAtAnchor && bounds.top < window.innerHeight) ||
        bounds.bottom <= 0 ||
        element.contains(document.activeElement);
      element.dataset.revealState =
        preference.matches || initiallyVisible ? 'done' : 'pending';
    });
    // Paint the initial opacity before revealing an already-visible deep link.
    prepareFrame = requestAnimationFrame(() => {
      startFrame = requestAnimationFrame(() => {
        try {
          observe();
          showHashTarget();
        } catch {
          elements.forEach((element) => reveal(element, true));
        }
      });
    });

    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      const target = event.target;
      elements.forEach((element) => {
        if (element.contains(target)) reveal(element, true);
      });
    };
    const onTransitionEnd = (event: TransitionEvent) => {
      if (
        event.propertyName === 'opacity' &&
        event.target instanceof HTMLElement &&
        event.target.dataset.revealState === 'visible'
      ) {
        event.target.dataset.revealState = 'done';
      }
    };
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(observe);
    };

    document.addEventListener('focusin', onFocus);
    document.addEventListener('transitionend', onTransitionEnd);
    window.addEventListener('hashchange', showHashTarget);
    window.addEventListener('resize', onResize);
    preference.addEventListener('change', observe);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(prepareFrame);
      cancelAnimationFrame(startFrame);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('transitionend', onTransitionEnd);
      window.removeEventListener('hashchange', showHashTarget);
      window.removeEventListener('resize', onResize);
      preference.removeEventListener('change', observe);
      elements.forEach((element) => delete element.dataset.revealState);
    };
  }, []);

  return null;
}
