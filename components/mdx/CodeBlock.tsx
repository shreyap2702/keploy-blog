"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type CodeChild = {
  props?: {
    className?: string;
    children?: ReactNode;
  };
};

type CodeBlockProps = {
  children?: ReactNode;
};

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeChild = children as CodeChild;

  const codeText = useMemo(() => {
    const content = codeChild?.props?.children;
    if (typeof content === "string") {
      return content.trimEnd();
    }
    if (Array.isArray(content)) {
      return content.join("").trimEnd();
    }
    return "";
  }, [codeChild]);

  const handleCopy = async () => {
    if (!codeText) return;
    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative my-5">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-200 transition-colors hover:bg-zinc-800"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre>{children}</pre>
    </div>
  );
}
