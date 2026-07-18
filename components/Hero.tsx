import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import PhotoSurface from "@/components/PhotoSurface";
import { IMAGES, SITE } from "@/lib/site";

/**
 * Anasayfa hero v2 (navy-950): tam genişlik fotoğraf arka planı (duotone +
 * scrim + çok yavaş Ken Burns) üzerinde kicker → H1 satırları → paragraf →
 * butonlar, yalnız ilk yüklemede 90ms kademeli rise-in. Sağdaki çerçeveli
 * görsel flush 2px pirinç kenarlıkla. Altta 2 nabızlık scroll ipucu.
 * (Tüm hareketler prefers-reduced-motion'da kapalıdır.)
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <PhotoSurface image={IMAGES.heroKitaplar} variant="hero" fill priority kenBurns sizes="100vw" />
      <div className="container-site relative z-10 grid items-center gap-14 pb-20 pt-16 md:py-24 lg:grid-cols-2">
        <div>
          <p className="kicker-dark hero-line">
            Ankara • Avukatlık &amp; Hukuki Danışmanlık
          </p>
          <h1 className="mt-5 !text-[#F4F1EA]">
            {/* Satırlar arasında DOM'da boşluk kalmalı — ekran okuyucu
                "AkdumanHukuk" diye bitişik okumasın */}
            <span className="hero-line block" style={{ animationDelay: "90ms" }}>
              Akduman{" "}
            </span>
            <span className="hero-line block" style={{ animationDelay: "180ms" }}>
              Hukuk Bürosu
            </span>
          </h1>
          <p
            className="hero-line mt-6 max-w-xl text-lg leading-relaxed text-[#F4F1EA]/[.82]"
            style={{ animationDelay: "270ms" }}
          >
            Akduman Hukuk Bürosu, Ankara&rsquo;da müvekkillerine çeşitli hukuk
            alanlarında avukatlık ve hukuki danışmanlık hizmeti sunmaktadır.
          </p>
          <div
            className="hero-line mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <a href={SITE.telHref} className="btn-primary-dark">
              <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
              Hemen Ara
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" className="btn-arrow" />
            </a>
            <Link href="/faaliyet-alanlarimiz/" className="btn-secondary-dark">
              Faaliyet Alanlarımız
            </Link>
          </div>
        </div>
        <PhotoSurface
          image={IMAGES.kutuphaneDikey}
          variant="framed"
          aspectRatio="3/4"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Scroll ipucu — 2 yumuşak nabız, sonra durur */}
      <a
        href="#tanitim"
        aria-label="İçeriğe kaydır"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-white/60 transition-colors hover:text-bronze-300 md:block"
      >
        <ChevronDown size={22} strokeWidth={1.5} aria-hidden="true" className="scroll-hint" />
      </a>
    </section>
  );
}
