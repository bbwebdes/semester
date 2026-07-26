import type { StudyPlan } from "./types";

export const studyPlans: StudyPlan[] = [
  {
    id: "csc-theory-test-1-plan",
    courseCode: "CSC1016S",
    testId: "csc-theory-test-1",
    scope: [
      "Introduction to OOP, Java syntax",
      "OO Design, UML I, classes and instances",
      "Methods, variables, constructors",
      "Statics, references, aggregation/composition",
    ],
    startDate: "2026-08-14",
    phases: [
      {
        date: "2026-08-14",
        focus: "Java basics & syntax refresh",
        tasks: [
          "Re-read Week 1–2 slides (Java Basics)",
          "Redo the Orientation & Basic Syntax practical exercises without notes",
          "List any syntax you still hesitate on",
        ],
      },
      {
        date: "2026-08-17",
        focus: "OOP principles & UML I",
        tasks: [
          "Re-read OOP Principles + Classes/Instances slides",
          "Draw a UML class diagram from scratch for a small example",
          "Redo practical 2 (creating a class with methods) unaided",
        ],
      },
      {
        date: "2026-08-20",
        focus: "Methods, variables, constructors",
        tasks: [
          "Re-read the Methods/Variables/Constructors slides",
          "Redo practical 3 (constructors + JUnit) unaided",
          "Write a short class from memory: fields, constructor, getters/setters",
        ],
      },
      {
        date: "2026-08-23",
        focus: "Statics & references",
        tasks: [
          "Re-read Statics/References/Aggregation slides",
          "Redo practical 4 (encapsulation, get/set) unaided",
          "Explain out loud the difference between a static and instance member",
        ],
      },
      {
        date: "2026-08-25",
        focus: "Consolidation & practice",
        tasks: [
          "Skim all four topics' slides once more, note weak spots only",
          "Do a timed 45-minute closed-book practice attempt if past questions exist",
          "Pack for the test: student card, pen; confirm venue announcement on Amathuba",
        ],
      },
    ],
    resources: [
      { label: "Week 1–5 lecture slides (Amathuba)" },
      { label: "Absolute Java (6th ed.), Chapters 1–5" },
      { label: "Practical exercises 1–4 + JGrasp" },
    ],
  },
];
