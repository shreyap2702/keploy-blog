"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CommandPaletteItem = {
  slug: string;
  title: string;
};

type CommandPaletteProps = {
  items: CommandPaletteItem[];
};

export function CommandPalette({ items }: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onSelect = (slug: string) => {
    setOpen(false);
    router.push(`/docs/${slug}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 md:flex"
      >
        Search
        <kbd className="rounded border px-1.5 py-0.5 text-[10px]">Cmd+K</kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Search docs"
        className="fixed left-1/2 top-24 z-50 w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border bg-background shadow-2xl"
      >
        <Command.Input
          placeholder="Search documentation..."
          className="w-full border-b bg-transparent px-4 py-3 text-sm outline-none"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-4 text-sm text-zinc-500">
            No results found.
          </Command.Empty>
          <Command.Group heading="Documentation">
            {items.map((item) => (
              <Command.Item
                key={item.slug}
                value={item.title}
                onSelect={() => onSelect(item.slug)}
                className="cursor-pointer rounded-md px-3 py-2 text-sm text-zinc-700 aria-selected:bg-zinc-100 dark:text-zinc-200 dark:aria-selected:bg-zinc-800"
              >
                {item.title}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
