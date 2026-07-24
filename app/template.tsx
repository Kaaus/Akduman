import IntroSplash from "@/components/IntroSplash";
import { INTRO_SPLASH_MODE } from "@/lib/site";

/**
 * template.tsx: layout.tsx'ten farklı olarak HER rota değişiminde yeniden
 * mount olur (Next.js App Router'ın kendi garantisi) — anchor/hash kayması,
 * dropdown açılışı veya aynı rotaya tıklama bu remount'u TETİKLEMEZ (bunlar
 * router seviyesinde bir "navigasyon" sayılmaz). Terazili perdenin (bkz.
 * components/IntroSplash.tsx) "her rota değişiminde yeniden tetiklenir"
 * kuralı ekstra kod gerekmeden buradan gelir. INTRO_SPLASH_MODE "off" iken
 * bileşen hiç mount edilmez — sıfır iz kalır.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {INTRO_SPLASH_MODE !== "off" && <IntroSplash />}
      {children}
    </>
  );
}
