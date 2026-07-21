import PageHeading from "@/components/PageHeading";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

/*
 * İşbu metin genel şablondur; yayına almadan önce avukat tarafından
 * gözden geçirilmelidir.
 */

export const metadata = buildMetadata({
  title: "KVKK Aydınlatma Metni | Akduman Hukuk Bürosu",
  description:
    "Akduman Hukuk Bürosu kişisel verilerin korunması aydınlatma metni: işlenen veriler, işleme amaçları ve KVKK kapsamındaki haklarınız.",
  path: "/kvkk-aydinlatma-metni/",
});

export default function KvkkAydinlatmaMetniPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "KVKK Aydınlatma Metni", path: "/kvkk-aydinlatma-metni/" },
        ])}
      />

      <section className="bg-white">
        <div className="container-site max-w-4xl py-12 md:py-16">
          <PageHeading
            crumbs={[{ label: "KVKK Aydınlatma Metni" }]}
            title="KVKK Aydınlatma Metni"
          />

          <div className="article-body mt-8">
            <p>
              Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması
              Kanunu (&ldquo;KVKK&rdquo;) uyarınca, {SITE.name} internet sitesi
              üzerinden iletilen kişisel verilerin işlenmesine ilişkin olarak
              ilgili kişileri bilgilendirmek amacıyla hazırlanmıştır.
            </p>

            <h2>Veri Sorumlusu</h2>
            <p>
              KVKK kapsamında veri sorumlusu, {SITE.name} — {SITE.lawyer}
              &rsquo;dır. Büromuzun adresi: {SITE.address.full}. Kişisel
              verileriniz, bu metinde açıklanan kapsam ve amaçlarla veri
              sorumlusu tarafından işlenmektedir.
            </p>

            <h2>İşlenen Kişisel Veriler</h2>
            <p>
              İnternet sitemizdeki iletişim formu aracılığıyla tarafımıza
              ilettiğiniz aşağıdaki kişisel veriler işlenmektedir:
            </p>
            <ul>
              <li>Ad ve soyad</li>
              <li>E-posta adresi</li>
              <li>Telefon numarası</li>
              <li>Mesaj içeriği</li>
            </ul>

            <h2>Kişisel Verilerin İşlenme Amaçları</h2>
            <p>
              Kişisel verileriniz; iletişim talebinizin yanıtlanması, gerekli
              hâllerde randevu planlamasının yapılması ve mevzuattan doğan
              yükümlülüklerin yerine getirilmesi amaçlarıyla sınırlı olarak
              işlenmektedir. Verileriniz bu amaçlar dışında kullanılmamaktadır.
            </p>

            <h2>İşlemenin Hukuki Sebebi</h2>
            <p>
              Kişisel verileriniz; KVKK m.5/2-c (sözleşmenin kurulması veya
              ifası), m.5/2-e (bir hakkın tesisi, kullanılması veya korunması)
              ve bu sebeplerin bulunmadığı hâllerde m.5/1 (açık rıza) hukuki
              sebeplerine dayanılarak işlenmektedir. Hangi hukuki sebebin
              uygulanacağı, talebinizin niteliğine göre belirlenmektedir.
            </p>

            <h2>Kişisel Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz, yasal zorunluluk hâlleri dışında üçüncü
              kişilere aktarılmamaktadır. Sitenin barındırma (hosting) hizmet
              sağlayıcısı, hizmetin sunulabilmesi için teknik gereklilik
              ölçüsünde verilere erişebilmektedir. Yetkili kamu kurum ve
              kuruluşlarının mevzuata dayalı talepleri saklıdır.
            </p>

            <h2>Saklama Süresi</h2>
            <p>
              Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve
              ilgili mevzuatta öngörülen zamanaşımı süreleri dikkate alınarak
              saklanmaktadır. Bu sürelerin sona ermesi hâlinde verileriniz
              silinmekte, yok edilmekte veya anonim hâle getirilmektedir.
            </p>

            <h2>KVKK m.11 Kapsamındaki Haklarınız</h2>
            <p>
              KVKK m.11 uyarınca, veri sorumlusuna başvurarak aşağıdaki
              haklarınızı kullanabilirsiniz:
            </p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>
                Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,
              </li>
              <li>
                Kişisel verilerinizin işlenme amacını ve amacına uygun
                kullanılıp kullanılmadığını öğrenme,
              </li>
              <li>
                Kişisel verilerinizin yurt içinde veya yurt dışında aktarıldığı
                üçüncü kişileri bilme,
              </li>
              <li>
                Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde
                düzeltilmesini isteme,
              </li>
              <li>
                KVKK&rsquo;da öngörülen şartlar çerçevesinde kişisel
                verilerinizin silinmesini veya yok edilmesini isteme,
              </li>
              <li>
                Düzeltme, silme ve yok etme işlemlerinin, verilerin aktarıldığı
                üçüncü kişilere bildirilmesini isteme,
              </li>
              <li>
                İşlenen verilerin münhasıran otomatik sistemler aracılığıyla
                analiz edilmesi suretiyle aleyhinize bir sonucun ortaya
                çıkmasına itiraz etme,
              </li>
              <li>
                Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle
                zarara uğramanız hâlinde zararın giderilmesini talep etme.
              </li>
            </ul>

            <h2>Başvuru Yolu</h2>
            <p>
              KVKK m.11 kapsamındaki taleplerinizi,{" "}
              <a href={SITE.mailHref}>{SITE.email}</a> adresine e-posta ile
              veya büromuzun yukarıda belirtilen posta adresine yazılı olarak
              iletebilirsiniz. Başvurularınız, mevzuatta öngörülen süre içinde
              sonuçlandırılmaktadır.
            </p>
          </div>
        </div>
      </section>

      {/* İşbu metin genel şablondur, yayına almadan önce avukat tarafından gözden geçirilmelidir. */}
    </>
  );
}
