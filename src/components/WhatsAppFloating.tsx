"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="relative pointer-events-auto flex items-center gap-3 rounded-2xl bg-[#3B2F2F] border border-[#B8935A]/50 p-3.5 shadow-2xl text-xs text-[#F5F2EB] max-w-xs transition-all animate-bounce">
          <a
            href={getWhatsAppUrl("¡Hola Espacio Moderno! Quisiera recibir información y cotizar un proyecto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8935A] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B8935A]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-medium text-[#B8935A] uppercase tracking-wider">
                Asesor en línea ahora
              </span>
              <span className="font-bold text-white text-sm font-mono mt-0.5">
                312 451 8951
              </span>
              <span className="text-[11px] text-[#F5F2EB]/70 group-hover:text-[#B8935A] transition-colors">
                Toca aquí para chatear ➔
              </span>
            </div>
          </a>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[#F5F2EB]/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shrink-0 self-start"
            aria-label="Cerrar mensaje"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button with Ping Animation en Bronce Antiguo (#B8935A) */}
      <a
        href={getWhatsAppUrl("¡Hola Espacio Moderno! Quisiera recibir asesoría y cotizar por WhatsApp.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp al 312 451 8951"
        className="group relative pointer-events-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#B8935A] text-white shadow-xl shadow-[#B8935A]/30 hover:bg-[#A4814E] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#B8935A]/40 animate-ping opacity-75" />
        
        <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8 fill-white text-white drop-shadow" />
      </a>

    </div>
  );
}
