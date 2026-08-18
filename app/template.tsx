"use client";

import { motion } from "motion/react";

/**
 * Seitenwechsel blenden auf, statt zu schneiden. Bewusst nur Opazität —
 * eine Bewegung würde beim Wechsel zwischen zwei so unterschiedlichen
 * Layouts (waagerechte Leinwand ↔ Textspalte) unruhig wirken.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
