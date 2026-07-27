"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FaqItem } from "@/lib/site";

/**
 * Yatay kaydırmalı SSS kartları (İletişim sayfası, kitaplik.jpg arka planı
 * üzerinde). CSS scroll-snap tabanlı — kütüphane yok. Kart beyaz zemin;
 * görünür kart sayısı mobil 1 / tablet 2 / desktop 3, bir sonraki kartın
 * ~%12'si kenardan görünür. Ok butonları + nokta göstergeleri + klavye
 * (ArrowLeft/ArrowRight) + native touch swipe. Otomatik oynatma YOK.
 * reduced-motion'da snap yumuşatması globals.css'te (.faq-slider-track)
 * kapatılır.
 */
export default function FaqSlider({ items }: { items: FaqItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    // CSS scroll-behavior JS'e aktarılan `behavior` parametresini geçersiz
    // kılmayabilir; reduced-motion burada da ayrıca kontrol edilir.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: card.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      const next = Math.min(items.length - 1, Math.max(0, active + dir));
      scrollToIndex(next);
    },
    [active, items.length, scrollToIndex]
  );

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    let nearest = 0;
    let min = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - track.scrollLeft);
      if (dist < min) {
        min = dist;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  }

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label="Sıkça sorulan sorular"
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        className="faq-slider-track flex gap-4 overflow-x-auto pb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="w-[86%] shrink-0 rounded-[2px] bg-white p-6 shadow-card sm:w-[42%] lg:w-[28%]"
            style={{ scrollSnapAlign: "start" }}
          >
            <h3 className="font-serif text-[18px] font-semibold leading-snug text-ink-strong">
              {item.question}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2" role="tablist" aria-label="Soru göstergeleri">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`${i + 1}. soruya git`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-300 ${
                active === i ? "bg-bronze-500" : "bg-white/30"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Önceki soru"
            onClick={() => step(-1)}
            disabled={active === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bronze-500 text-bronze-500 transition-colors duration-200 hover:bg-bronze-500 hover:text-navy-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-bronze-500"
          >
            <ChevronLeft size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Sonraki soru"
            onClick={() => step(1)}
            disabled={active === items.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bronze-500 text-bronze-500 transition-colors duration-200 hover:bg-bronze-500 hover:text-navy-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-bronze-500"
          >
            <ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
