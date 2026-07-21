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
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <Breadcrumb items={crumbs} />
      <h1 className="mt-6">{title}</h1>
      {children && <p className="mt-5">{children}</p>}
    </div>
  );
}
