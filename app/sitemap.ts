import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { getNotes } from "@/lib/notes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getNotes();

  const staticRoutes = [
    "",
    "/photography",
    "/craft",
    "/projects",
    "/notes",
  ].map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...notes.map((note) => ({
      url: `${site.url}/notes/${note.slug}`,
      lastModified: note.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
