"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { secondaryLinks, site } from "@/content/site";

export function ContactPanel() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timeout.current && clearTimeout(timeout.current)), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      window.location.href = `mailto:${site.email}`;
      return;
    }
    setCopied(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="relative flex h-full flex-col justify-center px-[8%]">
      <span
        aria-hidden
        className="absolute -right-[10%] -bottom-[14%] aspect-square w-[52%] rounded-full bg-blue mix-blend-multiply opacity-90"
      />

      <button
        type="button"
        onClick={copy}
        className="display relative z-10 -mx-1 px-1 text-left text-[clamp(1.2rem,2.5vw,2.1rem)] break-all"
      >
        <span className="relative">
          {site.email}
          {/* Der gelbe Balken wächst von links unter die Adresse. */}
          <motion.span
            aria-hidden
            initial={false}
            animate={{ scaleX: copied ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.38em] bg-yellow"
          />
        </span>
      </button>

      <p className="label mt-3 h-4">
        {copied ? "Copied to clipboard" : "Click to copy"}
      </p>

      <ul className="relative z-10 mt-10 flex flex-wrap gap-x-6 gap-y-2">
        {secondaryLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer noopener" : undefined}
              className="group inline-flex items-baseline gap-1 text-[15px]"
            >
              <span className="bg-gradient-to-r from-fg to-fg bg-[length:0%_1px] bg-bottom bg-no-repeat pb-px transition-[background-size] duration-300 ease-[var(--ease-out-quart)] group-hover:bg-[length:100%_1px]">
                {link.label}
              </span>
              <span aria-hidden className="text-fg-faint">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
