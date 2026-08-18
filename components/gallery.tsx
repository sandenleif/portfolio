"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import type { Photo } from "@/content/photos";

/** Bildunterschrift aus Titel, Ort und Jahr — nur, was gepflegt ist. */
function caption(photo: Photo) {
  return [photo.title, photo.location, photo.year].filter(Boolean).join(" · ");
}

export function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const current = open ? photos[index] : null;

  // Radix stellt den Fokus nur für einen eigenen Dialog.Trigger wieder her.
  // Hier wird `open` von Hand gesteuert, also merken wir uns den Knopf selbst —
  // sonst landet der Fokus nach dem Schließen auf <body>.
  const trigger = useRef<HTMLButtonElement | null>(null);

  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  if (photos.length === 0) {
    return (
      <p className="text-[15px] text-fg-muted">
        Noch keine Bilder. Dateien nach{" "}
        <code className="font-mono text-[13px]">public/photos/</code> legen und in{" "}
        <code className="font-mono text-[13px]">content/photos.ts</code> eintragen.
      </p>
    );
  }

  return (
    <>
      {/* Spaltenlayout statt Raster: die Bilder behalten ihr Seitenverhältnis,
          und unterschiedlich hohe Aufnahmen stehen trotzdem lückenlos. */}
      <div className="columns-1 gap-[3px] sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            type="button"
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setIndex(i);
            }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: Math.min(i, 6) * 0.04,
            }}
            aria-label={`${caption(photo) || photo.alt} — vergrößern`}
            className="group relative mb-[3px] block w-full break-inside-avoid overflow-hidden"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full transition-transform duration-[600ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.02]"
            />
            {caption(photo) && (
              <span className="label absolute inset-x-0 bottom-0 translate-y-full bg-card px-3 py-2 text-left text-fg transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-y-0">
                {caption(photo)}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={(next) => !next && setIndex(null)}>
        <Dialog.Portal forceMount>
          <AnimatePresence>
            {open && current && (
              <>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[60] bg-paper/95 backdrop-blur-md"
                  />
                </Dialog.Overlay>

                <Dialog.Content
                  asChild
                  forceMount
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") step(1);
                    if (event.key === "ArrowLeft") step(-1);
                  }}
                  onCloseAutoFocus={(event) => {
                    event.preventDefault();
                    trigger.current?.focus();
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[70] flex flex-col items-center justify-center px-6 py-16 focus:outline-none"
                  >
                    <Dialog.Title className="sr-only">
                      {caption(current) || current.alt}
                    </Dialog.Title>

                    {/* Nur das Bild wechselt, der Rahmen bleibt stehen. */}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={current.src}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex min-h-0 flex-1 items-center"
                      >
                        <Image
                          src={current.src}
                          alt={current.alt}
                          width={current.width}
                          height={current.height}
                          sizes="90vw"
                          priority
                          className="max-h-full w-auto max-w-full object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="label mt-4 flex w-full max-w-[900px] items-center justify-between gap-4">
                      <span className="truncate text-fg">
                        {caption(current) || current.alt}
                      </span>
                      <span className="shrink-0 tabular-nums">
                        {index + 1} / {photos.length}
                      </span>
                    </div>

                    {photos.length > 1 && (
                      <>
                        <ArrowButton side="left" onClick={() => step(-1)} />
                        <ArrowButton side="right" onClick={() => step(1)} />
                      </>
                    )}

                    <Dialog.Close
                      aria-label="Schließen"
                      className="label absolute top-6 right-6 transition-colors duration-200 hover:text-fg"
                    >
                      Close
                    </Dialog.Close>
                  </motion.div>
                </Dialog.Content>
              </>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function ArrowButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Vorheriges Bild" : "Nächstes Bild"}
      className={`absolute top-1/2 hidden -translate-y-1/2 p-4 text-fg-faint transition-colors duration-200 hover:text-fg sm:block ${
        side === "left" ? "left-2" : "right-2"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={`size-5 ${side === "left" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </button>
  );
}
