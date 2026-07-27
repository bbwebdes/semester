import type { ConceptBriefing } from "../types";
import { sta2005sConceptBriefings } from "./sta2005s";
import { mam2013sConceptBriefings } from "./mam2013s";

export const conceptBriefings: ConceptBriefing[] = [
  ...sta2005sConceptBriefings,
  ...mam2013sConceptBriefings,
];
