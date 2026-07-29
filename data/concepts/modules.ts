import { courses } from "../courses";
import type { AccentToken, ConceptModuleCode } from "../types";

export type ConceptModule = {
  code: ConceptModuleCode;
  title: string;
  accent: AccentToken | null;
};

// Drives the Concept Briefings page's grouping/ordering and empty states. Every
// note-set module is now also a tracked dashboard course, so this just reuses each
// course's real accent token — no more manual/neutral-styled entries needed here.
export const conceptModules: ConceptModule[] = courses.map((c) => ({
  code: c.code,
  title: c.title,
  accent: c.accent,
}));
