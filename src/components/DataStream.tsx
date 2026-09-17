"use client";

import { useEffect, useRef } from "react";

type Stream = { x: number; y: number; length: number; speed: number; hue: number };

export function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let streams: Stream[] = [];
    let animationFrame: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const count = Math.max(14, Math.floor(canvas.width / 55));
      streams = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 50 + Math.random() * 90,
        speed: 0.25 + Math.random() * 0.5,
        hue: Math.random() > 0.5 ? 190 : 265,
      }));
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of streams) {
        const gradient = ctx.createLinearGradient(s.x, s.y, s.x, s.y - s.length);
        gradient.addColorStop(0, `hsla(${s.hue}, 90%, 60%, 0)`);
        gradient.addColorStop(1, `hsla(${s.hue}, 90%, 65%, 0.4)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y - s.length);
        ctx.stroke();

        if (!prefersReducedMotion) {
          s.y -= s.speed;
          if (s.y + s.length < 0) {
            s.y = canvas.height + s.length;
            s.x = Math.random() * canvas.width;
          }
        }
      }
      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    }

    resize();
    draw();
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
