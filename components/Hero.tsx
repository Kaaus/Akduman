import { Phone } from "lucide-react";
import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { IMAGES, SITE } from "@/lib/site";

/**
 * Anasayfa hero'su: navy-950 düz zemin, iki sütun.
 * Sağdaki görsel, 12px dışında 1px bronz keyline çerçeveyle basılır
 * (sitenin imza detayı) ve duotone kuralına tabidir.
 */
export default function Hero() {
  return (
    <section className="bg-navy-950">
      <div className="container-site grid items-center gap-14 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-kicker text-bronze-300">
            Ankara • Avukatlık &amp; Hukuki Danışmanlık
          </p>
          <h1 className="mt-5 text-white">Akduman Hukuk Bürosu</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Akduman Hukuk Bürosu, Ankara&rsquo;da müvekkillerine çeşitli hukuk
            alanlarında avukatlık ve hukuki danışmanlık hizmeti sunmaktadır.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={SITE.telHref} className="btn-primary">
              <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
              Hemen Ara
            </a>
            <Link href="/faaliyet-alanlarimiz/" className="btn-secondary-dark">
              Faaliyet Alanlarımız
            </Link>
          </div>
        </div>
        {/* Keyline çerçevenin 12px taşması için kenar payı bırakılır */}
        <div className="m-3">
          <SiteImage
            image={IMAGES.hero}
            aspectRatio="4/3"
            keyline
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
