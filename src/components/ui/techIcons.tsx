import type { IconType } from "react-icons";
import {
  SiBootstrap,
  SiCss,
  SiCypress,
  SiEslint,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJira,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostgresql,
  SiPostman,
  SiPrettier,
  SiReact,
  SiReactquery,
  SiRedux,
  SiSass,
  SiStyledcomponents,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
  SiVitest,
  SiWebpack,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaCode, FaFlaskVial, FaPalette, FaScrewdriverWrench, FaServer } from "react-icons/fa6";

// Brand logos for skills (Simple Icons). To add a new skill icon:
// 1. find it at https://react-icons.github.io/react-icons/icons/si
// 2. import it above and add a short key here
// 3. use that key as "icon" in src/data/skills.json
// Tip: you can also use your own image instead: set "image": "/images/skills/foo.svg" in the JSON.
const techIcons: Record<string, IconType> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  javascript: SiJavascript,
  typescript: SiTypescript,
  html: SiHtml5,
  css: SiCss,
  redux: SiRedux,
  reactquery: SiReactquery,
  tailwind: SiTailwindcss,
  sass: SiSass,
  mui: SiMui,
  bootstrap: SiBootstrap,
  styledcomponents: SiStyledcomponents,
  framer: SiFramer,
  jest: SiJest,
  testinglibrary: SiTestinglibrary,
  vitest: SiVitest,
  cypress: SiCypress,
  git: SiGit,
  github: SiGithub,
  vscode: VscVscode,
  figma: SiFigma,
  postman: SiPostman,
  npm: SiNpm,
  vite: SiVite,
  webpack: SiWebpack,
  jira: SiJira,
  eslint: SiEslint,
  prettier: SiPrettier,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
};

// Icons for the category cards
const categoryIcons: Record<string, IconType> = {
  code: FaCode,
  palette: FaPalette,
  flask: FaFlaskVial,
  tools: FaScrewdriverWrench,
  server: FaServer,
};

export function getTechIcon(name?: string): IconType | null {
  if (!name) return null;
  return techIcons[name.toLowerCase()] ?? null;
}

export function getCategoryIcon(name?: string): IconType | null {
  if (!name) return null;
  return categoryIcons[name.toLowerCase()] ?? null;
}
