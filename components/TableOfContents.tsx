import type { TocItem } from "@/lib/docs";

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
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
              className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
