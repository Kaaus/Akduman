import { Scale } from "lucide-react";

/**
 * Görsel yer tutucusu: manifestte (lib/site.ts → IMAGES) ready:false olan
 * her görsel bu komponenti render eder. Kullanıcı gerçek dosyayı
 * public/images/ altına koyup ready:true yaptığında SiteImage devreye girer.
 * ALT metni placeholder durumunda bile doğru kurulur (aria-label).
 */
export default function PlaceholderImage({
  alt,
  aspectRatio = "16/9",
  className = "",
}: {
  /** Gerçek görselin taşıyacağı alt metni. */
  alt: string;
  /** CSS aspect-ratio değeri, örn. "16/9", "3/4", "16/6". */
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={{ aspectRatio }}
      className={`flex w-full flex-col items-center justify-center gap-2 border border-line bg-paper ${className}`}
    >
      <Scale size={20} strokeWidth={1.5} className="text-bronze-500" aria-hidden="true" />
      <span className="text-[11px] text-muted">Görsel eklenecek</span>
    </div>
  );
}
