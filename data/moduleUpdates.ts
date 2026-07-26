import type { Update } from "./types";

export const moduleUpdates: Update[] = [
  {
    courseCode: "STA2005S",
    date: "2026-09-02",
    kind: "reminder",
    title: "Verify Test 1 date on Amathuba",
    body: "The course outline's prose says Test 1 is Tuesday 2 September, but its schedule grid says 1 September — and neither weekday matches the other date in the 2026 calendar. Confirm the actual date/venue on Amathuba before relying on it.",
    source: "STA2005S Course Outline 2026 (PDF)",
  },
  {
    courseCode: "STA2005S",
    date: "2026-10-13",
    kind: "reminder",
    title: "Verify Test 2 date on Amathuba",
    body: "The course outline's prose says Test 2 is Monday 13 October, but its schedule grid says 12 October. Confirm the actual date/venue on Amathuba before relying on it.",
    source: "STA2005S Course Outline 2026 (PDF)",
  },
  {
    courseCode: "CSC1016S",
    date: "2026-07-27",
    kind: "reminder",
    title: "Sick note submission address",
    body: "Medical certificates for CSC1016S go to sick-csc1016s@cs.uct.ac.za — must be signed by a qualified doctor and state the days you were medically unfit (telephonic/online consultations not accepted).",
    source: "CSC1016S Notes to Students 2026 (PDF)",
  },
  {
    courseCode: "MAM2013S",
    date: "2026-07-22",
    kind: "reminder",
    title: "Tutorial sign-up deadline",
    body: "Sign up for one weekly tutorial/workshop (Thu or Fri, 14:00–16:00) on Amathuba by 22 July, 11pm — after that, unsigned-up students are auto-assigned to a group. No tutorials in week 1; they start in week 2.",
    source: "MAM2013S Course Information (Amathuba)",
  },
];
