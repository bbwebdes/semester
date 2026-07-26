"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { Assessment, Course, Session, StudyPlan } from "@/data/types";
import { accentClasses } from "@/lib/accent";
import {
  formatTimeRange,
  getTodayLabel,
  getUpcomingSessions,
  isHappeningNow,
  kindLabel,
} from "@/lib/timetable";
import { daysUntil, findDateClashes, getNextConfirmed } from "@/lib/tests";
import { BentoTile } from "./components/bento-tile";

function courseFor(courses: Course[], code: string) {
  return courses.find((c) => c.code === code);
}

function NextClassTile({
  sessions,
  courses,
  now,
}: {
  sessions: Session[];
  courses: Course[];
  now: Date | null;
}) {
  const next = now ? getUpcomingSessions(sessions, now)[0] : undefined;
  const course = next ? courseFor(courses, next.courseCode) : undefined;
  const accent = accentClasses[course?.accent ?? "sta"];
  const happeningNow = next && now ? isHappeningNow(next, now) : false;

  return (
    <BentoTile glow={course?.accent ?? "neutral"} className="md:col-span-2">
      <h2 className="text-sm font-medium text-muted">Next class</h2>
      {!now || !next ? (
        <p className="mt-2 text-base text-muted">Loading…</p>
      ) : (
        <div className="mt-2 flex flex-1 flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className={`font-display text-2xl ${accent.text}`}>
                {next.courseCode}
              </span>
              {happeningNow && (
                <span className="rounded-full bg-ok/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-ok">
                  Now
                </span>
              )}
            </div>
            <p className="text-base text-text">
              {kindLabel[next.kind]} · {next.day} ·{" "}
              {formatTimeRange(next.start, next.end)}
            </p>
            <p className="text-sm text-muted">{next.venue}</p>
          </div>
        </div>
      )}
    </BentoTile>
  );
}

function NextTestTile({
  tests,
  courses,
  now,
  urgent,
}: {
  tests: Assessment[];
  courses: Course[];
  now: Date | null;
  urgent: boolean;
}) {
  const next = now ? getNextConfirmed(tests, now) : undefined;
  const course = next ? courseFor(courses, next.courseCode) : undefined;
  const accent = accentClasses[course?.accent ?? "sta"];
  const clashes = next ? findDateClashes(tests).get(next.date) : undefined;

  return (
    <BentoTile
      glow={course?.accent ?? "neutral"}
      urgent={urgent && !!next}
      className="md:col-span-2"
    >
      <h2 className="text-sm font-medium text-muted">Next test</h2>
      {!now ? (
        <p className="mt-2 text-base text-muted">Loading…</p>
      ) : !next ? (
        <p className="mt-2 text-base text-muted">
          No upcoming tests with a confirmed date.
        </p>
      ) : (
        <div className="mt-2 flex flex-1 items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className={`font-display text-2xl ${accent.text}`}>
              {next.courseCode}
            </span>
            <p className="text-base text-text">{next.title}</p>
            <p className="text-sm text-muted">
              {format(parseISO(next.date), "EEE d MMM")}
              {next.start ? ` · ${next.start}` : ""} · {next.venue ?? "TBC"}
            </p>
            {next.confirm && (
              <span className="mt-1 w-fit rounded-full border border-danger/70 bg-danger/10 px-2 py-0.5 text-xs font-medium text-danger">
                Verify on Amathuba
              </span>
            )}
            {clashes && clashes.length > 1 && (
              <span className="mt-1 w-fit rounded-full border border-danger/70 bg-danger/10 px-2 py-0.5 text-xs font-medium text-danger">
                Clash: {clashes.length} assessments same day
              </span>
            )}
          </div>
          <span className="font-display text-3xl leading-none text-text">
            {daysUntil(next.date, now)}
            <span className="ml-1 text-sm font-sans font-normal text-muted">
              {daysUntil(next.date, now) === 1 ? "day" : "days"}
            </span>
          </span>
        </div>
      )}
    </BentoTile>
  );
}

function ThisWeekTile({
  sessions,
  courses,
  now,
}: {
  sessions: Session[];
  courses: Course[];
  now: Date | null;
}) {
  const upcoming = now ? getUpcomingSessions(sessions, now).slice(0, 4) : [];

  return (
    <BentoTile className="md:col-span-1">
      <h2 className="text-sm font-medium text-muted">This week</h2>
      {!now ? (
        <p className="mt-2 text-base text-muted">Loading…</p>
      ) : (
        <ul className="mt-2 flex flex-1 flex-col gap-2">
          {upcoming.map((session, i) => {
            const course = courseFor(courses, session.courseCode);
            const accent = accentClasses[course?.accent ?? "sta"];
            return (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.bg} ring-1 ${accent.ring}`} />
                <span className={`font-medium ${accent.text}`}>
                  {session.courseCode}
                </span>
                <span className="truncate text-muted">
                  {session.day} {session.start}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </BentoTile>
  );
}

function UrgentFlagsTile({
  tests,
  sessions,
  now,
}: {
  tests: Assessment[];
  sessions: Session[];
  now: Date | null;
}) {
  const dateClashes = findDateClashes(tests);
  const confirmCount = tests.filter((t) => t.confirm).length;
  const unsetSlots = sessions.filter((s) => s.tbc);
  const todayLabel = now ? getTodayLabel(now) : null;

  const flags: { text: string; href?: string }[] = [];
  for (const [date, clashing] of dateClashes) {
    flags.push({
      text: `${clashing.map((a) => a.courseCode).join(" & ")} clash on ${format(parseISO(date), "d MMM")}`,
      href: "/tests",
    });
  }
  if (confirmCount > 0) {
    flags.push({
      text: `${confirmCount} date${confirmCount > 1 ? "s" : ""} need verifying on Amathuba`,
      href: "/tests",
    });
  }
  if (unsetSlots.length > 0) {
    flags.push({
      text: `${unsetSlots.length} timetable slot${unsetSlots.length > 1 ? "s" : ""} still unset`,
      href: "/timetable",
    });
  }

  return (
    <BentoTile className="md:col-span-1">
      <h2 className="text-sm font-medium text-muted">Urgent flags</h2>
      {!now ? (
        <p className="mt-2 text-base text-muted">Loading…</p>
      ) : flags.length === 0 ? (
        <p className="mt-2 text-base text-muted">Nothing needs attention.</p>
      ) : (
        <ul className="mt-2 flex flex-1 flex-col gap-2">
          {flags.map((flag, i) => (
            <li key={i}>
              {flag.href ? (
                <Link
                  href={flag.href}
                  className="block rounded-lg border border-danger/70 bg-danger/10 px-3 py-2 text-sm text-danger transition-colors duration-200 ease-out hover:bg-danger/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {flag.text}
                </Link>
              ) : (
                <p className="rounded-lg border border-danger/70 bg-danger/10 px-3 py-2 text-sm text-danger">
                  {flag.text}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      {todayLabel === null && (
        <p className="mt-2 text-xs text-muted">
          No classes today — it&apos;s the weekend.
        </p>
      )}
    </BentoTile>
  );
}

function ActivePlanTile({
  studyPlans,
  tests,
  courses,
  now,
}: {
  studyPlans: StudyPlan[];
  tests: Assessment[];
  courses: Course[];
  now: Date | null;
}) {
  const plan = now
    ? studyPlans.find((p) => daysUntil(p.startDate, now) >= 0)
    : studyPlans[0];
  const test = plan ? tests.find((t) => t.id === plan.testId) : undefined;
  const course = plan ? courseFor(courses, plan.courseCode) : undefined;
  const accent = accentClasses[course?.accent ?? "sta"];
  const startsIn = plan && now ? daysUntil(plan.startDate, now) : null;
  const isStartingToday = startsIn !== null && startsIn <= 0;

  return (
    <BentoTile
      glow={course?.accent ?? "neutral"}
      urgent={isStartingToday}
      className="md:col-span-2"
    >
      <h2 className="text-sm font-medium text-muted">Active study plan</h2>
      {!plan ? (
        <p className="mt-2 text-base text-muted">
          No active study plan yet. Plans are generated per test as one
          approaches —{" "}
          <Link
            href="/planner"
            className="text-text underline underline-offset-2 hover:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            view the planner
          </Link>
          .
        </p>
      ) : (
        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className={`font-display text-xl ${accent.text}`}>
              {plan.courseCode}
            </span>
            <p className="text-base text-text">{test?.title ?? plan.testId}</p>
            <Link
              href={`/planner/${plan.testId}`}
              className="w-fit text-sm text-muted underline underline-offset-2 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View timeline
            </Link>
          </div>
          {startsIn !== null && (
            <span className="shrink-0 text-sm font-medium text-text">
              {startsIn > 0
                ? `Starts in ${startsIn} day${startsIn === 1 ? "" : "s"}`
                : startsIn === 0
                  ? "Start today"
                  : "In progress"}
            </span>
          )}
        </div>
      )}
    </BentoTile>
  );
}

export function DashboardView({
  courses,
  sessions,
  tests,
  studyPlans,
}: {
  courses: Course[];
  sessions: Session[];
  tests: Assessment[];
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

  const planStartingNow = now
    ? studyPlans.some((p) => daysUntil(p.startDate, now) <= 0)
    : false;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 md:px-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Semester</p>
        <h1 className="font-display text-3xl leading-none tracking-tight text-text">
          Good to see you.
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <NextClassTile sessions={sessions} courses={courses} now={now} />
        <NextTestTile
          tests={tests}
          courses={courses}
          now={now}
          urgent={!planStartingNow}
        />
        <ThisWeekTile sessions={sessions} courses={courses} now={now} />
        <UrgentFlagsTile tests={tests} sessions={sessions} now={now} />
        <ActivePlanTile
          studyPlans={studyPlans}
          tests={tests}
          courses={courses}
          now={now}
        />
      </div>
    </div>
  );
}
