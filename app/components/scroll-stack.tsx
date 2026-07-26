"use client";

import { useEffect, useState } from "react";
import type { StudyPlanPhase } from "@/data/types";
import { accentClasses } from "@/lib/accent";
import type { AccentToken } from "@/data/types";

function useCheckedTasks(storageKey: string) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) setChecked(new Set(JSON.parse(raw) as string[]));
      } catch {
        // ignore malformed/unavailable storage
      }
      setLoaded(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(storageKey, JSON.stringify([...checked]));
  }, [checked, loaded, storageKey]);

  function toggle(taskKey: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(taskKey)) {
        next.delete(taskKey);
      } else {
        next.add(taskKey);
      }
      return next;
    });
  }

  return { checked, toggle, loaded };
}

export function ScrollStack({
  planId,
  phases,
  accent,
}: {
  planId: string;
  phases: StudyPlanPhase[];
  accent: AccentToken;
}) {
  const { checked, toggle, loaded } = useCheckedTasks(`semester:plan:${planId}:checked`);
  const accentClass = accentClasses[accent];

  return (
    <div className="flex flex-col gap-6">
      {phases.map((phase, i) => (
        <div
          key={i}
          className="sticky"
          style={{ top: `${4 + i * 1.5}rem`, zIndex: i + 1 }}
        >
          <div
            className={`flex flex-col gap-3 rounded-2xl border ${accentClass.border} bg-surface p-5 shadow-lg shadow-black/30`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className={`font-display text-xl ${accentClass.text}`}>
                {phase.focus}
              </h3>
              <span className="shrink-0 text-sm text-muted">
                {new Date(`${phase.date}T00:00:00`).toLocaleDateString("en-ZA", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {phase.tasks.map((task, j) => {
                const taskKey = `${i}-${j}`;
                const isChecked = checked.has(taskKey);
                return (
                  <li key={taskKey}>
                    <label className="flex cursor-pointer items-start gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={loaded && isChecked}
                        onChange={() => toggle(taskKey)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-line bg-surface-2 accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      />
                      <span
                        className={
                          isChecked ? "text-muted line-through" : "text-text"
                        }
                      >
                        {task}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
