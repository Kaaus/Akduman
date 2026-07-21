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
 * EKLEMEZ): alt `pb-12` (48px), bu bileşenden sonra gelen ilk içerik
 * bloğuyla aradaki boşluğu KENDİSİ sağlar. Üst boşluk (header→breadcrumb)
 * sayfanın kendi `container-site` sarmalayıcısındaki `pt-10`tan gelir.
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
    <div className="mx-auto flex max-w-3xl flex-col items-center pb-12 text-center">
      <Breadcrumb items={crumbs} />
      <h1 className="mt-4">{title}</h1>
      {children && <p className="mt-4">{children}</p>}
    </div>
  );
}
