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

export type DatedSessionSlot = {
  day: Weekday;
  start: string;
  end: string;
  venue: string;
  /** This week's real date for `day`. */
  weekDate: string;
  /** The session whose `dates` list includes `weekDate`, if any. */
  active: Session | null;
  /** Every session sharing this day/time/venue slot across different real dates. */
  candidates: Session[];
};

/**
 * Groups sessions that only happen on specific real dates (the `dates` field —
 * e.g. MAM2012S/MAM2014S's alternating "some Wednesdays" Period-4/M320 slot) by
 * day+start+end+venue, and resolves which one (if any) is the real session for
 * the current week. Lets the UI answer "which course's lecture is this actually,
 * this week?" instead of just flagging a same-slot clash every week regardless
 * of the real calendar.
 */
export function findDatedSessionSlots(
  sessions: Session[],
  now: Date,
): DatedSessionSlot[] {
  const dated = sessions.filter((s) => s.dates && s.dates.length > 0);
  const groups = new Map<string, Session[]>();
  dated.forEach((s) => {
    const key = `${s.day}|${s.start}|${s.end}|${s.venue}`;
    const list = groups.get(key) ?? [];
    list.push(s);
    groups.set(key, list);
  });

  return Array.from(groups.values()).map((candidates) => {
    const { day, start, end, venue } = candidates[0];
    const weekDate = dateOfDayThisWeek(day, now);
    const active = candidates.find((s) => s.dates!.includes(weekDate)) ?? null;
    return { day, start, end, venue, weekDate, active, candidates };
  });
}
