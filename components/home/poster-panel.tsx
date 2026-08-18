"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

type Shape = "none" | "half" | "circle" | "bar";

const accents = {
  orange: "bg-orange",
  blue: "bg-blue",
  yellow: "bg-yellow",
  red: "bg-red",
} as const;

/**
 * Ein Plakat: ein einziges Wort, so groß gesetzt, dass es die Karte
 * verlässt. Der Anschnitt ist beabsichtigt — er erzwingt den Blick
 * nach rechts, wo die nächste Tafel wartet.
 */
export function PosterPanel({
  word,
  href,
  accent = "orange",
  shape = "none",
  meta,
}: {
  word: string;
  href: string;
  accent?: keyof typeof accents;
  shape?: Shape;
  meta?: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block h-full w-full focus-visible:outline-offset-[-2px]"
    >
      <div className="relative h-full overflow-hidden">
        {shape !== "none" && (
          <motion.span
            aria-hidden
            initial={false}
            animate={{
              scale: hover ? 1.12 : 1,
              rotate: hover ? (shape === "bar" ? 0 : 12) : 0,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className={[
              "absolute z-10 mix-blend-multiply",
              accents[accent],
              shape === "half" &&
                "top-1/2 right-[14%] h-[46%] w-[23%] -translate-y-1/2 rounded-r-full",
              shape === "circle" &&
                "top-1/2 right-[12%] aspect-square w-[30%] -translate-y-1/2 rounded-full",
              shape === "bar" &&
                "bottom-[14%] left-[8%] h-[6%] w-[42%] origin-left",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        )}

        <motion.span
          initial={false}
          animate={{ x: hover ? -26 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className="display absolute top-1/2 left-[7%] -translate-y-1/2 text-[clamp(7rem,17vw,15.5rem)] whitespace-nowrap"
        >
          {word}
        </motion.span>

        {meta && (
          <motion.span
            initial={false}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 6 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            className="label absolute bottom-5 left-[7%] z-20 text-fg"
          >
            {meta}
          </motion.span>
        )}
      </div>
    </Link>
  );
}
