import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { IMAGES, SITE } from "@/lib/site";

/**
 * Anasayfa hero v2 (navy-950): kicker → H1 satırları → paragraf → butonlar,
 * yalnız ilk yüklemede 90ms kademeli rise-in. Görselin bronz keyline
 * çerçevesi 500ms'de çizilerek gelir. Altta 2 nabızlık scroll ipucu.
 * (Tüm hareketler prefers-reduced-motion'da kapalıdır.)
 */
export default function Hero() {
  return (
    <section className="relative bg-navy-950">
      <div className="container-site grid items-center gap-14 pb-20 pt-16 md:py-24 lg:grid-cols-2">
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
        {/* Keyline çerçevenin 12px taşması için kenar payı */}
        <div className="m-3">
          <SiteImage
            image={IMAGES.hero}
            aspectRatio="4/3"
            keyline
            animateKeyline
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
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
