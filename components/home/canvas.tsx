"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

/**
 * Die Startseite ist eine waagerechte Leinwand. Das Mausrad wird auf die
 * X-Achse übersetzt, damit man ohne Umdenken durchblättert; Lenis glättet
 * die Bewegung, sonst ruckelt jede Rad-Rastung sichtbar.
 */
export function Canvas({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);

  useEffect(() => {
    if (!wrapper.current || !content.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      orientation: "horizontal",
      gestureOrientation: "both",
      lerp: 0.085,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onScroll = ({ scroll }: { scroll: number }) => setAtStart(scroll < 40);
    lenis.on("scroll", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Pfeiltasten blättern von Tafel zu Tafel — nicht um einen festen Betrag,
  // sondern zur nächsten Kante, damit nie eine Tafel halb im Bild steht.
  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const node = wrapper.current;
    const panels = content.current?.children;
    if (!node || !panels) return;

    event.preventDefault();
    const edges = [...panels].map(
      (panel) => (panel as HTMLElement).offsetLeft - 0.08 * node.clientWidth,
    );
    const target =
      event.key === "ArrowRight"
        ? edges.find((edge) => edge > node.scrollLeft + 8)
        : [...edges].reverse().find((edge) => edge < node.scrollLeft - 8);

    node.scrollTo({ left: target ?? (event.key === "ArrowRight" ? node.scrollWidth : 0), behavior: "smooth" });
  }

  return (
    <div
      ref={wrapper}
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label="Panels, scrollable horizontally"
      className="no-scrollbar h-dvh w-full overflow-x-auto overflow-y-hidden bg-paper focus:outline-none"
    >
      <div
        ref={content}
        className="flex h-full w-max items-center gap-[10px] px-[8vw]"
      >
        {children}
      </div>

      {/* Ein einziger Hinweis, der verschwindet, sobald man ihn befolgt hat. */}
      <p
        aria-hidden
        className={`label pointer-events-none fixed bottom-[3.6vh] left-1/2 -translate-x-1/2 text-fg-faint transition-opacity duration-500 ${
          atStart ? "opacity-100" : "opacity-0"
        }`}
      >
        Scroll, or press →
      </p>
    </div>
  );
}
