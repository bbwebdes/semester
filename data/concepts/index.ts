import type { ConceptBriefing } from "../types";
import { sta2005sConceptBriefings } from "./sta2005s";
import { mam2013sConceptBriefings } from "./mam2013s";
import { mam2014sConceptBriefings } from "./mam2014s";
import { mam2012sConceptBriefings } from "./mam2012s";

export const conceptBriefings: ConceptBriefing[] = [
  ...sta2005sConceptBriefings,
  ...mam2013sConceptBriefings,
  ...mam2014sConceptBriefings,
  ...mam2012sConceptBriefings,
];
