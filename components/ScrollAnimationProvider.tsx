"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimationProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Handler to observe all reveal elements
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -40px 0px",
        }
      );

      const targets = document.querySelectorAll(
        ".reveal-item, .reveal-slide-left, .reveal-slide-right, .reveal-scale"
      );

      targets.forEach((el) => {
        // If element is already in the viewport upon mount/route change, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("revealed");
        }
        observer.observe(el);
      });

      return observer;
    };

    let activeObserver = observeElements();

    // Re-check when DOM changes (e.g. dynamic tabs or filters)
    const timer = setTimeout(() => {
      activeObserver.disconnect();
      activeObserver = observeElements();
    }, 150);

    const mutationObserver = new MutationObserver(() => {
      activeObserver.disconnect();
      activeObserver = observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      mutationObserver.disconnect();
      activeObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
