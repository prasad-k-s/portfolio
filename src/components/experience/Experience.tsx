"use client";

import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa6";
import SectionHeading from "@/components/ui/SectionHeading";
import TechTag from "@/components/ui/TechTag";
import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-28 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow={experience.eyebrow} heading={experience.heading} />

        {/* Vertical timeline */}
        <ol className="relative ml-4 border-l-2 border-border sm:ml-6">
          {experience.jobs.map((job, i) => (
            <motion.li
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="relative mb-12 pl-10 last:mb-0 sm:pl-12"
            >
              {/* Timeline dot */}
              <span className="absolute top-1 -left-[19px] grid h-9 w-9 place-items-center rounded-full border-4 border-background bg-linear-to-br from-accent to-accent-2 text-white shadow-md shadow-accent/30">
                <FaBriefcase size={12} />
              </span>
              {job.current && (
                <span
                  aria-hidden
                  className="absolute top-1 -left-[19px] h-9 w-9 animate-ping rounded-full bg-accent/30"
                />
              )}

              <div className="rounded-2xl border border-border bg-surface p-6 backdrop-blur transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                    <p className="mt-1 font-medium text-accent">{job.company}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-xs font-medium ${
                      job.current
                        ? "border border-accent/40 bg-accent/10 text-accent"
                        : "border border-border text-muted"
                    }`}
                  >
                    {job.period}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <TechTag key={t} name={t} />
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
