# PROJECT STATUS — Semester (Personal UCT Dashboard)

> Maintained by Claude Code. Updated at the end of every working block.
> Last updated: 2026-07-26 — step 2 complete

## Current state (one paragraph)

Steps 1–2 are built. Step 1: Next.js 16 (App Router, TypeScript, Tailwind v4) scaffolded,
design tokens + both Google Fonts wired, nav shell with placeholder routes. Step 2: the
data layer now exists — `/data/types.ts` defines `Course`, `Session`, `Assessment`,
`Update`, `StudyPlan` (plus supporting `Contact`/`AssessmentWeight`/etc.), and
`/data/courses.ts`, `/data/timetable.ts`, `/data/tests.ts`, `/data/moduleUpdates.ts`,
`/data/studyPlans.ts` are seeded from the real outlines in `/course-docs` (STA2005S PDF,
CSC1016S PDF, and the MAM2013S "Course Information" HTML — note a second HTML in
`/course-docs` is for MAM2014S/2RA Real Analysis, a different course, and was not used).
`studyPlans.ts` is an empty typed array (no plan generated yet — step 7). No UI consumes
`/data` yet; that starts at step 3 (timetable). Architecture stays as agreed: typed data
in `/data` as the single source of truth, Claude Code as the ingestion engine (no runtime
API, no database), `localStorage` only for ephemeral personal state. Next action is
build-order step 3 (timetable weekly grid).

## Section tracker

| Section | Status | Notes |
|---|---|---|
| Scaffold / tokens / fonts / nav shell | done | Step 1. Next.js 16 + TS + Tailwind v4, tokens + fonts wired, Pill Nav (desktop) + Bottom Dock (mobile), placeholder routes, dark placeholder home. Build + lint clean. |
| Data layer (`/data`) | done | Step 2. `types.ts` + courses/timetable/tests/moduleUpdates/studyPlans seeded from real `/course-docs`; STA test dates flagged `confirm:true` per the prose/grid inconsistency. |
| Timetable | todo | Step 3. Colour-coded weekly grid, `tbc` slots, clash detection, now/next, mobile agenda |
| Dashboard home | todo | Step 4. Magic Bento — next class, next test + countdown, active plan, this week, urgent flags |
| Modules | todo | Step 5. `/modules` Tilted Cards + `/modules/[code]` detail + update feed |
| Test dates | todo | Step 6. `/tests` list, countdowns, clash flags, `confirm` markers, plan links |
| Study planner | todo | Step 7. `/planner` + Scroll Stack timeline; generation command; localStorage check-offs |
| Polish / a11y / perf | todo | Step 8. Specular Button, Star Border, Gradual Blur; responsive 360; Lighthouse ≥90; deploy |

Status meanings: **todo** = not started · **in progress** · **done** = built + self-QA passed
· **reviewed** = owner approved at checkpoint.

## Quality gates (latest run)

`npm run build` and `npm run lint` both pass clean (TypeScript strict mode included — all
5 `/data` modules type-check with no `any`). Step 2 adds no UI, so there is nothing new to
screenshot/Lighthouse this block; the step 1 caveat stands — no Playwright/Lighthouse run
yet (no browser automation tool connected this session). Full Lighthouse + screenshot QA
should run once a browser tool is available and once step 3 (timetable) adds rendered
content that consumes `/data`.

## In progress

Nothing in progress. Step 2 complete; awaiting review before step 3 (timetable).

## Decisions log

<!-- Append-only. One line per decision, newest first. -->
(day 0) — Study planner scoped to schedule/scope guidance only (topics, timing, tasks,
resources) — not worked solutions or written coursework. Personal organisational tool.
(day 0) — Module identity by accent token used everywhere (STA blue `#4C9AFF`, CSC green
`#3DD68C`, MAM violet `#C084FC`); amber `#F5A524` reserved for CTAs + "start studying"
urgency; `danger` for clashes/`confirm` markers.
(day 0) — react.bits set chosen for restraint: Magic Bento (dashboard), Scroll Stack
(study-plan timeline), Pill Nav + Bottom Dock (nav), Tilted Card (module tiles), Specular
Button / Star Border / Gradual Blur (accents). Ambient components (Ferrofluid, Splash
Cursor, etc.) excluded to protect the perf/readability budget.
(day 0) — Stack trimmed from the reference project: no image pipeline, no GSAP, minimal
Lenis. `date-fns` added for all date math.
(day 0) — No runtime Anthropic API for v1. Content updates flow through `/inbox` + a Claude
Code ingestion prompt that writes typed `/data`; Vercel redeploys on push. In-browser
upload + API parsing is a possible v2, deferred (adds keys, storage, per-token cost).
(day 0) — Data model: everything renders from typed `/data`; a date/venue change is a data
edit only. `localStorage` for ephemeral personal state (task check-offs) only.
(2026-07-26) — Step 1 scaffolded with Next.js 16 (satisfies "14+") and Tailwind v4;
Tailwind v4 uses a CSS-first `@theme` block in `globals.css` instead of `tailwind.config.*`
for token definitions — functionally equivalent, no config file needed.
(2026-07-26) — GitHub repo created and pushed: https://github.com/bbwebdes/semester
(public, per owner choice).
(2026-07-26) — `Assessment.date` made optional and an `Assessment.tbc?: boolean` flag added
(CLAUDE.md's schema listed `date` as required). Several real assessments have no date at
all yet (STA practical test, STA Assignment 1, CSC practical tests pinned only to a
week-range) — mirrors the `tbc` pattern already used on `Session`, so `/tests` can render
"date TBC" instead of a fabricated countdown.
(2026-07-26) — Cross-checked the STA2005S outline's conflicting Test 1/2 dates against the
2026 calendar: neither the prose date nor the grid date matches its own claimed weekday
for either test. Per CLAUDE.md's explicit instruction ("seed the prose dates, mark
confirm: true"), did not attempt to resolve the discrepancy — seeded 2 Sep / 13 Oct
verbatim with `confirm: true` and logged both as `moduleUpdates` reminders.
(2026-07-26) — `course-docs/Course Information.html` (no suffix) is the MAM2014S ("2RA",
Real Analysis) outline, not MAM2013S (2IA) — a different course, not part of this
dashboard's three tracked modules. Transcribed MAM2013S from `Course Information.html (1)`
instead. The 2RA file was left in place, untouched, in case the owner wants it later.

## Blockers / needs owner input

**Open owner questions:**
- **Claude Code plan tier** (Pro / Max 5x / Max 20x) — sets model-routing expectations.
  Default assumption: Sonnet 4.6 for ~everything, Opus 4.8 only for hard schema/debugging
  work. On Pro this is comfortably within limits for this scope.
- **STA2005S test dates** — outline prose ("Tue 2 Sep", "Mon 13 Oct") disagrees with its
  schedule grid ("1 Sep", "12 Oct"), and neither date matches its own claimed weekday in
  the 2026 calendar (1 Sep is a Tuesday, 2 Sep a Wednesday; 12 Oct a Monday, 13 Oct a
  Tuesday). Seeded the prose dates (2 Sep / 13 Oct) with `confirm:true` per CLAUDE.md;
  confirm the real dates/times on Amathuba — this also determines whether the flagged
  2 Sep STA/MAM clash is real.
- **Chosen tut/prac slots** — STA tutorial + R prac, CSC practical, MAM tutorial (Thu vs
  Fri 14:00–16:00), and CSC lecture slot (which of Mon–Wed, Period 4 or 5). All seeded
  `tbc:true` until provided.
- **STA2005S Practical Test date, Assignment 1 date** — not yet announced anywhere in the
  outline (not even a provisional week); seeded with `tbc:true` and no `date`.
- **App name** — "Semester" is a placeholder.

**Confirmed / assumed (v1 defaults):**
- Architecture: typed `/data` + Claude Code ingestion, no API/DB (owner-recommended, taken
  as default unless changed).
- Dark-first theme.
- `Assessment.date` is optional (with a `tbc` flag) rather than the required field CLAUDE.md's
  data-model section describes, so wholly-unscheduled real assessments can still be seeded
  now rather than invented or omitted — see decisions log.

## Next up

**Step 3** — timetable: colour-coded weekly grid (Mon–Fri) reading from `/data/timetable.ts`,
`tbc` placeholders, overlapping-session clash detection, now/next highlighting from the live
clock, responsive down to a mobile single-day agenda. Awaiting review of step 2 before
starting.
