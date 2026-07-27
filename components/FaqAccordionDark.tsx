"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/site";

/**
 * İletişim SSS split-akordeon — koyu zemin (kitaplik.jpg + navy scrim)
 * sağ sütunu. Işık zeminli FaqAccordion'dan İKİ davranış farkıyla ayrılır:
 * TEK soru açık kalır (biri açılınca öbürü kapanır) ve ilk soru varsayılan
 * AÇIKTIR. Yükseklik animasyonu aynı .acc-panel (grid-template-rows)
 * tekniği — reduced-motion'da globals.css'teki genel kural
 * (`* { transition: none }`) ile otomatik anlık geçişe döner, akordeon
 * işlevi (aç/kapa) etkilenmez.
 */
export default function FaqAccordionDark({
  items,
  idPrefix,
}: {
  items: FaqItem[];
  idPrefix?: string;
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const autoId = useId();
  const prefix = idPrefix ?? `faqdark${autoId}`;

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `${prefix}-panel-${i}`;
        const buttonId = `${prefix}-button-${i}`;
        return (
          <div
            key={`${prefix}-${i}`}
            className="border-b"
            style={{ borderColor: "rgb(241 243 236 / .16)" }}
          >
            <h3 className="!m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-[20px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-300"
                style={{ color: isOpen ? "#F4F1EA" : "rgb(226 230 223)" }}
              >
                {item.question}
                <Plus
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={`shrink-0 text-bronze-500 transition-transform duration-[280ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="acc-panel"
              data-open={isOpen}
            >
              <div>
                <p
                  className="ml-0.5 border-l-[3px] border-bronze-500 py-0.5 pb-6 pl-4 pr-10 text-[15px] leading-relaxed"
                  style={{ color: "rgb(226 230 223 / .9)" }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
