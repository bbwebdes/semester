"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { Assessment, Course, StudyPlan } from "@/data/types";
import { accentClasses } from "@/lib/accent";
import { daysUntil } from "@/lib/tests";
import { ScrollStack } from "../../components/scroll-stack";

function startLabel(startDate: string, now: Date | null): string {
  if (!now) return "";
  const n = daysUntil(startDate, now);
  if (n > 0) return `Start studying in ${n} day${n === 1 ? "" : "s"}`;
  if (n === 0) return "Start studying today";
  return `Started ${Math.abs(n)} day${Math.abs(n) === 1 ? "" : "s"} ago`;
}

export function PlannerDetailView({
  plan,
  test,
  course,
}: {
  plan: StudyPlan;
  test: Assessment | undefined;
  course: Course | undefined;
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

  const accent = accentClasses[course?.accent ?? "sta"];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 md:px-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/planner"
          className="w-fit text-sm text-muted underline underline-offset-2 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          ← Planner
        </Link>
        <h1 className={`font-display text-3xl leading-none tracking-tight ${accent.text}`}>
          {plan.courseCode}
        </h1>
        <p className="text-lg text-text">{test?.title ?? plan.testId}</p>
        {test?.date && (
          <p className="text-sm text-muted">
            Test on {format(parseISO(test.date), "EEE d MMM")}
            {test.start ? ` · ${test.start}` : ""} · {test.venue ?? "TBC"}
          </p>
        )}
        <span className="mt-1 w-fit rounded-full border border-line bg-surface-2 px-3 py-1 text-sm font-medium text-text">
          {startLabel(plan.startDate, now)}
        </span>
      </div>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-sm font-semibold text-muted">Scope</h2>
        <ul className="flex flex-col gap-1.5">
          {plan.scope.map((item, i) => (
            <li key={i} className="text-sm text-text">
              · {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-sm font-semibold text-muted">Resources</h2>
        <ul className="flex flex-col gap-1.5">
          {plan.resources.map((resource, i) => (
            <li key={i} className="text-sm text-text">
              {resource.href ? (
                <a
                  href={resource.href}
                  className="underline underline-offset-2 hover:text-muted"
                >
                  {resource.label}
                </a>
              ) : (
                resource.label
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-muted">Timeline</h2>
        <ScrollStack
          planId={plan.id}
          phases={plan.phases}
          accent={course?.accent ?? "sta"}
        />
      </section>
    </div>
  );
}
