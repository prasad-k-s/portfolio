import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBookOpen,
  FaBriefcase,
  FaCubes,
  FaDownload,
  FaEnvelope,
  FaGaugeHigh,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaMobileScreen,
  FaPlug,
  FaRocket,
  FaShieldHalved,
  FaUniversalAccess,
  FaVial,
  FaUtensils,
  FaXTwitter,
} from "react-icons/fa6";

// Map of icon names used in the JSON files -> icon components.
// To support a new icon in JSON, import it above and add it here.
const icons: Record<string, IconType> = {
  // socials
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  x: FaXTwitter,
  website: FaGlobe,
  // buttons
  arrow: FaArrowRight,
  download: FaDownload,
  // about
  briefcase: FaBriefcase,
  rocket: FaRocket,
  responsive: FaMobileScreen,
  performance: FaGaugeHigh,
  components: FaCubes,
  api: FaPlug,
  cooking: FaUtensils,
  book: FaBookOpen,
  security: FaShieldHalved,
  accessibility: FaUniversalAccess,
  testing: FaVial,
};

export function getIcon(name?: string): IconType | null {
  if (!name) return null;
  return icons[name.toLowerCase()] ?? null;
}
