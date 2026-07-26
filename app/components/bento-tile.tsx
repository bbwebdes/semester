"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const glowRgb: Record<string, string> = {
  sta: "76, 154, 255",
  csc: "61, 214, 140",
  mam: "192, 132, 252",
  neutral: "230, 234, 240",
};

export function BentoTile({
  children,
  className = "",
  glow = "neutral",
  urgent = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "sta" | "csc" | "mam" | "neutral";
  urgent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--spot-x", `${x}%`);
    ref.current.style.setProperty("--spot-y", `${y}%`);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 ${className}`}
    >
      {urgent && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl border-2 border-accent"
          animate={
            prefersReducedMotion ? { opacity: 0.85 } : { opacity: [0.5, 1, 0.5] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(${glowRgb[glow]}, 0.12), transparent 60%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}
