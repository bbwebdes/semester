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
      "08:00 Mon–Fri, PD Hahn 2. Plus tutorial Wed 14:00–15:00 (LS2B) and R computer prac Tue 14:00–15:00 (Scilab D).",
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
      "Blended learning — daily video lectures Mon–Thu on Amathuba, plus one face-to-face session/week: Tue 11:00–11:45 (owner's intended pick; Amathuba group sign-up governs, not PeopleSoft/SEAT), JD LT2. Plus weekly practicals from Mon 3 Aug (slot tbc).",
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
      "Tue, some Wed, Fri, 12:00–12:45, M320. First lecture Tue 28 Jul. Tutorial/workshop (compulsory): Thu 14:00–15:00, venue TBC — confirmed via Amathuba group sign-up, changeable until Wed 29 Jul 23:00. None in week 1; first tutorial Thu 6 Aug.",
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
  {
    code: "MAM2014S",
    title: "MAM2014S (2RA) — Real Analysis",
    accent: "ra",
    convenor: {
      name: "Morgan Vandeyar",
      role: "Course Convenor",
      email: "morgan.vandeyar@uct.ac.za",
      office: "M3.24.2",
    },
    contacts: [
      {
        name: "Assoc Prof Elena Berdysheva",
        role: "Lecturer",
        email: "elena.berdysheva@uct.ac.za",
        office: "M3.13",
      },
    ],
    lectureInfo:
      "Period 4, 11:00–11:45, M320, Assoc Prof Berdysheva. Mon + Thu every week, plus some Wednesdays. Tutorial (compulsory): Thu 15:00–16:00, Bio LT — confirmed via Amathuba group sign-up.",
    assessmentWeights: [
      { label: "Test 1 (of class record)", weight: 0.475 },
      { label: "Test 2 (of class record)", weight: 0.475 },
      { label: "Self-assessment quizzes (of class record)", weight: 0.05 },
    ],
    finalMarkFormula:
      "Class record (C) = 0.475 × Test 1 + 0.475 × Test 2 + 0.05 × quiz average. Final = max(0.8 × exam + 0.2 × C, 0.6 × exam + 0.4 × C)",
    dpRules: [
      "Full tutorial attendance (up to 2 permitted absences)",
      "Wrote both class tests",
      "Test average of at least 30%",
    ],
  },
  {
    code: "MAM2012S",
    title: "MAM2012S (2DE) — Differential Equations",
    accent: "de",
    convenor: {
      name: "Mr Thomas van Heerden",
      role: "Course Convenor & Lecturer",
      email: "thomas.vanheerden@uct.ac.za",
      note: "Put \"MAM2012S\" in the email subject line — he teaches two courses this semester and can't tell which one you mean otherwise. If your question is already answered on the course info sheet or Amathuba, he won't reply.",
    },
    contacts: [],
    lectureInfo:
      "Tue, Fri, and some Wednesdays, 11:00–11:45 (Period 4), M320. Wednesdays: 5 Aug, 26 Aug, 16 Sep, 7 Oct, 21 Oct. Tutorial (compulsory): Fri 14:00–15:00, Hahn 4G — confirmed via Amathuba group sign-up (30/30, full). No face-to-face tutorial in week 1 — complete the tutorial sheet in your own time instead.",
    assessmentWeights: [
      { label: "Tutorial Tests", weight: 0.1 },
      { label: "Test 1", weight: 0.45 },
      { label: "Test 2", weight: 0.45 },
    ],
    finalMarkFormula:
      "Class Record = 10% Tutorial Tests + 45% Test 1 + 45% Test 2. Final = max(20% Class Record + 80% Exam, 40% Class Record + 60% Exam)",
    dpRules: [
      "Class Record of at least 35%",
      "Attend every tutorial session",
    ],
  },
];
