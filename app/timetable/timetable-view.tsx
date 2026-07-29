"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { format, parseISO } from "date-fns";
import type { Course, Session, Weekday } from "@/data/types";
import { accentClasses } from "@/lib/accent";
import {
  findClashes,
  findDatedSessionSlots,
  findNextSession,
  formatTimeRange,
  getTodayLabel,
  gridStart,
  gridEnd,
  hourMarks,
  isHappeningNow,
  kindLabel,
  slotsFor,
  totalSlots,
  weekdays,
} from "@/lib/timetable";

type SessionCell = { kind: "session"; session: Session; rowSpan: number };
type EmptyCell = { kind: "empty" };
type Cell = SessionCell | EmptyCell | null;

type TableRow = {
  hourLabel: string | null;
  cells: Record<Weekday, Cell>;
};

function buildTableRows(confirmed: Session[]): TableRow[] {
  const occupiedUntil: Record<Weekday, number> = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };
  const byPosition = new Map<string, Session>();
  confirmed.forEach((session) => {
    const { rowStart } = slotsFor(session);
    byPosition.set(`${session.day}-${rowStart}`, session);
  });

  const rows: TableRow[] = [];
  for (let r = 0; r < totalSlots; r++) {
    const cells: Record<Weekday, Cell> = {
      Mon: null,
      Tue: null,
      Wed: null,
      Thu: null,
      Fri: null,
      Sat: null,
    };
    for (const day of weekdays) {
      if (occupiedUntil[day] > r) {
        cells[day] = null;
        continue;
      }
      const session = byPosition.get(`${day}-${r}`);
      if (session) {
        const { rowSpan } = slotsFor(session);
        cells[day] = { kind: "session", session, rowSpan };
        occupiedUntil[day] = r + rowSpan;
      } else {
        cells[day] = { kind: "empty" };
        occupiedUntil[day] = r + 1;
      }
    }
    rows.push({ hourLabel: r % 4 === 0 ? hourMarks[r / 4] : null, cells });
  }
  return rows;
}

function SessionContent({
  session,
  course,
  isNow,
  isNext,
}: {
  session: Session;
  course: Course | undefined;
  isNow: boolean;
  isNext: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const accent = accentClasses[course?.accent ?? "sta"];

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex h-full flex-col gap-0.5 rounded-lg border ${accent.border} ${accent.bg} border-l-4 p-1.5 text-left ${
        isNow ? `ring-2 ${accent.ring} ring-offset-1 ring-offset-base` : ""
      }`}
    >
      <div className="flex items-center justify-between gap-1">
        <span className={`text-xs font-semibold ${accent.text}`}>
          {session.courseCode}
        </span>
        {isNow && (
          <span className="rounded-full bg-ok/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ok">
            Now
          </span>
        )}
        {!isNow && isNext && (
          <span className="rounded-full border border-line px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
            Next
          </span>
        )}
      </div>
      <span className="text-[11px] leading-tight text-muted">
        {kindLabel[session.kind]} · {formatTimeRange(session.start, session.end)}
      </span>
      <span className="truncate text-[11px] leading-tight text-muted">
        {session.venue}
      </span>
      {session.note && (
        <span className="text-[10px] leading-tight text-muted/80">
          {session.note}
        </span>
      )}
    </motion.div>
  );
}

export function TimetableView({
  sessions,
  courses,
}: {
  sessions: Session[];
  courses: Course[];
}) {
  const [now, setNow] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState<Weekday>("Mon");
  const hasAutoSelected = useRef(false);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const kickoff = setTimeout(tick, 0);
    const interval = setInterval(tick, 30_000);
    return () => {
      clearTimeout(kickoff);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (hasAutoSelected.current || !now) return;
    const timeout = setTimeout(() => {
      const today = getTodayLabel(now);
      if (today && weekdays.includes(today)) {
        setSelectedDay(today);
      }
      hasAutoSelected.current = true;
    }, 0);
    return () => clearTimeout(timeout);
  }, [now]);

  const courseByCode = useMemo(() => {
    const map = new Map<string, Course>();
    courses.forEach((c) => map.set(c.code, c));
    return map;
  }, [courses]);

  const clashIndices = useMemo(() => findClashes(sessions), [sessions]);

  const { clean, clashing, unresolved } = useMemo(() => {
    const clean: Session[] = [];
    const clashing: Session[] = [];
    const unresolved: Session[] = [];
    sessions.forEach((session, index) => {
      if (session.tbc) {
        unresolved.push(session);
      } else if (clashIndices.has(index)) {
        clashing.push(session);
      } else {
        clean.push(session);
      }
    });
    return { clean, clashing, unresolved };
  }, [sessions, clashIndices]);

  const nextSession = useMemo(
    () => (now ? findNextSession(clean, now) : undefined),
    [clean, now],
  );

  const datedSlots = useMemo(
    () => (now ? findDatedSessionSlots(sessions, now) : []),
    [sessions, now],
  );

  const rows = useMemo(() => buildTableRows(clean), [clean]);

  const agendaSessions = useMemo(
    () =>
      clean
        .filter((s) => s.day === selectedDay)
        .sort((a, b) => slotsFor(a).rowStart - slotsFor(b).rowStart),
    [clean, selectedDay],
  );

  const todayLabel = now ? getTodayLabel(now) : null;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 md:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl leading-none tracking-tight text-text">
          Timetable
        </h1>
        <p className="text-base text-muted">
          {gridStart}–{gridEnd}, Mon–Fri. Colour-coded by module.
        </p>
      </header>

      {clashing.length > 0 && (
        <div
          role="alert"
          className="flex flex-col gap-2 rounded-2xl border border-danger/70 bg-danger/10 p-4 text-sm text-danger"
        >
          <p className="font-semibold">
            {clashing.length} session{clashing.length > 1 ? "s" : ""} overlap
            another session — needs resolving
          </p>
          <ul className="flex flex-col gap-1">
            {clashing.map((session, i) => (
              <li key={i}>
                {session.courseCode} {kindLabel[session.kind]} · {session.day}{" "}
                {formatTimeRange(session.start, session.end)} · {session.venue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {datedSlots.length > 0 && (
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-4">
          <h2 className="text-sm font-semibold text-muted">
            This week&apos;s alternating slot
          </h2>
          <ul className="flex flex-col gap-1 text-sm">
            {datedSlots.map((slot, i) => {
              const dateLabel = format(parseISO(slot.weekDate), "EEE d MMM");
              const accent = slot.active
                ? accentClasses[
                    courseByCode.get(slot.active.courseCode)?.accent ?? "sta"
                  ]
                : null;
              return (
                <li key={i} className="text-text">
                  <span className="text-muted">{dateLabel}: </span>
                  {slot.active ? (
                    <span className={`font-semibold ${accent?.text ?? ""}`}>
                      {slot.active.courseCode} lecture, {slot.venue}
                    </span>
                  ) : (
                    <span className="text-muted">
                      no lecture in this {slot.day} {formatTimeRange(slot.start, slot.end)} slot this week
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Desktop grid */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th scope="col" className="w-16 border-b border-line" />
              {weekdays.map((day) => (
                <th
                  key={day}
                  scope="col"
                  className={`border-b border-line px-2 py-2 text-center text-sm font-semibold ${
                    day === todayLabel ? "bg-surface-2 text-text" : "text-muted"
                  }`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} style={{ height: "1.25rem" }}>
                {row.hourLabel !== null && (
                  <th
                    scope="row"
                    rowSpan={4}
                    className="border-t border-line px-2 pt-1 text-right align-top text-xs font-normal text-muted"
                  >
                    {row.hourLabel}
                  </th>
                )}
                {weekdays.map((day) => {
                  const cell = row.cells[day];
                  if (cell === null) return null;
                  if (cell.kind === "empty") {
                    return (
                      <td
                        key={day}
                        className={`border-t border-line/60 ${
                          day === todayLabel ? "bg-surface-2/30" : ""
                        }`}
                      />
                    );
                  }
                  const { session, rowSpan } = cell;
                  return (
                    <td
                      key={day}
                      rowSpan={rowSpan}
                      className={`border-t border-line/60 p-1 align-top ${
                        day === todayLabel ? "bg-surface-2/30" : ""
                      }`}
                    >
                      <SessionContent
                        session={session}
                        course={courseByCode.get(session.courseCode)}
                        isNow={now ? isHappeningNow(session, now) : false}
                        isNext={session === nextSession}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile agenda */}
      <div className="flex flex-col gap-3 md:hidden">
        <div
          role="tablist"
          aria-label="Day of week"
          className="flex gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1"
        >
          {weekdays.map((day) => (
            <button
              key={day}
              type="button"
              role="tab"
              aria-selected={selectedDay === day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                selectedDay === day
                  ? "bg-surface-2 text-text"
                  : "text-muted hover:text-text"
              }`}
            >
              {day}
              {day === todayLabel && (
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle"
                />
              )}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="flex flex-col gap-2">
          {agendaSessions.length === 0 && (
            <p className="rounded-2xl border border-line bg-surface p-4 text-sm text-muted">
              No sessions on {selectedDay}.
            </p>
          )}
          {agendaSessions.map((session, i) => (
            <div key={i} className="h-20">
              <SessionContent
                session={session}
                course={courseByCode.get(session.courseCode)}
                isNow={now ? isHappeningNow(session, now) : false}
                isNext={session === nextSession}
              />
            </div>
          ))}
        </div>
      </div>

      {unresolved.length > 0 && (
        <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-line bg-surface p-4">
          <h2 className="text-sm font-semibold text-muted">
            Set your slot
          </h2>
          <ul className="flex flex-col gap-2">
            {unresolved.map((session, i) => {
              const course = courseByCode.get(session.courseCode);
              const accent = accentClasses[course?.accent ?? "sta"];
              return (
                <li
                  key={i}
                  className={`flex flex-col gap-0.5 rounded-lg border ${accent.border} bg-surface-2/50 p-3`}
                >
                  <span className={`text-sm font-semibold ${accent.text}`}>
                    {session.courseCode} · {kindLabel[session.kind]}
                  </span>
                  <span className="text-sm text-muted">{session.note}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
