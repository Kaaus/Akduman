"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * "Bu sayfada" rayı: desktop'ta sağda sticky; scroll-spy ile aktif H2
 * bronz çizgi + ink-strong olur. Mobilde gizlidir. Öğe yoksa render edilmez.
 */
export default function TocRail({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Görünür başlıklardan sayfada en üstte olanı aktif kabul et
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px", threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Bu sayfada"
      className="sticky top-32 hidden w-56 shrink-0 self-start lg:block"
    >
      <p className="kicker mb-4">Bu sayfada</p>
      <ul className="border-l-2 border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-[2px] block border-l-2 py-1.5 pl-4 text-[14px] leading-snug transition-colors duration-200 ${
                active === item.id
                  ? "border-bronze-500 font-semibold text-ink-strong"
                  : "border-transparent text-muted hover:text-ink-strong"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
