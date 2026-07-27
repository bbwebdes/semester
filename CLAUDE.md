# CLAUDE.md — Semester ("Personal UCT Dashboard")

> Working name is **Semester** — rename freely (repo, `package.json`, page titles).
> Lives at `C:\dev\personal\semester`. Pipeline: Claude Code → GitHub → Vercel.

## What this project is

A clean, single-user university dashboard for one BSc student (Math & Mathematical
Statistics, 2nd year, UCT). It pulls the whole semester into one calm, well-structured
place: a colour-coded weekly timetable, per-module info and reminders, test dates with
countdowns, and Claude-generated study plans before each test. The bar is "a tool I'm
glad to open every morning" — legible, fast, and quietly good-looking. Not a toy, not
over-decorated.

This is a **personal organisational tool**. The study planner produces *scheduling and
scope guidance* (when to start, which topics, how to phase the days) — it does not write
or generate coursework.

## Owner + real course data (source of truth)

The four live courses for this semester. Full outlines live in `/course-docs`; these are
the transcription source. **Where the source is internally inconsistent (see the STA date
note), flag it for owner confirmation — do not silently pick one.**

**STA2005S — Linear Models** (accent: `sta`, blue)
- Convenor: Dr Birgit Erni (birgit.erni@uct.ac.za, PD Hahn 6.64). Lecturer: Mr Miguel
  Rodo (miguel.rodo@uct.ac.za, PD Hahn 5.52). Admin: Ms Nodumo Maqubela
  (nodumo.maqubela@uct.ac.za — mention you're a STA2005S student).
- Lectures: 08:00 Mon–Fri, PD Hahn 2. Plus one 1-hr tutorial + one 1-hr R computer prac
  per week (slots chosen in week 1 — `tbc` until owner sets them).
- Assessments: Test 1 (25%), Test 2 (25%), Assignment 1 (20%), Practical Test (10%),
  Assignment 2 (20%). Final = 0.3·class + 0.7·exam. DP: both assignments done, ≥40% avg
  assignment, class record ≥35%.
- Dates: Test 1 — 1 Sep, 18:00–20:00, JD LT2 & James LT 4A. Test 2 — 12 Oct,
  18:00–20:00, JD LT2 & James LT 4A. Practical Test — TBC. Assignment 2 — 19 Oct.
  Assignment 1 — TBC. **Confirmed 2026-07-26:** the outline's prose ("Tuesday 2 Sep",
  "Monday 13 Oct") disagreed with its schedule grid ("1 Sep", "12 Oct"); convenor Birgit
  Erni confirmed via Amathuba post that the grid dates (1 Sep, 12 Oct) are correct — the
  outline has been updated to match. No longer needs a `confirm` flag.
- R sessions: online introduction to R — Tue 2pm (one-off, week of 27 Jul). R workshops
  run weekly throughout the semester, Wed/Thu/Fri 14:00–16:00.

**CSC1016S — Computer Science** (accent: `csc`, green)
- Convenor: Mr Aslam Safla (aslam@cs.uct.ac.za). Sick notes: sick-csc1016s@cs.uct.ac.za.
- Lectures: one face-to-face lecture/week, Mon–Wed, JD LT2 (Period 4 or 5 — owner picks
  one). Plus one 2-hr practical session/week (slot `tbc`).
- Assessments: Final = 0.10·prac avg + 0.15·theory-test avg + 0.15·prac-test avg +
  0.60·exam. DP: prac-test avg ≥50%, and (3/5·prac + 2/5·prac-test) ≥45%.
- Dates: Theory Test 1 — 26 Aug, 18:00. Practical Test 1 — weeks 5–6. Theory Test 2 —
  14 Oct, 18:00. Practical Test 2 — weeks 11–12. (Each prac test offered twice; best of
  first attempt used.)

**MAM2013S (2IA)** (accent: `mam`, violet)
- Convenor/lecturer: Dr Janelidze-Gray (tamar.janelidze-gray@uct.ac.za, M323.1).
- Lectures: Mon, some Wed, Fri, 12:00–13:00, M320. Tutorials (compulsory): Thu 14:00–16:00
  or Fri 14:00–16:00 — owner signs up for one (`tbc`).
- Assessments: CR = 0.5·T1 + 0.5·T2. Final = max(0.6·E + 0.4·CR, 0.8·E + 0.2·CR).
  DP: CR ≥20% and ≥80% tutorial attendance.
- Dates: Test 1 — 2 Sep (time/venue TBC). Test 2 — 7 Oct (time/venue TBC).

**MAM2014S (2RA) — Real Analysis** (accent: `ra`, teal)
- Convenor: Morgan Vandeyar (morgan.vandeyar@uct.ac.za, M3.24.2). Lecturer: Assoc Prof
  Elena Berdysheva (elena.berdysheva@uct.ac.za, M3.13).
- Lectures: two slots on offer, owner picks one and sticks to it — Period 4 (11:00–11:45)
  or Period 5 (12:00–12:45), both M320 (`tbc` until owner picks). Mon + Thu every week,
  plus these specific Wednesdays: 29 Jul, 12 Aug, 19 Aug, 2 Sep, 23 Sep, 30 Sep, 14 Oct.
  Tutorial (compulsory, confirmed via Amathuba sign-up): Fri 14:00–15:00, MCB Sem A.
- Assessments: class record C = 0.475·T1 + 0.475·T2 + 0.05·self-assessment-quiz avg
  (quizzes run ~biweekly, dates not yet announced). Final = max(0.8·E + 0.2·C, 0.6·E +
  0.4·C). DP: full tutorial attendance (≤2 permitted absences), wrote both tests, test
  average ≥30%.
- Dates: Test 1 — Mon 24 Aug, 18:00–19:30. Test 2 — Tue 6 Oct, 18:00–19:30. Venues TBC
  for both (no internal inconsistency in this source — weekdays match the 2026 calendar).

**Formerly-flagged clash, now resolved:** STA2005S Test 1 was seeded at 2 Sep pending
date confirmation, the same day as MAM2013S Test 1. The convenor has since confirmed
STA2005S Test 1 is actually **1 Sep** — the two tests are on consecutive days, not the
same day, so this is no longer a real clash. Still a good illustration of why the Tests
view's same-day/overlap flagging matters; the clash-detection logic itself is unchanged
and remains fully data-driven (no hardcoded dates in components).

## Stack (do not substitute)

- Next.js 14+, App Router, TypeScript
- Tailwind CSS (tokens below wired into config)
- `date-fns` — all date math (countdowns, "days until", "start studying" dates, clash
  detection). No hand-rolled date arithmetic.
- Framer Motion — micro-interactions only (subtle, 200–300ms, ease-out)
- react.bits components — install individually (CLI/copy-paste), adapt to tokens
- Deploy target: Vercel

Deliberately NOT included (kept out to stay lean): image pipeline (Sharp/Real-ESRGAN),
GSAP ScrollTrigger, heavy Lenis choreography, any runtime backend/database, the Anthropic
API. See "Data model" for why none are needed.

## Data model — the core architecture

**All content is typed data in `/data`. There is no runtime API and no database.** Claude
Code is the ingestion engine (see "Document ingestion"). This is the same
transcription-as-source-of-truth pattern a menu-driven site would use for its menu data.

Typed modules (define interfaces in `/data/types.ts`, export typed const data):

- `/data/courses.ts` — one `Course` per module: code, title, accent token, convenor +
  contacts, assessment weights, DP rules.
- `/data/timetable.ts` — `Session[]`: `{ courseCode, kind: 'lecture'|'tutorial'|'prac',
  day, start, end, venue, tbc? }`. Supports fixed lectures and owner-chosen tut/prac
  slots (`tbc: true` until set).
- `/data/tests.ts` — `Assessment[]`: `{ id, courseCode, kind:
  'test'|'practest'|'assignment'|'exam', title, date, start?, end?, venue?, weight?,
  scope?, confirm?: boolean }`. `confirm: true` renders a "verify on Amathuba" marker.
- `/data/moduleUpdates.ts` — `Update[]`: `{ courseCode, date, kind:
  'date'|'reminder'|'info-session'|'announcement', title, body, source? }`. Fed by
  ingested documents.
- `/data/studyPlans.ts` — `StudyPlan[]` (see "Study planner").

Price-change equivalent here is a **date/scope change = a data edit only**. Components
render exclusively from `/data`; never hardcode a date or venue in a component.

**In-app state that is genuinely personal and ephemeral** (ticking off a study-plan task,
collapsing a card) uses `localStorage` — single device, no backend. Anything that should
survive across devices/redeploys goes in `/data` via Claude Code.

## Design tokens

Colours (Tailwind name → hex). Dark-first, calm base, module colour as the one loud thing.

Base / chrome:
- `base`    #0B0E14 — app background
- `surface` #141922 — cards, raised panels
- `surface-2` #1B2230 — nested panels, hover
- `line`    #232A36 — hairlines, borders
- `text`    #E6EAF0 — primary text
- `muted`   #97A1B0 — secondary text, labels

Module accents (used identically across timetable, cards, tests, plans):
- `sta`  #4C9AFF — STA2005S (blue)
- `csc`  #3DD68C — CSC1016S (green)
- `mam`  #C084FC — MAM2013S (violet)
- `ra`   #2DD4BF — MAM2014S (teal)

Semantic:
- `accent` #F5A524 — amber. Primary CTAs ("Generate study plan"), and the "start
  studying" urgency state. The ONLY CTA colour.
- `danger` #FF5C5C — overdue, clash flags, `confirm` markers
- `ok`     #3DD68C — done/complete (shares the green; fine)

Rules: a module's accent is its identity everywhere — the timetable block fill, the module
card border/glow, the test dot, the study-plan spine. `accent` (amber) is reserved for
CTAs and urgency; don't let it double as decoration. Module accents are used as
fills/borders/glows with `text`/`muted` on top; when an accent must carry text, use it at
a tint that meets AA (4.5:1) on `surface`.

Typography (Google Fonts):
- Display / numerals: **Space Grotesk** — headings, big countdown numbers, module codes.
- Body / UI: **Inter** — everything else.
- Type scale: 12 / 14 / 16 / 20 / 28 / 40 / 64. Body 16. Countdown numerals up to 64,
  clamp down on mobile.
- Times as `08:00`, dates as `Tue 2 Sep`. Consistent everywhere.

## Component system (react.bits — which, and where)

Restraint is the brief: a daily tool, not a showreel. Each component earns a slot.

- **Magic Bento** — the `/` dashboard grid. The centrepiece: tiles for Next class · Next
  test + countdown · Active study plan · This week · any urgent flags (clash / start
  studying today).
- **Scroll Stack** — the study-plan timeline (`/planner/[testId]`): phases/days stack as
  you scroll toward the test date. (Owner flagged this "must use"; this is its home.)
- **Pill Nav Bar** (desktop, top) + **Bottom Dock** (mobile) — nav across Dashboard ·
  Timetable · Modules · Concepts · Planner · Tests.
- **Tilted Card** — module tiles on `/modules` (subtle hover, module accent).
- **Specular Button** — primary actions (the amber CTA). **Star Border** — reserved for
  the single most-urgent card (nearest test / "start studying today"), so urgency reads
  instantly. Use sparingly.
- **Gradual Blur** — soft top/bottom edges on any overflow-scroll list (a long timetable
  column, the module update feed).

Held in reserve (only if a clear need appears): Fluid Glass (a class-detail popover),
Staggered Menu (mobile nav alt). **Do NOT use** for this build: Ferrofluid background,
Splash Cursor, Metallic Paint, Shape Blur, Model Viewer, Circular Gallery, Reflective
Card, Option Wheel — decorative or off-purpose for a productivity tool, and they cost the
perf/readability budget.

Hover micro-interactions via Framer Motion: subtle (scale 1.02, 200–300ms, ease-out),
tinted with the relevant module accent.

## Features (detailed)

**1. Timetable** — weekly grid, Mon–Fri (Sat optional), time rows 08:00–18:00, blocks
colour-coded by module accent. Each block shows code · kind · venue · time. Renders fixed
lectures and owner-chosen tut/prac slots; `tbc` slots render as a muted "set your slot"
placeholder. Detect and flag overlapping sessions. "Now / Next" awareness: highlight the
current and next session from the live clock. Responsive: grid at ≥768px, a single-day
agenda list on mobile with a day switcher.

**2. Module info** — `/modules` is a grid of Tilted Cards (one per module, accent-bordered)
→ `/modules/[code]` detail: convenor + contacts, venues, assessment weights, DP rules, and
a dated feed of updates (upcoming dates, info sessions, reminders, announcements) from
`moduleUpdates.ts`. Feed sorts soonest-first; past items dim.

**3. Study planner** — `/planner` lists plans; `/planner/[testId]` is the Scroll Stack
timeline. A plan is Claude-Code-generated per test (see command below): given the test
date + scope, it sets a `startDate` (test date − a lead time scaled by scope size),
splits the run-up into phases with concrete tasks, and links resources. The dashboard
shows a "start studying in N days / today" countdown driven by `startDate`. Task
check-offs persist in `localStorage`.
Schema: `StudyPlan { id, courseCode, testId, scope: string[], startDate,
phases: { date, focus, tasks: string[] }[], resources: { label, href? }[] }`.

**4. Test dates** — `/tests`: every assessment across modules, soonest-first, each with a
countdown, venue, weight, and a link to its study plan if one exists. Same-day / overlapping
assessments flagged in `danger` (surfaces the 2 Sep STA/MAM clash). `confirm: true`
assessments show a "verify on Amathuba" marker.

## Pages / routes

- `/` — Dashboard (Magic Bento)
- `/timetable`
- `/modules`, `/modules/[code]`
- `/concepts`
- `/planner`, `/planner/[testId]`
- `/tests`

## Document ingestion workflow (`/inbox`)

How "Claude updates my info by adding documents" works — no API, no upload UI in v1:

1. Drop source files (announcement text, a revised outline, a PDF) into `/inbox`.
2. Run this Claude Code prompt:
   > "Ingest everything in `/inbox`. Transcribe dates, reminders, info sessions and
   > announcements into the correct typed files in `/data`, tagged by module. For test/date
   > changes update `tests.ts`; for module news update `moduleUpdates.ts`. Where a source is
   > internally inconsistent or ambiguous, add the item with `confirm: true` and note it in
   > PROJECT_STATUS.md rather than guessing. Then move processed files to
   > `/course-docs/archive`, run the build + self-QA, commit, and push."
3. Vercel redeploys on push. The dashboard is now updated.

## Study-plan generation command

Run this Claude Code prompt when a test approaches:
> "Generate a study plan for `{courseCode}` test `{testId}`. Read the tested scope from
> `/course-docs` (topics/sections), set `startDate = testDate − lead time` (scale the lead
> by scope size and weighting), break the run-up into phases with concrete, checkable
> tasks, and link resources. Write it to `/data/studyPlans.ts`, build, self-QA, commit,
> push."

Keep plans scope-and-schedule only (topics, timing, tasks, resources) — not worked
solutions or written coursework.

## Concept Briefing (`/concepts`)

**Purpose.** A glanceable, per-concept reference covering every concept and
sub-concept in the owner's course notes, for two moments: priming right before a
lecture, and consolidating right after. Probability/statistics concepts get extra
care (intuition-first explanation, an extra worked micro-example, populated `tips`)
since that's the owner's weak spot. **This is a personal study scaffold only** — see
the disclaimer below.

**Source of truth.** `/course-docs/{MAM2012S,MAM2013S,MAM2014S,STA2005S}` and (once
notes exist) `/course-docs/CSC1016S`. The concept and sub-concept list is extracted
from the notes themselves — never invented. Where notes are ambiguous, the briefing
reflects the notes' own framing rather than guessing, and only covers what's actually
been transcribed so far (a module's briefings may lag its full syllabus if later
weeks' notes haven't been ingested yet — see each module's data file for what's
covered).

**Data model.** `/data/types.ts` defines `ConceptBriefing` (one record per concept):
`id`, `courseCode` (typed as `ConceptModuleCode = CourseCode | "MAM2012S"` — concept
briefings are keyed by note-set, not by dashboard registration status, so a module
like MAM2012S can get briefings before it's a tracked `CourseCode` elsewhere), plus
`sourceRef`, `title`, `tags`, `difficulty` (`core | stretch | hard`), `summary`,
`subConcepts[]` (`{ title, gloss }`), `preLecture[]`, `learningPath[]`,
`applications[]`, `examples[]`, `resources[]` (`{ label, href }`), and an optional
`tips[]` (populated by default for probability/statistics concepts, and for any
`stretch`/`hard` concept). One typed file per module in `/data/concepts/` (e.g.
`sta2005s.ts`), aggregated by `/data/concepts/index.ts`; `/data/concepts/modules.ts`
drives the page's module grouping/ordering/accent and empty states, reusing each
tracked course's real accent token where one exists (falls back to neutral styling
for a module, like MAM2012S, that isn't tracked elsewhere in the dashboard yet).

**Content rules.** Pitch at rigorous 2nd-year level — correct definitions, stated
assumptions, the actual theorem where one exists — but lead with intuition.
Completeness lives in `subConcepts`; the `summary` stays brief. Mathematical accuracy
is non-negotiable; reflect the notes' own framing rather than guessing where they're
ambiguous.

**Link rules.** Never fabricate a URL. Prefer channel/course-level links (StatQuest,
3Blue1Brown, MIT OCW, Khan Academy) over single videos to minimise link-rot, and only
include a link that's been verified to resolve.

**Disclaimer.** These briefings are pre/post-lecture revision aids only — never
submitted work, and not a substitute for a course's own materials. They must respect
each course's AI-use policy (STA2005S's is strict). The `/concepts` page footer states
this; keep it there if the page is restructured.

## Quality floor (non-negotiable)

- Lighthouse ≥90 on all four categories (Performance, Accessibility, Best Practices, SEO),
  mobile, on every changed page. react.bits effects (Scroll Stack, any canvas) must be
  code-split/lazy; no layout shift (always set dimensions).
- Fully responsive to 360px. Timetable and bento both work on mobile (simplify, don't drop
  features).
- Keyboard focus visible (cove/accent focus rings), semantic landmarks, `aria` on
  interactive tiles, real labels.
- `prefers-reduced-motion` respected everywhere (disables Scroll Stack animation, hover
  motion, any inertia — content stays fully readable).
- WCAG AA contrast: 4.5:1 body, 3:1 large text and UI component borders. Check module
  accents and amber on `surface`/`base`.
- Real data only — from `/data`, transcribed from `/course-docs`. No lorem ipsum, ever.

## Workflow

Work strictly one build-order step at a time. After each step: run the build, run the
Self-QA loop, commit and push, update PROJECT_STATUS.md, then STOP and ask for review
before starting the next step.

## Git discipline

- Commit after every completed step, descriptive message
  (e.g. `feat(timetable): colour-coded weekly grid + clash detection`).
- Push to origin after every commit. Never end a session with uncommitted/unpushed work.

## Self-QA loop (before every review request)

- Playwright screenshots of every changed page at 360 / 768 / 1440px; review them yourself
  and fix visual issues first.
- Run Lighthouse on changed pages — all four categories ≥90.
- Check AA contrast (module accents + amber on dark).
- Confirm `prefers-reduced-motion` path works and keyboard focus is visible.
- Confirm every date/venue on screen traces back to `/data` (no hardcoded content).

## Status tracking

Maintain PROJECT_STATUS.md in the repo root. Update it at the end of every working block:
what was completed, what's in progress, decisions made, current quality-gate scores, and
open owner questions. Keep it terse.

## Build order

1. Scaffold Next.js 14 + TS + Tailwind; wire tokens + both Google Fonts; nav shell (Pill
   Nav + Bottom Dock) + placeholder routes. Commit.
2. Data layer: `/data/types.ts` + typed `courses`, `timetable`, `tests`, `moduleUpdates`,
   `studyPlans`; seed from the four real courses in `/course-docs` (flag inconsistencies
   with `confirm: true`). Commit.
3. Timetable weekly grid — colour-coded, `tbc` placeholders, clash detection, now/next.
   Commit.
4. Dashboard home — Magic Bento tiles (next class, next test + countdown, active plan,
   this week, urgent flags). Commit.
5. Modules — `/modules` Tilted Cards + `/modules/[code]` detail + update feed. Commit.
6. Test dates — `/tests` list, countdowns, clash flags, `confirm` markers, plan links.
   Commit.
7. Study planner — `/planner` + `/planner/[testId]` Scroll Stack timeline; wire the
   generation command; localStorage check-offs. Commit.
8. Polish pass — react.bits accents (Specular Button, Star Border, Gradual Blur),
   responsive to 360px, a11y, Lighthouse ≥90 everywhere, deploy. Commit.

Work one step at a time (see Workflow): build → Self-QA → commit + push → update
PROJECT_STATUS.md → STOP for review.

## First prompt to paste into Claude Code

"Read CLAUDE.md fully. Execute build-order step 1: scaffold Next.js 14 with App Router,
TypeScript and Tailwind in this repo (keep `/course-docs`, `/inbox` and CLAUDE.md intact),
wire the design tokens and both Google Fonts (Space Grotesk, Inter) into the Tailwind
config and root layout, add the Pill Nav Bar (desktop) + Bottom Dock (mobile) shell with
placeholder routes for /, /timetable, /modules, /planner, /tests, and prove tokens + fonts
render on a minimal dark placeholder dashboard. Respect prefers-reduced-motion from the
start. Then run the build, commit, push, and update PROJECT_STATUS.md."
