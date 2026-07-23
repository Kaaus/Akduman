"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import IntroSplash from "@/components/IntroSplash";
import { INTRO_SPLASH_MODE } from "@/lib/site";

/**
 * Rota geçiş animasyonu — app/template.tsx tarafından sarmalanır.
 * template.tsx, Next.js App Router'ın kendi garantisi gereği HER GERÇEK rota
 * değişiminde çocuklarını yeniden mount eder; sayfa içi anchor/hash kayması,
 * dropdown açılışı veya aynı rotaya tıklama bir "navigasyon" sayılmadığından
 * bu remount'u TETİKLEMEZ. Yani "yalnız gerçek rota değişimlerinde çalışır"
 * kuralı bu bileşende ekstra kod gerekmeden template.tsx'in doğasından gelir.
 *
 * İçerik girişi: `.page-content-in` (globals.css) — opacity 0→1 +
 * translateY(12px)→0, 380ms, mount'ta otomatik oynayan bir CSS keyframe
 * (JS state gerekmez; `.hero-line` ile aynı desen). Bu süre HER İKİ modda da
 * (full 1050ms, compact 600ms bekleme) perdenin panelleri ayırmaya
 * başlamasından önce biter — yani içerik, perde tamamen kapalıyken görünmez
 * hâlde animasyonunu bitirir; kullanıcı içeriği YALNIZCA perde açılırken
 * görür ("içerik girişi perde açıldıktan sonra başlıyormuş" hissi budur).
 *
 * Terazili perde (components/IntroSplash.tsx) — TEK animasyon, tüm site için:
 * - "full": yalnızca tarayıcıdan ilk geliş/yenilemede VE hedef Ana Sayfa ise.
 * - "compact": site içi HER GERÇEK rota değişiminde (Ana Sayfa'ya dönüş
 *   dahil) — his her sayfada özdeş olsun diye eski "mini perde" YERİNE bu
 *   kullanılır (bileşen artık DOM'da yok, tamamen emekli).
 * - Hiç perde yok: INTRO_SPLASH_MODE === "off" İKEN, veya sert/ilk yüklemede
 *   hedef Ana Sayfa DEĞİLSE (SSR'ın zaten boyadığı içeriğin üstüne sebepsiz
 *   bir perde çıkmasın), veya aynı rotaya tıklamada (gerçek navigasyon yok).
 *
 * Aynı rotaya tıklama: Next.js, aynı URL'ye giden bir Link tıklamasında da
 * template.tsx'i yeniden mount edebiliyor (hard reload olmasa da). Bunu
 * "gerçek rota değişimi" saymamak için modül kapsamında `lastPathname`
 * tutulur (React state DEĞİL — template her navigasyonda tamamen yeniden
 * mount olduğundan bileşen içi state bu karşılaştırma için kullanılamaz;
 * modül kapsamı SPA ömrü boyunca kalıcıdır, tam sayfa reload'da sıfırlanır).
 *
 * IntroSplash kendi içinde prefers-reduced-motion ve (varsa) session kararını
 * verir — burada mod SEÇİLİR, reduced-motion/atlama gibi görüntü kararları
 * IntroSplash'e bırakılır (tek sorumluluk, tek kaynak).
 */
let lastPathname: string | null = null;

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);
  const [curtainMode, setCurtainMode] = useState<"full" | "compact" | null>(null);

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

    if (INTRO_SPLASH_MODE === "off") return;
    if (previousPathname === pathname) return; // aynı rotaya tıklama — gerçek nav yok
    if (previousPathname === null) {
      if (pathname === "/") setCurtainMode("full"); // sert/ilk yükleme, Ana Sayfa
      return; // sert yüklemede diğer sayfalarda perde yok
    }
    setCurtainMode("compact"); // gerçek SPA rota değişimi (Ana Sayfa'ya dönüş dahil)
    // Bu efekt yalnızca MOUNT'ta çalışır — template.tsx her rota
    // değişiminde bileşeni zaten yeniden mount ettiğinden pathname'i
    // bağımlılığa eklemeye gerek yok.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={mainRef} tabIndex={-1} className="page-content-in outline-none">
      {curtainMode && <IntroSplash mode={curtainMode} />}
      {children}
    </div>
  );
}
