"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { heroLines } from "@/content/site";

/** `[Text](href)` im Konfigurationsstring wird zum Link, alles andere zu Text. */
function renderLine(line: string) {
  return line
    .split(/(\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part, index) => {
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (!link) return <span key={index}>{part}</span>;
      return (
        <a
          key={index}
          href={link[2]}
          target="_blank"
          rel="noreferrer noopener"
          className="underline decoration-[0.055em] underline-offset-[0.1em] transition-[text-decoration-color] duration-200 hover:decoration-transparent"
        >
          {link[1]}
        </a>
      );
    });
}

export function IntroPanel() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 20, mass: 0.8 };
  const driftX = useSpring(useTransform(pointerX, [-1, 1], [-38, 38]), springConfig);
  const driftY = useSpring(useTransform(pointerY, [-1, 1], [-26, 26]), springConfig);

  return (
    <div
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const box = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - box.left) / box.width) * 2 - 1);
        pointerY.set(((event.clientY - box.top) / box.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      className="relative flex h-full items-center px-[6%]"
    >
      {/* Die Fläche multipliziert sich in die Schrift hinein: Schwarz bleibt
          schwarz, Weiß wird gelb. Deshalb liegt sie über dem Satz, nicht darunter. */}
      <motion.div
        aria-hidden
        style={{ x: driftX, y: driftY }}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="pointer-events-none absolute top-1/2 left-[50%] z-10 aspect-square w-[56%] -translate-y-1/2 rounded-full bg-yellow mix-blend-multiply"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fg-faint">
          <svg viewBox="0 0 14 14" className="size-3.5" aria-hidden>
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="0.9"
              fill="none"
            />
          </svg>
        </span>
      </motion.div>

      {/* Etwas offeneres Register als bei den Plakatwörtern: der Satz soll
          gelesen werden, nicht nur gesehen. */}
      <h1 className="relative w-full text-[clamp(2rem,4.6vw,4.3rem)] leading-[1.28] font-normal tracking-[-0.035em]">
        {heroLines.map((line, index) => (
          <motion.span
            key={line}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.06 * index,
            }}
            className={`block ${index % 2 === 1 ? "text-right" : "text-left"}`}
          >
            {renderLine(line)}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}
