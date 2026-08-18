"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryLinks, site } from "@/content/site";

const sections = [{ label: site.shortName, href: "/" }, ...primaryLinks];

/** Dekorative Taktstriche zwischen den Abschnitten — sie geben der Leiste Rhythmus. */
function Ticks({ count }: { count: number }) {
  return (
    <span aria-hidden className="flex items-center gap-[3px] px-[5px]">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="block h-3 w-px bg-line-strong" />
      ))}
    </span>
  );
}

/**
 * Die Navigation ist eine Skala, kein Menü: ein Kästchen pro Abschnitt, der
 * aktuelle gelb gefüllt. Beschriftet wird erst beim Zeigen.
 */
export function Nav() {
  const pathname = usePathname();

  return (
    <Tooltip.Provider delayDuration={80} skipDelayDuration={200}>
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 top-0 z-50 flex justify-center pt-[3.6vh]"
      >
        <div className="flex items-center">
          {sections.map((section, index) => {
            const active =
              section.href === "/"
                ? pathname === "/"
                : pathname.startsWith(section.href);

            return (
              <span key={section.href} className="flex items-center">
                {index > 0 && <Ticks count={index === 1 ? 5 : 2} />}

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Link
                      href={section.href}
                      aria-label={section.label}
                      aria-current={active ? "page" : undefined}
                      className="group relative grid h-[18px] w-[30px] place-items-center"
                    >
                      <span
                        className={`block h-3 w-full transition-colors duration-200 ${
                          active
                            ? "bg-transparent"
                            : "bg-transparent ring-1 ring-line-strong ring-inset group-hover:ring-fg"
                        }`}
                      />
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-0 top-[3px] h-3 bg-yellow"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 36,
                          }}
                        />
                      )}
                    </Link>
                  </Tooltip.Trigger>

                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="bottom"
                      sideOffset={8}
                      className="label bg-fg px-1.5 py-0.5 text-white data-[state=delayed-open]:animate-[fadeIn_120ms_ease-out]"
                    >
                      {section.label}
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </span>
            );
          })}

          <Ticks count={2} />
        </div>
      </nav>
    </Tooltip.Provider>
  );
}
