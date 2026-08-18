"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";

/** Logarithmischer Widerstand: die ersten Pixel jenseits des Anschlags
 *  geben leicht nach, danach kaum noch. Gedeckelt bei 26 px. */
function rubberband(distance: number) {
  return Math.sign(distance) * Math.min(26, Math.log1p(Math.abs(distance)) * 7);
}

export function ElasticSlider() {
  const [value, setValue] = useState(0.42);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const rawOvershoot = useMotionValue(0);
  const overshoot = useSpring(rawOvershoot, {
    stiffness: 420,
    damping: 26,
    mass: 0.3,
  });

  // Über den Anschlag hinaus dehnt sich die Spur — zur jeweils gezogenen Seite.
  const scaleX = useTransform(overshoot, (o) => 1 + Math.abs(o) / 320);
  const origin = useTransform(overshoot, (o) => (o < 0 ? "left" : "right"));
  const shift = useTransform(overshoot, (o) => o * 0.6);

  function positionFrom(clientX: number) {
    const bounds = trackRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const raw = (clientX - bounds.left) / bounds.width;
    setValue(Math.min(1, Math.max(0, raw)));
    const beyond =
      raw < 0 ? (raw - 0) * bounds.width : raw > 1 ? (raw - 1) * bounds.width : 0;
    rawOvershoot.set(rubberband(beyond));
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const step = event.shiftKey ? 0.1 : 0.02;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setValue((v) => Math.min(1, v + step));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setValue((v) => Math.max(0, v - step));
    } else if (event.key === "Home") {
      setValue(0);
    } else if (event.key === "End") {
      setValue(1);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xs py-8">
      <motion.div
        style={{ scaleX, transformOrigin: origin, x: shift }}
        className="px-1"
      >
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Volume"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value * 100)}
          onKeyDown={onKeyDown}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
            positionFrom(event.clientX);
          }}
          onPointerMove={(event) => {
            if (!dragging) return;
            positionFrom(event.clientX);
          }}
          onPointerUp={(event) => {
            event.currentTarget.releasePointerCapture(event.pointerId);
            setDragging(false);
            rawOvershoot.set(0);
          }}
          onPointerCancel={() => {
            setDragging(false);
            rawOvershoot.set(0);
          }}
          className="relative h-8 cursor-grab touch-none rounded-full py-3.5 active:cursor-grabbing"
        >
          <motion.div
            animate={{ scaleY: dragging ? 2 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative h-1 w-full rounded-full bg-line-strong"
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-fg"
              animate={{ width: `${value * 100}%` }}
              transition={
                dragging
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 500, damping: 40 }
              }
            />
          </motion.div>
        </div>
      </motion.div>

      <p className="mt-4 text-center font-mono text-xxs text-fg-faint tabular-nums">
        {Math.round(value * 100).toString().padStart(3, "0")}
      </p>
    </div>
  );
}
