import type { Course } from "./types";

export const courses: Course[] = [
  {
    code: "STA2005S",
    title: "Linear Models",
    accent: "sta",
    convenor: {
      name: "Dr Birgit Erni",
      role: "Course Convenor",
      email: "birgit.erni@uct.ac.za",
      office: "PD Hahn 6.64",
    },
    contacts: [
      {
        name: "Mr Miguel Rodo",
        role: "Lecturer",
        email: "miguel.rodo@uct.ac.za",
        office: "PD Hahn 5.52",
      },
      {
        name: "Ms Nodumo Maqubela",
        role: "Course Administrator",
        email: "nodumo.maqubela@uct.ac.za",
        note: "Mention you're a STA2005S student — she deals with several courses.",
      },
    ],
    lectureInfo:
      "08:00 Mon–Fri, PD Hahn 2. Plus one 1-hour tutorial and one 1-hour R computer prac per week (slots chosen in week 1, tbc).",
    assessmentWeights: [
      { label: "Test 1", weight: 0.25 },
      { label: "Test 2", weight: 0.25 },
      { label: "Assignment 1", weight: 0.2 },
      { label: "Practical Test", weight: 0.1 },
      { label: "Assignment 2", weight: 0.2 },
    ],
    finalMarkFormula: "Final = 0.3 × class mark + 0.7 × exam mark",
    dpRules: [
      "Both assignments completed, with an average assignment mark of at least 40%",
      "Class record of at least 35%",
    ],
  },
  {
    code: "CSC1016S",
    title: "Computer Science",
    accent: "csc",
    convenor: {
      name: "Mr Aslam Safla",
      role: "Course Convenor",
      email: "aslam@cs.uct.ac.za",
    },
    contacts: [
      {
        name: "Prof Sonia Berman",
        role: "Lecturer",
        email: "sonia@cs.uct.ac.za",
      },
      {
        name: "Francois Meyer",
        role: "Lecturer",
        email: "francois.meyer@uct.ac.za",
      },
      {
        name: "Asad Jeewa",
        role: "Lecturer",
        email: "asad.jeewa@uct.ac.za",
      },
      {
        name: "Unays Bhad",
        role: "Lecturer",
        email: "BHDUNA001@myuct.ac.za",
      },
      {
        name: "Sick notes",
        role: "Medical certificate submission",
        email: "sick-csc1016s@cs.uct.ac.za",
      },
    ],
    lectureInfo:
      "One face-to-face lecture/week, Mon–Wed, JD LT2 (Period 4 or 5 — owner picks day + period). Plus one 2-hour practical session per week (slot tbc).",
    assessmentWeights: [
      { label: "Practical average", weight: 0.1 },
      { label: "Theory test average", weight: 0.15 },
      { label: "Practical test average", weight: 0.15 },
      { label: "Exam", weight: 0.6 },
    ],
    finalMarkFormula:
      "Final = 0.10 × practical avg + 0.15 × theory test avg + 0.15 × practical test avg + 0.60 × exam",
    dpRules: [
      "Practical test average of at least 50%",
      "(3/5 × practical average + 2/5 × practical test average) ≥ 45%",
    ],
  },
  {
    code: "MAM2013S",
    title: "MAM2013S (2IA)",
    accent: "mam",
    convenor: {
      name: "Dr Janelidze-Gray",
      role: "Course Convenor & Lecturer",
      email: "tamar.janelidze-gray@uct.ac.za",
      office: "M323.1",
    },
    contacts: [],
    lectureInfo:
      "Mon, some Wed, Fri, 12:00–13:00, M320. Tutorials/workshops (compulsory): Thu 14:00–16:00 or Fri 14:00–16:00 — owner signs up for one (tbc). None in week 1.",
    assessmentWeights: [
      { label: "Test 1 (of class record)", weight: 0.5 },
      { label: "Test 2 (of class record)", weight: 0.5 },
    ],
    finalMarkFormula:
      "Class record (CR) = 0.5 × Test 1 + 0.5 × Test 2. Final = max(0.6 × exam + 0.4 × CR, 0.8 × exam + 0.2 × CR)",
    dpRules: [
      "Class record of at least 20%",
      "At least 80% tutorial/workshop attendance",
    ],
  },
];
