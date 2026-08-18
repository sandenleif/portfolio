/**
 * Zentrale Inhalts-Konfiguration.
 *
 * Alles, was auf der Seite an Text, Links und Einträgen erscheint, steht hier.
 * Zum Personalisieren nur diese Datei anpassen — die Komponenten bleiben unberührt.
 *
 * Projekte und Werdegang sind Entwürfe aus den auf sanden-hosting.org
 * genannten Arbeiten — Zeiträume und Rollenbezeichnungen bitte prüfen.
 * Die Social-Links außer GitHub zeigen noch ins Leere.
 */

export const site = {
  name: "Leif Sanden",
  /** Kurzform für die Navigation und Metadaten. */
  shortName: "Leif",
  role: "Photographer, Web Developer & Systems Engineer",
  /** Ein Satz. Erscheint als Meta-Description. */
  intro:
    "I photograph, build websites, and run the servers they live on — the whole thing, from the lens to the machine.",
  location: "Germany",
  email: "admin@sanden-hosting.org",
  /** Absolute URL der Produktionsseite. Wird für OG-Tags und die Sitemap gebraucht. */
  url: "https://leifsanden.com",
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
  "builds the site,",
  "runs the server",
  "and takes",
  "the pictures",
  "[that go on it](/photography)",
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
  { label: "Photography", href: "/photography" },
  { label: "Craft", href: "/craft" },
  { label: "Projects", href: "/projects" },
  { label: "Notes", href: "/notes" },
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

/**
 * ENTWURF: aus den auf sanden-hosting.org genannten Arbeiten abgeleitet.
 * Zeiträume, Rollenbezeichnungen und Beschreibungen bitte prüfen — und den
 * fehlenden Link zu sanden.visuals ergänzen.
 */
export const projects: Project[] = [
  {
    title: "Sanden Hosting",
    description:
      "Websites and hosting for small businesses across the German-speaking region — built, deployed and maintained by one person, on servers in Germany.",
    period: "2023 — now",
    role: "Founder, design and development",
    href: "https://sanden-hosting.org",
    tags: ["Next.js", "Hosting", "Ops"],
  },
  {
    title: "mirobolic.com",
    description:
      "A résumé site for an IT administrator. One page, no scroll traps, readable on a phone in a waiting room.",
    period: "2026",
    role: "Design and development",
    href: "https://mirobolic.com",
    tags: ["Next.js", "Typography"],
  },
  {
    title: "Praxis Dr. med. Lakatos",
    description:
      "Site for a gynaecology practice in Karlsruhe — opening hours, prenatal diagnostics, Doctolib booking, and four languages, because that is who walks in.",
    period: "2026",
    role: "Design and development",
    href: "https://wordpress-lakatos.sanden-hosting.org/",
    tags: ["WordPress", "Multilingual", "Booking"],
  },
  {
    title: "sanden.visuals",
    description:
      "A photo gallery platform with client logins and ordering. Photographers upload, clients pick, the shop takes it from there.",
    period: "2024",
    role: "Design and development",
    tags: ["Gallery", "Auth", "E-commerce"],
  },
];

/* ---------------------------------------------------------------- career */

export type Position = {
  company: string;
  role: string;
  period: string;
  href?: string;
};

/**
 * Falls es vor 2023 weitere Stationen gab (Schule, Praktika, Anstellungen),
 * hier ergänzen; sortiert wird nach Beginn, neueste zuerst.
 */
export const career: Position[] = [
  {
    company: "Siloah St. Trudpert Klinikum Pforzheim",
    role: "Apprentice — IT specialist, system integration (Fachinformatiker für Systemintegration)",
    period: "2025 — now",
  },
  {
    company: "Sanden Hosting",
    role: "Founder — web design, development and server operations",
    period: "2023 — now",
    href: "https://sanden-hosting.org",
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
