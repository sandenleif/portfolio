import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx";
import { site } from "@/content/site";
import { getNote, getNoteNeighbours, getNotes } from "@/lib/notes";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) return {};

  return {
    title: note.title,
    description: note.summary || site.intro,
    openGraph: {
      type: "article",
      title: note.title,
      description: note.summary || site.intro,
      publishedTime: note.date,
      url: `${site.url}/notes/${note.slug}`,
    },
  };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();

  const { content } = await compileMDX({
    source: note.content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  const { newer, older } = await getNoteNeighbours(slug);

  return (
    <main className="mx-auto max-w-[712px] px-6 pt-[22vh] pb-32">
      <header className="mb-12">
        <h1 className="display text-[clamp(2rem,4.4vw,3.4rem)] text-balance">
          {note.title}
        </h1>
        <p className="label mt-5 flex flex-wrap items-center gap-x-2">
          <time dateTime={note.date}>{formatDate(note.date)}</time>
          <span aria-hidden>·</span>
          <span>{note.readingMinutes} min read</span>
          {note.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span>{note.tags.join(", ")}</span>
            </>
          )}
          {note.draft && (
            <>
              <span aria-hidden>·</span>
              <span className="bg-yellow px-1 text-fg">Draft</span>
            </>
          )}
        </p>
      </header>

      <div className="prose">{content}</div>

      <nav
        aria-label="More notes"
        className="mt-24 flex items-start justify-between gap-6 border-t border-line pt-6"
      >
        {older ? (
          <Link href={`/notes/${older.slug}`} className="group max-w-[46%]">
            <span className="label block">← Older</span>
            <span className="mt-1 block text-[15px] transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:-translate-x-1">
              {older.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {newer && (
          <Link href={`/notes/${newer.slug}`} className="group max-w-[46%] text-right">
            <span className="label block">Newer →</span>
            <span className="mt-1 block text-[15px] transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1">
              {newer.title}
            </span>
          </Link>
        )}
      </nav>
    </main>
  );
}
