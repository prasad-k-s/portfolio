// Single place where the JSON content is loaded and typed.
// Components import from here instead of importing JSON files directly.
import profileData from "@/data/profile.json";
import navigationData from "@/data/navigation.json";
import heroData from "@/data/hero.json";
import aboutData from "@/data/about.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import contactData from "@/data/contact.json";
import type {
  AboutContent,
  ContactContent,
  ExperienceContent,
  HeroContent,
  Navigation,
  Profile,
  ProjectsContent,
  Skill,
  SkillsContent,
} from "@/types/content";

export const profile: Profile = profileData;
export const navigation: Navigation = navigationData;
export const hero: HeroContent = heroData;
export const about: AboutContent = aboutData;
export const skills: SkillsContent = skillsData;
export const experience: ExperienceContent = experienceData;
export const projects: ProjectsContent = projectsData;
export const contact: ContactContent = contactData;

/** Look up a skill (icon + brand color) by its name in skills.json, e.g. "React.js". */
export function findSkill(name: string): Skill | undefined {
  const key = name.trim().toLowerCase();
  for (const cat of skills.categories) {
    const match = cat.skills.find((s) => s.name.toLowerCase() === key);
    if (match) return match;
  }
  return undefined;
}
