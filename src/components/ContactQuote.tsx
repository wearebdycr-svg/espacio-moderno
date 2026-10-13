"use client";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Camera, Ruler, Home, Sparkles, ShieldCheck } from "lucide-react";

export function ContactQuote() {
  const quickOptions = [
    {
      icon: Camera,
      title: "Enviar foto o referencia",
      desc: "Mándanos una foto de Pinterest o de tu mueble soñado",
      message: "¡Hola Espacio Moderno! Tengo una foto de referencia y quisiera cotizar la fabricación de este mueble.",
    },
    {
      icon: Ruler,
      title: "Cotizar con medidas",
      desc: "Cuéntanos qué espacio tienes (comedor, sala, closet...)",
      message: "¡Hola Espacio Moderno! Tengo las medidas de mi espacio y quisiera una cotización personalizada.",
    },
    {
      icon: Home,
      title: "Asesoría para mi espacio",
      desc: "Agenda una revisión técnica o virtual para tu hogar",
      message: "¡Hola Espacio Moderno! Me gustaría recibir asesoría personalizada para amoblar mi espacio.",
    },
  ];

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-[#F5F2EB] border-b border-[#E8E2D8]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B8935A]/15 border border-[#B8935A]/30 px-3.5 py-1 text-[12px] font-semibold uppercase tracking-widest text-[#B8935A] font-sans">
            <Sparkles className="h-3.5 w-3.5 text-[#B8935A]" />
            <span>ATENCIÓN DIRECTA</span>
          </span>
          <h2 className="mt-4 text-3xl sm:text-[40px] font-semibold text-[#1A1A1A] tracking-tight font-serif leading-tight">
            Hablemos por WhatsApp
          </h2>
          <p className="mt-3 text-[16px] text-[#6B635B] leading-relaxed max-w-2xl mx-auto font-sans">
            Sin formularios largos ni esperas. Escríbenos directamente y un asesor experto de nuestro taller te atenderá de inmediato.
          </p>
        </div>

        {/* Main WhatsApp Card: Blanco Puro (#FFFFFF) sobre Crema Seda (#F5F2EB) */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E8E0D5] bg-[#FFFFFF] p-8 sm:p-12 lg:p-14 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          {/* Subtle top decorative bar in Bronce Antiguo */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B8935A]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Big Phone & Primary Action */}
            <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-[#B8935A] bg-[#B8935A]/10 border border-[#B8935A]/25 rounded-full px-3.5 py-1.5 w-fit mx-auto lg:mx-0 mb-4 font-sans">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B8935A] animate-pulse" />
                <span>Asesor en línea ahora • Respuesta en minutos</span>
              </div>

              <h3 className="text-2xl sm:text-[28px] font-semibold text-[#1A1A1A] font-serif leading-tight">
                Línea Directa de Cotizaciones
              </h3>

              <p className="mt-2 text-[15px] text-[#6B635B] leading-relaxed font-sans">
                Toca el número o el botón para abrir el chat de inmediato con fotos, planos o dudas:
              </p>

              {/* Big Display Number en Bronce Antiguo (#B8935A) */}
              <a
                href={getWhatsAppUrl("¡Hola Espacio Moderno! Quisiera información y cotización para un mueble a medida.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center lg:justify-start gap-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#B8935A] hover:text-[#A4814E] transition-colors font-mono tracking-tight group"
              >
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#B8935A] text-white shadow-sm group-hover:scale-105 group-hover:bg-[#A4814E] transition-all">
                  <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8 fill-white" />
                </div>
                <span>312 451 8951</span>
              </a>

              {/* Big Action Button en Bronce Antiguo (#B8935A) per Brand Manual */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={getWhatsAppUrl("¡Hola Espacio Moderno! Vi su página web y me gustaría recibir asesoría para cotizar un mueble/proyecto.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#B8935A] px-8 py-4 text-[14px] font-semibold text-white uppercase tracking-wider shadow-sm hover:bg-[#A4814E] hover:scale-[1.01] active:scale-98 transition-all"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-white" />
                  <span>ABRIR CHAT DE WHATSAPP</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-[#E8E2D8] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-[12px] text-[#6B635B] font-sans">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#B8935A]" />
                  <span>Asesoría 100% personalizada</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#B8935A]" />
                  <span>Diseño y fabricación a medida</span>
                </div>
              </div>
            </div>

            {/* Right: 3 Instant Action Starters */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#B8935A] text-center lg:text-left mb-1 font-sans">
                ¿Qué deseas cotizar hoy?
              </span>

              {quickOptions.map((opt, idx) => {
                const Icon = opt.icon;
                return (
                  <a
                    key={idx}
                    href={getWhatsAppUrl(opt.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3.5 rounded-xl border border-[#E8E0D5] bg-[#FFFFFF] p-4 text-left transition-all hover:border-[#B8935A] hover:bg-[#F5F2EB]/50 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#B8935A]/15 text-[#B8935A] group-hover:bg-[#B8935A] group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5 stroke-[1.8]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[14px] font-semibold text-[#1A1A1A] group-hover:text-[#B8935A] transition-colors font-sans">
                        {opt.title}
                      </h4>
                      <p className="text-[12px] text-[#6B635B] mt-0.5 leading-snug font-sans">
                        {opt.desc}
                      </p>
                    </div>
                    <WhatsAppIcon className="h-4 w-4 fill-[#A39990] group-hover:fill-[#B8935A] transition-colors shrink-0 mt-1" />
                  </a>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

