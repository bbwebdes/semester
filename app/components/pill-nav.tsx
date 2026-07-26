"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../nav-links";

export function PillNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-4 z-50 hidden justify-center md:flex"
    >
      <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/90 p-1 shadow-lg shadow-black/20 backdrop-blur">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                  isActive
                    ? "bg-surface-2 text-text"
                    : "text-muted hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
