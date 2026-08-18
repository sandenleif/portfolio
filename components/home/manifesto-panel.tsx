"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { manifesto } from "@/content/site";

const STEP_MS = 1350;
/** Die letzte Zeile ist die Pointe — sie bleibt länger stehen. */
const HOLD_MS = 3000;

export function ManifestoPanel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const isLast = index === manifesto.length - 1;

  useEffect(() => {
    if (reduced || paused) return;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % manifesto.length),
      isLast ? HOLD_MS : STEP_MS,
    );
    return () => clearTimeout(timer);
  }, [index, isLast, paused, reduced]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex h-full items-center px-[8%]"
    >
      <span
        aria-hidden
        className="absolute top-[16%] left-[8%] h-[3px] w-[26%] bg-yellow"
      />

      {reduced ? (
        <ul className="display space-y-1 text-[clamp(1.4rem,3vw,2.6rem)]">
          {manifesto.map((line) => (
            <li key={line}>{line}.</li>
          ))}
        </ul>
      ) : (
        <>
          <div
            className="display relative h-[1.1em] w-full text-[clamp(1.7rem,3.6vw,3.2rem)]"
            aria-hidden
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 top-0 block"
              >
                {manifesto[index]}
                <span className="text-fg-faint">.</span>
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="sr-only">{manifesto.join(". ")}.</p>
        </>
      )}
    </div>
  );
}
