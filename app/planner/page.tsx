import { courses } from "@/data/courses";
import { tests } from "@/data/tests";
import { studyPlans } from "@/data/studyPlans";
import { PlannerView } from "./planner-view";

export default function PlannerPage() {
  return (
    <PlannerView studyPlans={studyPlans} tests={tests} courses={courses} />
  );
}
