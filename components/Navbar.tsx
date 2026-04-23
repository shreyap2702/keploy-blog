import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-4 md:px-6">
        <Link href="/docs" className="text-sm font-semibold tracking-tight">
          Keploy Docs
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
          <a
            href="https://github.com/shreyap2702/keploy-blog"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border bg-zinc-950 px-3 py-1.5 font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            View Project
          </a>
        </div>
      </div>
    </header>
  );
}
