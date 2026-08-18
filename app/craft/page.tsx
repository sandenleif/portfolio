import type { Metadata } from "next";

import { CraftDemo } from "@/components/crafts/registry";
import { Card, CardAction, PageShell } from "@/components/ui";
import { craft } from "@/content/site";
import { formatMonth } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Craft",
  description:
    "Small interactions, prototypes and details — each one built to answer a single question.",
};

export default function CraftPage() {
  const entries = [...craft].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PageShell
      title="Craft"
      description="Small interactions and prototypes. Each piece answers exactly one question — and is live here, not just pictured."
      wide
    >
      <div className="grid grid-cols-1 gap-[3px] sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry, index) => (
          <Card
            key={entry.title}
            title={entry.title}
            meta={formatMonth(entry.date)}
            index={index}
            tint={index % 3 === 1}
            footer={
              entry.href ? (
                <CardAction href={entry.href}>
                  {entry.hrefLabel ?? "View"}
                </CardAction>
              ) : entry.description ? (
                <p className="card-surface px-4 py-3 text-[13px] text-fg-muted text-pretty">
                  {entry.description}
                </p>
              ) : undefined
            }
          >
            {entry.demo ? (
              <CraftDemo name={entry.demo} />
            ) : (
              <span className="label">No preview</span>
            )}
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
