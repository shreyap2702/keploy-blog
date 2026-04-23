import type { ReactNode } from "react";

type CalloutProps = {
  type?: "info" | "warning";
  children: ReactNode;
};

const toneClasses: Record<NonNullable<CalloutProps["type"]>, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div className={`my-5 rounded-xl border p-4 text-sm ${toneClasses[type]}`}>
      {children}
    </div>
  );
}
