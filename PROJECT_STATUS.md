# PROJECT STATUS — Semester (Personal UCT Dashboard)

> Maintained by Claude Code. Updated at the end of every working block.
> Last updated: 2026-07-26 — step 5 complete

## Current state (one paragraph)

Steps 1–5 are built. Owner authorized batching steps 4+ back-to-back this session without
stopping for review each time (see memory); still committing/pushing and updating this file
after every step per CLAUDE.md's git discipline, just not pausing. Steps 1–2: Next.js 16 +
Tailwind v4 scaffold with tokens/fonts/nav, and the typed `/data` layer seeded from
`/course-docs`. Step 3: `/timetable` — colour-coded `<table>` weekly grid + mobile agenda,
clash detection, live now/next, a "Set your slot" panel for the one genuinely-unset session
(CSC1016S practical). Step 4: `/` — a Magic-Bento-style dashboard (`BentoTile` with
cursor-glow hover + an amber Star Border on the single most urgent tile) showing next
class, next test + live countdown, this week, urgent flags, and an honest empty-state
active-plan tile (no plans until step 7). Step 5: `/modules` — a Tilted Card grid (subtle
pointer-tilt, `prefers-reduced-motion` disables it) linking to `/modules/[code]`, which
shows convenor/contacts, a real per-course schedule (pulled from `/data/timetable.ts`, not
hardcoded), assessment weights + final-mark formula, DP rules, and a soonest-first
`moduleUpdates` feed with past items visually de-emphasised. `lib/tests.ts` and
`lib/accent.ts` hold shared countdown/clash and module-accent helpers respectively, reused
across dashboard/modules (and soon tests/planner). Architecture stays as agreed: typed data
in `/data` as the single source of truth, Claude Code as the ingestion engine (no runtime
API, no database), `localStorage` only for ephemeral personal state. Next action is
build-order step 6 (test dates).

## Section tracker

| Section | Status | Notes |
|---|---|---|
| Scaffold / tokens / fonts / nav shell | done | Step 1. Next.js 16 + TS + Tailwind v4, tokens + fonts wired, Pill Nav (desktop) + Bottom Dock (mobile), placeholder routes, dark placeholder home. Build + lint clean. |
| Data layer (`/data`) | done | Step 2. `types.ts` + courses/timetable/tests/moduleUpdates/studyPlans seeded from real `/course-docs`; STA test dates flagged `confirm:true` per the prose/grid inconsistency. |
| Timetable | done | Step 3. `<table>` weekly grid + mobile agenda, clash detection, now/next, `tbc` "set your slot" panel. Build/lint clean; Playwright-screenshotted at 360/768/1440, reduced-motion and keyboard-focus checked. |
| Dashboard home | done | Step 4. Bento tiles for next class / next test + countdown / this week / urgent flags / active plan (empty state). Build/lint clean; screenshotted 360/768/1440 + reduced-motion. |
| Modules | done | Step 5. Tilted Card grid + detail pages (convenor/contacts/schedule/weights/DP/updates). Build/lint clean; screenshotted 360/768/1440; fixed a real dim-past-update contrast bug (see decisions). |
| Test dates | todo | Step 6. `/tests` list, countdowns, clash flags, `confirm` markers, plan links |
| Study planner | todo | Step 7. `/planner` + Scroll Stack timeline; generation command; localStorage check-offs |
| Polish / a11y / perf | todo | Step 8. Specular Button, Star Border, Gradual Blur; responsive 360; Lighthouse ≥90; deploy |

Status meanings: **todo** = not started · **in progress** · **done** = built + self-QA passed
· **reviewed** = owner approved at checkpoint.

## Quality gates (latest run)

`npm run build` and `npm run lint` both pass clean. No browser-automation tool was
pre-connected this session, so a local Chromium was installed via `npx playwright install`
into the scratchpad (not added as a project dependency) and used directly — this replaces
the step 1/2 caveat about no browser tool being available. Verified on `/timetable`:
- Playwright screenshots at 360 / 768 / 1440px, zero console/page errors at each.
- Manual contrast check (WCAG relative-luminance formula) on the rendered colours: caught
  that `border-{module}/50` only hit 2.5–2.6:1 against `base` for the `sta`/`mam` accents
  (below the 3:1 UI-component-border floor) and `border-danger/40` hit 1.9:1 on the clash
  banner; bumped both to `/70` (module borders 3.9–5.5:1, danger border 3.6:1) and
  re-verified. Body/label text was already 6–14:1, comfortably clear.
- `prefers-reduced-motion: reduce` emulated — hover no longer scales (Framer Motion's
  `useReducedMotion` gates the `whileHover` scale), content unaffected.
- Keyboard tab order reaches the mobile day-switcher first (nothing focusable ahead of it
  on mobile, since the desktop `PillNav` is `display:none` there) with a visible focus ring.
- Faked `Date` via `page.addInitScript` to a moment inside a real class (Mon 08:15) to
  confirm the `Now`/`Next` badges, the ring highlight, and the today-column highlight all
  react correctly — real system time during this session was a Sunday, so this was the
  only way to exercise that path.
No Lighthouse run yet (needs a full run against a built/served app, deferred to a later
polish-adjacent step); flagged for step 8.

Step 4 (`/`): build/lint clean; Playwright screenshots at 360/768/1440 confirmed all five
tiles render with real data (verified the flagged 2 Sep STA/MAM clash, the 4 `confirm`
dates, and the 1 unset timetable slot all surface correctly in Urgent flags). Noticed the
360px `fullPage` screenshot appeared to show the fixed BottomDock overlapping the "Urgent
flags" tile — confirmed via a real scrolled-viewport screenshot that this is a Playwright
`fullPage`-with-`position:fixed` compositing artifact, not a real bug (the `pb-24` bottom
padding from step 1 already reserves room for the dock). Reduced-motion re-checked: the
hover spotlight is a plain opacity fade (not gated, since it isn't motion), the tile-scale
hover and the Star Border pulse are both gated behind `useReducedMotion`.

Step 5 (`/modules`, `/modules/[code]`): build/lint clean; all 3 course detail routes
confirmed statically generated (`generateStaticParams`). Playwright screenshots at
360/768/1440 plus a full-page check of all three module codes. Manual contrast check
caught a real bug before it could ship: the "past updates dim" treatment used a blanket
`opacity-50` on the whole list item, which combined with the already-reduced
`text-muted/70` source line to land at 2.66:1 (body) and worse — well under the 4.5:1
floor. Fixed by dropping opacity entirely: past items now swap `text-text`→`text-muted`
for the title and `accent.border`→`border-line` for the left bar (both real, pre-validated
colours), and the source line lost its unnecessary `/70`. Verified the fix live: MAM's
22 Jul tutorial-signup update (now in the past) renders dimmed and legible; CSC's 27 Jul
sick-note update (still upcoming) renders at full brightness — both against the real
"today" of 26 Jul. Also caught and fixed the schedule list rendering sessions in data-array
order instead of weekday order (Mon/Tue/Wed/Thu/Fri/Wed/Tue) — now sorted properly.

One known limitation accepted rather than engineered around: the past/future update split
is computed server-side at build/prerender time, not with a live client clock like the
timetable's now/next — it will only refresh on the next push+redeploy, not continuously.
Low-stakes (cosmetic de-emphasis only) and consistent with the project's no-live-backend,
redeploy-on-push content model, so not worth splitting into a client sub-component now.

## In progress

Nothing in progress. Step 5 complete; continuing straight to step 6 (batched, see memory).

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
(2026-07-26) — Owner supplied Amathuba "My Groups" screenshots (`course-docs/*.png`)
confirming real chosen slots: STA2005S R prac → Tue 14:00–15:00, Scilab D; STA2005S
tutorial → Wed 14:00–15:00, LS2B; CSC1016S lecture → Mon 11:00 (Period 4), JD LT2; MAM2013S
tutorial → Thu 14:00–16:00 (venue still not shown on Amathuba). Updated `/data/timetable.ts`
and cleared their `tbc` flags accordingly. Only CSC1016S's practical session remains
genuinely unset (no screenshot for it) — shown in the timetable's "Set your slot" panel.
Caught and corrected a mistake in the same pass: initially wrote fabricated "some
Wednesdays" dates onto MAM2013S's irregular lecture slot by copying the specific date list
from the *other* course's (MAM2014S/2RA) outline — fixed before commit to a generic note
with no invented dates, per the real-data-only rule.
(2026-07-26) — Session/tbc rendering split by what `tbc` actually means: MAM2013S's "some
Wednesdays" lecture has a real, known day/time (just irregular cadence) so it renders
normally in the grid with an explanatory note; CSC1016S's practical has no real day/time
at all, so it's excluded from the positioned grid entirely and shown in a separate "Set
your slot" list instead of guessing a placement for data that doesn't exist.
(2026-07-26) — Desktop timetable grid uses a real `<table>` (`<th scope="row">` time
gutter with `rowSpan`, `<td rowSpan>` per session) rather than an ARIA-grid built from
`div`s — gets native screen-reader row/column semantics for free and made the
"skip cells covered by an earlier rowSpan" bookkeeping straightforward, since every session
in the real data starts on a 15-minute boundary. Overlapping sessions are excluded from the
table (rowSpan can't express two events in the same cell) and are instead surfaced via the
clash-detection banner — moot for now since the current real data has no actual overlaps.
(2026-07-26) — Manual WCAG contrast check (not just visual inspection) run on every new
colour combination before treating the step as QA-passed — see quality gates. Caught a real
sub-3:1 border-contrast bug this way; treating this check as a standing per-step habit
going forward, not a one-off.
(2026-07-26) — Owner authorized batching build-order steps 4 onward without the usual
stop-for-review gate after each one, given spare session budget on the Pro plan — see the
`semester-batch-mode-2026-07-26` memory. Git discipline (commit + push + update this file
every step) still applies unchanged; only the pause-and-ask-for-review part is suspended
for this session.
(2026-07-26) — Dashboard's "Active study plan" tile shows an honest empty state (plain
text + a link to `/planner`) rather than a fake "Generate study plan" CTA button — there's
no in-app generation flow (plans are produced by a separate Claude Code command per
CLAUDE.md, not a runtime API call), so a clickable-looking generate button would be a false
affordance.
(2026-07-26) — Magic Bento's hover "spotlight" is implemented as a cursor-tracked CSS
radial-gradient (position set via a ref + `onPointerMove`, no React re-render) rather than
pulling in the actual react.bits component — same hand-built-to-tokens approach already
used for Pill Nav/Bottom Dock in step 1. The one animated exception, the amber Star Border
pulse on the most-urgent tile, uses a plain looping opacity animation rather than a
conic-gradient spin, since the standard "animated gradient border via masked conic-gradient"
trick needs `@property` (patchy browser support) — simpler and equally readable.
(2026-07-26) — Tilted Card (step 5) is likewise hand-built: pointer position drives
`--tilt-x`/`--tilt-y` CSS custom properties via a ref (no re-render), `perspective()
rotateX() rotateY()` in an inline style, guarded by `useReducedMotion` — same pattern
as the dashboard's spotlight and the timetable's earlier hover work. Consistent "adapt the
react.bits *effect*, hand-build the code" approach across all four react.bits-inspired
components shipped so far (Pill Nav, Bottom Dock, Magic Bento, Tilted Card).
(2026-07-26) — Module detail's "past updates dim" fix (see quality gates) replaced opacity
math with real colour-token swaps (`text-text`→`text-muted`, `accent.border`→`border-line`)
specifically so contrast stays provably correct regardless of how many effects stack —
established as the preferred pattern over opacity-based de-emphasis anywhere text is
involved, going forward.
(2026-07-26) — Module schedule section reuses `/data/timetable.ts` (filtered by
`courseCode`, sorted by weekday then start time) rather than re-describing venues/times as
freeform text — keeps a single source of truth; a timetable data edit automatically shows
up on the matching module page too.

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
- **CSC1016S practical session slot** — still genuinely unset; no Amathuba group screenshot
  for it yet (unlike the lecture, which is confirmed Mon 11:00). Seeded `tbc:true`.
- **STA2005S Practical Test date, Assignment 1 date** — not yet announced anywhere in the
  outline (not even a provisional week); seeded with `tbc:true` and no `date`.
- **MAM2013S tutorial venue** — day/time confirmed (Thu 14:00–16:00 via Amathuba group
  signup) but the venue isn't shown in that group listing; seeded `venue: "TBC"`.
- **App name** — "Semester" is a placeholder.

**Confirmed / assumed (v1 defaults):**
- Architecture: typed `/data` + Claude Code ingestion, no API/DB (owner-recommended, taken
  as default unless changed).
- Dark-first theme.
- `Assessment.date` is optional (with a `tbc` flag) rather than the required field CLAUDE.md's
  data-model section describes, so wholly-unscheduled real assessments can still be seeded
  now rather than invented or omitted — see decisions log.
- STA2005S R prac (Tue 14:00–15:00, Scilab D), STA2005S tutorial (Wed 14:00–15:00, LS2B),
  and CSC1016S lecture (Mon 11:00, JD LT2) are now confirmed real slots, not placeholders —
  owner-supplied Amathuba screenshots, see decisions log.

## Next up

**Step 6** — test dates: `/tests` list, soonest-first, with countdowns, weight, venue, a
link to a study plan if one exists (none yet), same-day clash flags (reusing
`lib/tests.ts`'s `findDateClashes`), and `confirm` markers. Continuing immediately
(batched — see memory).
