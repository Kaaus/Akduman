import PageTransition from "@/components/PageTransition";

/**
 * template.tsx: layout.tsx'ten farklı olarak HER rota değişiminde yeniden
 * mount olur (Next.js App Router'ın kendi garantisi) — anchor/hash kayması,
 * dropdown açılışı veya aynı rotaya tıklama bu remount'u TETİKLEMEZ (bunlar
 * router seviyesinde bir "navigasyon" sayılmaz). PageTransition'ın "yalnız
 * gerçek rota değişimlerinde çalışır" kuralı ekstra kod gerekmeden buradan
 * gelir. Perde görünürlüğü `lib/site.ts` → `INTRO_SPLASH_MODE` ile
 * yönetilir ("off" iken PageTransition içerik girişini oynatır, perde hiç
 * render edilmez).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
