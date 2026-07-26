import { courses } from "@/data/courses";
import { timetable } from "@/data/timetable";
import { tests } from "@/data/tests";
import { DashboardView } from "./dashboard-view";

export default function Home() {
  return <DashboardView courses={courses} sessions={timetable} tests={tests} />;
}
