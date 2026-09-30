"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { getCategoryIcon, getTechIcon } from "@/components/ui/techIcons";
import { skills } from "@/lib/content";
import type { Skill } from "@/types/content";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

function SkillTile({ skill }: { skill: Skill }) {
  const Icon = getTechIcon(skill.icon);
  // Brand color drives the icon color and the hover glow. Logos without a color follow the text color.
  const style = { "--brand": skill.color ?? "var(--foreground)" } as CSSProperties;

  return (
    <motion.li
      variants={fadeUp}
      style={style}
      className="group flex flex-col items-center gap-2.5 rounded-xl border border-border bg-background/40 px-2 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-(--brand)/60 hover:bg-(--brand)/5"
    >
      <span className="grid h-10 w-10 place-items-center transition-transform duration-300 group-hover:scale-110">
        {skill.image ? (
          <Image src={skill.image} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
        ) : Icon ? (
          <Icon size={34} className="text-(--brand) drop-shadow-none transition-[filter] duration-300 group-hover:drop-shadow-[0_0_10px_var(--brand)]" />
        ) : (
          <span className="text-lg font-bold text-accent">{skill.name[0]}</span>
        )}
      </span>
      <span className="text-xs font-medium text-muted transition-colors group-hover:text-foreground sm:text-sm">
        {skill.name}
      </span>
    </motion.li>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-28 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={skills.eyebrow} heading={skills.heading} />
        <p className="-mt-8 mb-12 max-w-2xl text-base text-muted sm:text-lg">{skills.subheading}</p>

        <div className="grid gap-6 lg:grid-cols-2">
          {skills.categories.map((cat) => {
            const CatIcon = getCategoryIcon(cat.icon);
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`rounded-2xl border border-border bg-surface p-6 backdrop-blur sm:p-8 ${
                  cat.featured ? "lg:col-span-2" : ""
                }`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-accent to-accent-2 text-white shadow-md shadow-accent/30">
                    {CatIcon && <CatIcon size={16} />}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
                  {cat.badge && (
                    <span className="ml-auto rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <motion.ul
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className={`grid gap-3 ${
                    cat.featured ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-8" : "grid-cols-3 sm:grid-cols-4"
                  }`}
                >
                  {cat.skills.map((skill) => (
                    <SkillTile key={skill.name} skill={skill} />
                  ))}
                </motion.ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
