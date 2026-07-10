"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { FaqItem } from "@/lib/site";

/**
 * SSS akordeonu: yalnızca alt 1px line çizgili satırlar (kart/kutu yok).
 * Soru: Source Sans 600, navy-800 · ikon: bronz artı/eksi · cevap: ink.
 * Erişilebilirlik: buton + aria-expanded + aria-controls.
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
          <div key={`${prefix}-${i}`} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-sans text-[17px] font-semibold text-navy-800 transition-colors hover:text-bronze-600"
              >
                {item.question}
                {isOpen ? (
                  <Minus size={18} strokeWidth={1.5} className="shrink-0 text-bronze-500" aria-hidden="true" />
                ) : (
                  <Plus size={18} strokeWidth={1.5} className="shrink-0 text-bronze-500" aria-hidden="true" />
                )}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pr-8 text-ink"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
