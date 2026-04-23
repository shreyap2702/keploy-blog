"use client";

import type { TocItem } from "@/lib/docs";
import { useEffect, useState } from "react";

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -65% 0px",
        threshold: [0, 1],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4.5rem)] w-64 shrink-0 overflow-y-auto pl-6 xl:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        On this page
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "pl-3 text-xs" : "text-sm"}
          >
            <a
              href={`#${item.id}`}
              className={`transition-colors ${
                activeId === item.id
                  ? "font-medium text-zinc-950 dark:text-zinc-50"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
