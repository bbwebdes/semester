export type CourseCode = "STA2005S" | "CSC1016S" | "MAM2013S" | "MAM2014S";

export type AccentToken = "sta" | "csc" | "mam" | "ra";

export type Contact = {
  name: string;
  role: string;
  email: string;
  office?: string;
  note?: string;
};

export type AssessmentWeight = {
  label: string;
  weight: number;
};

export type Course = {
  code: CourseCode;
  title: string;
  accent: AccentToken;
  convenor: Contact;
  contacts: Contact[];
  lectureInfo: string;
  assessmentWeights: AssessmentWeight[];
  finalMarkFormula: string;
  dpRules: string[];
};

export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type SessionKind = "lecture" | "tutorial" | "prac";

export type Session = {
  courseCode: CourseCode;
  kind: SessionKind;
  day: Weekday;
  start: string;
  end: string;
  venue: string;
  tbc?: boolean;
  note?: string;
};

export type AssessmentKind = "test" | "practest" | "assignment" | "exam";

export type Assessment = {
  id: string;
  courseCode: CourseCode;
  kind: AssessmentKind;
  title: string;
  date?: string;
  start?: string;
  end?: string;
  venue?: string;
  weight?: number;
  scope?: string[];
  confirm?: boolean;
  tbc?: boolean;
};

export type UpdateKind = "date" | "reminder" | "info-session" | "announcement";

export type Update = {
  courseCode: CourseCode;
  date: string;
  kind: UpdateKind;
  title: string;
  body: string;
  source?: string;
};

export type StudyPlanPhase = {
  date: string;
  focus: string;
  tasks: string[];
};

export type StudyPlanResource = {
  label: string;
  href?: string;
};

export type StudyPlan = {
  id: string;
  courseCode: CourseCode;
  testId: string;
  scope: string[];
  startDate: string;
  phases: StudyPlanPhase[];
  resources: StudyPlanResource[];
};

// Concept briefings are keyed by note-set, not by dashboard registration status —
// this lets a module with real transcribed notes (e.g. MAM2012S, pending registration
// confirmation) get briefings before it's added as a tracked `CourseCode` elsewhere in
// the app (courses.ts/timetable.ts/tests.ts). Extend here as new note-sets arrive.
export type ConceptModuleCode = CourseCode | "MAM2012S";

export type ConceptDifficulty = "core" | "stretch" | "hard";

export type ConceptSubConcept = {
  title: string;
  gloss: string;
};

export type ConceptResource = {
  label: string;
  href: string;
};

export type ConceptBriefing = {
  id: string;
  courseCode: ConceptModuleCode;
  sourceRef: string;
  title: string;
  tags: string[];
  difficulty: ConceptDifficulty;
  summary: string;
  subConcepts: ConceptSubConcept[];
  preLecture: string[];
  learningPath: string[];
  applications: string[];
  examples: string[];
  resources: ConceptResource[];
  tips?: string[];
};
