import { courses } from "@/data/courses";
import { tests } from "@/data/tests";
import { studyPlans } from "@/data/studyPlans";
import { TestsView } from "./tests-view";

export default function TestsPage() {
  return <TestsView tests={tests} courses={courses} studyPlans={studyPlans} />;
}
