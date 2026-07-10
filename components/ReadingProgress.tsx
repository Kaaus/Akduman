"use client";

import { useEffect, useState } from "react";

/**
 * Makale detayında en üstte 3px bronz okuma ilerleme çubuğu.
 * Salt dekoratif olduğundan aria-hidden'dır.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[70] h-[3px] bg-bronze-500"
      style={{ width: `${progress * 100}%` }}
    />
  );
}
