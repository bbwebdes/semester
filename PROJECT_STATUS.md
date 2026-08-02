# PROJECT STATUS — Semester (Personal UCT Dashboard)

> Maintained by Claude Code. Updated at the end of every working block.
> Last updated: 2026-08-02 (second update today) — generated a real study plan for all
> 8 tests across all 4 courses (previously only 1 plan existed, for the now-dropped
> CSC1016S). Fixed a real dashboard bug this surfaced: `ActivePlanTile`'s plan-picking
> logic only ever worked correctly for exactly one plan. See "Current state" below.
>
> Earlier today — CSC1016S dropped by the owner and removed from the dashboard
> entirely (all data files, tokens, accent, and its lone study plan); STA2005S/MAM2012S/
> MAM2013S venues updated per owner correction; timetable session cards simplified to
> code/kind/time/venue only (no note text); `/concepts` restructured with Week 1..N tabs
> plus an "All weeks" master tab.

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

**2026-07-29 — MAM2012S promoted to a full tracked course + STA2005S expansion:** The
owner reorganized `/course-docs` into three new subfolders (`course-information/`,
`times/`, `learning-documents/`) and dropped in three genuinely new files: a real
MAM2012S course info sheet (`mam2012s-course-info.pdf`, lecturer Mr Thomas van Heerden),
an Amathuba tutorial-slot screenshot (`MAM2012S - Tutorial Time.png`), and a fuller
STA2005S reference document (`STA2005S Notes.pdf`, "Applied Linear Regression — Notes
and Theorems", 2019). Verified via `md5sum` against the git-tracked originals that every
other reorganized file (MAM2013S/MAM2014S notes, the two raw "Course Information.html"
webpage saves, the CSC1016S notes PDF, all the timetable-slot PNGs) is byte-identical
content just relocated — nothing was silently changed in the move, so nothing needed
re-ingesting for those.

MAM2012S (2DE, Differential Equations) was previously modelled only as a
`ConceptModuleCode` (concept briefings existed, but it wasn't a real dashboard course)
because it was pending registration confirmation. The new course info sheet resolves
that: added as a 5th tracked course everywhere — `CourseCode`/`AccentToken` unions
extended, a new `de` lime accent (`#A3E635`, chosen to be clearly distinct from the
existing blue/green/violet/teal quartet; manually contrast-checked at ~12.8:1 on `base`
and ~11.7:1 on `surface`, comfortably clearing the 4.5:1 floor), `courses.ts` (Thomas van
Heerden, Class Record = 10% tutorial tests + 45% T1 + 45% T2, DP ≥35%),
`timetable.ts` (Tue/Fri/some-Wed lectures 11:00–11:45 M320, Fri 14:00–15:00 tutorial at
Hahn 4G confirmed via Amathuba), `tests.ts` (Test 1 Mon 31 Aug 18:00, Test 2 Thu 15 Oct
18:00 — both weekdays cross-checked against the 2026 calendar and match the source),
`moduleUpdates.ts`, and `data/concepts/modules.ts` (simplified to just reuse each
course's real accent now that every note-set module is tracked, removing the manual
neutral-styled MAM2012S entry). `ConceptModuleCode` was simplified from
`CourseCode | "MAM2012S"` to a plain alias of `CourseCode`, since MAM2012S is now already
part of that union. `bento-tile.tsx`'s `glowRgb` map needed the new `de` key too (caught
by the type checker, not silently missed).

Two real timetable clashes surfaced from adding MAM2012S's real slots, both left visible
via the existing (unmodified) clash detector rather than hidden:
- **Genuine, permanent clash:** MAM2012S's Tue 11:00–11:45 lecture directly overlaps
  CSC1016S's current Tue 11:00–11:45 lecture — a real scheduling conflict, not a data bug.
- **False positive, by design limitation:** MAM2012S and MAM2014S both use the same
  irregular "some Wednesdays" Period 4/M320 slot, but their specific real Wednesdays never
  actually coincide (checked all 12 dates across both courses — completely disjoint,
  strongly suggesting the department deliberately alternates them to share the room). The
  timetable's clash detector is weekday-based, not date-aware, so it still flags this pair
  every Wednesday even though the real calendar never has them clash. Documented with an
  explanatory `note` on both sessions rather than a code change, since making clash
  detection date-aware for two irregular sessions would be a disproportionate architecture
  change for this one pair — flagged as a known limitation, not silently worked around.

STA2005S: transcribed the owner-supplied "Introduction to R" announcement text (R is a
major, ongoing part of the course from week 1 onward, not a side skill) into a new
`moduleUpdates.ts` announcement entry, and added CLAUDE.md's own R-sessions bullet to
say so explicitly. Separately, the newly found `STA2005S Notes.pdf` turned out to be a
full "Applied Linear Regression" reference (dated 2019, likely a reused supplementary
resource rather than this year's dated lecture deck) covering the general linear model
end to end — matched topic-for-topic against `tests.ts`'s own `sta-test-1` scope, so used
as a real source. Added 9 new concept briefings (general linear model & MLE, confidence/
prediction intervals, hypothesis tests & the Wald test, the ANOVA table & R², residual
diagnostics, outliers & influence, variable selection, the Gauss-Markov theorem, and
transformations & indicator variables), bringing STA2005S to 13 concepts total. Did not
fabricate cards for bootstrapping or PCA (also named in the Test 1 scope) since this
source doesn't cover them, nor for any Test 2 design-of-experiments topic. In the same
pass, corrected a stale figure: the MAM2012S concept-briefing count recorded elsewhere in
this file as "19" is actually 17 (verified by counting `id:` entries in
`data/concepts/mam2012s.ts` directly) — the cover page of `2DE NOTES.pdf` names topics
(vector geometry, standalone Taylor series/complex numbers) not actually present as
separate chapters, which is exactly the discrepancy the 2026-07-27 decision log entry
already flagged; the "19" was simply miscounted at the time, not a new finding.

Build + lint clean; production build (`next build`+`next start`) Playwright-swept across
`/`, `/timetable`, `/modules`, `/modules/MAM2012S`, `/tests`, `/concepts` at 1440px with
zero console/page errors; confirmed live that both new clashes render correctly on
`/timetable` and `/`'s Urgent Flags tile, that `/modules` grid wraps MAM2012S onto a new
row without overflow (no repeat of the MAM2014S-era clipping bug), that `/tests` sorts
MAM2012S's two tests correctly by countdown, and that the 9 new STA2005S cards expand/
collapse correctly on `/concepts` with the right difficulty badges.

**2026-07-29 (later same day) — CSC1016S slot switch + weekly MAM alternation
checker:** The owner asked to re-check the three MAM courses' course info sheets for
their irregular "some Wednesdays" scheduling (given MAM2012S and MAM2014S share the
same Period-4/M320 slot on alternating real dates), and to switch CSC1016S to
Mon 12:00–13:00 to resolve the real Tue clash with MAM2012S flagged earlier today.

Re-checked all three MAM courses' source documents directly rather than trusting the
existing data: MAM2012S's specific Wednesdays (5/26 Aug, 16 Sep, 7/21 Oct) and
MAM2014S's (29 Jul, 12/19 Aug, 2/23/30 Sep, 14 Oct) both matched what was already in
`timetable.ts` exactly — confirmed against the raw "Course Information.html" source for
MAM2014S specifically. MAM2013S's course info sheet and its full `MAM2013S NOTES.pdf`
(math content only) were both checked for a similar specific-date list — neither
publishes one, and MAM2013S's own irregular Wednesday is a different time (Period 5,
12:00–12:45) from the other two's shared Period 4 slot anyway, so it was never part of
that room-swap and needed no data change — only a note confirming the check was done.

CSC1016S moved from Tue 11:00–11:45 to **Mon 12:00–13:00**, JD LT2 (the owner's stated
choice, specifically to get off MAM2012S's fixed Tuesday slot) — verified against the
current timetable that Monday 12:00–13:00 has no other session and introduces no new
clash. `timetable.ts`, `courses.ts` and `moduleUpdates.ts` updated; the resolved-clash
note removed from MAM2012S's Tue session in `timetable.ts` since it's no longer accurate.

Built the requested "weekly checker": `Session.dates?: string[]` added to
`data/types.ts` for sessions that only happen on specific real calendar dates (currently
just MAM2012S's and MAM2014S's Wed lectures), populated with both courses' real date
lists. `lib/timetable.ts` gained `dateOfDayThisWeek()` and `findDatedSessionSlots()`,
which group same-day/time/venue dated sessions and resolve which one (if any) is real
for the current week by matching against the actual calendar date. `/timetable` now
shows a "This week's alternating slot" card above the clash banner — verified live
(system date 29 Jul 2026, itself a real MAM2014S date) that it correctly reads
"Wed 29 Jul: MAM2014S lecture, M320". This doesn't remove the underlying false-positive
clash banner (the clash detector itself is still deliberately not date-aware, per the
2026-07-29 decision earlier today), but now sits right above it with the real per-week
answer, which is what was actually being asked for.

Build + lint clean; production build Playwright-checked live on `/timetable` and `/` —
confirmed the CSC1016S/MAM2012S clash entry is gone from the dashboard's Urgent Flags
tile (only the Wed false-positive remains), and the new checker card renders correctly
above the clash banner with the right course, date and venue.

**2026-07-29 (third update today) — eliminated the Wed false-positive clash banner,
added an explicit Week 1/Week 2 toggle:** The owner asked to actually remove the
MAM2012S/MAM2014S Wed clash banner (rather than just annotate it), and to present the
alternation as two explicit timetable variants ("week 1" / "week 2").

Rather than special-casing the clash detector (which is intentionally date-agnostic and
shared by other code), the fix is architectural: `lib/timetable.ts` gained
`resolveSessionsForWeek(sessions, now)`, which finds any sessions sharing a day/time/venue
slot on different real dates (an "alternating group" — currently just MAM2012S/MAM2014S's
Wed lecture) and resolves each group down to whichever single candidate's `dates` list
includes the real date for that weekday this week (or none, dropping both, if neither
matches). Both `/timetable` and the dashboard now feed clash detection and weekly displays
through this resolved list, so the two candidates are never both present at once —
the clash simply has nothing to compare against anymore, everywhere, not just visually
suppressed on one page.

`/timetable` additionally got `buildWeekVariants(sessions)`, which turns an alternating
group into one `WeekVariant` per candidate (each a full, self-consistent session list) and
renders them as an explicit toggle ("Week 1 · MAM2014S" / "Week 2 · MAM2012S") above the
grid, defaulting to whichever is real for the current week (a "(this week)" tag marks it)
and letting the owner manually preview the other version. Copy under the toggle is
explicit that the pattern doesn't strictly alternate 1-2-1-2 (verified: two pairs of
consecutive real weeks are both MAM2014S — 12/19 Aug and 23/30 Sep — and the week of
9 Sep has neither), so "Week 1"/"Week 2" are labels for the two versions, not a strict
biweekly cycle claim.

The dashboard's `UrgentFlagsTile`, `NextClassTile` and `ThisWeekTile` all now receive
`resolveSessionsForWeek(sessions, now)` instead of the raw `timetable` array, so "This
week" only ever lists the real candidate and Urgent Flags no longer raises the Wed flag.

Build + lint clean; production build Playwright-verified live: `/timetable`'s clash
banner is gone entirely (only the "Set your slot" TBC panel remains, which is unrelated),
the toggle defaults correctly to "Week 1 · MAM2014S (this week)" against today's real
date (29 Jul 2026), clicking "Week 2" correctly swaps the Wed session to MAM2012S with
no banner reappearing, and the dashboard's Urgent Flags tile no longer lists the Wed
clash (only the unrelated Amathuba-verification and unset-slot flags remain).

**2026-08-02 — CSC1016S dropped, three venue corrections, timetable simplified,
Concepts restructured by week:** The owner dropped CSC1016S from their course load and
gave four unrelated data corrections in one request, all executed autonomously without
a per-step review pause (consistent with the current auto-mode session).

CSC1016S removed everywhere, not just hidden: `CourseCode`/`AccentToken` no longer
include it, its `courses.ts`/`timetable.ts`/`tests.ts`/`moduleUpdates.ts` entries are
gone, its `csc` accent token is gone from `globals.css`/`lib/accent.ts`/
`app/components/bento-tile.tsx`'s glow map, and `studyPlans.ts` — which only ever held
the one CSC1016S plan generated in step 7 — is now an empty array (the Planner page's
existing empty state handles this with no code change needed). CLAUDE.md's course-data
section updated to four live courses.

Three venue corrections from the owner: STA2005S lectures moved to **JD LT 1** (was PD
Hahn 2); MAM2012S lectures split by day — **LS 2D** on Tue/Wed, **LS 2A** on Fri (was
M320 for all three); MAM2013S tutorial venue set to **M200** (previously unconfirmed/
`TBC`). The MAM2012S venue change had a real architectural knock-on: `findAlternatingGroups()`
in `lib/timetable.ts` (the function behind the MAM2012S/MAM2014S Wed Week-1/Week-2
toggle from the 2026-07-29 work) grouped alternating sessions by `day|start|end|venue` —
since MAM2012S's Wed venue no longer matches MAM2014S's M320, that key would have
silently broken the toggle and reintroduced the false-positive Wed clash banner. Fixed
by dropping `venue` from the grouping key (grouping is really about "can't be in both
at the same day/time", which doesn't depend on venue) — verified the toggle and
false-clash suppression both still work after the venue change.

Timetable session cards (`SessionContent` in `app/timetable/timetable-view.tsx`)
simplified per owner request: dropped the `note` text line entirely, so a card now
shows exactly code · kind · time · venue, matching CLAUDE.md's original feature
description (which the `note` additions had drifted away from over the session-by-
session ingestion work). The separate "Set your slot" TBC panel (which also renders
`note`) was left as-is since it's a different UI element, not one of these cards, and
currently has nothing in it (no session in the data has `tbc: true` after the CSC1016S
removal).

`/concepts` restructured with week tabs per owner request: `ConceptBriefing` gained
optional `week`/`weekConfirmed` fields. Only STA2005S's four cards from the explicitly-
labelled "W1" slide decks got `weekConfirmed: true` (week 1) — no other source document
in `/course-docs` states which week any topic was taught. For every other card, week
numbers are an **estimated pacing guide**, computed by a one-off script
(not committed — described here for reproducibility) that grouped each module's
concepts by their existing `sourceRef` (already in syllabus order) and spread those
groups evenly across a 12-week semester. This is explicitly not a verified lecture
schedule — `/concepts` shows a caveat under the week tabs, and cards display
"Week N (est.)" whenever `weekConfirmed` is false. `ConceptsView` gained a week tab bar
("All weeks" plus one tab per week present in the data) that composes with the existing
search/difficulty/tag filters. Flagged in Blockers below for owner confirmation against
the real weekly lecture pacing, same treatment as any other `confirm`-style uncertain
data in this project.

`npm run build`, `npm run lint`, and `npx tsc --noEmit` all clean. Manually verified via
the dev server (no Playwright browser available this session — not pre-installed and
not added as a dependency to avoid an unrequested dependency change): `/timetable`
renders the new venues (JD LT 1 ×5, LS 2D ×2, LS 2A ×1, M200) with zero CSC1016S
sessions; `/`, `/modules`, `/tests` all show zero CSC1016S references; `/concepts`
renders "All weeks" plus per-week tabs (checked the raw SSR HTML directly, since a
React hydration comment between "Week" and the number defeated a naive text search at
first). Full Playwright screenshot/Lighthouse sweep not re-run this session — flagged
as a gap below, not silently skipped.

**2026-08-02 (second update today) — study plans generated for all 8 tests:** Owner
asked to read CLAUDE.md fully and generate study plans for all tests, using the
study-plan generation command in CLAUDE.md ("read tested scope from `/course-docs`,
set `startDate = testDate − lead time` scaled by scope size/weighting, break into
phased checkable tasks, link resources"). Interpreted "all tests" as the 8
`kind: "test"` assessments specifically (not the STA2005S practical test/assignments,
which are either still `tbc` with no real date/scope or aren't "tests" to prep for the
same way).

Scope for each plan came from real sources, not invented: STA2005S's two tests already
had good topic lists in `tests.ts` (unchanged). MAM2012S's "Linear ODEs" / "Systems of
linear ODEs and linear PDEs" test-1/test-2 split in `tests.ts` was already correct and
mapped cleanly onto the 5+6 concept-briefing chapters (Ch1–2 vs. Ch3–4) already
transcribed from `2DE NOTES.pdf`. MAM2013S and MAM2014S were different: `tests.ts` only
had procedural placeholder text for their scope ("provisional date...",
"in-person, invigilated, closed-book") — neither course's `course-docs` (course info
sheet or the full NOTES.pdf) states which chapters are tested in Test 1 vs. Test 2.
Replaced both with the real chapter-by-chapter topic lists from the already-transcribed
concept briefings, split at a structurally sensible boundary (MAM2013S: Test 1 ends
after Subgroups, Test 2 starts at Cyclic groups; MAM2014S: Test 1 ends after the
Monotone Convergence Theorem, Test 2 starts at series). **This split is a pacing
estimate, not a confirmed fact** — flagged as the last `scope` bullet on all four
affected tests and in Blockers below, per CLAUDE.md's "flag for owner confirmation,
don't silently pick one" rule (same treatment as the `/concepts` week-estimate flagged
earlier today).

Lead times scaled roughly by scope size and weight (STA/MAM2012S/MAM2013S: 12–18 days;
MAM2014S: 16–21 days, since its Test 2 alone covers 8 chapters). Every phase task is
concrete and checkable (re-derive X from memory, solve N practice problems, apply a
named test/theorem to worked examples) and scope-and-schedule only — no worked
solutions, per CLAUDE.md's study-planner constraint. Resources reuse the exact verified
URLs already stored in each module's `/data/concepts/*.ts` (StatQuest, Khan Academy,
MIT OCW, 3Blue1Brown, Socratica) rather than fabricating new links.

Generating 8 real plans (vs. the 1 that existed before, for the now-dropped CSC1016S)
surfaced a genuine dashboard bug: `ActivePlanTile` picked a plan via
`studyPlans.find(p => daysUntil(p.startDate, now) >= 0)`, which returns the first
*array-order* match, not the most relevant one — with 1 plan this degenerated to "the
plan," but with 8 it would show whichever plan happens to sit first in the array
regardless of which test is actually soonest, and — separately — the dashboard's
`planStartingNow` flag used `.some(...)` across all plans, so once *any* single plan
anywhere in the semester had started, the next-test countdown tile would silently stay
non-urgent for the rest of the semester. Fixed with a shared `pickActivePlan()` helper
(new `lib/studyPlans.ts`): excludes plans whose test has already passed, prefers a plan
that's already started (soonest-test-first among those), else falls back to whichever
plan starts soonest. Both `ActivePlanTile` and the dashboard's `planStartingNow` now
derive from the same single selection so they can't disagree. Verified the fix
directly (not just visually): computed `pickActivePlan` by hand against today's real
date (2 Aug) and confirmed it correctly picks MAM2014S Test 1's plan (starts in 6 days,
soonest of all 8) rather than STA2005S Test 1's plan (which sits first in the array but
starts later, in 14 days).

`npm run build`, `npm run lint`, `npx tsc --noEmit` all clean; all 8
`/planner/[testId]` routes statically generated. No Playwright browser available this
session (same constraint as earlier today) — spot-checked via the dev server that all
8 planner routes return 200 and render real content.

## Section tracker

| Section | Status | Notes |
|---|---|---|
| Concept Briefing — STA2005S | done | `/concepts` built end to end: types, `/data/concepts/{sta2005s,modules,index}.ts`, `ConceptCard`/`ConceptsView` UI (search + difficulty/tag filters, expand-in-place cards, grouped by module then source deck), nav link. 13 concepts total: 4 from the Week 1 slide decks (course intro, MVN distribution, linear transformations/partitions of MVN, quadratic forms & chi-square) plus 9 added 2026-07-29 from the fuller `STA2005S Notes.pdf` reference document (general linear model & MLE, confidence/prediction intervals, hypothesis tests & the Wald test, ANOVA table & R², residual diagnostics, outliers & influence, variable selection, Gauss-Markov, transformations & indicator variables). Build/lint clean; Playwright screenshots 360/768/1440 + expanded-card state, zero console errors. |
| Concept Briefing — MAM2013S | done | 12 concepts transcribed from the full `MAM2013S NOTES.pdf` (Introductory Algebra, 2IA): Ch1 Integers (induction, divisibility/gcd/Bézout, congruences/ℤₙ), Ch2 Permutations (cycles, parity/alternating group), Ch3 Groups (definition/Cayley tables, subgroups/centre, cyclic groups, homomorphisms/isomorphisms), Ch4 Lagrange's Theorem, Ch5 Factor groups (normal subgroups, First Isomorphism Theorem). Appendix A (sets/maps/equivalence relations) folded into the induction card's pre-lecture prereqs rather than given its own card, since the notes treat it as background review. Build/lint clean; Playwright screenshot 1440px, zero console errors. |
| Concept Briefing — MAM2014S | done | 20 concepts transcribed from the full `MAM2014S NOTES.pdf` (Real Analysis, 2RA): Ch0 Preliminaries (sets/number systems), Ch1 The real numbers (induction/√2 irrationality, completeness axiom, consequences of completeness, cardinality), Ch2 Sequences and series (limits, Monotone Convergence Theorem, series basics, comparison/p-series, subsequences/Bolzano-Weierstrass, Cauchy sequences, absolute/conditional convergence, ratio/root tests, rearrangements), Ch3 Topology of ℝ, Ch4 Limits of functions/continuity/uniform continuity, Ch5 Derivatives & the MVT family, Ch6 Sequences/series of functions and power/Taylor series. Cardinality, uniform continuity, and rearrangements marked `stretch`; power series/Taylor series marked `hard` (with `tips`, since it's the most demanding topic in the course). Build/lint clean; Playwright screenshots 360/1440 + an expanded-card check, zero console errors. |
| Concept Briefing — MAM2012S | done | 17 concepts (corrected 2026-07-29 from a stale "19" figure — verified by direct count) transcribed from the full `2DE NOTES.pdf` (MAM2000W - 2DE: Differential Equations): Ch1 linear independence/Wronskian; Ch2 homogeneous/nonhomogeneous constant-coefficient ODEs, the annihilator method, variation of parameters, Cauchy-Euler equations; Ch3 diagonalisable systems, the matrix exponential, generalised eigenvectors, Jordan normal forms, complex eigenvalues in systems, nonhomogeneous systems; Ch4 the heat equation/separation of variables, orthogonality/Fourier coefficients, Fourier series & convergence, term-by-term differentiation/integration, the Fourier transform, and the Black-Scholes equation. MAM2012S is now a fully tracked course (see 2026-07-29 entry above) with its own `de` accent, no longer modelled only via `ConceptModuleCode`. Generalised eigenvectors, Jordan normal form, term-by-term differentiation, the Fourier transform, and Black-Scholes marked `hard`/`stretch` with `tips` populated on the hardest ones. Build/lint clean; Playwright screenshots 360/768/1440 + an expanded hard-card check (Black-Scholes), zero console errors. |
| Concept Briefing — CSC1016S | dropped | 2026-08-02: owner dropped CSC1016S entirely. It never had any concept briefings (no notes existed in `course-docs`), so nothing to remove from `/data/concepts` — the empty-state row this used to describe no longer applies since CSC1016S isn't in `conceptModules` at all now. |
| Concepts week grouping | done | 2026-08-02: added `week`/`weekConfirmed` to `ConceptBriefing`; `/concepts` gained a "Week 1..N" + "All weeks" tab bar. Only STA2005S's 4 "W1"-labelled cards are `weekConfirmed: true`; the rest are an estimated pacing guide pending owner confirmation — see "Current state" and Blockers. |
| Scaffold / tokens / fonts / nav shell | done | Step 1. Next.js 16 + TS + Tailwind v4, tokens + fonts wired, Pill Nav (desktop) + Bottom Dock (mobile), placeholder routes, dark placeholder home. Build + lint clean. |
| Data layer (`/data`) | done | Step 2. `types.ts` + courses/timetable/tests/moduleUpdates/studyPlans seeded from real `/course-docs`; STA test dates flagged `confirm:true` per the prose/grid inconsistency. |
| Timetable | done | Step 3. `<table>` weekly grid + mobile agenda, clash detection, now/next, `tbc` "set your slot" panel. Build/lint clean; Playwright-screenshotted at 360/768/1440, reduced-motion and keyboard-focus checked. 2026-07-29 (final update): replaced the earlier "this week's alternating slot" checker with `resolveSessionsForWeek()` + `buildWeekVariants()` — the MAM2012S/MAM2014S Wed clash banner is now fully eliminated (both here and on the dashboard) rather than just annotated, and the page offers an explicit Week 1/Week 2 toggle defaulting to whichever is real today, verified live. |
| Dashboard home | done | Step 4. Bento tiles for next class / next test + countdown / this week / urgent flags / active plan (empty state). Build/lint clean; screenshotted 360/768/1440 + reduced-motion. |
| Modules | done | Step 5. Tilted Card grid + detail pages (convenor/contacts/schedule/weights/DP/updates). Build/lint clean; screenshotted 360/768/1440; fixed a real dim-past-update contrast bug (see decisions). |
| Test dates | done | Step 6. Soonest-first list, live countdowns, clash banner + badges, `confirm` markers, tentative/TBC section. Build/lint clean; screenshotted 360/768/1440. |
| Study planner | done | Step 7. `/planner` + `/planner/[testId]` Scroll Stack timeline, `localStorage` check-offs (verified across reload). 2026-08-02: the original CSC1016S plan was removed when the course was dropped; all 8 real tests across the 4 tracked courses now have a generated plan (see "Current state"). Build/lint clean; all 8 `/planner/[testId]` routes statically generated. |
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

The **Concept Briefing** feature (`/concepts`) is now complete — owner-requested new
scope beyond the original build order (which is otherwise complete except deploy — see
Blockers). Owner authorized continuing through all modules autonomously without pausing
for review between them, since they were offline and on Pro-plan budget for the session
(see memory); that authorization was used to go STA2005S → MAM2013S → MAM2014S →
MAM2012S → CSC1016S scaffold check, one module at a time, committing after each (see
section tracker for per-module detail). Final cross-module pass: full rebuild/lint
clean; an 11-route Playwright sweep (`/`, `/timetable`, `/modules` ×5, `/concepts`,
`/planner` ×2, `/tests`) with zero console/page errors; `/concepts` specifically
re-checked under emulated `prefers-reduced-motion: reduce` (content unaffected) and via
keyboard Tab traversal (focus reaches the search field, difficulty/tag chips, and card
"show full briefing" toggles in a sensible order). Total at the time: 51 concept
briefings across 4 modules (4 STA2005S + 12 MAM2013S + 20 MAM2014S + 19 MAM2012S — the
MAM2012S figure was later found to be a miscount of 17, see the 2026-07-29 decisions-log
entry). As of 2026-07-29 the total is 62 (13 STA2005S + 12 MAM2013S + 20 MAM2014S + 17
MAM2012S), after adding 9 STA2005S cards from a newly found fuller notes document — see
"Current state" above. All cross-linked to real transcribed course-docs, none fabricated.
Nothing else is planned for this feature unless the owner requests further scope (e.g.
ingesting later STA2005S weeks/topics, or MAM2012S's remaining matrix-algebra/vector-
geometry/complex-numbers chapters not yet
covered by these 17 differential-equations-focused cards).

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

(2026-07-27) — `2DE NOTES.pdf`'s own cover page describes the course as covering
"Differential equations, partial derivatives, vector geometry, matrix algebra, complex
numbers, Taylor series" but its actual table of contents only has four chapters
(Introduction, Linear ODEs, Systems of Linear ODEs, Linear PDEs) — vector geometry and
a standalone Taylor-series/complex-numbers treatment are not present as separate content
in this document (complex numbers/Taylor-series ideas do appear, but folded into the ODE
chapters, e.g. complex eigenvalues, and are covered there). Transcribed only the
chapters genuinely present (19 concepts) rather than fabricating cards for topics named
on the cover but absent from the actual notes.
(2026-07-27) — Concept Briefing feature started. `ConceptBriefing.courseCode` reuses the
existing `courseCode` field name (matching `timetable.ts`/`tests.ts`/`moduleUpdates.ts`)
rather than the brief's suggested `module` name — per CLAUDE.md's own instruction to
prefer an existing repo convention when one already exists and conflicts.
(2026-07-27) — Introduced `ConceptModuleCode = CourseCode | "MAM2012S"`, a wider type
used only by the concept-briefing feature, rather than adding MAM2012S to the core
`CourseCode` union. Reasoning: `CourseCode`/`Course`/`timetable.ts`/`tests.ts` represent
*tracked, registered* dashboard courses, and MAM2012S is explicitly still pending
registration confirmation (see Blockers) — adding it there would mean fabricating a
`Course` entry (contacts, weights, DP rules) not yet supplied. Concept briefings are
purely notes-driven, so they don't need to wait on registration. `/data/concepts/modules.ts`
drives `/concepts`'s module grouping and gives MAM2012S neutral (non-accented) card
styling until it's confirmed and picks up a real design-token accent, mirroring how
MAM2014S itself had no accent before it became a tracked course.
(2026-07-27) — Resource links (StatQuest, 3Blue1Brown, Khan Academy, MIT OCW 18.650)
verified to resolve via WebFetch before inclusion, and kept at channel/course level
rather than linking specific videos, per the feature's link-rot rule.
(2026-07-27) — STA2005S concept briefings only cover Week 1's actual released content
(course intro + the MVN/quadratic-forms slide deck and its Q&A) even though the course
outline names Weeks 2–6 topics (GLM formulation, inference, ANOVA, variable
selection/Gauss-Markov, PCA/bootstrapping) and a later experimental-design section —
none of those have notes in `course-docs` yet, so nothing was fabricated for them.
Revisit once more weeks are ingested into `course-docs/STA2005S`.
(2026-07-27) — MAM2014S concept briefings (20 concepts) transcribed from the full
`MAM2014S NOTES.pdf`, reusing MIT OCW 18.100A Real Analysis (verified live via WebFetch)
as the primary resource across all cards, plus 3Blue1Brown for topics with strong visual
intuition (limits, series, derivatives, Taylor series) and Socratica for the more
proof-technique-heavy cards — same "verify before linking, prefer channel/course-level
URLs" pattern as STA2005S/MAM2013S. `cardinality`, `uniform-continuity`, and
`rearrangements` marked `stretch` (each has a genuinely counterintuitive result worth
flagging); `power-series-taylor-series` marked `hard` with `tips` populated, since the
notes themselves flag it as the most demanding synthesis topic (combines the Ratio/Root
Tests, the Weierstrass M-Test, the Differential Limit Theorem, and the Mean Value Theorem
family all at once).
(2026-07-27) — MAM2012S concept briefings (19 concepts) transcribed from the full
`2DE NOTES.pdf` (MAM2000W - 2DE, Differential Equations — matrix algebra/Fourier
analysis/PDE content is in later parts of the same document not yet needed for these
19 cards). Verified two new resource links via WebFetch: MIT OCW 18.03 Differential
Equations (primary resource across all cards) and MIT OCW 18.06 Linear Algebra (for the
systems-of-ODEs/eigenvalue-heavy cards); reused the already-verified 3Blue1Brown and
Socratica channels where fitting. Also verified MIT OCW 18.S096 (Topics in Mathematics
with Applications in Finance) specifically for the Black-Scholes card, given this course
is the one most directly relevant to the owner's stated quant/ML/finance direction.
`generalised-eigenvectors`, `jordan-normal-form`, `term-by-term-differentiation-
integration`, `fourier-transform-infinite-domain`, and `black-scholes-equation` marked
`hard`/`stretch` with `tips` populated on the four hardest, mirroring the notes' own
explicit flags that these are the most demanding synthesis topics in the document
(Jordan form combines nearly every earlier systems concept; Black-Scholes chains
Cauchy-Euler + the full Fourier-transform heat-equation machinery from two other cards).
(2026-07-29) — MAM2012S promoted from `ConceptModuleCode`-only to a full 5th tracked
`CourseCode`, now that a real course info sheet exists (see "Current state" above for the
full ripple). Picked accent token `de` (from the course's own "2DE" nickname, matching how
`ra` came from "2RA") with colour lime `#A3E635` — manually contrast-checked before
picking it (>11:1 on both `base` and `surface`), and confirmed via WebFetch-free direct
computation rather than assumed.
(2026-07-29) — Both irregular "some Wednesdays" lecture sessions (MAM2012S's 5 dates,
MAM2014S's 7 dates) were cross-checked against each other, not just against the calendar
individually: all 12 dates across the two courses are completely disjoint, meaning they
share the same Wed Period-4/M320 slot but never on the same real day. Left the timetable's
clash detector unmodified (it's weekday-based, not date-aware, so this pair still
triggers its weekly warning) rather than adding date-awareness for one pair of sessions —
documented with explanatory `note` text on both sessions instead, per the same "irregular
session" pattern established for MAM2013S in step 3.
(2026-07-29) — `STA2005S Notes.pdf` (a fuller "Applied Linear Regression" reference,
dated 2019) was matched against `tests.ts`'s own `sta-test-1` scope list before deciding
to use it as a concept-briefing source, rather than assuming a differently-dated document
is automatically in scope — it covers the general linear model, MLE, inference, ANOVA,
residual diagnostics, variable selection and Gauss-Markov (all named in that scope), but
not bootstrapping or PCA (also named there) or any Test 2 topic, so cards were only added
for the topics actually present, consistent with the "only cover what's actually
transcribed" rule already established for STA2005S/MAM2012S.
(2026-07-29) — Corrected a stale concept count: MAM2012S's briefings were recorded as
"19" in the section tracker and in the 2026-07-27 decisions-log entry above, but a direct
count of `id:` entries in `data/concepts/mam2012s.ts` gives 17 — the true count was
miscounted when originally logged, not a new discrepancy. Left the original 2026-07-27
entry's prose otherwise untouched (append-only log) and corrected the section tracker row
directly, per the "trust current file state over a memory/log snapshot" principle.
(2026-07-29, later same day) — CSC1016S moved to Mon 12:00–13:00 specifically to
resolve the real MAM2012S Tue clash — MAM2012S's slot couldn't move (fixed by the
department), so CSC1016S had to. Checked Monday 12:00–13:00 against every other
session in `timetable.ts` before committing to it — no other course occupies that
slot, so no new clash was introduced.
(2026-07-29, later same day) — Added `Session.dates?: string[]` to the core data model
rather than inventing a parallel data structure, since it's a small, optional addition
to an existing type that only irregular sessions need to populate — every other session
and every existing consumer of `Session` is unaffected. Chose to resolve the alternation
client-side in `/timetable` (via `findDatedSessionSlots()`) rather than trying to make
the existing `findClashes()` date-aware — that function is also used for the (correctly)
date-agnostic weekly grid rendering and the general clash banner, and making it
date-aware would be a much bigger change for a need that's really just "tell me which
one is real this week," which the new dedicated helper answers directly.
(2026-07-29, third update today) — Superseded `findDatedSessionSlots()` (from the entry
above) with `resolveSessionsForWeek()` + `buildWeekVariants()`, once the owner asked to
actually eliminate the clash banner rather than just annotate it. The earlier helper only
answered "which is real this week" for display in a side card; it didn't change what fed
`findClashes()`, so the banner stayed. The fix that actually removes the banner has to act
on the *input* to clash detection, not just add commentary next to its output — filtering
down to one candidate per alternating group before it ever reaches `findClashes()` means
there's nothing left to compare, on every page that computes clashes (both `/timetable`
and the dashboard), not just a visual suppression on one of them.
(2026-08-02) — CSC1016S removed rather than left as an empty/dropped-looking entry: every
file that referenced it (`types.ts`, `courses.ts`, `timetable.ts`, `tests.ts`,
`moduleUpdates.ts`, `studyPlans.ts`, `globals.css`, `lib/accent.ts`,
`app/components/bento-tile.tsx`) was edited to delete its data, not just hide it behind a
flag — matches how the project already treats "real data only" for additions, applied
symmetrically to removals. `studyPlans.ts` is now an empty array rather than deleted or
stubbed differently, since `PlannerView` already had a real empty state for zero plans
(built in step 7) — no new code needed.
(2026-08-02) — `findAlternatingGroups()`'s grouping key changed from `day|start|end|venue`
to `day|start|end` (dropping venue) when MAM2012S's venue diverged from MAM2014S's on
their shared alternating Wednesday slot. The two sessions were only ever grouped by venue
coincidentally (both happened to be M320); what actually makes them "alternating" is that
a student can't attend both at the same day/time regardless of room, so venue was never
the right disambiguator — this is a correctness fix surfaced by the venue change, not a
new feature. Verified the Week 1/Week 2 toggle and the false-clash suppression both still
work post-fix.
(2026-08-02) — Concept week numbers modelled with two fields (`week`, `weekConfirmed`)
rather than one, so the UI can visibly distinguish "we actually know this" (STA2005S's
"W1" cards) from "this is a syllabus-order estimate" (every other card) — same spirit as
`Assessment.confirm`, applied to a new kind of uncertain data. Computed the estimated
weeks with a one-off Node script (grouped each module's concepts by existing `sourceRef`,
spread those groups evenly across a 12-week window) rather than hand-assigning ~60
numbers, since the grouping logic needed to be applied consistently and was easy to get
wrong by hand; the script itself wasn't committed (not part of the app, a one-time data
transform), but its logic is described in "Current state" for reproducibility if the
estimate ever needs regenerating (e.g. once real weekly pacing is confirmed and specific
weeks need hand-correcting instead).
(2026-08-02) — Deliberately did not attempt to reverse-engineer real per-week pacing from
indirect evidence (e.g. test dates implying roughly how much content precedes them) —
that would produce numbers that *look* as authoritative as STA2005S's real "W1" markers
while actually being a guess dressed up as fact. Chose visible, even estimation instead,
with a persistent UI caveat and a Blockers entry, consistent with CLAUDE.md's standing
rule to flag inconsistent/unconfirmed source data rather than silently pick an answer.
(2026-08-02, second update today) — Interpreted "generate study plans for all tests" as
the 8 `kind: "test"` assessments, not every `Assessment` (which also includes STA2005S's
practical test and two assignments). Reasoning: those three are all still `tbc` with no
real date, and the study-plan schema is keyed to a `testId` with a `startDate` computed
backward from a real test date — there's no sensible `startDate` to compute for an
assessment that doesn't have a date yet. If the owner wants plans for those too once
dates are announced, that's a natural follow-up, not a scope decision to make now.
(2026-08-02, second update today) — Rather than invent a MAM2013S/MAM2014S Test1/Test2
scope split from nothing, reused the same "flag as estimate, don't silently pick"
pattern already established for `/concepts`'s week grouping today: picked a
structurally sensible chapter boundary (see "Current state"), then made the estimate
visible in two places — the last `scope` bullet on the affected `tests.ts` entries
(shown on `/tests`) and the study plan's own `scope` array (shown on `/planner`) — so
whoever's reading either page sees the same caveat, not just one.
(2026-08-02, second update today) — `ActivePlanTile`'s plan-selection bug (picking the
first array-order match rather than the most relevant plan) was latent since step 7 but
invisible with only one plan ever in `studyPlans`. This is the second time in this
project a single-item assumption baked into early code silently broke once real data
diversified (see the 2026-07-26 MAM2014S-era "raw `findDateClashes(tests)` call" entry
for the first) — worth treating "does this still hold with N>1 items" as a standing
question whenever a feature that previously only ever saw one of something starts
seeing several.

## Blockers / needs owner input

**New (2026-08-02, second update today) — MAM2013S/MAM2014S Test 1 vs. Test 2 scope
split is an estimate:** Neither course's `course-docs` states which chapters are
tested in Test 1 vs. Test 2 (unlike MAM2012S and STA2005S, where the split is either
stated directly or unambiguous from the source). The split used for both `tests.ts`'s
`scope` and the matching study plans is a structurally-reasonable estimate (see
"Current state"), not a confirmed fact. Confirm against whatever scope announcement
the lecturers eventually post and adjust `tests.ts`/`studyPlans.ts` if the real split
differs.

**New (2026-08-02) — Concepts week grouping is an estimate, not a verified schedule:**
- `/concepts`'s week tabs are populated from real data (STA2005S's four "W1"-labelled
  cards, `weekConfirmed: true`) plus an estimated pacing guide for every other card
  (spread evenly across a 12-week semester in syllabus order — see "Current state").
  This needs owner confirmation against the real lecture-by-lecture schedule for
  MAM2012S/MAM2013S/MAM2014S and the rest of STA2005S once that's known; until then,
  treat "Week N" tabs beyond STA2005S's Week 1 as a study-pacing aid, not fact. No
  `course-docs` source currently states which week any of these topics is taught.

**Resolved 2026-08-02 (CSC1016S dropped):**
- Every CSC1016S-related blocker/open-question previously logged here (the Amathuba
  lecture-slot re-confirmation, the unset practical slot, the auto-generated study plan)
  is moot — the course itself is gone from the dashboard as of this session. Left the
  historical entries below in the decisions log untouched (append-only), since they're
  an accurate record of what happened while the course was tracked.
- MAM2013S tutorial venue is no longer an open question — the owner supplied **M200**
  directly (see "Current state"), superseding the earlier "venue not yet shown on
  Amathuba" note.

**The one thing left to reach full build-order completion:**
- **Deploy to Vercel** — every other part of step 8 (and steps 1–7) is done. This is the
  only remaining item, and it genuinely can't be done without you: connecting the GitHub
  repo to Vercel requires your own account authorization in a browser. Everything is
  committed and pushed to `main` (`bbwebdes/semester`) and ready to import as-is the moment
  you're ready — just say so, or do it yourself via vercel.com → New Project → import the
  repo (no config needed, it's a standard Next.js app).

**Resolved later the same day (2026-07-29):**
- The MAM2012S/CSC1016S Tue 11:00–11:45 clash (flagged earlier today) is resolved:
  CSC1016S switched to Mon 12:00–13:00, JD LT2 — the owner's stated choice, still
  pending Amathuba re-confirmation (same caveat as every CSC1016S slot change this
  project). Verified no new clash was introduced on Monday.
- The MAM2012S/MAM2014S Wed false-positive clash banner is also gone (third update
  today): both courses' Wed sessions are now resolved down to a single real-for-this-week
  candidate everywhere clashes are computed (`resolveSessionsForWeek()`), and
  `/timetable` offers an explicit Week 1/Week 2 toggle instead of ever rendering both
  candidates together. See "Current state" above for the full design.

**Open owner questions:**
- **Claude Code plan tier** (Pro / Max 5x / Max 20x) — sets model-routing expectations.
  Default assumption: Sonnet 4.6 for ~everything, Opus 4.8 only for hard schema/debugging
  work. On Pro this is comfortably within limits for this scope.
- **STA2005S Practical Test date, Assignment 1 date** — not yet announced anywhere in the
  outline (not even a provisional week); seeded with `tbc:true` and no `date`.
- **App name** — "Semester" is a placeholder.
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
- STA2005S lecture venue is **JD LT 1** (2026-08-02 owner correction, supersedes PD Hahn 2).
- MAM2012S lecture venue is **LS 2D** (Tue/Wed) / **LS 2A** (Fri) (2026-08-02 owner
  correction, supersedes M320 for all three days).
- MAM2013S tutorial venue is **M200** (2026-08-02 owner correction, supersedes `TBC`).
- CSC1016S dropped from the dashboard entirely (2026-08-02, owner's own course-load
  change) — every prior CSC1016S fact in this log is historical only; see "Current state".
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
owner's own account authorization — see "Blockers" above. Beyond that, the open items
from today's two sessions are both estimate-confirmation flags, not missing work:
`/concepts`'s week grouping and the MAM2013S/MAM2014S Test 1/2 scope split (see
Blockers) — everything actually requested (CSC1016S removal, the three venue
corrections, the timetable card simplification, the week tabs, and study plans for all
8 tests) is done. Any further work from here is either (a) resolving one of the open
owner questions above, (b) the owner deploying (or asking for help walking through it),
or (c) new scope the owner asks for.
