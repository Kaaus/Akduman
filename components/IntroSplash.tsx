"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { INTRO_SPLASH_MODE } from "@/lib/site";

/**
 * Terazili perde — app/template.tsx üzerinden layout düzeyinde mount edilir
 * (INTRO_SPLASH_MODE "off" değilken). template.tsx, Next.js App Router'ın
 * kendi garantisi gereği HER GERÇEK rota değişiminde çocuklarını yeniden
 * mount eder; bu yüzden bileşen kendisi de her rota değişiminde sıfırdan
 * tetiklenir — sessionStorage/oturum kontrolü YOK, her seferinde baştan
 * sona oynar.
 * - "global": TÜM rota geçişlerinde oynar (ilk giriş/yenileme dahil, hangi
 *   sayfa olursa olsun).
 * - "home": yalnız hedef Ana Sayfa iken oynar.
 * prefers-reduced-motion'da HİÇ oynamaz (içerik doğrudan görünür); tıklama/
 * Esc/scroll ile anında atlanır.
 *
 * Aynı rotaya tıklama: Next.js, aynı URL'ye giden bir Link tıklamasında da
 * template.tsx'i yeniden mount edebiliyor (gerçek navigasyon olmasa da).
 * Bunu tekrar oynatma sebebi SAYMAMAK için modül kapsamında `lastPathname`
 * tutulur (React state DEĞİL — bileşen her navigasyonda tamamen yeniden
 * mount olduğundan iç state bu karşılaştırma için kullanılamaz; modül
 * kapsamı SPA ömrü boyunca kalıcıdır, tam sayfa reload'da sıfırlanır).
 *
 * Rota hazırlığı: perde oynasın ya da oynamasın, her GERÇEK rota
 * değişiminde önce tepeye dönüş garanti edilir (`scrollTo(0,0,"instant")`,
 * html'deki scroll-behavior:smooth'u atlar), SONRA odak `<main>`e taşınır
 * (`focus({preventScroll:true})` — aksi hâlde tarayıcı kendi kaydırmasını
 * tetikleyip bu garantiyi bozar). Hash'li URL'lerde (#bolum) scrollTo
 * ATLANIR ki anchor hedefi normal çalışmaya devam etsin — hash kaymaları
 * zaten bir "navigasyon" sayılmadığından bu bileşeni yeniden tetiklemez,
 * yalnız hash'Lİ bir GERÇEK rota değişiminde bu istisna devreye girer.
 *
 * Hero senkronu: perde oynayacaksa, ilk (SSR ile eşleşen) render'dan hemen
 * sonra ama tarayıcı boyamadan ÖNCE (useLayoutEffect) <html> etiketine
 * data-intro-pending eklenir. globals.css'teki
 *   html[data-intro-pending] .hero-line { animation:none; opacity:0; }
 * kuralı, Hero'nun kademeli giriş animasyonunu perde kapalıyken bastırır;
 * perde bittiğinde data-intro-pending kaldırılıp data-intro-done eklenir,
 * .hero-line'ın normal kuralı yeniden devreye girer ve animasyon o anda
 * sıfırdan başlar. Hero yalnız Ana Sayfa'da bulunduğundan diğer sayfalarda
 * bu attribute'un varlığı zararsızdır (eşleşen bir seçici yoktur).
 */

const DRAW_AND_HOLD_MS = 1050; // çizim (~940ms) + nefes payı (~110ms)
const SEPARATE_MS = 700; // paneller ayrılırken

let lastPathname: string | null = null;

export default function IntroSplash() {
  const pathname = usePathname();
  const mainWillPlay =
    INTRO_SPLASH_MODE === "global" || (INTRO_SPLASH_MODE === "home" && pathname === "/");

  const [visible, setVisible] = useState(false);
  const [separating, setSeparating] = useState(false);
  const timers = useRef<number[]>([]);
  const skippedRef = useRef(false);

  function clearTimers() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }

  function finish() {
    clearTimers();
    document.documentElement.removeAttribute("data-intro-pending");
    document.documentElement.setAttribute("data-intro-done", "");
    document.body.style.overflow = "";
    setVisible(false);
  }

  /** Tıklama / Esc / scroll: bekletmeden ayrılma fazına atla. */
  function skip() {
    if (skippedRef.current) return;
    skippedRef.current = true;
    clearTimers();
    setSeparating(true);
    timers.current.push(window.setTimeout(finish, SEPARATE_MS));
  }

  // Rota hazırlığı + karar + Hero-gating: boyamadan önce senkron çalışır (flaş yok).
  useLayoutEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });

    const previousPathname = lastPathname;
    lastPathname = pathname;

    if (!mainWillPlay) return;
    if (previousPathname === pathname) return; // aynı rotaya tıklama — gerçek nav yok
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // oynamayacak — hiçbir iz bırakılmaz

    document.documentElement.setAttribute("data-intro-pending", "");
    document.body.style.overflow = "hidden";
    setVisible(true);

    timers.current.push(
      window.setTimeout(() => {
        setSeparating(true);
        timers.current.push(window.setTimeout(finish, SEPARATE_MS));
      }, DRAW_AND_HOLD_MS)
    );

    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    const onInteract = () => skip();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onInteract, { passive: true });
    window.addEventListener("touchmove", onInteract, { passive: true });
    window.addEventListener("scroll", onInteract, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onInteract);
      window.removeEventListener("touchmove", onInteract);
      window.removeEventListener("scroll", onInteract);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Tanıtımı geç"
      onClick={skip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          skip();
        }
      }}
      className="fixed inset-0 z-[100] flex cursor-pointer select-none"
    >
      {/* Sol panel */}
      <div
        aria-hidden="true"
        className={`h-full w-1/2 bg-navy-950 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
          separating ? "-translate-x-full" : "translate-x-0"
        }`}
      />
      {/* Sağ panel — aralarında görünür çizgi yok, kapalıyken tek parça algılanır */}
      <div
        aria-hidden="true"
        className={`h-full w-1/2 bg-navy-950 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
          separating ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Terazi + kicker — paneller ayrılmaya başlarken 300ms'de birlikte söner */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-7 transition-opacity duration-300 ${
          separating ? "opacity-0" : "opacity-100"
        }`}
      >
        <svg
          viewBox="0 0 120 140"
          className="h-[110px] w-auto md:h-[160px]"
          fill="none"
          stroke="#BFA05C"
          strokeWidth={1.75}
          strokeLinecap="round"
        >
          {/* Dikey mil */}
          <line className="intro-draw" style={{ animationDelay: "0ms" }} pathLength={1} x1="60" y1="24" x2="60" y2="122" />
          {/* Yatay denge kolu */}
          <line className="intro-draw" style={{ animationDelay: "80ms" }} pathLength={1} x1="18" y1="22" x2="102" y2="22" />
          {/* Taban */}
          <line className="intro-draw" style={{ animationDelay: "160ms" }} pathLength={1} x1="42" y1="122" x2="78" y2="122" />
          {/* Sol askı */}
          <line className="intro-draw" style={{ animationDelay: "240ms" }} pathLength={1} x1="18" y1="22" x2="18" y2="50" />
          {/* Sağ askı */}
          <line className="intro-draw" style={{ animationDelay: "320ms" }} pathLength={1} x1="102" y1="22" x2="102" y2="50" />
          {/* Sol çanak yayı */}
          <path className="intro-draw" style={{ animationDelay: "400ms" }} pathLength={1} d="M4,50 Q18,66 32,50" />
          {/* Sağ çanak yayı */}
          <path className="intro-draw" style={{ animationDelay: "480ms" }} pathLength={1} d="M88,50 Q102,66 116,50" />
          {/* Mil ekseni */}
          <circle className="intro-pivot" cx="60" cy="22" r="2.5" fill="#BFA05C" stroke="none" />
        </svg>
        <p className="intro-kicker kicker-dark">Akduman Hukuk Bürosu</p>
      </div>
    </div>
  );
}
