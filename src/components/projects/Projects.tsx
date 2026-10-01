"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import SectionHeading from "@/components/ui/SectionHeading";
import TechTag from "@/components/ui/TechTag";
import { projects } from "@/lib/content";

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-28 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={projects.eyebrow} heading={projects.heading} />
        <p className="-mt-8 mb-12 max-w-2xl text-base text-muted sm:text-lg">{projects.subheading}</p>

        <div
          className={`grid gap-8 ${
            projects.projects.length === 1 ? "mx-auto max-w-2xl" : "md:grid-cols-2"
          }`}
        >
          {projects.projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.15, ease: "easeOut" }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
            >
              {/* Project image */}
              <div className="relative aspect-video overflow-hidden border-b border-border">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.name}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  unoptimized={project.image.endsWith(".svg")}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <TechTag key={t} name={t} />
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                    >
                      <FaGithub size={15} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/50"
                    >
                      Live Demo <FaArrowUpRightFromSquare size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
