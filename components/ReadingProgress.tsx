"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      const value = total > 0 ? (scrollTop / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-40 h-0.5 bg-yellow-400 transition-[width] duration-150"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
