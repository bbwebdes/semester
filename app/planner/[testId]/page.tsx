import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import { tests } from "@/data/tests";
import { studyPlans } from "@/data/studyPlans";
import { PlannerDetailView } from "./planner-detail-view";

export function generateStaticParams() {
  return studyPlans.map((plan) => ({ testId: plan.testId }));
}

export default async function PlannerDetailPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;
  const plan = studyPlans.find((p) => p.testId === testId);
  const test = tests.find((t) => t.id === testId);

  if (!plan) {
    if (!test) notFound();
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-4 md:px-6">
        <Link
          href="/tests"
          className="w-fit text-sm text-muted underline underline-offset-2 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          ← Tests
        </Link>
        <h1 className="font-display text-3xl leading-none tracking-tight text-text">
          No study plan yet
        </h1>
        <p className="text-base text-muted">
          {test.title} doesn&apos;t have a study plan yet. Run the generation
          command from CLAUDE.md once it gets closer.
        </p>
      </div>
    );
  }

  const course = courses.find((c) => c.code === plan.courseCode);
  return <PlannerDetailView plan={plan} test={test} course={course} />;
}
