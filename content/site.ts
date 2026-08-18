/**
 * Zentrale Inhalts-Konfiguration.
 *
 * Alles, was auf der Seite an Text, Links und Einträgen erscheint, steht hier.
 * Zum Personalisieren nur diese Datei anpassen — die Komponenten bleiben unberührt.
 */

export const site = {
  name: "Leif Sanden",
  /** Kurzform für die Navigation und Metadaten. */
  shortName: "Leif",
  role: "Interaction Designer & Frontend Engineer",
  /** Ein Satz. Erscheint als Meta-Description. */
  intro:
    "I build interfaces that feel right — fast, quiet, and considered down to the last movement.",
  location: "Germany",
  email: "sandenleif@gmail.com",
  /** Absolute URL der Produktionsseite. Wird für OG-Tags und die Sitemap gebraucht. */
  url: "https://example.com",
} as const;

/* ------------------------------------------------------------------ hero */

/**
 * Die Zeilen des Titelplakats. Sie werden abwechselnd links und rechts
 * ausgerichtet — die Umbrüche sind gesetzt, nicht automatisch, weil die
 * Silhouette des Satzes Teil der Gestaltung ist.
 *
 * `[Text](href)` wird als Link gerendert.
 */
export const heroLines = [
  "Leif Sanden",
  "is an interaction",
  "designer and",
  "frontend engineer",
  "working with",
  "[Vercel](https://vercel.com)",
];

/** Die Zeilen des Manifests auf der vorletzten Tafel. */
export const manifesto = [
  "Make it fast",
  "Make it quiet",
  "Make it consistent",
  "Make it deliberate",
  "Make it durable",
  "Make it feel inevitable",
  "Make it",
];

/* ------------------------------------------------------------------ links */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

/** Primäre Navigation. */
export const primaryLinks: NavLink[] = [
  { label: "Craft", href: "/craft", description: "Interactions and details" },
  { label: "Projects", href: "/projects", description: "Selected work" },
  { label: "Notes", href: "/notes", description: "Thoughts on design and code" },
];

/** Sekundäre Links (Social, Archiv). */
export const secondaryLinks: NavLink[] = [
  { label: "GitHub", href: "https://github.com/", external: true },
  { label: "X", href: "https://x.com/", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/", external: true },
  { label: "Résumé", href: "/cv.pdf", external: true },
];

/* --------------------------------------------------------------- projects */

export type Project = {
  title: string;
  /** Was es ist, in einer Zeile. */
  description: string;
  /** Zeitraum, z. B. "2024 — now". */
  period: string;
  role: string;
  href?: string;
  /** Technologien oder Stichworte. */
  tags?: string[];
};

export const projects: Project[] = [
  {
    title: "Atlas",
    description:
      "Design system and component library for a product built by six teams. From tokens to documentation.",
    period: "2024 — now",
    role: "Lead Design Engineer",
    href: "https://example.com/atlas",
    tags: ["React", "Design System", "Tokens"],
  },
  {
    title: "Kestrel",
    description:
      "Real-time dashboard for infrastructure metrics. Thirty thousand data points a second, without the interface ever stuttering.",
    period: "2023 — 2024",
    role: "Frontend Engineer",
    href: "https://example.com/kestrel",
    tags: ["Next.js", "WebGL", "Streaming"],
  },
  {
    title: "Notebook",
    description:
      "A writing tool with a collaborative editor and offline support. Conflict-free syncing through CRDTs.",
    period: "2022 — 2023",
    role: "Product Engineer",
    href: "https://example.com/notebook",
    tags: ["CRDT", "Editor", "Offline-first"],
  },
  {
    title: "Prism",
    description:
      "Open-source library for accessible overlays — dialogs, popovers, menus. Around four thousand stars on GitHub.",
    period: "2021 — 2022",
    role: "Maintainer",
    href: "https://github.com/",
    tags: ["Open Source", "A11y", "TypeScript"],
  },
];

/* ---------------------------------------------------------------- career */

export type Position = {
  company: string;
  role: string;
  period: string;
  href?: string;
};

export const career: Position[] = [
  {
    company: "Vercel",
    role: "Design Engineer",
    period: "2024 — now",
    href: "https://vercel.com",
  },
  {
    company: "Studio Nord",
    role: "Frontend Engineer",
    period: "2021 — 2024",
    href: "https://example.com",
  },
  {
    company: "Independent",
    role: "Interface Design",
    period: "2019 — 2021",
  },
];

/* ------------------------------------------------------------------ craft */

/**
 * Einträge der Craft-Seite. `demo` verweist auf eine Komponente aus
 * `components/crafts/registry.tsx`; ohne `demo` wird nur der Eintrag gerendert.
 */
export type CraftEntry = {
  title: string;
  /** ISO-Datum, bestimmt auch die Sortierung. */
  date: string;
  description?: string;
  demo?: string;
  href?: string;
  hrefLabel?: string;
};

export const craft: CraftEntry[] = [
  {
    title: "Magnetic dock",
    date: "2026-05-01",
    description:
      "Magnification follows a distance function rather than a hover state — which is why the neighbours move along with it.",
    demo: "dock",
  },
  {
    title: "Exclusion tabs",
    date: "2026-02-18",
    description:
      "A single indicator that inverts the type beneath it. The blend mode saves a second, masked layer of text.",
    demo: "tabs",
  },
  {
    title: "Command menu",
    date: "2025-11-09",
    description:
      "Entirely keyboard-driven. The selection travels between entries instead of jumping.",
    demo: "command",
  },
  {
    title: "Elastic slider",
    date: "2025-08-23",
    description:
      "Past the end the handle gives way and stretches the track with it. Resistance grows logarithmically.",
    demo: "slider",
  },
  {
    title: "Drawn checkbox",
    date: "2025-05-04",
    description:
      "The check is drawn, not faded in. The box squashes briefly — 140 ms, no more.",
    demo: "checkbox",
  },
  {
    title: "Decrypting text",
    date: "2025-01-30",
    description:
      "Character by character out of the noise. Runs on a single interval instead of one per letter.",
    demo: "scramble",
  },
];

/* ------------------------------------------------------------------ misc */

export const nowText =
  "Currently building a design system, reading about typography in print, and learning Swift.";
