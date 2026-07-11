import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export type ProcessStep = {
  title: string;
  body: ReactNode;
};

/**
 * Süreç adımları: sol dikey ray (rozetlerin yatay merkeziyle hizalı) +
 * numaralı düğümler. Rozet, satırın flex ilk öğesidir; h3 satır yüksekliği
 * (1.35rem × 1.3 ≈ 28px) ile rozetin kendi yüksekliği (36px) arasındaki
 * farkın yarısı kadar (-4px, "-mt-1") yukarı kaydırılarak rozetin optik
 * merkezi başlığın ilk satırının optik merkeziyle hizalanır.
 * Adımlar Reveal ile 70ms kademeli gelir; düğüm hover'da bronz halka alır.
 *
 * `process-steps-list` sınıfı: globals.css'teki `.article-body ol` kuralı
 * (list-decimal + kendi boşluk değerleri) bu bileşene SIZMASIN diye açıkça
 * hariç tutulur — aksi hâlde rozet numarasının yanında tarayıcının kendi
 * liste numarası da görünür (çift numara hatası).
 */
export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="process-steps-list relative m-0 my-8 list-none space-y-10 p-0">
      {/* Dikey ray — dekoratif, rozetlerin yatay merkeziyle hizalı (36px genişlik → merkez 18px) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-[17px] top-5 w-px bg-line-strong"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="group relative flex items-start gap-5">
          <span
            aria-hidden="true"
            className="relative z-10 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-[15px] font-semibold text-white transition-shadow duration-[260ms] group-hover:ring-4 group-hover:ring-bronze-300"
          >
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            <Reveal delay={i * 70}>
              <h3 className="!mt-0 !mb-2">{step.title}</h3>
              <div className="[&>p]:mb-0">{step.body}</div>
            </Reveal>
          </div>
        </li>
      ))}
    </ol>
  );
}
