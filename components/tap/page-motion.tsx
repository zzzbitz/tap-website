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

    const reveal = (element: HTMLElement, immediate = false) => {
      element.dataset.revealState = immediate ? 'done' : 'visible';
      observer?.unobserve(element);
    };

    const showHashTarget = () => {
      if (!window.location.hash) return;
      let target: HTMLElement | null;
      try {
        target = document.getElementById(
          decodeURIComponent(window.location.hash.slice(1)),
        );
      } catch {
        return;
      }
      if (!target) return;
      elements.forEach((element) => {
        if (element.contains(target) || target.contains(element)) {
          reveal(element, true);
        }
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

    // Never hide the initial viewport, restored scroll positions, or focused UI.
    elements.forEach((element) => {
      const initiallyVisible =
        element.getBoundingClientRect().top < window.innerHeight ||
        element.contains(document.activeElement);
      element.dataset.revealState =
        preference.matches || initiallyVisible ? 'done' : 'pending';
    });
    try {
      observe();
    } catch {
      elements.forEach((element) => reveal(element, true));
    }
    showHashTarget();

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
