import { getTechIcon } from "@/components/ui/techIcons";
import { findSkill } from "@/lib/content";

/** Small pill showing a technology. Uses the logo + brand color from skills.json when the name matches. */
export default function TechTag({ name }: { name: string }) {
  const skill = findSkill(name);
  const Icon = getTechIcon(skill?.icon);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-muted">
      {Icon && <Icon size={12} style={{ color: skill?.color ?? "var(--foreground)" }} />}
      {name}
    </span>
  );
}
