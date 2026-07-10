import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceRow from "@/components/ServiceRow";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { HOME_FAQ, SERVICES } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Ankara Avukat | Akduman Hukuk Bürosu – Av. Samed Akduman",
  description:
    "Ankara'da ceza, aile, miras, iş, sigorta, gayrimenkul, idare ve yabancılar hukuku alanlarında avukatlık ve hukuki danışmanlık. ☎ +90 534 089 10 70",
  path: "/",
});

/** Bölüm ritmi: hero(koyu) → tanıtım(white) → hizmetler(paper) → SSS(white) → form+CTA(koyu) */
export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQ)} />

      {/* (a) Hero v2 */}
      <Hero />

      {/* (b) Tanıtım bandı — white */}
      <section id="tanitim" className="bg-white">
        <div className="container-site flex flex-col gap-8 py-16 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-3xl">
            <p className="kicker mb-3">Ankara</p>
            <h2>Hukuki Danışmanlık &amp; Avukatlık Hizmetleri</h2>
            <p className="mt-5">
              Akduman Hukuk Bürosu; ceza, gayrimenkul, aile, iş, yabancılar,
              miras, sigorta ve idare hukuku alanlarında müvekkillerine hukuki
              destek sağlamaktadır. Büromuz, müvekkillerinin hak kayıplarının
              önüne geçmek amacıyla süreçleri titizlikle yürütmektedir.
            </p>
          </Reveal>
          <Reveal delay={140} className="shrink-0">
            <Link href="/hakkimizda/" className="btn-secondary">
              Hakkımızda
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" className="btn-arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* (c) Hizmetlerimiz — paper, editoryal satır listesi */}
      <section className="border-t border-line bg-paper">
        <div className="container-site py-16 md:py-24">
          <Reveal>
            <SectionHeading kicker="Faaliyet Alanlarımız" title="Hizmetlerimiz" />
          </Reveal>
          <div className="mt-10 border-t border-line-strong">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70}>
                <ServiceRow service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* (d) Sıkça Sorulan Sorular — white */}
      <section className="bg-white">
        <div className="container-site py-16 md:py-24">
          <Reveal>
            <h2>Sıkça Sorulan Sorular</h2>
          </Reveal>
          <Reveal delay={100} className="mt-8 max-w-3xl">
            <FaqAccordion items={HOME_FAQ} idPrefix="anasayfa-sss" />
          </Reveal>
        </div>
      </section>

      {/* (e) İletişim Formu — navy-950 içinde beyaz form kartı */}
      <section className="bg-navy-950">
        <div className="container-site py-16 md:py-24">
          <Reveal>
            <h2 className="!text-[#F4F1EA]">İletişim Formu</h2>
          </Reveal>
          <Reveal delay={100} className="mt-8">
            <div className="card max-w-3xl p-6 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* (f) CTA bandı */}
      <CtaBand />
    </>
  );
}
