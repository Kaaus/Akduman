import Breadcrumb, { type Crumb } from "@/components/Breadcrumb";

/**
 * Alt sayfaların ORTALANMIŞ başlık bloğu — site geneli kural.
 *
 * Kural: anasayfa hero'su dışındaki tüm sayfalarda breadcrumb + H1 +
 * (varsa) giriş cümlesi merkez hizalıdır. Hizmet sayfalarının koyu
 * bant-hero'ları aynı kuralı kendi zemininde ServiceHero içinde uygular.
 *
 * ÖNEMLİ: yalnızca BAŞLIK bloğu ortalanır. Sayfa gövdesi (paragraflar,
 * listeler, form, kart ızgaraları) sola hizalı kalmalıdır; bu yüzden bu
 * bileşen gövdeyi sarmalamaz, gövdenin ÜSTÜNE konur.
 *
 * Boşluk sistemi (tek kaynak — sayfalar kendi mt-* değerini TEKRAR
 * EKLEMEZ): alt `pb-9` (36px), bu bileşenden sonra gelen ilk içerik
 * bloğuyla aradaki boşluğu KENDİSİ sağlar. Üst boşluk (header→breadcrumb)
 * sayfanın kendi `container-site` sarmalayıcısındaki `pt-8`den gelir
 * (Hakkımızda'nın 1366×768'te tam-fold garantisi için 40px→32px'e
 * sıkılaştırıldı; tek kaynak ilkesi gereği TÜM ortalı başlıklı sayfalara
 * tutarlı yansıması için hepsi güncellendi, yalnız Hakkımızda değil).
 *
 * H1 ölçeği: alt sayfalarda global h1 (clamp(2.6rem,5.5vw,4.2rem))
 * yerine daha küçük clamp(2.1rem,4vw,3.2rem) kullanılır — anasayfa
 * hero'sunun H1'i (Hero.tsx, global kuralı kullanır) buna DAHİL DEĞİLDİR.
 */
export default function PageHeading({
  crumbs,
  title,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  /** Opsiyonel giriş cümlesi — başlıkla birlikte ortalanır. */
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center pb-9 text-center">
      <Breadcrumb items={crumbs} />
      <h1 className="mt-4 text-[clamp(2.1rem,4vw,3.2rem)]">{title}</h1>
      {children && <p className="mt-4">{children}</p>}
    </div>
  );
}
