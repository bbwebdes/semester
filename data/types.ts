export type CourseCode =
  | "STA2005S"
  | "MAM2013S"
  | "MAM2014S"
  | "MAM2012S";

export type AccentToken = "sta" | "mam" | "ra" | "de";

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
  // For irregular ("some Wednesdays") sessions only: the real calendar dates
  // (ISO "YYYY-MM-DD") this session actually happens on, so week-specific UI
  // (e.g. "which MAM lecture is on this week") can be date-aware even though
  // the weekly grid itself and its clash detector are not.
  dates?: string[];
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

// Concept briefings are keyed by note-set, not by dashboard registration status.
// Now that every note-set module (including MAM2012S) is also a tracked `CourseCode`,
// this is just an alias — kept distinct so a future module with notes but no
// registration yet can widen it again without touching every concepts/* call site.
export type ConceptModuleCode = CourseCode;

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
  // Which teaching week this concept belongs to, for the Concepts page's week
  // tabs. Only set from an explicit week marker in the source material (e.g.
  // STA2005S's "W1" decks) counts as confirmed (`weekConfirmed: true`);
  // otherwise it's an estimated pacing guide (syllabus order spread evenly
  // across the semester) pending owner confirmation against the real
  // lecture-by-lecture schedule.
  week?: number;
  weekConfirmed?: boolean;
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
