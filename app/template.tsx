import PageTransition from "@/components/PageTransition";
import { PAGE_TRANSITIONS } from "@/lib/site";

/**
 * template.tsx: layout.tsx'ten farklı olarak HER rota değişiminde yeniden
 * mount olur (Next.js App Router'ın kendi garantisi) — anchor/hash kayması,
 * dropdown açılışı veya aynı rotaya tıklama bu remount'u TETİKLEMEZ (bunlar
 * router seviyesinde bir "navigasyon" sayılmaz). PageTransition'ın "yalnız
 * gerçek rota değişimlerinde çalışır" kuralı ekstra kod gerekmeden buradan
 * gelir. PAGE_TRANSITIONS=false iken PageTransition hiç mount edilmez —
 * sıfır iz kalır.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  if (!PAGE_TRANSITIONS) return <>{children}</>;
  return <PageTransition>{children}</PageTransition>;
}
