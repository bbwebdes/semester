"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { Course } from "@/data/types";
import { accentClasses } from "@/lib/accent";

export function TiltedCard({ course }: { course: Course }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const accent = accentClasses[course.accent];

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty("--tilt-x", `${py * -8}deg`);
    ref.current.style.setProperty("--tilt-y", `${px * 8}deg`);
  }

  function handlePointerLeave() {
    ref.current?.style.setProperty("--tilt-x", "0deg");
    ref.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <Link
      ref={ref}
      href={`/modules/${course.code}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform:
          "perspective(800px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
      }}
      className={`flex flex-col gap-3 rounded-2xl border ${accent.border} bg-surface p-6 transition-transform duration-200 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
    >
      <span className={`font-display text-2xl ${accent.text}`}>
        {course.code}
      </span>
      <span className="text-base text-text">{course.title}</span>
      <span className="text-sm text-muted">{course.convenor.name}</span>
      <span className="line-clamp-2 text-xs text-muted">
        {course.lectureInfo}
      </span>
    </Link>
  );
}
