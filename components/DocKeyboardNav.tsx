"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type NavTarget = {
  slug: string;
  title: string;
};

type DocKeyboardNavProps = {
  prev?: NavTarget;
  next?: NavTarget;
};

export function DocKeyboardNav({ prev, next }: DocKeyboardNavProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowLeft" && prev) {
        router.push(`/docs/${prev.slug}`);
      }

      if (event.key === "ArrowRight" && next) {
        router.push(`/docs/${next.slug}`)
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev, router]);

  return (
    <div className="mt-8 border-t pt-5">
      <div className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="rounded-md border px-3 py-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            ← {prev.title}
          </Link>
        ) : null}
        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="rounded-md border px-3 py-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {next.title} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
