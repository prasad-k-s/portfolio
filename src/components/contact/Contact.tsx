"use client";

import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa6";
import { getIcon } from "@/components/ui/icons";
import { contact, profile } from "@/lib/content";

export default function Contact() {
  const email = profile.socials.find((s) => s.icon === "email");

  return (
    <section id="contact" className="relative scroll-mt-28 overflow-hidden px-6 py-24 sm:py-32">
      {/* Soft background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-80 w-80 rounded-full bg-accent/15 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-2xl rounded-3xl border border-border bg-surface px-6 py-14 text-center backdrop-blur sm:px-12"
      >
        <p className="font-mono text-sm font-medium tracking-wider text-accent uppercase">{contact.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{contact.heading}</h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{contact.message}</p>

        {email && (
          <a
            href={email.url}
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-accent/50"
          >
            {contact.buttonLabel}
            <FaPaperPlane size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </a>
        )}

        <ul className="mt-9 flex justify-center gap-4">
          {profile.socials.map((social) => {
            const Icon = getIcon(social.icon);
            const external = social.url.startsWith("http");
            return (
              <li key={social.name}>
                <a
                  href={social.url}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-accent"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background/50 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60">
                    {Icon && <Icon size={19} />}
                  </span>
                  <span className="text-xs font-medium">{social.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}
