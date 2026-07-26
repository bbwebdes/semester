# PROJECT STATUS — Semester (Personal UCT Dashboard)

> Maintained by Claude Code. Updated at the end of every working block.
> Last updated: 2026-07-26 — step 1 complete

## Current state (one paragraph)

Step 1 is built: Next.js 16 (App Router, TypeScript, Tailwind v4) scaffolded in place,
design tokens wired via a Tailwind v4 `@theme` block in `app/globals.css` (base/surface/
surface-2/line/text/muted, module accents sta/csc/mam, semantic accent/danger/ok, and the
12/14/16/20/28/40/64 type scale), Space Grotesk (`font-display`) + Inter (`font-sans`)
loaded via `next/font/google`, and a nav shell (`PillNav` desktop top, `BottomDock` mobile
bottom) with placeholder routes for `/`, `/timetable`, `/modules`, `/planner`, `/tests`.
The home page proves tokens/fonts render correctly (module accent swatches, amber CTA,
danger flag, display-scale numeral). `prefers-reduced-motion` is handled globally in
`globals.css` (collapses animation/transition durations). Architecture stays as agreed:
typed data in `/data` as the single source of truth (not yet created — step 2), Claude
Code as the ingestion engine (no runtime API, no database), `localStorage` only for
ephemeral personal state. Three real courses (STA2005S, CSC1016S, MAM2013S) are the seed
content; their outlines are in `/course-docs`. Next action is build-order step 2 (data
layer).

## Section tracker

| Section | Status | Notes |
|---|---|---|
| Scaffold / tokens / fonts / nav shell | done | Step 1. Next.js 16 + TS + Tailwind v4, tokens + fonts wired, Pill Nav (desktop) + Bottom Dock (mobile), placeholder routes, dark placeholder home. Build + lint clean. |
| Data layer (`/data`) | todo | Step 2. `types.ts` + courses/timetable/tests/moduleUpdates/studyPlans; seed 3 courses, flag date inconsistencies with `confirm:true` |
| Timetable | todo | Step 3. Colour-coded weekly grid, `tbc` slots, clash detection, now/next, mobile agenda |
| Dashboard home | todo | Step 4. Magic Bento — next class, next test + countdown, active plan, this week, urgent flags |
| Modules | todo | Step 5. `/modules` Tilted Cards + `/modules/[code]` detail + update feed |
| Test dates | todo | Step 6. `/tests` list, countdowns, clash flags, `confirm` markers, plan links |
| Study planner | todo | Step 7. `/planner` + Scroll Stack timeline; generation command; localStorage check-offs |
| Polish / a11y / perf | todo | Step 8. Specular Button, Star Border, Gradual Blur; responsive 360; Lighthouse ≥90; deploy |

Status meanings: **todo** = not started · **in progress** · **done** = built + self-QA passed
· **reviewed** = owner approved at checkpoint.

## Quality gates (latest run)

`npm run build` and `npm run lint` both pass clean on all 5 routes. Compiled CSS verified
to contain correct token values (e.g. `--color-base: #0b0e14`, `#4c9aff` for the STA
accent) and both font-family declarations. `prefers-reduced-motion` handled globally.
No Playwright/Lighthouse run yet — no browser automation tool was available this session
(claude-in-chrome not connected); visual QA was done via build output + rendered HTML/CSS
inspection only, not a real browser. Full Lighthouse + screenshot QA should run once a
browser tool is available, and again once step 4 (dashboard) adds real content.

## In progress

Nothing in progress. Step 1 complete; awaiting review before step 2 (data layer).

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

## Blockers / needs owner input

**Open owner questions (confirm before or during step 2):**
- **Claude Code plan tier** (Pro / Max 5x / Max 20x) — sets model-routing expectations.
  Default assumption: Sonnet 4.6 for ~everything, Opus 4.8 only for step 2 schema + hard
  debugging. On Pro this is comfortably within limits for this scope.
- **STA2005S test dates** — outline prose ("Tue 2 Sep", "Mon 13 Oct") disagrees with its
  schedule grid ("1 Sep", "12 Oct") and the weekday names don't match the 2026 calendar.
  Seeded as 2 Sep / 13 Oct with `confirm:true`; confirm exact dates/times on Amathuba.
- **Chosen tut/prac slots** — STA tutorial + R prac, CSC practical, MAM tutorial (Thu vs
  Fri 14:00–16:00), and CSC lecture slot (which of Mon–Wed, Period 4 or 5). All seeded
  `tbc:true` until provided.
- **App name** — "Semester" is a placeholder.

**Confirmed / assumed (v1 defaults):**
- Architecture: typed `/data` + Claude Code ingestion, no API/DB (owner-recommended, taken
  as default unless changed).
- Dark-first theme.

## Next up

**Step 2** — data layer: `/data/types.ts` + typed `courses`, `timetable`, `tests`,
`moduleUpdates`, `studyPlans`; seed from the three real courses in `/course-docs` (flag
inconsistencies with `confirm: true`, per the open owner questions above). Awaiting
review of step 1 before starting.
