import Link from "next/link";
import { notFound } from "next/navigation";
import { format, isBefore, parseISO, startOfDay } from "date-fns";
import { courses } from "@/data/courses";
import { timetable } from "@/data/timetable";
import { moduleUpdates } from "@/data/moduleUpdates";
import type { CourseCode } from "@/data/types";
import { accentClasses } from "@/lib/accent";
import { formatTimeRange, kindLabel, weekdays } from "@/lib/timetable";

export function generateStaticParams() {
  return courses.map((course) => ({ code: course.code }));
}

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const course = courses.find((c) => c.code === code);
  if (!course) notFound();

  const accent = accentClasses[course.accent];
  const sessions = timetable.filter((s) => s.courseCode === course.code);
  const confirmedSessions = sessions
    .filter((s) => !s.tbc)
    .sort((a, b) => {
      const dayDiff = weekdays.indexOf(a.day) - weekdays.indexOf(b.day);
      return dayDiff !== 0 ? dayDiff : a.start.localeCompare(b.start);
    });
  const unsetSessions = sessions.filter((s) => s.tbc);

  const updates = moduleUpdates
    .filter((u) => u.courseCode === (course.code as CourseCode))
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const today = startOfDay(new Date());

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 md:px-6">
      <div className="flex flex-col gap-2">
        <Link
          href="/modules"
          className="w-fit text-sm text-muted underline underline-offset-2 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          ← Modules
        </Link>
        <h1 className={`font-display text-3xl leading-none tracking-tight ${accent.text}`}>
          {course.code}
        </h1>
        <p className="text-lg text-text">{course.title}</p>
      </div>

      <section className={`flex flex-col gap-3 rounded-2xl border ${accent.border} bg-surface p-5`}>
        <h2 className="text-sm font-semibold text-muted">Convenor & contacts</h2>
        <ul className="flex flex-col gap-3">
          {[course.convenor, ...course.contacts].map((contact, i) => (
            <li key={i} className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-text">
                {contact.name} · <span className="text-muted">{contact.role}</span>
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="w-fit text-sm text-muted underline underline-offset-2 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {contact.email}
              </a>
              {contact.office && (
                <span className="text-xs text-muted">{contact.office}</span>
              )}
              {contact.note && (
                <span className="text-xs text-muted/80">{contact.note}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-sm font-semibold text-muted">Schedule</h2>
        <p className="text-sm text-text">{course.lectureInfo}</p>
        {confirmedSessions.length > 0 && (
          <ul className="flex flex-col gap-1.5 border-t border-line pt-3">
            {confirmedSessions.map((session, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className={`w-16 shrink-0 font-medium ${accent.text}`}>
                  {session.day}
                </span>
                <span className="text-muted">
                  {kindLabel[session.kind]} · {formatTimeRange(session.start, session.end)} ·{" "}
                  {session.venue}
                </span>
              </li>
            ))}
          </ul>
        )}
        {unsetSessions.length > 0 && (
          <ul className="flex flex-col gap-1.5 border-t border-dashed border-line pt-3">
            {unsetSessions.map((session, i) => (
              <li key={i} className="text-sm text-muted">
                {kindLabel[session.kind]} — slot not yet chosen
                {session.note ? `: ${session.note}` : ""}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-sm font-semibold text-muted">Assessment weights</h2>
        <ul className="flex flex-col gap-1.5">
          {course.assessmentWeights.map((w, i) => (
            <li key={i} className="flex items-center justify-between text-sm">
              <span className="text-text">{w.label}</span>
              <span className="font-display text-text">
                {Math.round(w.weight * 100)}%
              </span>
            </li>
          ))}
        </ul>
        <p className="border-t border-line pt-3 text-sm text-muted">
          {course.finalMarkFormula}
        </p>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-sm font-semibold text-muted">DP requirements</h2>
        <ul className="flex flex-col gap-1.5">
          {course.dpRules.map((rule, i) => (
            <li key={i} className="text-sm text-text">
              · {rule}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-sm font-semibold text-muted">Updates</h2>
        {updates.length === 0 ? (
          <p className="text-sm text-muted">No updates recorded yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {updates.map((update, i) => {
              const isPast = isBefore(parseISO(update.date), today);
              return (
                <li
                  key={i}
                  className={`flex flex-col gap-0.5 border-l-2 pl-3 ${
                    isPast ? "border-line" : accent.border
                  }`}
                >
                  <span className="text-xs text-muted">
                    {format(parseISO(update.date), "EEE d MMM")}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isPast ? "text-muted" : "text-text"
                    }`}
                  >
                    {update.title}
                  </span>
                  <span className="text-sm text-muted">{update.body}</span>
                  {update.source && (
                    <span className="text-xs text-muted">
                      Source: {update.source}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
