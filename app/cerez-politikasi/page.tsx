import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

/*
 * İşbu metin genel şablondur; yayına almadan önce avukat tarafından
 * gözden geçirilmelidir.
 */

export const metadata = buildMetadata({
  title: "Çerez Politikası | Akduman Hukuk Bürosu",
  description:
    "akduman.av.tr üzerinde kullanılan çerezler ve çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgilendirme.",
  path: "/cerez-politikasi/",
});

export default function CerezPolitikasiPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Çerez Politikası", path: "/cerez-politikasi/" },
        ])}
      />

      <section className="bg-white">
        <div className="container-site max-w-4xl pt-10 pb-12 md:pb-16">
          <PageHeading
            crumbs={[{ label: "Çerez Politikası" }]}
            title="Çerez Politikası"
          />

          {/* Üst boşluk PageHeading'in kendi pb-12'sinden gelir. */}
          <div className="article-body">
            <h2>Çerez Nedir?</h2>
            <p>
              Çerezler, ziyaret ettiğiniz internet siteleri tarafından
              tarayıcınıza kaydedilen küçük metin dosyalarıdır. Çerezler,
              sitenin düzgün çalışmasını sağlamak ve ziyaret deneyimini
              iyileştirmek gibi amaçlarla kullanılmaktadır.
            </p>

            <h2>Sitemizde Kullanılan Çerezler</h2>
            <p>
              İnternet sitemizde yalnızca sitenin çalışması için zorunlu olan
              çerezler kullanılmaktadır. Analitik, pazarlama veya hedefleme
              amaçlı herhangi bir çerez kullanılmamaktadır. İleride analitik bir
              araç eklenmesi hâlinde bu politika güncellenecek ve gerekli
              bilgilendirme yapılacaktır.
            </p>

            <h2>Çerezlerin Yönetimi</h2>
            <p>
              Çerezleri tarayıcınızın ayarlarından dilediğiniz zaman silebilir
              veya engelleyebilirsiniz. Google Chrome, Mozilla Firefox,
              Microsoft Edge ve Safari gibi yaygın tarayıcıların ayarlar
              bölümünden çerez tercihlerinizi yönetebilirsiniz. Zorunlu
              çerezlerin engellenmesi hâlinde sitenin bazı bölümleri gerektiği
              gibi çalışmayabilir.
            </p>

            <h2>İletişim</h2>
            <p>
              Çerez politikamıza ilişkin sorularınız için{" "}
              <Link href="/iletisim/">İletişim</Link> sayfası üzerinden bize
              ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* İşbu metin genel şablondur, yayına almadan önce avukat tarafından gözden geçirilmelidir. */}
    </>
  );
}
