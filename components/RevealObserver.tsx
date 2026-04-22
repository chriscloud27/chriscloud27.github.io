"use client";

import { useEffect } from "react";

/**
 * Client component that sets up an IntersectionObserver to add the
 * "on" class to any `.reveal` elements when they scroll into view.
 * Rendered once at the locale layout level.
 */
export default function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    const revealNow = (el: Element) => {
      el.classList.add("on");
    };

    const isInViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      return rect.top <= viewportHeight && rect.bottom >= 0;
    };

    if (!("IntersectionObserver" in window)) {
      elements.forEach(revealNow);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => {
      // Reveal elements that are already on screen during hydration.
      if (isInViewport(el)) {
        revealNow(el);
        return;
      }

      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
