"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/site";

/**
 * SSS akordeonu v2: yükseklik animasyonlu (grid-template-rows, 280ms),
 * "+" ikonu açıkken 45° döner, satır hover'ında soru ink-strong olur.
 * Erişilebilirlik: buton + aria-expanded + aria-controls; kapalı panel
 * görünmez VE odaklanılamaz (visibility gecikmesi globals.css'te).
 */
export default function FaqAccordion({
  items,
  idPrefix,
}: {
  items: FaqItem[];
  idPrefix?: string;
}) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  // idPrefix verilmezse React useId ile çakışmasız benzersiz önek üretilir.
  const autoId = useId();
  const prefix = idPrefix ?? `faq${autoId}`;

  function toggle(index: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `${prefix}-panel-${i}`;
        const buttonId = `${prefix}-button-${i}`;
        return (
          <div key={`${prefix}-${i}`} className="border-b border-line-strong">
            <h3 className="!m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-sans text-[17px] font-semibold text-ink transition-colors duration-200 hover:text-ink-strong"
              >
                {item.question}
                <Plus
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={`shrink-0 text-navy-800 transition-transform duration-[280ms] ease-[cubic-bezier(.22,1,.36,1)] ${
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
                <p className="pb-6 pr-10 text-ink">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
