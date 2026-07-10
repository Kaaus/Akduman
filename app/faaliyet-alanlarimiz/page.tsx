import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
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
          <Breadcrumb items={[{ label: "Faaliyet Alanlarımız" }]} />
          <h1 className="mt-6 text-navy-800">Faaliyet Alanlarımız</h1>
          <p className="mt-5 max-w-3xl">
            Büromuzun hizmet verdiği başlıca hukuk alanları aşağıda yer
            almaktadır.
          </p>
          <Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
