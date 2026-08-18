"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&$@?/\\<>*+=";
const PHRASE = "Details are not decoration";

/** Bildwiederholrate der Entschlüsselung. 40 ms wirkt technisch, ohne zu flimmern. */
const TICK_MS = 40;
/** Ticks, die ein Zeichen im Rauschen bleibt, bevor es sich festsetzt. */
const NOISE_TICKS = 8;

export function ScrambleText() {
  const [output, setOutput] = useState(PHRASE);
  const frame = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    frame.current = 0;

    // Ein einziger Intervall für den ganzen String — nicht einer pro Buchstabe.
    timer.current = setInterval(() => {
      frame.current += 1;
      const settled = frame.current - NOISE_TICKS;

      const next = PHRASE.split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < settled) return char;
          if (index > frame.current) return " ";
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setOutput(next);

      if (settled >= PHRASE.length) {
        clearInterval(timer.current!);
        timer.current = null;
        setOutput(PHRASE);
      }
    }, TICK_MS);
  }, []);

  useEffect(() => {
    run();
    return () => void (timer.current && clearInterval(timer.current));
  }, [run]);

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <p className="font-mono text-sm text-fg" aria-label={PHRASE}>
        <span aria-hidden className="whitespace-pre">
          {output}
        </span>
      </p>
      <button
        type="button"
        onClick={run}
        className="rounded-full border border-line px-3 py-1 text-xxs text-fg-muted transition-colors duration-200 hover:border-line-strong hover:text-fg"
      >
        Decrypt again
      </button>
    </div>
  );
}
