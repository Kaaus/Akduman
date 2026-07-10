"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-in animasyon sarmalayıcısı: yalnızca fade + 8px yukarı kayma,
 * 180ms ease-out (globals.css → .reveal). Parallax/typing/particle YOK.
 * prefers-reduced-motion tercihinde animasyon CSS tarafında kapatılır.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
