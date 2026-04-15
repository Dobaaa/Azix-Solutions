"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ViewportAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let rafId = 0;

    const setupObserver = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-animate='reveal']"),
      );

      if (!elements.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach((element) => element.classList.add("in-view"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in-view");
            observer?.unobserve(entry.target);
          });
        },
        {
          threshold: 0.14,
          rootMargin: "0px 0px -10% 0px",
        },
      );

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isInitiallyVisible =
          rect.top < window.innerHeight * 0.95 && rect.bottom > 0;

        if (isInitiallyVisible) {
          element.classList.add("in-view");
          return;
        }

        observer?.observe(element);
      });
    };

    rafId = window.requestAnimationFrame(() => {
      setupObserver();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
