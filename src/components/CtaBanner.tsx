import { Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function CtaBanner() {
  return (
    <section className="py-24 bg-stone-950 relative overflow-hidden border-t border-stone-800">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-emerald-500/10 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl border border-stone-800 bg-gradient-to-b from-stone-900/90 to-stone-900/40 p-10 sm:p-16 shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-semibold text-amber-300 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Da el primer paso hoy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-stone-100 tracking-tight leading-tight">
            ¿Listo para transformar tu espacio con un diseño a tu medida?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-300 max-w-2xl mx-auto">
            Escríbenos directamente a WhatsApp. Evaluamos tu espacio, compartimos ideas y preparamos una propuesta sin costo inicial.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={getWhatsAppUrl("¡Hola Espacio Moderno! Quisiera solicitar una cotización para un nuevo proyecto.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-950/50 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all"
            >
              <WhatsAppIcon className="h-5 w-5 fill-white text-white" />
              <span>Chatear con un Asesor en WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
