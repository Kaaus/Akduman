"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { INTRO_SPLASH_MODE } from "@/lib/site";

/**
 * Rota geçiş animasyonu ("mini perde") — app/template.tsx tarafından
 * sarmalanır. template.tsx, Next.js App Router'ın kendi garantisi gereği
 * HER GERÇEK rota değişiminde çocuklarını yeniden mount eder; sayfa içi
 * anchor/hash kayması, dropdown açılışı veya aynı rotaya tıklama bir
 * "navigasyon" sayılmadığından bu remount'u TETİKLEMEZ. Yani "yalnız
 * gerçek rota değişimlerinde çalışır" kuralı bu bileşende ekstra kod
 * gerekmeden template.tsx'in doğasından gelir.
 *
 * İçerik girişi: `.page-content-in` (globals.css) — opacity 0→1 +
 * translateY(12px)→0, 380ms, mount'ta otomatik oynayan bir CSS keyframe
 * (JS state gerekmez; `.hero-line` ile aynı desen).
 *
 * Mini perde: navy-950 tam ekran panel, mount anında görünür, 60ms
 * bekleyip `.page-curtain` keyframe'i ile yukarı kalkar (360ms). SADECE
 * reduced-motion DEĞİLSE render edilir — IntroSplash'teki gibi
 * useLayoutEffect ile boyamadan ÖNCE senkron karar verilir (flaş yok).
 *
 * Ana sayfaya dönüşte IntroSplash oynayacaksa (INTRO_SPLASH_MODE !== "off")
 * mini perde TAMAMEN atlanır — çifte perde olmasın, IntroSplash
 * önceliklidir. Bu karar SSR-safe'tir (yalnız pathname + sabit config'e
 * bağlıdır, client-only bir API kullanmaz), bu yüzden hydration
 * uyuşmazlığı riski yoktur.
 *
 * Aynı rotaya tıklama: Next.js, aynı URL'ye giden bir Link tıklamasında da
 * template.tsx'i yeniden mount edebiliyor (hard reload olmasa da). Bunu
 * "gerçek rota değişimi" saymamak için modül kapsamında `lastPathname`
 * tutulur (React state DEĞİL — template her navigasyonda tamamen yeniden
 * mount olduğundan bileşen içi state bu karşılaştırma için kullanılamaz;
 * modül kapsamı SPA ömrü boyunca kalıcıdır, tam sayfa reload'da sıfırlanır).
 * İlk (sert) yüklemede de `lastPathname === null` olduğundan perde atlanır —
 * SSR'ın zaten boyadığı içeriğin üstüne sebepsiz bir perde çıkmasın diye.
 */
let lastPathname: string | null = null;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);
  const skipForHome = pathname === "/" && INTRO_SPLASH_MODE !== "off";
  const [showCurtain, setShowCurtain] = useState(false);

  useLayoutEffect(() => {
    // Rota değişiminde önce tepeye dönüş garanti edilir (html'deki
    // scroll-behavior:smooth'un yavaşlatmaması için "instant"), SONRA odak
    // main içeriğe taşınır — `preventScroll: true` olmadan focus() tarayıcıda
    // kendi kaydırmasını tetikleyip bu garantiyi bozar. Hash'li URL'lerde
    // (#bolum) scrollTo ATLANIR ki anchor hedefi normal çalışmaya devam etsin.
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    mainRef.current?.focus({ preventScroll: true });

    const previousPathname = lastPathname;
    lastPathname = pathname;

    if (skipForHome) return;
    if (previousPathname === null || previousPathname === pathname) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // panel hiç render edilmez
    setShowCurtain(true);
    // Bu efekt yalnızca MOUNT'ta çalışır — template.tsx her rota
    // değişiminde bileşeni zaten yeniden mount ettiğinden pathname'i
    // bağımlılığa eklemeye gerek yok.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={mainRef} tabIndex={-1} className="page-content-in outline-none">
      {showCurtain && (
        <div
          aria-hidden="true"
          className="page-curtain pointer-events-none fixed inset-0 z-[90] bg-navy-950"
          onAnimationEnd={() => setShowCurtain(false)}
        >
          <span className="absolute inset-x-0 bottom-0 h-[2px] bg-bronze-500" />
        </div>
      )}
      {children}
    </div>
  );
}
