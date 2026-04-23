"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItem = {
  slug: string;
  title: string;
  description: string;
  order: number;
};

type SidebarProps = {
  items: SidebarItem[];
};

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4.5rem)] w-72 shrink-0 overflow-y-auto pr-5 lg:block">
      <nav className="space-y-1 py-6">
        {items.map((item) => {
          const href = `/docs/${item.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={item.slug}
              href={href}
              className={`block rounded-md border px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "border-yellow-400 bg-yellow-50 text-zinc-950 dark:border-yellow-600 dark:bg-zinc-900 dark:text-zinc-50"
                  : "border-transparent text-zinc-600 hover:border-zinc-200 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
