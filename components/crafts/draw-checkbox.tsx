"use client";

import { motion } from "motion/react";
import { useState } from "react";

const TASKS = [
  "Unify the tokens",
  "Audit the focus rings",
  "Respect reduced motion",
];

export function DrawCheckbox() {
  const [checked, setChecked] = useState<boolean[]>([true, false, false]);

  function toggle(index: number) {
    setChecked((state) => state.map((v, i) => (i === index ? !v : v)));
  }

  return (
    <ul className="mx-auto w-full max-w-[15rem] space-y-1 py-4">
      {TASKS.map((task, index) => (
        <li key={task}>
          <button
            type="button"
            role="checkbox"
            aria-checked={checked[index]}
            onClick={() => toggle(index)}
            className="group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm transition-colors duration-200 hover:bg-bg-subtle"
          >
            <motion.span
              // Kurzes Zusammenquetschen beim Umschalten — 140 ms, sonst wirkt es zäh.
              animate={{ scale: checked[index] ? [0.86, 1] : [0.86, 1] }}
              transition={{ duration: 0.14, ease: [0.25, 1, 0.5, 1] }}
              className={`grid size-[18px] shrink-0 place-items-center rounded-[6px] border transition-colors duration-200 ${
                checked[index]
                  ? "border-fg bg-fg"
                  : "border-line-strong group-hover:border-fg-faint"
              }`}
            >
              <svg viewBox="0 0 18 18" className="size-[14px]" aria-hidden>
                <motion.path
                  d="M4 9.2 7.4 12.4 14 5.6"
                  fill="none"
                  stroke="var(--bg)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={false}
                  // Der Haken wird gezeichnet, nicht eingeblendet.
                  animate={{ pathLength: checked[index] ? 1 : 0 }}
                  transition={{
                    duration: 0.24,
                    ease: checked[index] ? [0.25, 1, 0.5, 1] : [0.5, 0, 0.75, 0],
                  }}
                />
              </svg>
            </motion.span>

            <span className="relative text-fg-muted">
              {task}
              <motion.span
                aria-hidden
                initial={false}
                animate={{ scaleX: checked[index] ? 1 : 0 }}
                transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
                style={{ transformOrigin: "left" }}
                className="absolute inset-x-0 top-1/2 h-px bg-fg-faint"
              />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
