"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  heading: string;
}

/** Shared heading used at the top of every section. */
export default function SectionHeading({ eyebrow, heading }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-14"
    >
      <p className="font-mono text-sm font-medium tracking-wider text-accent uppercase">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{heading}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-linear-to-r from-accent to-accent-2" />
    </motion.div>
  );
}
