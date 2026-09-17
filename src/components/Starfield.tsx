"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; phase: number };

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stars: Star[] = [];
    let animationFrame: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(time: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        const twinkle = prefersReducedMotion ? 1 : 0.5 + 0.5 * Math.sin(time / 1000 + star.phase);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 237, 237, ${0.15 + twinkle * 0.55})`;
        ctx.fill();
      }
      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    }

    resize();
    draw(0);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
