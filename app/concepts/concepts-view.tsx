"use client";

import { useMemo, useState } from "react";
import type { ConceptBriefing, ConceptDifficulty } from "@/data/types";
import type { ConceptModule } from "@/data/concepts/modules";
import { ConceptCard } from "../components/concept-card";

const difficulties: ConceptDifficulty[] = ["core", "stretch", "hard"];

const difficultyLabel: Record<ConceptDifficulty, string> = {
  core: "Core",
  stretch: "Stretch",
  hard: "Hard",
};

function chipClass(active: boolean) {
  return active
    ? "rounded-full border border-accent/70 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
    : "rounded-full border border-line px-3 py-1 text-xs font-medium text-muted hover:text-text";
}

type WeekFilter = number | "all";

export function ConceptsView({
  briefings,
  modules,
}: {
  briefings: ConceptBriefing[];
  modules: ConceptModule[];
}) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<ConceptDifficulty | "all">("all");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [selectedWeek, setSelectedWeek] = useState<WeekFilter>("all");

  const weeks = useMemo(() => {
    const set = new Set<number>();
    briefings.forEach((b) => {
      if (b.week != null) set.add(b.week);
    });
    return [...set].sort((a, b) => a - b);
  }, [briefings]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    briefings.forEach((b) => b.tags.forEach((t) => tags.add(t)));
    return [...tags].sort();
  }, [briefings]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return briefings.filter((b) => {
      if (selectedWeek !== "all" && b.week !== selectedWeek) return false;
      if (difficulty !== "all" && b.difficulty !== difficulty) return false;
      if (activeTags.size > 0 && !b.tags.some((t) => activeTags.has(t))) return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [briefings, search, difficulty, activeTags, selectedWeek]);

  const hasFilters =
    search.trim() !== "" || difficulty !== "all" || activeTags.size > 0 || selectedWeek !== "all";

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 md:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl leading-none tracking-tight text-text">
          Concept Briefings
        </h1>
        <p className="text-base text-muted">
          Glanceable pre-lecture priming and post-lecture consolidation, per concept.
        </p>
      </header>

      {weeks.length > 0 && (
        <div className="flex flex-col gap-2">
          <div
            role="tablist"
            aria-label="Filter by week"
            className="flex gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedWeek === "all"}
              onClick={() => setSelectedWeek("all")}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                selectedWeek === "all"
                  ? "bg-surface-2 text-text"
                  : "text-muted hover:text-text"
              }`}
            >
              All weeks
            </button>
            {weeks.map((week) => (
              <button
                key={week}
                type="button"
                role="tab"
                aria-selected={selectedWeek === week}
                onClick={() => setSelectedWeek(week)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  selectedWeek === week
                    ? "bg-surface-2 text-text"
                    : "text-muted hover:text-text"
                }`}
              >
                Week {week}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted">
            Week grouping follows syllabus order. Only cards explicitly marked
            from a dated Week 1 source are confirmed — later weeks are an
            estimated pacing guide spread evenly across the semester, pending
            confirmation against the real lecture-by-lecture schedule (cards
            show &quot;(est.)&quot; where this applies).
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted">Search</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search concept titles, summaries, tags…"
            className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </label>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by difficulty">
          <button
            type="button"
            onClick={() => setDifficulty("all")}
            className={chipClass(difficulty === "all")}
          >
            All difficulties
          </button>
          {difficulties.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={chipClass(difficulty === d)}
            >
              {difficultyLabel[d]}
            </button>
          ))}
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by tag">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={chipClass(activeTags.has(tag))}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {hasFilters && filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-line bg-surface p-4 text-sm text-muted">
          No concepts match your filters.
        </p>
      )}

      {modules.map((module) => {
        const moduleBriefings = filtered.filter((b) => b.courseCode === module.code);
        const totalForModule = briefings.filter((b) => b.courseCode === module.code).length;

        if (totalForModule === 0) {
          return (
            <section key={module.code} className="flex flex-col gap-3">
              <h2 className="font-display text-xl text-muted">{module.title}</h2>
              <p className="rounded-2xl border border-dashed border-line bg-surface p-4 text-sm text-muted">
                No notes ingested for this module yet — briefings will appear here once
                course-docs are added.
              </p>
            </section>
          );
        }

        if (moduleBriefings.length === 0) return null;

        const bySource = new Map<string, ConceptBriefing[]>();
        moduleBriefings.forEach((b) => {
          const list = bySource.get(b.sourceRef) ?? [];
          list.push(b);
          bySource.set(b.sourceRef, list);
        });

        return (
          <section key={module.code} className="flex flex-col gap-4">
            <h2 className="font-display text-xl text-text">{module.title}</h2>
            {[...bySource.entries()].map(([sourceRef, items]) => (
              <div key={sourceRef} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-muted">{sourceRef}</h3>
                <div className="flex flex-col gap-3">
                  {items.map((briefing) => (
                    <ConceptCard key={briefing.id} briefing={briefing} accent={module.accent} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}

      <footer className="rounded-2xl border border-line bg-surface-2 p-4 text-xs text-muted">
        These briefings are a personal study scaffold for pre-lecture priming and
        post-lecture consolidation only — they are never submitted work and do not
        replace your course&apos;s own materials. Respect each course&apos;s AI-use
        policy (STA2005S&apos;s is strict) when using them to study.
      </footer>
    </div>
  );
}
