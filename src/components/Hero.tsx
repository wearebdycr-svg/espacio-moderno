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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-lg bg-[#B8935A] px-7 sm:px-9 py-3 sm:py-4 text-white shadow-sm hover:bg-[#A4814E] hover:scale-[1.02] active:scale-98 transition-all duration-300"
          >
            <WhatsAppIcon className="h-5 w-5 fill-white shrink-0" />
            <div className="flex flex-col items-center text-center leading-tight">
              <span className="text-[13px] sm:text-[14px] font-semibold tracking-wider uppercase">INICIAR MI PROYECTO</span>
              <span className="text-[12px] font-mono whitespace-nowrap text-white/95 font-medium tracking-normal mt-0.5">314 297 9756</span>
            </div>
          </a>

          <a
            href="#colecciones"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[#3B2F2F]/50 backdrop-blur-sm px-6 sm:px-8 py-3.5 sm:py-4 text-[13px] sm:text-[14px] font-semibold tracking-wider uppercase text-[#F5F2EB] hover:bg-[#3B2F2F]/80 transition-all border border-[#F5F2EB]/30"
          >
            VER CATÁLOGO
          </a>
        </div>

        {/* Live status badge */}
        <div className="mt-6 inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-2xl sm:rounded-full bg-[#3B2F2F]/75 backdrop-blur-sm border border-[#F5F2EB]/15 px-4 py-2 sm:py-1.5 text-[12px] text-[#F5F2EB] max-w-full text-center">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#B8935A] animate-pulse shrink-0" />
            <span>Atención en línea vía WhatsApp:</span>
          </div>
          <strong className="text-white font-mono whitespace-nowrap">314 297 9756</strong>
        </div>

      </div>
    </section>
  );
}

