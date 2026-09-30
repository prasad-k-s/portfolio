// Shapes of the JSON files in src/data.
// When you add a new field to a JSON file, add it here too so TypeScript knows about it.

export interface SocialLink {
  name: string;
  /** One of the keys in src/components/ui/icons.tsx (github, linkedin, email, x, website) */
  icon: string;
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  siteTitle: string;
  siteDescription: string;
  resumeUrl: string;
  socials: SocialLink[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Navigation {
  links: NavLink[];
}

export interface IconText {
  icon: string;
  text: string;
  label?: string;
}

export interface Stat {
  /** Number that counts up on scroll. Use "display" instead for text like "∞". */
  value?: number;
  suffix?: string;
  display?: string;
  label: string;
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  currently: IconText[];
  stats: Stat[];
  servicesHeading: string;
  services: { icon: string; title: string; description: string }[];
  beyondCode: {
    heading: string;
    items: IconText[];
  };
}

export interface Skill {
  name: string;
  /** Key from src/components/ui/techIcons.tsx */
  icon?: string;
  /** Brand color (hex). Leave out for black/white logos like Next.js or GitHub. */
  color?: string;
  /** Optional custom image in /public, used instead of the icon */
  image?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  /** Featured categories span the full width */
  featured?: boolean;
  badge?: string;
  skills: Skill[];
}

export interface SkillsContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  categories: SkillCategory[];
}

export interface Job {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  points: string[];
  /** Skill names; matching names from skills.json show their logos */
  tech: string[];
}

export interface ExperienceContent {
  eyebrow: string;
  heading: string;
  jobs: Job[];
}

export interface Project {
  name: string;
  description: string;
  /** Path inside /public, e.g. "/images/projects/my-app.png" */
  image: string;
  github?: string;
  live?: string;
  /** Skill names; matching names from skills.json show their logos */
  tech: string[];
}

export interface ProjectsContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  projects: Project[];
}

export interface ContactContent {
  eyebrow: string;
  heading: string;
  message: string;
  buttonLabel: string;
  footer: {
    text: string;
  };
}

export interface HeroButton {
  label: string;
  href: string;
  variant: string; // "primary" | "secondary"
  icon?: string;
  download?: boolean;
}

export interface HeroContent {
  greeting: string;
  typewriter: {
    prefix: string;
    skills: string[];
    typingSpeed: number;
    deletingSpeed: number;
    pauseTime: number;
  };
  tagline: string;
  photo: {
    /** Path inside /public, e.g. "/images/prasad.jpg". Leave "" to hide the photo. */
    src: string;
    alt: string;
  };
  buttons: HeroButton[];
  particles: {
    enabled: boolean;
    density: number;
    maxParticles: number;
    linkDistance: number;
    mouseRadius: number;
    speed: number;
  };
}
