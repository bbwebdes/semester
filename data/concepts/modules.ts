import { courses } from "../courses";
import type { AccentToken, ConceptModuleCode } from "../types";

export type ConceptModule = {
  code: ConceptModuleCode;
  title: string;
  accent: AccentToken | null;
};

// Drives the Concept Briefings page's grouping/ordering and empty states. The four
// tracked dashboard courses reuse their real accent token; modules with real notes but
// no dashboard registration yet (MAM2012S) render with neutral styling until they're
// confirmed and given a design-token accent of their own, matching how MAM2014S wasn't
// assigned "ra" until it became a real tracked course.
export const conceptModules: ConceptModule[] = [
  ...courses.map((c) => ({ code: c.code, title: c.title, accent: c.accent })),
  { code: "MAM2012S", title: "MAM2012S", accent: null },
];
