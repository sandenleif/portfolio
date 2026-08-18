import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

import { CraftDemo } from "@/components/crafts/registry";

/** Ein hervorgehobener Hinweis — gelber Balken statt Kasten. */
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="border-l-[3px] border-yellow bg-bg-subtle px-4 py-3 text-fg">
      {children}
    </aside>
  );
}

/** Rahmen für eingebettete Demos: weiße Fläche auf dem grauen Papier. */
function Figure({
  caption,
  children,
}: {
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="not-prose my-10 -mx-6 sm:-mx-10">
      <div className="card-surface flex min-h-[240px] items-center justify-center bg-bg-subtle p-6">
        {children}
      </div>
      {caption && <figcaption className="label mt-2 px-1">{caption}</figcaption>}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
        {children}
      </a>
    );
  },
  img: ({ src = "", alt = "" }) => (
    <Image
      src={String(src)}
      alt={alt}
      width={1200}
      height={675}
      className="h-auto w-full"
    />
  ),
  Callout,
  Figure,
  Demo: CraftDemo,
};
