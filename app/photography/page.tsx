import type { Metadata } from "next";

import { Gallery } from "@/components/gallery";
import { PageShell } from "@/components/ui";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Photography",
  description: "Photographs — places, light, and the occasional person.",
};

export default function PhotographyPage() {
  return (
    <PageShell
      title="Photography"
      description="Photographs taken alongside the work. Click one to see it whole; arrow keys move through the set."
      wide
    >
      <Gallery photos={photos} />
    </PageShell>
  );
}
