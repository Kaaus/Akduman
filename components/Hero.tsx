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
    // Yükseklik: header düşülerek ilk ekrana tam oturur. 110px değeri
    // tarayıcıda ÖLÇÜLMÜŞTÜR (üst şerit 34.75px + ana bar 75px = 109.75px,
    // yukarı yuvarlandı); iki sütun dikeyde ortalanır ve üst padding
    // küçültülür ki 1366×768'de butonlar dahil her şey fold üstünde kalsın.
    <section className="relative overflow-hidden bg-navy-950 lg:flex lg:min-h-[calc(100svh-110px)] lg:items-center">
      <PhotoSurface image={IMAGES.heroKitaplar} variant="hero" fill priority kenBurns sizes="100vw" />
      <div className="container-site relative z-10 grid w-full items-center gap-10 pb-14 pt-10 md:gap-14 md:pb-16 md:pt-12 lg:grid-cols-2 lg:py-8">
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
        {/* Çerçeveli görsel 3/4 oranında; YÜKSEKLİĞİ sınırlamak için genişliğe
            oranın tersi uygulanır: h = min(66svh, 620px) → w = h × 0.75, yani
            min(49.5svh, 465px). Böylece görselin çerçevesiyle TAMAMI ilk
            ekranda kalır, küçük ekranlarda kendiliğinden küçülür.
            Mobilde ~44svh yükseklik hedefi → w = 33svh. */}
        <PhotoSurface
          image={IMAGES.adaletHeykeli}
          variant="framed"
          aspectRatio="3/4"
          objectPosition="center"
          sizes="(max-width: 768px) 90vw, 38vw"
          className="mx-auto w-full max-w-[min(33svh,320px)] lg:mx-0 lg:ml-auto lg:max-w-[min(49.5svh,465px)]"
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
