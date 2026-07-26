"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { Assessment, Course, StudyPlan } from "@/data/types";
import { accentClasses } from "@/lib/accent";
import {
  assessmentKindLabel,
  daysUntil,
  findDateClashes,
  hasConfirmedDate,
  sortByDate,
} from "@/lib/tests";
import { BentoTile } from "../components/bento-tile";

function courseFor(courses: Course[], code: string) {
  return courses.find((c) => c.code === code);
}

function Countdown({ date, now }: { date: string; now: Date | null }) {
  if (!now) {
    return <span className="font-display text-2xl text-muted">—</span>;
  }
  const n = daysUntil(date, now);
  const label = n === 0 ? "today" : n === 1 ? "day" : n < 0 ? "days ago" : "days";
  return (
    <span className="font-display text-2xl leading-none text-text">
      {Math.abs(n)}
      <span className="ml-1 text-sm font-sans font-normal text-muted">
        {label}
      </span>
    </span>
  );
}

function AssessmentRow({
  assessment,
  course,
  now,
  isClashing,
  plan,
  urgent,
}: {
  assessment: Assessment & { date: string };
  course: Course | undefined;
  now: Date | null;
  isClashing: boolean;
  plan: StudyPlan | undefined;
  urgent: boolean;
}) {
  const accent = accentClasses[course?.accent ?? "sta"];
  const isPast = now ? daysUntil(assessment.date, now) < 0 : false;

  return (
    <BentoTile
      glow={course?.accent ?? "neutral"}
      urgent={urgent}
      className={isPast ? "opacity-70" : ""}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-display text-xl ${accent.text}`}>
              {assessment.courseCode}
            </span>
            <span className="text-sm text-muted">
              {assessmentKindLabel[assessment.kind]}
            </span>
          </div>
          <p className="text-base text-text">{assessment.title}</p>
          <p className="text-sm text-muted">
            {format(parseISO(assessment.date), "EEE d MMM")}
            {assessment.start ? ` · ${assessment.start}` : ""}
            {assessment.end ? `–${assessment.end}` : ""} ·{" "}
            {assessment.venue ?? "TBC"}
            {assessment.weight !== undefined
              ? ` · ${Math.round(assessment.weight * 100)}%`
              : ""}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {assessment.confirm && (
              <span className="w-fit rounded-full border border-danger/70 bg-danger/10 px-2 py-0.5 text-xs font-medium text-danger">
                Verify on Amathuba
              </span>
            )}
            {isClashing && (
              <span className="w-fit rounded-full border border-danger/70 bg-danger/10 px-2 py-0.5 text-xs font-medium text-danger">
                Clashes with another assessment
              </span>
            )}
            {plan ? (
              <Link
                href={`/planner/${assessment.id}`}
                className="w-fit rounded-full border border-line px-2 py-0.5 text-xs font-medium text-muted underline underline-offset-2 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                View study plan
              </Link>
            ) : null}
          </div>
        </div>
        <Countdown date={assessment.date} now={now} />
      </div>
    </BentoTile>
  );
}

export function TestsView({
  tests,
  courses,
  studyPlans,
}: {
  tests: Assessment[];
  courses: Course[];
  studyPlans: StudyPlan[];
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const kickoff = setTimeout(tick, 0);
    const interval = setInterval(tick, 30_000);
    return () => {
      clearTimeout(kickoff);
      clearInterval(interval);
    };
  }, []);

  const confirmed = tests.filter(hasConfirmedDate);
  const tentative = tests.filter((t) => !hasConfirmedDate(t));
  const dated = sortByDate(confirmed);
  const clashes = findDateClashes(confirmed);
  const clashDates = [...clashes.keys()];
  const nextDated = dated.find((t) => (now ? daysUntil(t.date, now) >= 0 : false));

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 md:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl leading-none tracking-tight text-text">
          Tests
        </h1>
        <p className="text-base text-muted">
          Every assessment, soonest first, with a countdown.
        </p>
      </header>

      {clashDates.length > 0 && (
        <div
          role="alert"
          className="flex flex-col gap-2 rounded-2xl border border-danger/70 bg-danger/10 p-4 text-sm text-danger"
        >
          <p className="font-semibold">
            {clashDates.length} date{clashDates.length > 1 ? "s" : ""} have
            more than one assessment
          </p>
          <ul className="flex flex-col gap-1">
            {clashDates.map((date) => (
              <li key={date}>
                {format(parseISO(date), "EEE d MMM")}:{" "}
                {clashes
                  .get(date)!
                  .map((a) => `${a.courseCode} ${a.title}`)
                  .join(" & ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {dated.map((assessment) => (
          <AssessmentRow
            key={assessment.id}
            assessment={assessment}
            course={courseFor(courses, assessment.courseCode)}
            now={now}
            isClashing={clashes.has(assessment.date)}
            plan={studyPlans.find((p) => p.testId === assessment.id)}
            urgent={!!nextDated && assessment.id === nextDated.id}
          />
        ))}
      </div>

      {tentative.length > 0 && (
        <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-line bg-surface p-4">
          <h2 className="text-sm font-semibold text-muted">
            Date tentative / TBC
          </h2>
          <ul className="flex flex-col gap-2">
            {tentative.map((assessment) => {
              const course = courseFor(courses, assessment.courseCode);
              const accent = accentClasses[course?.accent ?? "sta"];
              return (
                <li
                  key={assessment.id}
                  className={`flex flex-col gap-0.5 rounded-lg border ${accent.border} bg-surface-2/50 p-3`}
                >
                  <span className={`text-sm font-semibold ${accent.text}`}>
                    {assessment.courseCode} ·{" "}
                    {assessmentKindLabel[assessment.kind]}
                  </span>
                  <span className="text-sm text-text">{assessment.title}</span>
                  <span className="text-sm text-muted">
                    {assessment.date
                      ? `Approx. week of ${format(parseISO(assessment.date), "d MMM")}`
                      : "No date announced yet"}
                    {assessment.weight !== undefined
                      ? ` · ${Math.round(assessment.weight * 100)}% of class mark`
                      : ""}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
