export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Dashboard" },
  { href: "/timetable", label: "Timetable" },
  { href: "/modules", label: "Modules" },
  { href: "/concepts", label: "Concepts" },
  { href: "/planner", label: "Planner" },
  { href: "/tests", label: "Tests" },
];
