import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import type { ImageEntry } from "@/lib/site";

/**
 * Manifest güdümlü görsel: ready:false → PlaceholderImage,
 * ready:true → next/image + zorunlu duotone kaplama
 * (navy-900 %55 multiply — sitedeki TÜM fotoğraflar bu kuralla basılır).
 * keyline: görselin 12px dışında 1px bronz çerçeve (sitenin imza detayı).
 */
export default function SiteImage({
  image,
  aspectRatio = "16/9",
  priority = false,
  keyline = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: {
  image: ImageEntry;
  aspectRatio?: string;
  priority?: boolean;
  keyline?: boolean;
  sizes?: string;
  className?: string;
}) {
  const frame = keyline ? "relative" : "";

  if (!image.ready) {
    return (
      <div className={`${frame} ${className}`}>
        {keyline && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 border border-bronze-500"
          />
        )}
        <PlaceholderImage alt={image.alt} aspectRatio={aspectRatio} />
      </div>
    );
  }

  return (
    <div className={`${frame} ${className}`}>
      {keyline && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 border border-bronze-500"
        />
      )}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {/* Duotone kaplama: navy-900 %55 multiply */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-navy-900/55 mix-blend-multiply"
        />
      </div>
    </div>
  );
}
