"use client";

import Image from "next/image";
import { isValidElement, type ReactNode } from "react";
import { useMemo, useState } from "react";

type CodeBlockProps = {
  children?: ReactNode;
};

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => getTextContent(child)).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }

  return "";
}
export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const codeText = useMemo(() => {
    return getTextContent(children).trimEnd();
  }, [children]);

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
        className="absolute right-3 top-3 inline-flex items-center justify-center rounded-md border border-zinc-300 bg-zinc-100/95 p-1.5 transition-colors hover:bg-white"
        aria-label={copied ? "Code copied" : "Copy code"}
        title={copied ? "Copied" : "Copy"}
      >
        <Image
          src={copied ? "/images/copied_dark.svg" : "/images/copy_dark.svg"}
          alt={copied ? "Copied" : "Copy"}
          width={15}
          height={15}
        />
      </button>
      <pre>{children}</pre>
    </div>
  );
}
