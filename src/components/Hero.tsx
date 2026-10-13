import { getWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Hero() {
  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Café Tabaco Overlay (#3B2F2F) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
          alt="Espacio Moderno - Mobiliario y Arquitectura"
          className="h-full w-full object-cover object-center filter brightness-[0.70] contrast-[1.05]"
        />
        {/* Café Tabaco (#3B2F2F) overlay per brand manual */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B2F2F]/80 via-[#3B2F2F]/45 to-[#3B2F2F]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Main Title: H1 Playfair Display 56px-64px Bold per Brand Manual */}
        <h1 className="text-4xl sm:text-[56px] lg:text-[64px] font-bold uppercase tracking-wider text-[#F5F2EB] leading-[1.12] font-serif drop-shadow-sm">
          CREA EL ESPACIO
          <br />
          DE TUS SUEÑOS
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-lg sm:text-xl text-[#F5F2EB]/90 font-normal tracking-wide italic font-serif">
          Tu hogar, en manos expertas
        </p>

        {/* Primary CTA Buttons per Brand Manual: Bronce Antiguo #B8935A, 14px Semi-Bold, rounded-lg */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            href={getWhatsAppUrl("¡Hola Espacio Moderno! Quiero iniciar el diseño personalizado de mi espacio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#B8935A] px-7 sm:px-9 py-4 text-[14px] font-semibold tracking-wider uppercase text-white shadow-sm hover:bg-[#A4814E] hover:scale-[1.02] active:scale-98 transition-all duration-300"
          >
            <WhatsAppIcon className="h-4 w-4 fill-white" />
            <span>INICIAR MI PROYECTO (312 451 8951)</span>
          </a>

          <a
            href="#colecciones"
            className="inline-flex items-center justify-center rounded-lg bg-[#3B2F2F]/50 backdrop-blur-sm px-6 sm:px-8 py-4 text-[14px] font-semibold tracking-wider uppercase text-[#F5F2EB] hover:bg-[#3B2F2F]/80 transition-all border border-[#F5F2EB]/30"
          >
            VER CATÁLOGO
          </a>
        </div>

        {/* Live status badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3B2F2F]/70 backdrop-blur-sm border border-[#F5F2EB]/15 px-4 py-1.5 text-[12px] text-[#F5F2EB]">
          <span className="h-2 w-2 rounded-full bg-[#B8935A] animate-pulse" />
          <span>Atención en línea vía WhatsApp: <strong className="text-white font-mono">312 451 8951</strong></span>
        </div>

      </div>
    </section>
  );
}

