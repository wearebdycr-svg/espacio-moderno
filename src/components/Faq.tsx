"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-stone-900/40 border-t border-stone-800/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Dudas Frecuentes</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            Preguntas habituales sobre nuestros servicios
          </h2>
          <p className="mt-3 text-stone-400 text-base">
            Todo lo que necesitas saber antes de iniciar tu proyecto.
          </p>
        </div>

        <div className="space-y-4">
          {siteConfig.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-6 text-left font-semibold text-stone-100 hover:text-amber-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-stone-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-amber-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-stone-300 leading-relaxed border-t border-stone-800/50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
