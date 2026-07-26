# PROJECT STATUS — Semester (Personal UCT Dashboard)

> Maintained by Claude Code. Updated at the end of every working block.
> Last updated: 2026-07-26 — step 8 complete except deploy (needs owner's Vercel auth)

## Current state (one paragraph)

Steps 1–8 are built (deploy excepted). Owner authorized batching steps 4+ back-to-back without
stopping for review each time (see memory); still committing/pushing and updating this file
after every step per CLAUDE.md's git discipline, just not pausing. Steps 1–2: Next.js 16 +
Tailwind v4 scaffold with tokens/fonts/nav, and the typed `/data` layer seeded from
`/course-docs`. Step 3: `/timetable` — weekly grid + mobile agenda, clash detection,
live now/next. Step 4: `/` — a Magic-Bento-style dashboard (next class, next test +
countdown, this week, urgent flags, active plan). Step 5: `/modules` — Tilted Card grid +
per-course detail pages (schedule, weights, DP rules, updates feed). Step 6: `/tests` —
every assessment soonest-first with countdowns, clash banner, `confirm` markers, and a
tentative/TBC section. `lib/tests.ts` and `lib/accent.ts` hold shared countdown/clash and
module-accent helpers reused across dashboard/modules/tests/planner. Step 7: `/planner` +
`/planner/[testId]` — a Scroll Stack timeline (CSS `position: sticky` cards, phases
genuinely stack as you scroll) with `localStorage`-persisted task check-offs (verified:
check a task, reload, still checked). Rather than ship only empty states, generated one
real study plan for the nearest actual test (CSC1016S Theory Test 1, 26 Aug) from the
transcribed syllabus, so the timeline/check-off feature has real content proving it works
end to end — the dashboard's Active study plan tile and the Star Border urgency priority
between "next test" and "active plan starting today" were updated to use it. Architecture
stays as agreed: typed data in `/data` as the single source of truth, Claude Code as the
ingestion engine (no runtime API, no database), `localStorage` only for ephemeral personal
state.

**Post-step-7, before step 8:** the owner supplied a missing course info sheet for
**MAM2014S (2RA, Real Analysis)** and asked for it to be added as a real tracked course —
this dashboard now covers four modules, not three. Ripple: `CourseCode`/`AccentToken`
unions extended, a new `ra` teal accent added to the design tokens (globals.css + CLAUDE.md
+ `lib/accent.ts`), `courses.ts`/`timetable.ts`/`tests.ts`/`moduleUpdates.ts` all got
MAM2014S entries, and CLAUDE.md's course-data section now documents it alongside the
original three. Two real bugs surfaced and were fixed while doing this (see decisions log):
a 4-card `/modules` grid overflow, and a false clash flag on the dashboard caused by a
lingering pre-step-6 bug (a raw, unfiltered `findDateClashes(tests)` call that step 6 had
already fixed on the Tests page but never got backported to the Dashboard).

**Step 8 (polish):** Lighthouse run for real against a production build (`next build` +
`next start`, not the dev server) across all 8 routes — every route scores 100/100/100/100
(Performance/Accessibility/Best Practices/SEO) except the dashboard's initial Performance,
which was 96 due to a real layout shift (fixed, now also 100 — see decisions log). Star
Border was already in place from step 4 and re-verified correct with the new course data.
Specular Button and Gradual Blur were deliberately left unimplemented — reasoned through
in the decisions log, not silently skipped. Full responsiveness (360/768/1440), keyboard
focus, and `prefers-reduced-motion` re-verified across all pages including the two newer
react.bits-inspired components (Tilted Card's tilt, Scroll Stack's sticky stack). The one
remaining build-order item, first deploy to Vercel, needs the owner's own account
authorization in a browser and cannot be done unilaterally — flagged below, not attempted.

## Section tracker

| Section | Status | Notes |
|---|---|---|
| Scaffold / tokens / fonts / nav shell | done | Step 1. Next.js 16 + TS + Tailwind v4, tokens + fonts wired, Pill Nav (desktop) + Bottom Dock (mobile), placeholder routes, dark placeholder home. Build + lint clean. |
| Data layer (`/data`) | done | Step 2. `types.ts` + courses/timetable/tests/moduleUpdates/studyPlans seeded from real `/course-docs`; STA test dates flagged `confirm:true` per the prose/grid inconsistency. |
| Timetable | done | Step 3. `<table>` weekly grid + mobile agenda, clash detection, now/next, `tbc` "set your slot" panel. Build/lint clean; Playwright-screenshotted at 360/768/1440, reduced-motion and keyboard-focus checked. |
| Dashboard home | done | Step 4. Bento tiles for next class / next test + countdown / this week / urgent flags / active plan (empty state). Build/lint clean; screenshotted 360/768/1440 + reduced-motion. |
| Modules | done | Step 5. Tilted Card grid + detail pages (convenor/contacts/schedule/weights/DP/updates). Build/lint clean; screenshotted 360/768/1440; fixed a real dim-past-update contrast bug (see decisions). |
| Test dates | done | Step 6. Soonest-first list, live countdowns, clash banner + badges, `confirm` markers, tentative/TBC section. Build/lint clean; screenshotted 360/768/1440. |
| Study planner | done | Step 7. `/planner` + `/planner/[testId]` Scroll Stack timeline, `localStorage` check-offs (verified across reload). One real plan generated (CSC1016S Theory Test 1). Build/lint clean; screenshotted 360/768/1440 + live scroll-stack + checkbox persistence. |
| MAM2014S ingestion | done | Post-step-7. 4th course added end to end (types, tokens, all 4 data files, CLAUDE.md). Build/lint clean; screenshotted all 5 routes at 360/1440; fixed a card-overflow bug and a false-clash dashboard bug (see decisions). |
| Polish / a11y / perf | done | Step 8. Lighthouse 100/100/100/100 on all 8 routes (production build), fixed a real CLS regression on the dashboard. Star Border in place; Specular Button/Gradual Blur deliberately deferred (see decisions). Responsive/focus/reduced-motion re-verified everywhere. **Deploy not done** — needs owner's Vercel auth. |

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

Step 6 (`/tests`): build/lint clean; Playwright screenshots at 360/768/1440. Caught a real
bug pre-ship: the two CSC1016S practical tests carry a placeholder week-start `date` (e.g.
`2026-08-24` for "weeks 5–6") alongside `tbc: true`, but the initial sort/countdown logic
only checked for the *absence* of a `date` to decide what counts as unconfirmed — so a
tentative placeholder date was being sorted into the main soonest-first list and one of
them even won the single "most urgent" Star Border slot, overstating confidence in a date
that isn't real. Fixed by bucketing on `tbc` instead of on `date` presence: the main list,
the clash detector, and the "most urgent" pick now all only consider `!tbc` assessments;
anything with `tbc: true` (whether or not it has a placeholder date) goes in a merged
"Date tentative / TBC" section that shows "Approx. week of ⟨date⟩" when a placeholder date
exists and "No date announced yet" when it doesn't.

Step 7 (`/planner`, `/planner/[testId]`): build/lint clean; `csc-theory-test-1` confirmed
statically generated. Playwright screenshots at 360/768/1440. Specifically verified the two
riskiest pieces live, not just visually: (1) scrolled the detail page programmatically and
screenshotted mid-scroll — confirmed phase cards genuinely overlap/stack via CSS
`position: sticky` as intended, not just a flat list; (2) checked a task checkbox, read
`localStorage` directly to confirm the key was written, then reloaded the page and
confirmed the checkbox was still checked and the task text still struck through.

MAM2014S ingestion: build/lint clean; `/modules/MAM2014S` confirmed statically generated.
Playwright screenshots of all 5 routes at 360/1440 with zero console errors. Two real bugs
caught and fixed before calling it done:
- The `/modules` grid moved from 3 to 4 columns; the course-code text (`font-display
  text-2xl`, all four codes are exactly 8 characters) started visually clipping against the
  narrower card borders at 1440px. Fixed by dropping to `text-xl`, `p-5` instead of `p-6`,
  and widening the page container from `max-w-4xl` to `max-w-5xl`.
- MAM2014S Test 1 (24 Aug, confirmed) happens to fall on the same placeholder date as
  CSC1016S's *tentative* Practical Test 1 (also 24 Aug, `tbc: true`, a "weeks 5–6"
  approximation, not a real date). The Dashboard's Next Test tile and Urgent Flags tile
  both flagged this as a real clash — because `dashboard-view.tsx` was calling
  `findDateClashes(tests)` with the raw, unfiltered array. Step 6 had already fixed this
  exact bug on the Tests page (bucket on `hasConfirmedDate`, not raw `tests`) but the fix
  was never backported to the Dashboard, which was written in step 4, before that lesson
  was learned. Fixed both call sites to filter through `hasConfirmedDate` first. New data
  combinations exposing old latent bugs is exactly why this dashboard re-screenshots real
  data after every change rather than trusting that "it worked before."

## In progress

Nothing in progress. Step 8 complete except deploy (blocked on owner's Vercel auth, see
below) — the full build order is otherwise done.

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
(2026-07-26) — Assessment "is this confirmed" logic (step 6) settled on branching purely on
`tbc`, never on whether `date` happens to be present — a placeholder/approximate date with
`tbc: true` must never be treated as confirmed. `lib/tests.ts`'s existing
`hasConfirmedDate`/`getUpcoming`/`getNextConfirmed` already did this correctly; the bug was
in `/tests`'s own page-level bucketing duplicating that logic slightly wrong. Established
as a standing rule: any new code that buckets assessments by confidence should call the
`lib/tests.ts` helpers rather than re-deriving the check inline.
(2026-07-26) — Generated a real study plan for CSC1016S Theory Test 1 (step 7) instead of
leaving `studyPlans.ts` empty and shipping only empty states. Reasoning: the Scroll Stack
timeline and the `localStorage` check-off mechanism are the two riskiest, most novel pieces
of this step, and neither can be meaningfully proven correct against zero data — an empty
state proves nothing about whether stacking or persistence actually work. The test is 31
days out (reasonably "approaching" per the generation command's own trigger condition), and
the scope/schedule was derived from the already-transcribed CSC1016S syllabus + the
Week 1–5 schedule grid (not invented) — 4 topics covered before the test date, a 12-day
lead time split into 5 phases. If the owner would rather plans only ever appear via an
explicit "generate a plan for X" request, this one can be deleted from `studyPlans.ts`;
flagging as a blocker below.
(2026-07-26) — Scroll Stack implemented as plain CSS `position: sticky` cards with
per-index incrementing `top` offsets — no scroll-linked JS/Framer Motion transforms needed
for the core stacking mechanic, which is layout behaviour rather than animation, so it's
unaffected by (and doesn't need to be gated behind) `prefers-reduced-motion`. Verified with
a programmatic-scroll screenshot, not just a static full-page capture, since the effect
only shows while actually scrolling.
(2026-07-26) — Star Border "most urgent tile" priority on the dashboard now has an explicit
order: an active study plan whose `startDate` has arrived beats the next-test countdown
(both can't be starred at once, per CLAUDE.md's "single most-urgent card"). Currently moot
(the one real plan starts in 19 days) but wired correctly for when it isn't.
(2026-07-26) — MAM2014S (2RA, Real Analysis) added as a 4th tracked course on owner
request — CLAUDE.md previously said "three live courses" and explicitly listed MAM2014S as
"not part of this dashboard's three tracked modules" (see the earlier decision about the
duplicate HTML file). That earlier decision is superseded: the owner has now supplied this
course's real info sheet and asked for it to be tracked like the other three. Picked `ra`
(matching the course's own "2RA" nickname) as its accent token, teal `#2DD4BF` — distinct
from the existing blue/green/violet trio and >9:1 contrast on `base`. The source document
(a saved-webpage zip mislabeled with an `.html` extension, same as two earlier docs) was
normalized into `course-docs/MAM2014S/` matching the existing folder pattern, and the
original malformed file removed.
(2026-07-26) — MAM2014S's exact lecture time is unconfirmed (owner must still pick Period 4
vs Period 5), but the *days* it happens on are fully known from the source (Mon + Thu every
week, plus seven specific named Wednesdays). Modelled as three separate `tbc: true` Session
entries (Mon/Thu/Wed) with a placeholder Period-4 time rather than collapsing to one
"day unknown" entry — this is the same "day is real, time isn't" situation MAM2013S's
irregular Wednesday hit in step 3, but here the day *and* irregularity both need
preserving, so it gets its own instance of that pattern rather than reusing MAM2013S's
(which only had one irregular lecture, not three tbc entries).
(2026-07-26) — Test 1/Test 2 dates for MAM2014S were cross-checked against the 2026
calendar the same way STA2005S's were in step 2 (24 Aug is genuinely a Monday, 6 Oct is
genuinely a Tuesday, matching the source's own weekday claims) — found no inconsistency, so
`confirm: true` was deliberately *not* set on these two, unlike MAM2013S's and STA2005S's
test dates. Confirm markers should reflect actual evidence of a problem, not be applied
uniformly "to be safe."
(2026-07-26) — First real Lighthouse run this project (`next build` + `next start`, all
8 routes): everything scored 100 except the dashboard's Performance (96), caused by a
genuine Cumulative Layout Shift of ~0.12 — the five Bento tiles render a terse "Loading…"
line before `now` populates client-side, then swap to taller real content once it does,
reflowing the whole card grid beneath. Fixed by wrapping each tile's conditional content in
a container with a `min-h-[…]` sized to the loaded state, so the loading and loaded states
occupy the same space and nothing reflows. Re-run confirms CLS 0.004 and Performance 100.
This is exactly the "no layout shift, always set dimensions" rule CLAUDE.md's quality floor
already states for react.bits effects — turns out it applies just as much to plain
client-hydration content swaps.
(2026-07-26) — Specular Button and Gradual Blur (step 8's remaining react.bits accents)
deliberately left unimplemented rather than forced in:
  - Specular Button is scoped to "primary actions (the amber CTA)". There is no in-app
    primary action anywhere in this build — study plans are generated by an external Claude
    Code command, not a button, specifically so there's no fake "Generate" affordance (see
    the step-7 decision on the Active Plan tile's empty state). Nothing currently qualifies.
  - Gradual Blur is scoped to "any overflow-scroll list (a long timetable column, the module
    update feed)". Neither exists as an actual overflow-scroll container in this build: the
    timetable grid is a fixed 08:00–18:00 window rendered inline in the page (not an
    internally-scrolling box), and every `moduleUpdates` feed is currently 1–2 items.
  Both are explicitly allowed to stay "held in reserve... only if a clear need appears" per
  CLAUDE.md's own component-system section — deferring is the documented default, not a
  gap. Revisit if either a longer update feed or a genuinely tall/scrollable list shows up.

## Blockers / needs owner input

**The one thing left to reach full build-order completion:**
- **Deploy to Vercel** — every other part of step 8 (and steps 1–7) is done. This is the
  only remaining item, and it genuinely can't be done without you: connecting the GitHub
  repo to Vercel requires your own account authorization in a browser. Everything is
  committed and pushed to `main` (`bbwebdes/semester`) and ready to import as-is the moment
  you're ready — just say so, or do it yourself via vercel.com → New Project → import the
  repo (no config needed, it's a standard Next.js app).

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
- **Auto-generated CSC1016S study plan** — built proactively during step 7 to prove the
  Scroll Stack/check-off feature works (see decisions log), not requested via the explicit
  per-test generation command. Review its scope/phasing/lead-time and either keep it,
  edit it, or say the word and it comes out — future plans can go back to being generated
  only on request if preferred.
- **MAM2014S lecture slot** — which of Period 4 (11:00, Berdysheva) or Period 5 (12:00,
  Vandeyar) was actually chosen. All three lecture sessions (Mon/Thu/some-Wed) seeded
  `tbc:true` with a placeholder Period-4 time until confirmed.
- **MAM2014S test venues** — both Test 1 (24 Aug) and Test 2 (6 Oct) have confirmed
  date/time but "venues... will be announced closer to the time" per the source; seeded
  `venue: "TBC"`.

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
- MAM2014S tracked as a 4th course (`ra` teal accent) — supersedes the earlier assumption
  that only three courses existed; see decisions log.

## Next up

Every build-order step (1–8) is complete except deploying to Vercel, which needs the
owner's own account authorization — see "Blockers" above. Nothing else is planned; this is
the natural end of the CLAUDE.md build order. Any further work from here is either (a)
resolving one of the open owner questions above, (b) the owner deploying (or asking for
help walking through it), or (c) new scope the owner asks for.
