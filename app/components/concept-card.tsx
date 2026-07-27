"use client";

import { useId, useState } from "react";
import type { AccentToken, ConceptBriefing, ConceptDifficulty } from "@/data/types";
import { accentClasses } from "@/lib/accent";

const neutralAccent = {
  border: "border-line",
  text: "text-text",
  bg: "bg-surface-2",
  ring: "ring-line",
};

const difficultyBadge: Record<ConceptDifficulty, string> = {
  core: "border-line text-muted",
  stretch: "border-accent/60 bg-accent/10 text-accent",
  hard: "border-danger/70 bg-danger/10 text-danger",
};

const difficultyLabel: Record<ConceptDifficulty, string> = {
  core: "Core",
  stretch: "Stretch",
  hard: "Hard",
};

export function ConceptCard({
  briefing,
  accent,
}: {
  briefing: ConceptBriefing;
  accent: AccentToken | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const accentClass = accent ? accentClasses[accent] : neutralAccent;

  return (
    <div className={`flex flex-col gap-3 rounded-2xl border ${accentClass.border} bg-surface p-5`}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded((v) => !v)}
        className="flex flex-col gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-display text-lg ${accentClass.text}`}>
            {briefing.title}
          </span>
          <span
            className={`rounded-full border px-2 py-0.5 text-xs font-medium ${difficultyBadge[briefing.difficulty]}`}
          >
            {difficultyLabel[briefing.difficulty]}
          </span>
        </div>
        <span className="text-xs text-muted">
          {briefing.courseCode} · {briefing.sourceRef}
        </span>
        <p className="text-sm text-text">{briefing.summary}</p>
        <span className="text-xs font-medium text-muted underline underline-offset-2">
          {expanded ? "Show less" : "Show full briefing"}
        </span>
      </button>

      {expanded && (
        <div id={contentId} className="flex flex-col gap-4 border-t border-line pt-4">
          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
              Sub-concepts
            </h3>
            <ul className="flex flex-col gap-1.5">
              {briefing.subConcepts.map((sub, i) => (
                <li key={i} className="text-sm text-text">
                  <span className="font-medium">{sub.title}</span>
                  <span className="text-muted"> — {sub.gloss}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
              Before the lecture
            </h3>
            <ul className="flex flex-col gap-1">
              {briefing.preLecture.map((item, i) => (
                <li key={i} className="text-sm text-text">
                  · {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
              Learning path after the lecture
            </h3>
            <ol className="flex flex-col gap-1">
              {briefing.learningPath.map((item, i) => (
                <li key={i} className="text-sm text-text">
                  {i + 1}. {item}
                </li>
              ))}
            </ol>
          </section>

          {briefing.tips && briefing.tips.length > 0 && (
            <section
              className={`flex flex-col gap-2 rounded-xl border ${accentClass.border} bg-surface-2 p-3`}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
                Tips
              </h3>
              <ul className="flex flex-col gap-1.5">
                {briefing.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-text">
                    · {tip}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
              Applications
            </h3>
            <ul className="flex flex-col gap-1">
              {briefing.applications.map((item, i) => (
                <li key={i} className="text-sm text-text">
                  · {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
              Examples
            </h3>
            <ul className="flex flex-col gap-1">
              {briefing.examples.map((item, i) => (
                <li key={i} className="text-sm text-text">
                  · {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
              Resources
            </h3>
            <ul className="flex flex-col gap-1">
              {briefing.resources.map((resource, i) => (
                <li key={i}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted underline underline-offset-2 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-1.5">
            {briefing.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-2 py-0.5 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
