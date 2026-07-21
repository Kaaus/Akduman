import PageHeading from "@/components/PageHeading";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import ServiceRow from "@/components/ServiceRow";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Faaliyet Alanlarımız | Akduman Hukuk Bürosu",
  description:
    "Ceza, aile, miras, iş, sigorta, gayrimenkul, idare ve yabancılar hukuku alanlarındaki hizmetlerimizi inceleyin.",
  path: "/faaliyet-alanlarimiz/",
});

export default function FaaliyetAlanlariPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Faaliyet Alanlarımız", path: "/faaliyet-alanlarimiz/" },
        ])}
      />

      <section className="bg-white">
        <div className="container-site py-12 md:py-16">
          <PageHeading
            crumbs={[{ label: "Faaliyet Alanlarımız" }]}
            title="Faaliyet Alanlarımız"
          >
            Büromuzun hizmet verdiği başlıca hukuk alanları aşağıda yer
            almaktadır.
          </PageHeading>
          {/* Hub: editoryal satır listesi — açıklama mobilde de görünür */}
          <div className="mt-10 border-t border-line-strong">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70}>
                <ServiceRow service={service} showDescriptionOnMobile />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
