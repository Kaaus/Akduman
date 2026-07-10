import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import type { ImageEntry } from "@/lib/site";

/**
 * Manifest güdümlü görsel: ready:false → PlaceholderImage,
 * ready:true → next/image + duotone v2:
 * navy-900 multiply %45 → hover'da %25'e iner ve görsel scale(1.04)
 * (600ms) — "monotondan renge uyanma", ağırbaşlı dozda.
 * keyline: görselin 12px dışında 1px bronz çerçeve (imza detayı);
 * animate ile çerçeve ilk yüklemede 500ms'de çizilerek gelir.
 */
export default function SiteImage({
  image,
  aspectRatio = "16/9",
  priority = false,
  keyline = false,
  animateKeyline = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: {
  image: ImageEntry;
  aspectRatio?: string;
  priority?: boolean;
  keyline?: boolean;
  /** Keyline çerçevesi ilk görünümde çizilerek gelsin mi (hero). */
  animateKeyline?: boolean;
  sizes?: string;
  className?: string;
}) {
  const frame = keyline ? "relative" : "";
  const keylineEl = keyline ? (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-3 border border-bronze-500 ${
        animateKeyline ? "keyline-draw" : ""
      }`}
    />
  ) : null;

  if (!image.ready) {
    return (
      <div className={`${frame} ${className}`}>
        {keylineEl}
        <PlaceholderImage alt={image.alt} aspectRatio={aspectRatio} />
      </div>
    );
  }

  return (
    <div className={`${frame} ${className}`}>
      {keylineEl}
      <div
        className="group relative w-full overflow-hidden"
        style={{ aspectRatio }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        />
        {/* Duotone v2: %45 multiply, hover'da %25'e uyanır */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-navy-900 opacity-[0.45] mix-blend-multiply transition-opacity duration-[600ms] group-hover:opacity-25"
        />
      </div>
    </div>
  );
}
