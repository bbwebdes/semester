import { differenceInCalendarDays, parseISO } from "date-fns";
import type { Assessment } from "@/data/types";

export function hasConfirmedDate(
  assessment: Assessment,
): assessment is Assessment & { date: string } {
  return !!assessment.date && !assessment.tbc;
}

export function daysUntil(dateStr: string, now: Date): number {
  return differenceInCalendarDays(parseISO(dateStr), now);
}

export function sortByDate(
  assessments: Assessment[],
): (Assessment & { date: string })[] {
  return assessments
    .filter((a): a is Assessment & { date: string } => !!a.date)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getUpcoming(
  assessments: Assessment[],
  now: Date,
): (Assessment & { date: string })[] {
  return sortByDate(assessments).filter((a) => daysUntil(a.date, now) >= 0);
}

export function getNextConfirmed(
  assessments: Assessment[],
  now: Date,
): (Assessment & { date: string }) | undefined {
  return getUpcoming(assessments.filter(hasConfirmedDate), now)[0];
}

/** Assessment dates (confirmed or not) shared by more than one assessment. */
export function findDateClashes(
  assessments: Assessment[],
): Map<string, Assessment[]> {
  const byDate = new Map<string, Assessment[]>();
  assessments.forEach((a) => {
    if (!a.date) return;
    const list = byDate.get(a.date) ?? [];
    list.push(a);
    byDate.set(a.date, list);
  });

  const clashes = new Map<string, Assessment[]>();
  for (const [date, list] of byDate) {
    if (list.length > 1) clashes.set(date, list);
  }
  return clashes;
}

export const assessmentKindLabel: Record<Assessment["kind"], string> = {
  test: "Test",
  practest: "Practical Test",
  assignment: "Assignment",
  exam: "Exam",
};
