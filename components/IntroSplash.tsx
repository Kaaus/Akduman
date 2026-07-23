"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { INTRO_SPLASH_MODE } from "@/lib/site";

/**
 * Terazili perde — TEK animasyon, iki mod:
 * - "full": yalnız tarayıcıdan ilk geliş / yenileme, Ana Sayfa'da (bkz.
 *   components/PageTransition.tsx'in mod kararı). Tam koreografi, ~1.75sn.
 * - "compact": SİTE İÇİ HER rota geçişinde (Ana Sayfa'ya dönüş dahil) —
 *   hızlandırılmış çizim + kısaltılmış bekleme + daha hızlı panel açılışı,
 *   ~1.1sn. His her sayfada özdeş olsun diye mini-perde YERİNE bu kullanılır.
 *
 * Mounting: components/PageTransition.tsx tarafından, mod "off" değilken ve
 * (hard/ilk yüklemede yalnız Ana Sayfa için) render edilir. Bileşenin kendisi
 * yalnızca session/reduced-motion kararını verir — mod seçimi tamamen
 * çağıranın sorumluluğundadır (SSR-safe, pathname bağımlı karar
 * PageTransition'da veriliyor).
 *
 * İkisinde de: sessionStorage'a "always" modda hiç dokunulmaz (session
 * modda eski oturum-başına-bir-kez davranışı), prefers-reduced-motion'da
 * hiç oynamaz, tıklama/Esc/scroll anında atlar.
 *
 * Hero senkronu: perde oynayacaksa, ilk (SSR ile eşleşen) render'dan hemen
 * sonra ama tarayıcı boyamadan ÖNCE (useLayoutEffect) <html> etiketine
 * data-intro-pending eklenir. globals.css'teki
 *   html[data-intro-pending] .hero-line { animation:none; opacity:0; }
 * kuralı, Hero'nun kademeli giriş animasyonunu perde kapalıyken bastırır;
 * perde bittiğinde data-intro-pending kaldırılıp data-intro-done eklenir,
 * .hero-line'ın normal kuralı yeniden devreye girer ve animasyon o anda
 * sıfırdan başlar. Ana Sayfa'ya her dönüşte (compact modda) bu senkron
 * aynen çalışır — Hero yalnız Ana Sayfa'da bulunduğundan diğer sayfalarda
 * bu attribute'un varlığı zararsızdır (eşleşen bir seçici yoktur).
 */

type Mode = "full" | "compact";

const TIMING: Record<
  Mode,
  {
    holdMs: number;
    separateMs: number;
    drawDuration: number;
    drawStagger: number;
    pivotDelay: number;
    pivotDuration: number;
    kickerDelay: number;
    kickerDuration: number;
    panelDuration: number;
  }
> = {
  full: {
    holdMs: 1050,
    separateMs: 700,
    drawDuration: 380,
    drawStagger: 80,
    pivotDelay: 560,
    pivotDuration: 250,
    kickerDelay: 600,
    kickerDuration: 400,
    panelDuration: 700,
  },
  compact: {
    holdMs: 600,
    separateMs: 500,
    drawDuration: 220,
    drawStagger: 40,
    pivotDelay: 260,
    pivotDuration: 150,
    kickerDelay: 300,
    kickerDuration: 250,
    panelDuration: 500,
  },
};

/** Terazi SVG'sindeki çizgiler/yaylar — sırayla `drawStagger` kademeyle çizilir. */
const STROKES: Array<{ el: "line" | "path"; props: Record<string, string> }> = [
  { el: "line", props: { x1: "60", y1: "24", x2: "60", y2: "122" } }, // dikey mil
  { el: "line", props: { x1: "18", y1: "22", x2: "102", y2: "22" } }, // yatay denge kolu
  { el: "line", props: { x1: "42", y1: "122", x2: "78", y2: "122" } }, // taban
  { el: "line", props: { x1: "18", y1: "22", x2: "18", y2: "50" } }, // sol askı
  { el: "line", props: { x1: "102", y1: "22", x2: "102", y2: "50" } }, // sağ askı
  { el: "path", props: { d: "M4,50 Q18,66 32,50" } }, // sol çanak yayı
  { el: "path", props: { d: "M88,50 Q102,66 116,50" } }, // sağ çanak yayı
];

export default function IntroSplash({ mode = "full" }: { mode?: Mode }) {
  const [visible, setVisible] = useState(false);
  const [separating, setSeparating] = useState(false);
  const timers = useRef<number[]>([]);
  const skippedRef = useRef(false);
  const t = TIMING[mode];

  function clearTimers() {
    timers.current.forEach((tm) => window.clearTimeout(tm));
    timers.current = [];
  }

  function finish() {
    clearTimers();
    document.documentElement.removeAttribute("data-intro-pending");
    document.documentElement.setAttribute("data-intro-done", "");
    document.body.style.overflow = "";
    // "always" modda sessionStorage'a KESİNLİKLE dokunulmaz — bir sonraki
    // ziyarette/dönüşte tekrar oynaması gereken şey zaten budur.
    if (INTRO_SPLASH_MODE === "session") {
      try {
        sessionStorage.setItem("introSeen", "1");
      } catch {
        // Gizlilik modu vb. — sorun değil, bir sonraki ziyarette tekrar oynar.
      }
    }
    setVisible(false);
  }

  /** Tıklama / Esc / scroll: bekletmeden ayrılma fazına atla. */
  function skip() {
    if (skippedRef.current) return;
    skippedRef.current = true;
    clearTimers();
    setSeparating(true);
    timers.current.push(window.setTimeout(finish, t.separateMs));
  }

  // Karar + Hero-gating: boyamadan önce senkron çalışır (flaş yok).
  useLayoutEffect(() => {
    let seen = false;
    if (INTRO_SPLASH_MODE === "session") {
      try {
        seen = sessionStorage.getItem("introSeen") === "1";
      } catch {
        seen = false;
      }
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced) return; // oynamayacak — hiçbir iz bırakılmaz

    document.documentElement.setAttribute("data-intro-pending", "");
    document.body.style.overflow = "hidden";
    setVisible(true);

    timers.current.push(
      window.setTimeout(() => {
        setSeparating(true);
        timers.current.push(window.setTimeout(finish, t.separateMs));
      }, t.holdMs)
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
        style={{ transitionDuration: `${t.panelDuration}ms` }}
        className={`h-full w-1/2 bg-navy-950 transition-transform ease-[cubic-bezier(.22,1,.36,1)] ${
          separating ? "-translate-x-full" : "translate-x-0"
        }`}
      />
      {/* Sağ panel — aralarında görünür çizgi yok, kapalıyken tek parça algılanır */}
      <div
        aria-hidden="true"
        style={{ transitionDuration: `${t.panelDuration}ms` }}
        className={`h-full w-1/2 bg-navy-950 transition-transform ease-[cubic-bezier(.22,1,.36,1)] ${
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
          {STROKES.map((s, i) => {
            const style = {
              animationDelay: `${i * t.drawStagger}ms`,
              animationDuration: `${t.drawDuration}ms`,
            };
            return s.el === "line" ? (
              <line key={i} className="intro-draw" style={style} pathLength={1} {...s.props} />
            ) : (
              <path key={i} className="intro-draw" style={style} pathLength={1} {...s.props} />
            );
          })}
          {/* Mil ekseni */}
          <circle
            className="intro-pivot"
            style={{ animationDelay: `${t.pivotDelay}ms`, animationDuration: `${t.pivotDuration}ms` }}
            cx="60"
            cy="22"
            r="2.5"
            fill="#BFA05C"
            stroke="none"
          />
        </svg>
        <p
          className="intro-kicker kicker-dark"
          style={{ animationDelay: `${t.kickerDelay}ms`, animationDuration: `${t.kickerDuration}ms` }}
        >
          Akduman Hukuk Bürosu
        </p>
      </div>
    </div>
  );
}
