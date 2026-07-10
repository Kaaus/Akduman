import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export type ProcessStep = {
  title: string;
  body: ReactNode;
};

/**
 * Süreç adımları: sol dikey çizgi + numaralı düğümler.
 * Adımlar Reveal ile 70ms kademeli gelir; düğüm hover'da bronz halka alır.
 * (Süreç numaraları bağlamsal olduğundan serbesttir — dekoratif 01–08
 * numaralandırmasıyla karıştırılmamalı.)
 */
export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative my-8 ml-4 list-none space-y-10 border-l-2 border-line-strong pl-9">
      {steps.map((step, i) => (
        <li key={step.title} className="group relative">
          <span
            aria-hidden="true"
            className="absolute -left-[54px] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 font-serif text-[15px] font-semibold text-white transition-shadow duration-[260ms] group-hover:ring-4 group-hover:ring-bronze-300"
          >
            {i + 1}
          </span>
          <Reveal delay={i * 70}>
            <h3 className="!mt-0 !mb-2">{step.title}</h3>
            <div className="[&>p]:mb-0">{step.body}</div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
