"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";

type NavbarProps = {
  navItems?: Array<{
    slug: string;
    title: string;
  }>;
};

export function Navbar({ navItems = [] }: NavbarProps) {
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-4 md:px-6">
        <Link
          href="/docs"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <Image
            src="/images/keploy-logo-dark.svg"
            alt="Keploy logo"
            width={60}
            height={60}
            className="dark:invert"
          />
          <span>Keploy Docs</span>
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <a
            href="https://github.com/shreyap2702/keploy-blog"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            GitHub
          </a>
          <div className="flex items-center gap-2">
            <CommandPalette items={navItems} />
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-md border px-2.5 py-1.5 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2" />
                  <path d="M12 21v2" />
                  <path d="M4.22 4.22l1.42 1.42" />
                  <path d="M18.36 18.36l1.42 1.42" />
                  <path d="M1 12h2" />
                  <path d="M21 12h2" />
                  <path d="M4.22 19.78l1.42-1.42" />
                  <path d="M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3a6 6 0 1 0 9 9 9 9 0 1 1-9-9z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
