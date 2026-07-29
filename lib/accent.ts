import type { AccentToken } from "@/data/types";

export const accentClasses: Record<
  AccentToken,
  { border: string; text: string; bg: string; ring: string }
> = {
  sta: {
    border: "border-sta/70",
    text: "text-sta",
    bg: "bg-sta/10",
    ring: "ring-sta",
  },
  csc: {
    border: "border-csc/70",
    text: "text-csc",
    bg: "bg-csc/10",
    ring: "ring-csc",
  },
  mam: {
    border: "border-mam/70",
    text: "text-mam",
    bg: "bg-mam/10",
    ring: "ring-mam",
  },
  ra: {
    border: "border-ra/70",
    text: "text-ra",
    bg: "bg-ra/10",
    ring: "ring-ra",
  },
  de: {
    border: "border-de/70",
    text: "text-de",
    bg: "bg-de/10",
    ring: "ring-de",
  },
};
