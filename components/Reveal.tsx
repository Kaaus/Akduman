"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-in animasyonu v2: opacity + 14px yukarı kayma (320ms, --ease),
 * once:true, threshold .18. `delay` prop'uyla kardeş öğeler 70ms
 * kademelendirilebilir. prefers-reduced-motion'da CSS tarafında tamamen
 * kapalıdır (içerik anında görünür).
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** ms cinsinden giriş gecikmesi (kardeşler arası kademelenme için). */
  delay?: number;
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
      { threshold: 0.18 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
