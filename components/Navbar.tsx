import Link from "next/link";
import Image from "next/image";

export function Navbar() {
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

        </div>
      </div>
    </header>
  );
}
