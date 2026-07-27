import { conceptBriefings } from "@/data/concepts";
import { conceptModules } from "@/data/concepts/modules";
import { ConceptsView } from "./concepts-view";

export default function ConceptsPage() {
  return <ConceptsView briefings={conceptBriefings} modules={conceptModules} />;
}
