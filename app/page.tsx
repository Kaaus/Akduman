import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { HOME_FAQ, SERVICES } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Ankara Avukat | Akduman Hukuk Bürosu – Av. Samed Akduman",
  description:
    "Ankara'da ceza, aile, miras, iş, sigorta, gayrimenkul, idare ve yabancılar hukuku alanlarında avukatlık ve hukuki danışmanlık. ☎ +90 534 089 10 70",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQ)} />

      {/* (a) Hero */}
      <Hero />

      {/* (b) Tanıtım bandı */}
      <section className="bg-white">
        <div className="container-site flex flex-col gap-8 py-16 md:py-20 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-3xl">
            <p className="kicker mb-3">Ankara</p>
            <h2 className="text-navy-800">
              Hukuki Danışmanlık &amp; Avukatlık Hizmetleri
            </h2>
            <p className="mt-5">
              Akduman Hukuk Bürosu; ceza, gayrimenkul, aile, iş, yabancılar,
              miras, sigorta ve idare hukuku alanlarında müvekkillerine hukuki
              destek sağlamaktadır. Büromuz, müvekkillerinin hak kayıplarının
              önüne geçmek amacıyla süreçleri titizlikle yürütmektedir.
            </p>
          </Reveal>
          <Link href="/hakkimizda/" className="btn-secondary shrink-0">
            Hakkımızda <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* (c) Hizmetlerimiz — 8 endeks kartı */}
      <section className="border-t border-line bg-paper">
        <div className="container-site py-16 md:py-20">
          <SectionHeading kicker="Faaliyet Alanlarımız" title="Hizmetlerimiz" />
          <Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* (d) Sıkça Sorulan Sorular */}
      <section className="bg-white">
        <div className="container-site py-16 md:py-20">
          <h2 className="text-navy-800">Sıkça Sorulan Sorular</h2>
          <Reveal className="mt-8 max-w-3xl">
            <FaqAccordion items={HOME_FAQ} idPrefix="anasayfa-sss" />
          </Reveal>
        </div>
      </section>

      {/* (e) İletişim Formu */}
      <section className="border-t border-line bg-paper">
        <div className="container-site py-16 md:py-20">
          <h2 className="text-navy-800">İletişim Formu</h2>
          <div className="mt-8 max-w-3xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* (f) CTA bandı */}
      <CtaBand />
    </>
  );
}
