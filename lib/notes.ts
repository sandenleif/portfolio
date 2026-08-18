import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export type NoteMeta = {
  slug: string;
  title: string;
  /** ISO-Datum `YYYY-MM-DD`. */
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
};

export type Note = NoteMeta & { content: string };

/** Grobe Schätzung — 200 Wörter pro Minute, mindestens eine. */
function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parse(slug: string, raw: string): Note {
  const { data, content } = matter(raw);

  if (!data.title || !data.date) {
    throw new Error(
      `content/notes/${slug}.mdx: "title" und "date" sind im Frontmatter Pflicht.`,
    );
  }

  return {
    slug,
    title: String(data.title),
    // gray-matter parst unquotierte YAML-Daten zu Date-Objekten.
    date:
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date),
    summary: data.summary ? String(data.summary) : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingMinutes: readingMinutes(content),
    content,
  };
}

async function readAll(): Promise<Note[]> {
  let files: string[];
  try {
    files = await fs.readdir(NOTES_DIR);
  } catch {
    return [];
  }

  const notes = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        return parse(slug, await fs.readFile(path.join(NOTES_DIR, file), "utf8"));
      }),
  );

  return notes.sort((a, b) => b.date.localeCompare(a.date));
}

/** Entwürfe erscheinen nur im Dev-Server, nicht im Produktions-Build. */
export async function getNotes(): Promise<Note[]> {
  const notes = await readAll();
  return process.env.NODE_ENV === "development"
    ? notes
    : notes.filter((note) => !note.draft);
}

export async function getNote(slug: string): Promise<Note | null> {
  const notes = await readAll();
  return notes.find((note) => note.slug === slug) ?? null;
}

/** Vorheriger/nächster Eintrag in chronologischer Reihenfolge. */
export async function getNoteNeighbours(slug: string) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.slug === slug);
  return {
    newer: index > 0 ? notes[index - 1] : null,
    older: index >= 0 && index < notes.length - 1 ? notes[index + 1] : null,
  };
}
