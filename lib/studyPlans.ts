import type { Assessment, StudyPlan } from "@/data/types";
import { daysUntil } from "./tests";

/**
 * Picks the single most relevant study plan to surface on the dashboard. Plans
 * whose linked test has already happened are excluded. Among the rest, prefers
 * whichever plan is already in its study window (`startDate` has arrived),
 * soonest test first; if none has started yet, falls back to whichever plan
 * starts soonest. Needed now that multiple plans can coexist — with only one
 * plan ever in `studyPlans`, any selection rule degenerates to "the one plan",
 * but that's no longer true once a plan exists per test.
 */
export function pickActivePlan(
  studyPlans: StudyPlan[],
  tests: Assessment[],
  now: Date,
): StudyPlan | undefined {
  const candidates = studyPlans
    .map((plan) => ({ plan, test: tests.find((t) => t.id === plan.testId) }))
    .filter(({ test }) => !test?.date || daysUntil(test.date, now) >= 0);

  const started = candidates
    .filter(({ plan }) => daysUntil(plan.startDate, now) <= 0)
    .sort((a, b) => {
      const da = a.test?.date ? daysUntil(a.test.date, now) : Infinity;
      const db = b.test?.date ? daysUntil(b.test.date, now) : Infinity;
      return da - db;
    });
  if (started.length > 0) return started[0].plan;

  const upcoming = candidates
    .filter(({ plan }) => daysUntil(plan.startDate, now) > 0)
    .sort((a, b) => daysUntil(a.plan.startDate, now) - daysUntil(b.plan.startDate, now));
  return upcoming[0]?.plan;
}

export function isPlanActive(plan: StudyPlan, now: Date): boolean {
  return daysUntil(plan.startDate, now) <= 0;
}
