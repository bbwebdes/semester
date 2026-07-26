import { courses } from "@/data/courses";
import { TiltedCard } from "../components/tilted-card";

export default function ModulesPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 md:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl leading-none tracking-tight text-text">
          Modules
        </h1>
        <p className="text-base text-muted">
          Convenors, contacts, weights and updates for each course.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {courses.map((course) => (
          <TiltedCard key={course.code} course={course} />
        ))}
      </div>
    </div>
  );
}
