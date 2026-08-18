/**
 * Zentrale Inhalts-Konfiguration.
 *
 * Alles, was auf der Seite an Text, Links und Einträgen erscheint, steht hier.
 * Zum Personalisieren nur diese Datei anpassen — die Komponenten bleiben unberührt.
 *
 * ACHTUNG: Projekte, Werdegang und Links sind Platzhalter und beschreiben
 * keine tatsächlichen Arbeitsverhältnisse. Vor dem Veröffentlichen durch
 * echte Angaben ersetzen.
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
  email: "admin@sanden-hosting.com",
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
  "working on",
  "[quiet interfaces](/craft)",
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
  { label: "GitHub", href: "https://github.com/sandenleif", external: true },
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

/** Platzhalter — durch echte Arbeiten ersetzen. */
export const projects: Project[] = [
  {
    title: "First project",
    description:
      "One sentence on what it was. A design system, a dashboard, a tool — say what it did, not which framework built it.",
    period: "2024 — now",
    role: "Your role",
    tags: ["React", "Design System", "Tokens"],
  },
  {
    title: "Second project",
    description:
      "The second line is where the constraint goes: the thing that made it hard, and what it cost to solve.",
    period: "2023 — 2024",
    role: "Your role",
    tags: ["Next.js", "WebGL", "Streaming"],
  },
  {
    title: "Third project",
    description:
      "Keep these to two lines. A list of four projects read in full beats eight that get skimmed.",
    period: "2022 — 2023",
    role: "Your role",
    tags: ["CRDT", "Editor", "Offline-first"],
  },
  {
    title: "Fourth project",
    description:
      "Add `href` to an entry and the row becomes a link — with an arrow that appears on hover.",
    period: "2021 — 2022",
    role: "Your role",
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

/** Platzhalter — durch echte Stationen ersetzen. */
export const career: Position[] = [
  {
    company: "Current company",
    role: "Design Engineer",
    period: "2024 — now",
  },
  {
    company: "Previous studio",
    role: "Frontend Engineer",
    period: "2021 — 2024",
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
