import type { Metadata } from "next";

import { PageShell, Row } from "@/components/ui";
import { getNotes } from "@/lib/notes";
import { formatMonth } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notes",
  description: "Thoughts on interface design, motion, and building software.",
};

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <PageShell
      title="Notes"
      description="Thoughts on interface design, motion, and building software. Irregular, but free of filler."
    >
      {notes.length === 0 ? (
        <p className="text-[15px] text-fg-muted">
          Nothing written yet. Add an{" "}
          <code className="font-mono text-[13px]">.mdx</code> file to{" "}
          <code className="font-mono text-[13px]">content/notes/</code>.
        </p>
      ) : (
        <ul>
          {notes.map((note, index) => (
            <Row
              key={note.slug}
              href={`/notes/${note.slug}`}
              title={note.draft ? `${note.title} · Draft` : note.title}
              meta={formatMonth(note.date)}
              description={note.summary || undefined}
              index={index}
            />
          ))}
        </ul>
      )}
    </PageShell>
  );
}
