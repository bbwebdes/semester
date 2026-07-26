import { courses } from "@/data/courses";
import { timetable } from "@/data/timetable";
import { TimetableView } from "./timetable-view";

export default function TimetablePage() {
  return <TimetableView sessions={timetable} courses={courses} />;
}
