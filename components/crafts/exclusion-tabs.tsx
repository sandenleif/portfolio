"use client";

import { motion } from "motion/react";
import { useState } from "react";

const TABS = ["Overview", "Activity", "Settings"];

/**
 * Der Indikator liegt *über* der Schrift und invertiert sie per
 * `mix-blend-mode: difference`. Dadurch braucht es keine zweite,
 * maskierte Textebene — und die Kante bleibt exakt scharf.
 *
 * Die Spalten sind gleich breit, deshalb genügt eine Verschiebung um
 * 100 % der eigenen Breite pro Schritt.
 */
export function ExclusionTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex justify-center py-4">
      <div className="isolate rounded-full border border-line bg-bg-subtle p-1">
        <div className="relative grid grid-cols-3">
          {TABS.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              className="relative rounded-full px-4 py-1.5 text-sm text-fg transition-opacity duration-200 hover:opacity-70"
            >
              {tab}
            </button>
          ))}

          <motion.span
            aria-hidden
            initial={false}
            animate={{ x: `${active * 100}%` }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 rounded-full bg-white mix-blend-difference"
          />
        </div>
      </div>
    </div>
  );
}
