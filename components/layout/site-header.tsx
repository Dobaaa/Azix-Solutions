"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/order", label: "Book Now" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Azix Solutions
        </Link>
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] md:hidden"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? "✕" : "☰"}
        </button>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-[var(--color-primary)] ${
                pathname === link.href ? "text-[var(--color-primary)]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {isOpen ? (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] md:hidden">
          <nav className="container grid py-3 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`rounded-md px-2 py-2 transition hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] ${
                  pathname === link.href
                    ? "bg-[var(--color-accent)] text-[var(--color-primary)]"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
