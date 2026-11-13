"use client";

import { useEffect } from "react";

const MAX_TILT_DEG = 4;

/**
 * One document-level pointer listener drives two effects:
 *  - [data-spotlight]: a glow that follows the cursor (CSS vars --spot-x/--spot-y)
 *  - [data-tilt]: a slight 3D tilt toward the cursor (--tilt-x/--tilt-y)
 * Only mouse/pen pointers count; touch screens get neither. The tilt itself is
 * switched off in CSS for reduced-motion visitors.
 */
export function Spotlight() {
  useEffect(() => {
    let tilted: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    function resetTilt() {
      if (!tilted) return;
      tilted.style.setProperty("--tilt-x", "0deg");
      tilted.style.setProperty("--tilt-y", "0deg");
      tilted = null;
    }

    function apply() {
      frame = 0;
      const event = last;
      if (!event || !(event.target instanceof Element)) return;

      const spot = event.target.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        spot.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      }

      const tilt = event.target.closest<HTMLElement>("[data-tilt]");
      if (tilt !== tilted) resetTilt();
      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        tilt.style.setProperty("--tilt-x", `${(-py * MAX_TILT_DEG).toFixed(2)}deg`);
        tilt.style.setProperty("--tilt-y", `${(px * MAX_TILT_DEG).toFixed(2)}deg`);
        tilted = tilt;
      }
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetTilt);
    window.addEventListener("scroll", resetTilt, { passive: true });
    window.addEventListener("blur", resetTilt);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", resetTilt);
      window.removeEventListener("scroll", resetTilt);
      window.removeEventListener("blur", resetTilt);
      cancelAnimationFrame(frame);
      resetTilt();
    };
  }, []);

  return null;
}
