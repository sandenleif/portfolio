"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

const ITEMS = ["Finder", "Mail", "Calendar", "Notes", "Maps", "Music"];

const COLORS = [
  "from-sky-400 to-blue-600",
  "from-amber-300 to-orange-500",
  "from-rose-400 to-red-600",
  "from-lime-300 to-emerald-500",
  "from-violet-400 to-purple-600",
  "from-fuchsia-400 to-pink-600",
];

/** Reichweite der Vergrößerung in Pixeln, gemessen ab der Icon-Mitte. */
const RANGE = 130;
const BASE = 40;
const PEAK = 68;

export function MagneticDock() {
  const pointerX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <div className="flex justify-center py-4">
      <div
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return;
          pointerX.set(event.clientX);
        }}
        onPointerLeave={() => pointerX.set(Number.POSITIVE_INFINITY)}
        className="flex items-end gap-2 rounded-2xl border border-line bg-bg/60 px-3 pt-3 pb-2.5 backdrop-blur-xl"
      >
        {ITEMS.map((label, index) => (
          <DockIcon
            key={label}
            label={label}
            color={COLORS[index % COLORS.length]}
            pointerX={pointerX}
          />
        ))}
      </div>
    </div>
  );
}

function DockIcon({
  label,
  color,
  pointerX,
}: {
  label: string;
  color: string;
  pointerX: MotionValue<number>;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  // Abstand des Zeigers zur Icon-Mitte. Daraus folgt alles Weitere —
  // deshalb wachsen auch die Nachbarn mit, nicht nur das Icon darunter.
  const distance = useTransform(pointerX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Number.POSITIVE_INFINITY;
    return x - (bounds.left + bounds.width / 2);
  });

  const targetSize = useTransform(
    distance,
    [-RANGE, 0, RANGE],
    [BASE, PEAK, BASE],
    { clamp: true },
  );
  const size = useSpring(targetSize, {
    stiffness: 320,
    damping: 24,
    mass: 0.35,
  });

  const targetLift = useTransform(distance, [-RANGE, 0, RANGE], [0, -8, 0], {
    clamp: true,
  });
  const lift = useSpring(targetLift, { stiffness: 320, damping: 24, mass: 0.35 });

  const labelOpacity = useTransform(distance, [-40, 0, 40], [0, 1, 0], {
    clamp: true,
  });

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={label}
      style={{ width: size, height: size, y: lift }}
      className="relative shrink-0 rounded-[28%] focus-visible:outline-offset-4"
    >
      <motion.span
        style={{ opacity: labelOpacity }}
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md border border-line bg-bg px-2 py-0.5 text-xxs whitespace-nowrap text-fg-muted"
      >
        {label}
      </motion.span>
      <span
        aria-hidden
        className={`block size-full rounded-[28%] bg-gradient-to-br ${color} shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_6px_rgba(0,0,0,0.25)]`}
      />
    </motion.button>
  );
}
