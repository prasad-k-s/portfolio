"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Props {
  /** One particle per this many square pixels (lower = more particles) */
  density?: number;
  maxParticles?: number;
  /** Max distance at which two particles get connected by a line */
  linkDistance?: number;
  /** Radius around the mouse that pushes particles away and draws links to the cursor */
  mouseRadius?: number;
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

// RGB values (without alpha) for each theme
const COLORS = {
  light: { dot: "51, 65, 85", link: "71, 85, 105", mouse: "37, 99, 235" },
  dark: { dot: "148, 163, 184", link: "148, 163, 184", mouse: "59, 130, 246" },
};

/**
 * Lightweight canvas particle network (no external library).
 * Particles drift, connect to their neighbours with lines, and react to the mouse.
 */
export default function ParticlesBackground({
  density = 9000,
  maxParticles = 140,
  linkDistance = 130,
  mouseRadius = 160,
  speed = 0.35,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const colorsRef = useRef(COLORS.dark);

  useEffect(() => {
    colorsRef.current = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let visible = true;
    const mouse = { x: 0, y: 0, active: false };

    const createParticles = () => {
      const count = Math.min(maxParticles, Math.floor((width * height) / density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        r: Math.random() * 1.6 + 0.8,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
      if (reduceMotion) draw();
    };

    const draw = () => {
      const c = colorsRef.current;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduceMotion) {
          // Gentle push away from the cursor
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouseRadius && dist > 0) {
              const force = (1 - dist / mouseRadius) * 0.6;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
          p.y = Math.max(0, Math.min(height, p.y));
        }
      }

      // Lines between nearby particles
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDistance) {
            ctx.strokeStyle = `rgba(${c.link}, ${(1 - dist / linkDistance) * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // Lines from the cursor to nearby particles
        if (mouse.active) {
          const dist = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (dist < mouseRadius) {
            ctx.strokeStyle = `rgba(${c.mouse}, ${(1 - dist / mouseRadius) * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Dots
      ctx.fillStyle = `rgba(${c.dot}, 0.7)`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible) draw();
      frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= rect.width && mouse.y <= rect.height;
    };
    const onPointerLeave = () => (mouse.active = false);

    // Pause the animation when the hero is scrolled out of view
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    if (!reduceMotion) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density, maxParticles, linkDistance, mouseRadius, speed]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
