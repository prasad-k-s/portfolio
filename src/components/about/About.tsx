"use client";

import { motion, type Variants } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/about/StatCard";
import { getIcon } from "@/components/ui/icons";
import { about } from "@/lib/content";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-28 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Left: intro, currently, beyond code */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            {about.paragraphs.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className="mb-5 text-base leading-relaxed text-muted sm:text-lg">
                {p}
              </motion.p>
            ))}

            <motion.ul variants={fadeUp} className="mt-8 space-y-3">
              {about.currently.map((c) => {
                const Icon = getIcon(c.icon);
                return (
                  <li key={c.text} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                      {Icon && <Icon size={15} />}
                    </span>
                    <p className="text-sm sm:text-base">
                      {c.label && <span className="text-muted">{c.label}: </span>}
                      <span className="font-medium text-foreground">{c.text}</span>
                    </p>
                  </li>
                );
              })}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-10">
              <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
                {about.beyondCode.heading}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {about.beyondCode.items.map((h) => {
                  const Icon = getIcon(h.icon);
                  return (
                    <li
                      key={h.text}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
                    >
                      {Icon && <Icon size={14} className="text-accent" />}
                      {h.text}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right: stats grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 content-start gap-4"
          >
            {about.stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <StatCard stat={stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* What I do */}
        <div className="mt-20">
          <h3 className="mb-8 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {about.servicesHeading}
          </h3>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap justify-center gap-5"
          >
            {about.services.map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  className="group w-full rounded-2xl border border-border bg-surface p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br from-accent to-accent-2 text-white shadow-md shadow-accent/30 transition-transform duration-300 group-hover:scale-110">
                    {Icon && <Icon size={18} />}
                  </span>
                  <h4 className="mt-5 font-semibold text-foreground">{s.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
