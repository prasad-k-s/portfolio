"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { FaArrowDown } from "react-icons/fa6";
import ParticlesBackground from "@/components/hero/ParticlesBackground";
import Typewriter from "@/components/hero/Typewriter";
import { getIcon } from "@/components/ui/icons";
import { hero, profile } from "@/lib/content";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const hasPhoto = hero.photo.src.trim() !== "";
  const { particles, typewriter } = hero;

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background: particles + soft accent glows + fade into the next section */}
      {particles.enabled && (
        <ParticlesBackground
          density={particles.density}
          maxParticles={particles.maxParticles}
          linkDistance={particles.linkDistance}
          mouseRadius={particles.mouseRadius}
          speed={particles.speed}
        />
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute right-1/5 bottom-10 h-80 w-80 rounded-full bg-accent-2/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      </div>

      <div
        className={`relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-24 ${
          hasPhoto
            ? "grid items-center gap-14 md:grid-cols-[1.4fr_1fr]"
            : "flex flex-col items-center text-center"
        }`}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={hasPhoto ? "order-2 md:order-1" : "flex flex-col items-center"}
        >
          <motion.p variants={item} className="font-mono text-sm text-accent sm:text-base">
            {hero.greeting}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.h2
            variants={item}
            className="mt-3 bg-linear-to-r from-accent to-accent-2 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl"
          >
            {profile.role}
          </motion.h2>

          <motion.p variants={item} className="mt-6 font-mono text-lg text-muted sm:text-xl">
            {typewriter.prefix}{" "}
            <Typewriter
              words={typewriter.skills}
              typingSpeed={typewriter.typingSpeed}
              deletingSpeed={typewriter.deletingSpeed}
              pauseTime={typewriter.pauseTime}
              className="font-semibold text-foreground"
            />
          </motion.p>

          <motion.p
            variants={item}
            className={`mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg ${hasPhoto ? "" : "mx-auto"}`}
          >
            {hero.tagline}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={item}
            className={`mt-9 flex flex-wrap gap-4 ${hasPhoto ? "" : "justify-center"}`}
          >
            {hero.buttons.map((btn) => {
              const Icon = getIcon(btn.icon);
              const primary = btn.variant === "primary";
              return (
                <a
                  key={btn.label}
                  href={btn.href}
                  download={btn.download || undefined}
                  className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    primary
                      ? "bg-accent text-white shadow-lg shadow-accent/30 hover:-translate-y-0.5 hover:shadow-accent/50"
                      : "border border-border bg-surface text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-accent/60"
                  }`}
                >
                  {btn.label}
                  {Icon && (
                    <Icon
                      size={13}
                      className={primary ? "transition-transform group-hover:translate-x-1" : "transition-transform group-hover:translate-y-0.5"}
                    />
                  )}
                </a>
              );
            })}
          </motion.div>

          {/* Social icons */}
          <motion.ul variants={item} className={`mt-8 flex gap-3 ${hasPhoto ? "" : "justify-center"}`}>
            {profile.socials.map((social) => {
              const Icon = getIcon(social.icon);
              const external = social.url.startsWith("http");
              return (
                <li key={social.name}>
                  <a
                    href={social.url}
                    aria-label={social.name}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-muted backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:text-accent"
                  >
                    {Icon ? <Icon size={18} /> : social.name[0]}
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* Optional photo (set hero.photo.src in src/data/hero.json) */}
        {hasPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="order-1 flex justify-center md:order-2"
          >
            <div className="relative">
              <div aria-hidden className="absolute -inset-4 rounded-full bg-linear-to-tr from-accent to-accent-2 opacity-30 blur-2xl" />
              <div className="relative rounded-full bg-linear-to-tr from-accent to-accent-2 p-1">
                <Image
                  src={hero.photo.src}
                  alt={hero.photo.alt}
                  width={320}
                  height={320}
                  priority
                  className="h-56 w-56 rounded-full border-4 border-background object-cover sm:h-72 sm:w-72"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted hover:text-accent"
      >
        <FaArrowDown size={18} />
      </motion.a>
    </section>
  );
}
