import { CommandMenu } from "@/components/crafts/command-menu";
import { DrawCheckbox } from "@/components/crafts/draw-checkbox";
import { ElasticSlider } from "@/components/crafts/elastic-slider";
import { ExclusionTabs } from "@/components/crafts/exclusion-tabs";
import { MagneticDock } from "@/components/crafts/magnetic-dock";
import { ScrambleText } from "@/components/crafts/scramble-text";

/**
 * Namen aus `content/site.ts` und aus MDX (`<Demo name="…" />`) landen hier.
 * Neue Demo: Komponente anlegen, hier eintragen, in der Config referenzieren.
 */
export const demos = {
  dock: MagneticDock,
  tabs: ExclusionTabs,
  command: CommandMenu,
  slider: ElasticSlider,
  checkbox: DrawCheckbox,
  scramble: ScrambleText,
} satisfies Record<string, React.ComponentType>;

export type DemoName = keyof typeof demos;

export function CraftDemo({ name }: { name: string }) {
  const Component = demos[name as DemoName];
  if (!Component) {
    return (
      <p className="py-4 text-center text-xxs text-fg-faint">
        Unknown demo: <code className="font-mono">{name}</code>
      </p>
    );
  }
  return <Component />;
}
