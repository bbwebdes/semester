"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { Assessment, Course, StudyPlan } from "@/data/types";
import { accentClasses } from "@/lib/accent";
import { daysUntil } from "@/lib/tests";
import { BentoTile } from "../components/bento-tile";

function startLabel(startDate: string, now: Date | null): string {
  if (!now) return "";
  const n = daysUntil(startDate, now);
  if (n > 0) return `Start studying in ${n} day${n === 1 ? "" : "s"}`;
  if (n === 0) return "Start studying today";
  return `Started ${Math.abs(n)} day${Math.abs(n) === 1 ? "" : "s"} ago`;
}

export function PlannerView({
  studyPlans,
  tests,
  courses,
}: {
  studyPlans: StudyPlan[];
  tests: Assessment[];
  courses: Course[];
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

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 md:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl leading-none tracking-tight text-text">
          Planner
        </h1>
        <p className="text-base text-muted">
          Study plans, generated per test as one approaches.
        </p>
      </header>

      {studyPlans.length === 0 ? (
        <BentoTile>
          <p className="text-base text-muted">
            No study plans yet. Run the generation command from CLAUDE.md
            against an upcoming test to create one.
          </p>
        </BentoTile>
      ) : (
        <div className="flex flex-col gap-3">
          {studyPlans.map((plan) => {
            const test = tests.find((t) => t.id === plan.testId);
            const course = courses.find((c) => c.code === plan.courseCode);
            const accent = accentClasses[course?.accent ?? "sta"];
            const isStarted = now ? daysUntil(plan.startDate, now) <= 0 : false;

            return (
              <Link key={plan.id} href={`/planner/${plan.testId}`}>
                <BentoTile
                  glow={course?.accent ?? "neutral"}
                  urgent={isStarted}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className={`font-display text-xl ${accent.text}`}>
                        {plan.courseCode}
                      </span>
                      <p className="text-base text-text">
                        {test?.title ?? plan.testId}
                      </p>
                      {test?.date && (
                        <p className="text-sm text-muted">
                          Test on {format(parseISO(test.date), "EEE d MMM")}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-sm font-medium text-text">
                      {startLabel(plan.startDate, now)}
                    </span>
                  </div>
                </BentoTile>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
