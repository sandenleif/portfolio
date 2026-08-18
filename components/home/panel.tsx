import { cn } from "@/lib/utils";

/**
 * Eine Tafel: winzige Beschriftung, darunter eine weiße Fläche auf grauem
 * Papier. Die Beschriftung sitzt außerhalb der Karte — dadurch bleibt die
 * Karte selbst vollständig dem Motiv überlassen.
 */
export function Panel({
  label,
  width = 720,
  children,
  className,
}: {
  label: string;
  width?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className="flex h-full shrink-0 flex-col justify-center">
      <p className="label mb-[7px] truncate">{label}</p>
      <div
        style={{ width: `min(${width}px, 84vw)` }}
        className={cn(
          "card-surface relative h-[min(660px,72vh)] overflow-hidden",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}
