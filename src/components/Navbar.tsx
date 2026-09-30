"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaXmark } from "react-icons/fa6";
import ThemeToggle from "@/components/ThemeToggle";
import { navigation, profile } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Stronger background + shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently in view
  useEffect(() => {
    const ids = navigation.links.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    const clearOnTop = () => {
      if (window.scrollY < 200) setActive("");
    };
    window.addEventListener("scroll", clearOnTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearOnTop);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-label="Main navigation"
        className={`relative w-full max-w-4xl rounded-full border border-border backdrop-blur-md transition-all duration-300 ${
          scrolled ? "bg-surface shadow-lg shadow-black/5 dark:shadow-black/30" : "bg-surface/60"
        }`}
      >
        <div className="flex items-center justify-between py-2 pr-2 pl-5">
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="text-base font-semibold tracking-tight text-foreground"
          >
            {profile.name}
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            <ul className="flex items-center gap-1">
              {navigation.links.map((link) => {
                const isActive = active === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`relative isolate rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                        isActive ? "text-foreground" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-foreground/5"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <span className="mx-1 h-5 w-px bg-border" aria-hidden />
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-full text-foreground hover:bg-foreground/5"
            >
              {menuOpen ? <FaXmark size={18} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur-md md:hidden"
            >
              {navigation.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-muted hover:bg-foreground/5 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
