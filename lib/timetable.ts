import {
  addDays,
  addMinutes,
  areIntervalsOverlapping,
  differenceInMinutes,
  format,
  isWithinInterval,
  parse,
  startOfWeek,
} from "date-fns";
import type { Session, Weekday } from "@/data/types";

export const weekdays: Weekday[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const gridStart = "08:00";
export const gridEnd = "18:00";
export const slotMinutes = 15;

const REFERENCE_DATE = new Date(2000, 0, 3); // an arbitrary Monday

function parseTime(time: string): Date {
  return parse(time, "HH:mm", REFERENCE_DATE);
}

function sessionInterval(session: Session) {
  return { start: parseTime(session.start), end: parseTime(session.end) };
}

function minutesSince(reference: string, time: string): number {
  return differenceInMinutes(parseTime(time), parseTime(reference));
}

export function isConfirmed(session: Session): boolean {
  return !session.tbc;
}

export function slotsFor(session: Session): { rowStart: number; rowSpan: number } {
  const start = minutesSince(gridStart, session.start) / slotMinutes;
  const span = minutesSince(session.start, session.end) / slotMinutes;
  return { rowStart: Math.round(start), rowSpan: Math.round(span) };
}

export const totalSlots = minutesSince(gridStart, gridEnd) / slotMinutes;

export const hourMarks = (() => {
  const marks: string[] = [];
  const total = minutesSince(gridStart, gridEnd);
  for (let minutes = 0; minutes <= total; minutes += 60) {
    marks.push(format(addMinutes(parseTime(gridStart), minutes), "HH:mm"));
  }
  return marks;
})();

/** Sessions (by index into the full list) that overlap another confirmed session on the same day. */
export function findClashes(sessions: Session[]): Set<number> {
  const clashing = new Set<number>();
  const byDay = new Map<Weekday, { session: Session; index: number }[]>();

  sessions.forEach((session, index) => {
    if (!isConfirmed(session)) return;
    const list = byDay.get(session.day) ?? [];
    list.push({ session, index });
    byDay.set(session.day, list);
  });

  for (const list of byDay.values()) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = sessionInterval(list[i].session);
        const b = sessionInterval(list[j].session);
        if (areIntervalsOverlapping(a, b, { inclusive: false })) {
          clashing.add(list[i].index);
          clashing.add(list[j].index);
        }
      }
    }
  }

  return clashing;
}

export function getTodayLabel(now: Date): Weekday | null {
  const index = now.getDay(); // 0 = Sun ... 6 = Sat
  const map: Record<number, Weekday | null> = {
    0: null,
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };
  return map[index] ?? null;
}

export function isHappeningNow(session: Session, now: Date): boolean {
  if (!isConfirmed(session)) return false;
  if (session.day !== getTodayLabel(now)) return false;
  const nowOnReference = parseTime(format(now, "HH:mm"));
  return isWithinInterval(nowOnReference, sessionInterval(session));
}

const weekOrder: Weekday[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function weekPosition(day: Weekday, time: string): number {
  return weekOrder.indexOf(day) * 24 * 60 + minutesSince("00:00", time);
}

/**
 * Confirmed sessions still to come this week, soonest first, wrapping around to
 * next Monday if nothing remains before the end of Saturday. A session in progress
 * right now is excluded (see isHappeningNow for that).
 */
export function getUpcomingSessions(sessions: Session[], now: Date): Session[] {
  const confirmed = sessions.filter(isConfirmed);
  if (confirmed.length === 0) return [];

  const todayLabel = getTodayLabel(now);
  const nowMinutesOfDay = differenceInMinutes(
    now,
    new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  );
  const nowPosition = todayLabel
    ? weekOrder.indexOf(todayLabel) * 24 * 60 + nowMinutesOfDay
    : 6 * 24 * 60 + nowMinutesOfDay; // Sunday: after Saturday, before Monday wrap

  const withPosition = confirmed
    .filter((s) => !isHappeningNow(s, now))
    .map((s) => ({ session: s, position: weekPosition(s.day, s.start) }));

  const upcoming = withPosition
    .filter((s) => s.position >= nowPosition)
    .sort((a, b) => a.position - b.position);

  const wrapped = withPosition
    .filter((s) => s.position < nowPosition)
    .sort((a, b) => a.position - b.position);

  return [...upcoming, ...wrapped].map((s) => s.session);
}

export function findNextSession(
  sessions: Session[],
  now: Date,
): Session | undefined {
  return getUpcomingSessions(sessions, now)[0];
}

export function formatTimeRange(start: string, end: string): string {
  return `${start}–${end}`;
}

export const kindLabel: Record<Session["kind"], string> = {
  lecture: "Lecture",
  tutorial: "Tutorial",
  prac: "Prac",
};

/** The real calendar date (ISO "YYYY-MM-DD") of `day` in the same week as `now`. */
export function dateOfDayThisWeek(day: Weekday, now: Date): string {
  const monday = startOfWeek(now, { weekStartsOn: 1 });
  return format(addDays(monday, weekOrder.indexOf(day)), "yyyy-MM-dd");
}

/**
 * Groups sessions that only happen on specific real dates (the `dates` field —
 * e.g. MAM2012S/MAM2014S's alternating "some Wednesdays" Period-4 slot) by
 * day+start+end. Venue is deliberately not part of the key: what makes two
 * sessions "alternating" is that a student can't be in both at once (same
 * day/time), regardless of which room either happens to be in — and their real
 * venues can differ (MAM2012S meets in LS 2D on Wednesdays, MAM2014S in M320).
 * Only groups with 2+ candidates ("alternating groups") are returned — a
 * session with `dates` but no same-slot sibling isn't alternating with
 * anything and is left alone by both functions below.
 */
function findAlternatingGroups(sessions: Session[]): Session[][] {
  const groups = new Map<string, Session[]>();
  sessions.forEach((s) => {
    if (!s.dates || s.dates.length === 0) return;
    const key = `${s.day}|${s.start}|${s.end}`;
    const list = groups.get(key) ?? [];
    list.push(s);
    groups.set(key, list);
  });
  return Array.from(groups.values()).filter((g) => g.length >= 2);
}

/**
 * Resolves each alternating group down to whichever single candidate is real for
 * the current week (or none, if neither's `dates` list includes it), and returns
 * the full session list with the other candidate(s) removed. This is the
 * canonical "this week's real timetable" — used wherever sessions feed into
 * clash detection or weekly displays, so an alternating pair whose specific real
 * dates never coincide (see MAM2012S/MAM2014S) never even appears together, and
 * never produces a false-positive clash.
 */
export function resolveSessionsForWeek(sessions: Session[], now: Date): Session[] {
  const alternatingGroups = findAlternatingGroups(sessions);
  const excluded = new Set<Session>();
  alternatingGroups.forEach((group) => {
    const weekDate = dateOfDayThisWeek(group[0].day, now);
    const active = group.find((s) => s.dates!.includes(weekDate));
    group.forEach((s) => {
      if (s !== active) excluded.add(s);
    });
  });
  return sessions.filter((s) => !excluded.has(s));
}

export type WeekVariant = {
  id: string;
  label: string;
  courseCode: Session["courseCode"];
  /** The alternating-group candidate this variant includes, for date-matching. */
  chosen: Session;
  /** The full session list with every other candidate in this group removed. */
  sessions: Session[];
};

/**
 * If any sessions share a day/time/venue slot on different real dates (an
 * alternating group), returns one `WeekVariant` per candidate — each a full,
 * self-consistent session list containing only that candidate — so the UI can
 * offer an explicit "Week 1 / Week 2" toggle instead of ever rendering both
 * candidates at once (which would falsely clash). Returns null if there's no
 * alternating group in the data, so callers can skip the toggle entirely.
 *
 * Only the first alternating group found is turned into variants — today's data
 * has exactly one (MAM2012S/MAM2014S's shared Wed slot). If a second unrelated
 * alternating group is ever added, it should get its own toggle rather than
 * multiplying variants combinatorially with this one.
 */
export function buildWeekVariants(sessions: Session[]): WeekVariant[] | null {
  const [alternating] = findAlternatingGroups(sessions);
  if (!alternating) return null;

  return alternating.map((chosen, index) => {
    const excluded = new Set(alternating.filter((s) => s !== chosen));
    return {
      id: `week-${index + 1}`,
      label: `Week ${index + 1}`,
      courseCode: chosen.courseCode,
      chosen,
      sessions: sessions.filter((s) => !excluded.has(s)),
    };
  });
}
