"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import type { Stat } from "@/types/content";

/** A stat box whose number counts up from 0 the first time it scrolls into view. */
export default function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || stat.value === undefined) return;
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  const shown = stat.display ?? `${count}${stat.suffix ?? ""}`;

  return (
    <div
      ref={ref}
      className="group rounded-2xl border border-border bg-surface p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
    >
      <p className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
        {shown}
      </p>
      <p className="mt-2 text-sm leading-snug text-muted">{stat.label}</p>
    </div>
  );
}
