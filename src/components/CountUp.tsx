"use client";

import { useEffect, useRef } from "react";

function format(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const DURATION_MS = 1400;

/**
 * Renders the exact number on the server. In the browser, if the number is
 * still below the fold, it resets to zero and counts up once it scrolls into
 * view, always finishing on the exact figure. With reduced motion, or if it's
 * already on screen, it never animates. Text is written straight to the DOM,
 * so animation frames don't re-render React.
 */
export function CountUp({ value, decimals }: { value: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const final = format(value, decimals);
    el.textContent = format(0, decimals);
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = t < 1 ? format(value * eased, decimals) : final;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = final;
    };
  }, [value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(value, decimals)}
    </span>
  );
}
