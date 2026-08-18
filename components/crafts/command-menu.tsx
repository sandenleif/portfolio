"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type Command = { id: string; label: string; group: string; hint?: string };

const COMMANDS: Command[] = [
  { id: "home", label: "Go to start", group: "Navigation", hint: "G then H" },
  { id: "craft", label: "Open craft", group: "Navigation", hint: "G then C" },
  { id: "projects", label: "Open projects", group: "Navigation", hint: "G then P" },
  { id: "notes", label: "Open notes", group: "Navigation", hint: "G then N" },
  { id: "copy", label: "Copy email address", group: "Actions" },
  { id: "source", label: "View source", group: "Actions" },
  { id: "resume", label: "Download résumé", group: "Actions", hint: "⌘ R" },
];

/** Subsequenz-Suche: „gts" findet „Go to start". */
function matches(query: string, label: string) {
  if (!query) return true;
  const haystack = label.toLowerCase();
  let cursor = 0;
  for (const char of query.toLowerCase()) {
    if (char === " ") continue;
    cursor = haystack.indexOf(char, cursor);
    if (cursor === -1) return false;
    cursor += 1;
  }
  return true;
}

export function CommandMenu() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [ran, setRan] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => COMMANDS.filter((command) => matches(query, command.label)),
    [query],
  );

  const groups = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const command of results) {
      const list = map.get(command.group) ?? [];
      list.push(command);
      map.set(command.group, list);
    }
    return [...map.entries()];
  }, [results]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || (event.key === "n" && event.ctrlKey)) {
      event.preventDefault();
      setActive((index) => (index + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp" || (event.key === "p" && event.ctrlKey)) {
      event.preventDefault();
      setActive(
        (index) => (index - 1 + results.length) % Math.max(results.length, 1),
      );
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      setRan(results[active].label);
      setTimeout(() => setRan(null), 1400);
    }
  }

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let flatIndex = -1;

  return (
    <div className="mx-auto w-full max-w-sm py-4">
      <div className="overflow-hidden rounded-xl border border-line bg-bg shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-3">
          <svg
            viewBox="0 0 16 16"
            aria-hidden
            className="size-3.5 shrink-0 text-fg-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              // Nach dem Filtern zeigt der alte Index sonst ins Leere.
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search commands…"
            aria-label="Search commands"
            aria-activedescendant={results[active]?.id}
            className="w-full bg-transparent text-sm text-fg placeholder:text-fg-faint focus:outline-none"
          />
          <kbd className="shrink-0 rounded border border-line px-1.5 font-mono text-xxs text-fg-faint">
            ESC
          </kbd>
        </div>

        <div ref={listRef} role="listbox" className="max-h-56 overflow-y-auto p-1.5">
          {results.length === 0 && (
            <p className="px-2.5 py-6 text-center text-sm text-fg-faint">
              Nothing found.
            </p>
          )}

          {groups.map(([group, commands]) => (
            <div key={group} className="mb-1 last:mb-0">
              <p className="px-2.5 py-1 font-mono text-xxs tracking-wider text-fg-faint uppercase">
                {group}
              </p>
              {commands.map((command) => {
                flatIndex += 1;
                const isActive = flatIndex === active;
                const index = flatIndex;

                return (
                  <button
                    key={command.id}
                    id={command.id}
                    role="option"
                    aria-selected={isActive}
                    data-active={isActive}
                    type="button"
                    onMouseMove={() => setActive(index)}
                    onClick={() => {
                      setRan(command.label);
                      setTimeout(() => setRan(null), 1400);
                    }}
                    className="relative flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm"
                  >
                    {/* Ein Balken für alle Einträge — er wandert, statt zu springen. */}
                    {isActive && (
                      <motion.span
                        layoutId="command-highlight"
                        className="absolute inset-0 -z-10 rounded-lg bg-bg-subtle"
                        transition={{ type: "spring", stiffness: 600, damping: 45 }}
                      />
                    )}
                    <span className={isActive ? "text-fg" : "text-fg-muted"}>
                      {command.label}
                    </span>
                    {command.hint && (
                      <span className="font-mono text-xxs text-fg-faint">
                        {command.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2 h-4 text-center text-xxs text-fg-faint" aria-live="polite">
        {ran ? `Ran: ${ran}` : "↑ ↓ to navigate, ⏎ to run"}
      </p>
    </div>
  );
}
