# PROJECT STATUS — Semester (Personal UCT Dashboard)

> Maintained by Claude Code. Updated at the end of every working block.
> Last updated: 2026-07-27 — STA2005S test dates confirmed by convenor (1 Sep/12 Oct),
> resolving the long-flagged STA/MAM clash; R session times corrected (see below)

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

**2026-07-27 ingestion — MAM2013S welcome email + Groups screenshot:** Dr Janelidze-Gray
("Dr Gray") sent a welcome email confirming lecture logistics and describing tutorial
sign-up as open until Wed 29 Jul, 11pm — read alone this looked like it contradicted the
2026-07-26 decision log entry treating the tutorial slot as already confirmed (Thu
14:00–16:00) from an earlier Amathuba screenshot. Found a second, newer screenshot
(`course-docs/MAM2013S updated tutorial time.png`, untracked, owner had dropped it in without
mentioning it in chat) showing the actual Amathuba Groups page: already signed up for
Thursday 14:00–15:00 (48/60 members), editable until the same 29 Jul deadline. That resolves
it — the tutorial *is* real and confirmed (not `tbc`), just a 1-hour slot, not the 2-hour
"2–4pm" block the welcome email describes generically. Kept both facts on record rather than
picking one silently: timetable/course-info show the confirmed 14:00–15:00 slot, and a
`moduleUpdates` reminder notes the email/Groups-page time discrepancy explicitly. Also
updated: lecture day corrected Mon→Tue (Wed/Fri unchanged) and lecture end time 13:00→12:45,
both real corrections from the convenor's own email. `courses.ts`, `timetable.ts`,
`moduleUpdates.ts` updated; build clean.

While in `course-docs` for the above, found a second untracked screenshot sitting alongside
it: `MAM2014S updated tutorial time.png`. Checked it even though this task was scoped to
MAM2013S, since it was clearly dropped in the same way — good thing, because it exposed a
real error: MAM2014S's tutorial had been recorded as **Fri 14:00–14:45, MCB Sem A** since
2026-07-26, but the actual Amathuba Groups page shows a **Thursday 15:00–16:00, Bio LT**
group already joined (21/30) — wrong day, wrong time, wrong venue, not just an unconfirmed
placeholder. The course outline confirms Thu/Fri tutorials run at 2pm and 3pm as 1-hour
slots, consistent with 15:00–16:00 for the "3pm" group. Corrected in `timetable.ts` and
`courses.ts`, with a `moduleUpdates` reminder explaining the correction. No new session
clash introduced (Thu 15:00 is otherwise free in the timetable). Re-checking `course-docs`
for untracked files even on a narrowly-scoped request is worth doing — stale "confirmed"
data is worse than `tbc` data because nothing on screen flags it as needing a second look.

**Later same day — CSC1016S convenor announcement + explicit slot change:** The owner is
planning to move CSC1016S off the previously-recorded Tue 12:00 group (see above) to **Tue
11:00** instead, and asked for the timetable to reflect that now rather than waiting for the
Amathuba re-pick to be finalized — `timetable.ts`/`courses.ts` updated accordingly, with a
note that it's the owner's intended pick pending re-confirmation, not yet re-verified on
Amathuba. This also resolves the CSC1016S/MAM2013S Tue 12:00 clash flagged just above it —
verified live that `/timetable`'s clash banner no longer fires. Also ingested a full
convenor (Aslam Safla) announcement: blended learning format (daily Mon–Thu video lectures,
Lesson 1 released 27 Jul), the real mechanics of lecture sign-up (6 sessions, 11am/12pm
Mon–Wed, sign-up closes Tue 28 Jul 10am, **ignore PeopleSoft/SEAT — the Amathuba group you
join is authoritative every week**), Assignment 1 Parts A&B (self-paced setup tutorial,
released Wed 29 Jul), and weekly practicals starting Mon 3 Aug (compulsory in-prac questions
vs. take-home questions, missing a session forfeits the in-prac mark). All transcribed
verbatim from the announcement into `moduleUpdates.ts` — cross-checked 28 Jul/29 Jul/3 Aug
against the 2026 calendar (Tue/Wed/Mon respectively, all consistent with the source's own
weekday claims, so no `confirm` flag needed). No separate `tests.ts` entry added for
Assignment 1 — CLAUDE.md's CSC1016S weighting has no standalone "assignment" line, so this
is modelled as part of the practical average via `moduleUpdates`, consistent with the
practical-test entries already there.

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

Final scheduled QA pass (post-step-8, usage-limit resume): build/lint clean; Playwright
sweep of all 10 routes (`/`, `/timetable`, `/modules` ×5, `/tests`, `/planner` ×2) with zero
console/page errors; Lighthouse re-run on the two changed pages (home, timetable) both still
100/100/100/100, CLS 0.004–0.006. See decisions log for the MAM2014S slot update, the
Dashboard Urgent-Flags coverage gap it exposed and fixed, and the real (non-bug) timetable
clash it surfaced.

## In progress

Nothing in progress. Ran the scheduled final QA pass (owner asleep, usage limit had reset):
applied the owner's MAM2014S lecture-slot choice (Period 4, 11:00, confirmed via a quick
message before the reset), then `npm run build` + `npm run lint` + a full Playwright sweep
of all 10 routes (zero console/page errors) + a fresh Lighthouse run on the two changed
pages. Found and fixed one real gap; found and surfaced one real scheduling conflict that
isn't a bug — see decisions log and Blockers. Full build order is done except deploy.

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
(2026-07-26) — Owner confirmed MAM2014S's lecture slot: Period 4 (11:00–11:45, Assoc Prof
Berdysheva), not Period 5. Updated `timetable.ts` (all three Mon/Thu/Wed lecture sessions
now confirmed, `tbc` removed), `courses.ts`'s `lectureInfo` (also fixed a pre-existing typo
there — it said the tutorial was 14:00–15:00, but the actual confirmed slot is 14:00–14:45),
and replaced the now-resolved "pick a slot" `moduleUpdates` reminder with a factual
`announcement` recording the choice made, rather than leaving a stale instruction to do
something already done.
(2026-07-26) — Confirming that slot revealed a real, unavoidable timetable clash: MAM2014S's
Period 4 (Mon 11:00–11:45, M320) directly overlaps CSC1016S's Monday lecture (11:00–11:45,
JD LT2). Checked whether Period 5 would have been better — it would not: Period 5
(12:00–12:45) overlaps MAM2013S's Mon/Wed/Fri lecture (12:00–13:00) instead. This is a
genuine three-course scheduling conflict inherent to the owner's timetable, not a data bug,
and correctly surfaces via the timetable's existing clash detection — logged as a real
blocker below rather than "fixed" by silently altering data to hide it.
(2026-07-26) — While verifying the above, found that the Dashboard's "Urgent flags" tile
only ever checked assessment-*date* clashes (`findDateClashes`) and unset timetable slots —
it had no path to surface a timetable *session*-time clash like the one above, even though
CLAUDE.md's own dashboard spec lists "clash" generically as an urgent-flag category and the
timetable page has had session-clash detection (`findClashes`) since step 3. Treated as a
genuine coverage gap in an existing feature (not new scope) and fixed: the tile now also
groups `findClashes` results by day and surfaces them (e.g. "CSC1016S & MAM2014S clash every
Mon", linking to `/timetable`), sized generously enough (`min-h-[176px]`) to avoid
reintroducing the step-8 CLS issue as flag count grows.
(2026-07-26) — Final scheduled QA pass (see quality gates): full rebuild, lint, a 10-route
Playwright sweep (zero console errors), and a re-run Lighthouse check on the two changed
pages (home, timetable) — both still 100/100/100/100, CLS 0.004–0.006, confirming the new
dashboard clash flag didn't reintroduce the layout-shift bug fixed earlier in step 8.
(2026-07-27) — MAM2013S welcome email ingested (owner pasted the email text directly rather
than dropping a file in `/inbox`; treated as equivalent per the ingestion workflow's intent).
Lecture day corrected Mon→Tue, end time 13:00→12:45 (M320, Wed/Fri unchanged) — first lecture
Tue 28 Jul. Initially reverted the tutorial to `tbc: true` reading the email in isolation
(it describes sign-up as still open), but then noticed an untracked screenshot already sitting
in `course-docs` (`MAM2013S updated tutorial time.png`) showing the real Amathuba Groups page:
already signed up for Thu 14:00–15:00 (48/60), editable until the same 29 Jul deadline.
Corrected course of action mid-task — kept the session confirmed (not `tbc`) at the real
14:00–15:00 slot, and logged the 1-hour-vs-2-hour discrepancy between the email's generic
description and the actual group slot as a `moduleUpdates` reminder rather than silently
trusting either source alone. `npm run build` clean; spot-checked `/timetable` and
`/modules/MAM2013S` against a production server.
(2026-07-27) — MAM2014S's tutorial was wrong, not just unconfirmed: a fresh Amathuba Groups
screenshot (found while processing an unrelated MAM2013S screenshot in the same folder) shows
the real joined group is Thursday 15:00–16:00, Bio LT (21/30) — the data had carried Fri
14:00–14:45, MCB Sem A since 2026-07-26. Corrected both `timetable.ts` and `courses.ts`,
logged via `moduleUpdates`. Distinct from the usual `tbc` pattern: this was *marked* confirmed
while actually being stale, which is a worse failure mode since nothing on screen prompts a
recheck — worth remembering to spot-check "confirmed" slots against Amathuba occasionally
rather than treating a `tbc:false` entry as permanently settled.
(2026-07-27) — Same pattern a third time: `CSC1016S updated lecture time.png` (also untracked,
also found while sweeping `course-docs` rather than requested directly) showed the real
confirmed lecture group is Tue 12:00 (Period 5, JD LT2, 59/150) — not the Mon 11:00 entry the
data had carried since 2026-07-26. Corrected `timetable.ts`/`courses.ts`. This move happens to
resolve the long-standing MAM2014S/CSC1016S Monday clash (flagged since 2026-07-26) but opens
a new one against MAM2013S's just-confirmed Tue 12:00 lecture — verified live that
`/timetable`'s clash banner picks it up automatically ("2 sessions overlap another session"
listing both courses), so no code change was needed, only data. See Blockers for the updated
real-world conflict and the very-near sign-up expiry (28 Jul, 10am) worth double-checking.
(2026-07-27) — STA2005S test dates resolved: convenor Birgit Erni posted on Amathuba
(26 Jul, 1:15pm, edited) confirming the correct dates are 1 September and 12 October —
the grid dates, not the prose dates seeded in step 2 with `confirm: true`. Updated
`tests.ts` (`sta-test-1` → 2026-09-01, `sta-test-2` → 2026-10-12, both `confirm` flags
removed) and `moduleUpdates.ts` (replaced the two stale "verify on Amathuba" reminders
with a single confirmation entry). This also resolves CLAUDE.md's flagship STA/MAM
"same-day clash" example: MAM2013S Test 1 is still 2 Sep, so the two tests are now on
consecutive days, not the same day — verified the `/tests` and `/` clash banners no
longer fire for this pair (clash detection is fully data-driven, no code change needed).
Also corrected two R-session details from an owner follow-up message (no source document,
message treated as equivalent to an `/inbox` drop per the ingestion workflow's intent):
the R online introduction to R is Tuesday 2pm, not Wednesday as previously announced, and
R workshops run weekly throughout the semester on Wed/Thu/Fri 14:00–16:00 — logged as a
`moduleUpdates` info-session entry. Left `timetable.ts` untouched for the R workshops:
unlike the confirmed Tue prac slot and Wed tutorial already in `timetable.ts` (both from
real Amathuba screenshots), it's not established which single workshop day/time (if any)
becomes a fixed weekly commitment versus a set of optional drop-in times, so this stays a
`moduleUpdates` note rather than a guessed timetable entry. Build clean.
(2026-07-27) — Owner explicitly asked to move CSC1016S to Tue 11:00 on the timetable *now*,
ahead of actually re-confirming it on Amathuba or speaking to the convenor — an explicit
instruction to seed intent rather than wait for confirmation, unlike every other slot change
this session which followed real Amathuba evidence. Recorded as such in the session's `note`
field and flagged in Blockers, rather than silently treated as equally confirmed as the
screenshot-backed corrections above it. Also ingested the CSC1016S convenor's full welcome
announcement (blended learning structure, lecture sign-up mechanics, Assignment 1 release,
practical start date) into `moduleUpdates.ts` — see the paragraph above the section tracker
for the detail.

## Blockers / needs owner input

**Timetable clash history (resolved, but needs a real Amathuba re-confirmation):**
- The Mon 11:00 MAM2014S/CSC1016S clash (flagged since 2026-07-26) and the Tue 12:00
  CSC1016S/MAM2013S clash it was briefly replaced by (flagged earlier on 2026-07-27) are
  both moot now: the owner is moving CSC1016S to **Tue 11:00**, which the dashboard reflects
  as of this session — no session on the timetable currently clashes. **This slot is the
  owner's stated intent, not yet re-confirmed on Amathuba** — the convenor's announcement
  says sign-up for one of 6 sessions (11am/12pm, Mon–Wed) closes **Tue 28 Jul, 10:00am**, and
  explicitly says whichever Amathuba group is actually joined governs (not PeopleSoft/SEAT).
  If the Tue 11am group turns out to be full or unavailable, or a different slot ends up
  chosen after speaking to the convenor, the timetable will need a follow-up correction.

**The one thing left to reach full build-order completion:**
- **Deploy to Vercel** — every other part of step 8 (and steps 1–7) is done. This is the
  only remaining item, and it genuinely can't be done without you: connecting the GitHub
  repo to Vercel requires your own account authorization in a browser. Everything is
  committed and pushed to `main` (`bbwebdes/semester`) and ready to import as-is the moment
  you're ready — just say so, or do it yourself via vercel.com → New Project → import the
  repo (no config needed, it's a standard Next.js app).

**Waiting on:**
- **MAM2012S** — owner mentioned they're pending registration for a possible 5th course.
  Not added anywhere yet (no info sheet, not confirmed) — will ingest the same way as
  MAM2014S once registration is confirmed and the course info sheet is dropped in
  `course-docs`.

**Open owner questions:**
- **Claude Code plan tier** (Pro / Max 5x / Max 20x) — sets model-routing expectations.
  Default assumption: Sonnet 4.6 for ~everything, Opus 4.8 only for hard schema/debugging
  work. On Pro this is comfortably within limits for this scope.
- **CSC1016S practical session slot** — still genuinely unset; no Amathuba group screenshot
  for it yet (unlike the lecture, which is confirmed Mon 11:00). Seeded `tbc:true`.
- **STA2005S Practical Test date, Assignment 1 date** — not yet announced anywhere in the
  outline (not even a provisional week); seeded with `tbc:true` and no `date`.
- **MAM2013S tutorial venue** — day/time confirmed (Thu 14:00–15:00, via a 2026-07-27
  Amathuba Groups screenshot showing you're already signed up, 48/60) but the venue isn't
  shown in that listing; seeded `venue: "TBC"`. Also: the welcome email describes tutorials
  generically as 2-hour blocks (2–4pm) while your actual confirmed slot is 1 hour (2–3pm) —
  not treated as an error since the Groups page is the more direct source, but worth a
  glance next time you're on Amathuba given sign-up stays editable until Wed 29 Jul 11pm.
- **App name** — "Semester" is a placeholder.
- **Auto-generated CSC1016S study plan** — built proactively during step 7 to prove the
  Scroll Stack/check-off feature works (see decisions log), not requested via the explicit
  per-test generation command. Review its scope/phasing/lead-time and either keep it,
  edit it, or say the word and it comes out — future plans can go back to being generated
  only on request if preferred.
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
- STA2005S R prac (Tue 14:00–15:00, Scilab D) and STA2005S tutorial (Wed 14:00–15:00, LS2B)
  are confirmed real slots, not placeholders — owner-supplied Amathuba screenshots, see
  decisions log.
- CSC1016S lecture corrected (2026-07-27) to Tue 12:00–12:45, Period 5, JD LT2, per the real
  Amathuba Groups sign-up — supersedes the earlier Mon 11:00 entry; see decisions log and
  Blockers for the new clash this revealed.
- MAM2014S tracked as a 4th course (`ra` teal accent) — supersedes the earlier assumption
  that only three courses existed; see decisions log.
- MAM2014S lecture slot confirmed as Period 4 (Mon/Thu/some-Wed, 11:00–11:45, M320,
  Berdysheva) — no longer `tbc`. This is what revealed the real Mon 11:00 clash with
  CSC1016S; see Blockers.
- MAM2014S tutorial corrected (2026-07-27) to Thu 15:00–16:00, Bio LT, per the real
  Amathuba Groups sign-up — supersedes the earlier Fri 14:00–14:45, MCB Sem A entry, which
  did not match any real joined group; see decisions log.
- MAM2013S tutorial confirmed (2026-07-27) as Thu 14:00–15:00 per the real Amathuba Groups
  sign-up, still changeable until Wed 29 Jul 11pm; venue not yet shown, seeded `venue: "TBC"`.

## Next up

Every build-order step (1–8) is complete except deploying to Vercel, which needs the
owner's own account authorization — see "Blockers" above. Nothing else is planned; this is
the natural end of the CLAUDE.md build order. Any further work from here is either (a)
resolving one of the open owner questions above, (b) the owner deploying (or asking for
help walking through it), or (c) new scope the owner asks for.
