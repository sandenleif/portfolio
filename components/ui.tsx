"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Innenseiten beginnen mit viel Luft — der Titel steht klein oben links,
 * die eigentliche Liste setzt erst weit darunter ein.
 */
export function PageShell({
  title,
  description,
  wide,
  children,
}: {
  title: string;
  description?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        "mx-auto px-6 pt-[22vh] pb-32",
        wide ? "max-w-[1180px]" : "max-w-[712px]",
      )}
    >
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14"
      >
        <h1 className="display text-[clamp(2.4rem,5vw,4rem)]">{title}</h1>
        {description && (
          <p className="mt-4 max-w-[44ch] text-[15px] text-fg-muted text-pretty">
            {description}
          </p>
        )}
      </motion.header>

      {children}
    </main>
  );
}

/**
 * Eine Listenzeile: Titel links, Jahr rechts, dazwischen eine Haarlinie.
 * Beim Zeigen rückt der Titel ein Stück ein und die Linie färbt sich.
 */
export function Row({
  href,
  external,
  title,
  meta,
  description,
  index = 0,
}: {
  href?: string;
  external?: boolean;
  title: string;
  meta?: string;
  description?: string;
  index?: number;
}) {
  const isExternal = external ?? (href ? /^https?:\/\//.test(href) : false);

  const inner = (
    <>
      <span className="flex items-center gap-4">
        <span className="shrink-0 transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1.5">
          {title}
        </span>
        <span
          aria-hidden
          className="h-px min-w-6 flex-1 bg-line transition-colors duration-300 group-hover:bg-fg"
        />
        {meta && (
          <span className="shrink-0 text-fg-faint tabular-nums transition-colors duration-300 group-hover:text-fg">
            {meta}
          </span>
        )}
      </span>
      {description && (
        <span className="mt-1.5 block max-w-[52ch] text-[13px] text-fg-muted text-pretty">
          {description}
        </span>
      )}
    </>
  );

  const classes = "group block py-[13px] text-[15px]";

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index, 8) * 0.035,
      }}
    >
      {!href ? (
        <div className={classes}>{inner}</div>
      ) : isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
        >
          {inner}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      )}
    </motion.li>
  );
}

/** Eine Karte im Papier-Raster: Kopfzeile, Motiv, optional eine Fußleiste. */
export function Card({
  title,
  meta,
  children,
  footer,
  index = 0,
  tint,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  index?: number;
  tint?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index, 6) * 0.05,
      }}
      className="flex flex-col gap-[3px]"
    >
      <div
        className={cn(
          "flex min-h-[320px] flex-1 flex-col p-4",
          tint ? "bg-bg-subtle" : "card-surface",
        )}
      >
        <div className="label flex items-baseline justify-between gap-4">
          <h2 className="truncate text-fg">{title}</h2>
          {meta && <span className="shrink-0 tabular-nums">{meta}</span>}
        </div>
        <div className="flex flex-1 items-center justify-center py-4">
          {children}
        </div>
      </div>
      {footer}
    </motion.article>
  );
}

/** Die Fußleiste einer Karte — eine eigene Fläche, durch 3 px Fuge getrennt. */
export function CardAction({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal = /^https?:\/\//.test(href);
  const classes =
    "card-surface block py-3 text-center text-[13px] transition-colors duration-200 hover:bg-yellow";

  return isExternal ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
