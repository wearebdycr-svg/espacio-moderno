import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Términos y Condiciones | Espacio Moderno",
  description:
    "Términos y condiciones de fabricación de mobiliario a medida, garantías y entregas en Itagüí, Medellín y Valle de Aburrá.",
};

export default function TerminosPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Header Hero */}
        <div className="bg-[#3B2F2F] text-white py-14 sm:py-16 border-b border-[#4E3E3E]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8935A] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Regresar a la página principal</span>
            </Link>

            <span className="block text-xs font-bold uppercase tracking-widest text-[#B8935A]">
              Servicio de Ebanistería y Fabricación Artesanal
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Términos y Condiciones
            </h1>
            <p className="mt-3 text-sm text-[#F5F2EB]/80 font-sans">
              Espacio Moderno • Fabricación en Itagüí, cobertura en Medellín y el Valle de Aburrá.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-6 sm:p-10 shadow-sm space-y-8 text-[#1A1A1A] font-sans">
            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#B8935A] shrink-0" />
                1. Objeto del Servicio y Fabricación Artesanal
              </h2>
              <p className="text-sm text-[#6B635B] leading-relaxed pl-7">
                <strong>ESPACIO MODERNO</strong> presta servicios de ebanistería sobre diseño, carpintería arquitectónica y fabricación de mobiliario a medida de alta gama. Cada pieza se fabrica bajo pedido exclusivo del cliente, según dimensiones, maderas, tapizados y especificaciones acordadas. No comercializamos inventario masivo industrial, lo que garantiza exclusividad y rigor artesanal en cada detalle.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#B8935A] shrink-0" />
                2. Características Naturales de las Maderas Macizas
              </h2>
              <p className="text-sm text-[#6B635B] leading-relaxed pl-7">
                Trabajamos con maderas nobles seleccionadas (roble, cedro, teca, fresno, flor morado, entre otras) y tableros con enchapados naturales. Al ser la madera un material orgánico y vivo, cada pieza presenta variaciones naturales en su veta, textura, nudos y tonalidad. Estas marcas son testimonio de autenticidad de la madera maciza y no se consideran defectos de fabricación.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#B8935A] shrink-0" />
                3. Cotizaciones, Precios y Esquema de Pagos
              </h2>
              <div className="text-sm text-[#6B635B] leading-relaxed pl-7 space-y-2">
                <p>
                  • <strong>Vigencia:</strong> Las cotizaciones formales tienen una validez de 15 a 30 días calendario debido a fluctuaciones en el costo de maderas, herrajes e insumos de importación.
                </p>
                <p>
                  • <strong>Anticipo:</strong> La orden de fabricación se activa una vez aprobado el diseño y recibido el anticipo acordado (habitualmente el 50% del valor total) para la adquisición de materiales y asignación en banco de taller.
                </p>
                <p>
                  • <strong>Saldo:</strong> El 50% restante se cancela contra entrega e instalación conforme del mobiliario en el domicilio del cliente.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#B8935A] shrink-0" />
                4. Entregas, Instalación y Validación de Accesos
              </h2>
              <p className="text-sm text-[#6B635B] leading-relaxed pl-7">
                Coordinamos entregas directas e instalación en <strong>Itagüí, Medellín, Envigado, Sabaneta, Bello y todo el Valle de Aburrá</strong>. Es responsabilidad del cliente verificar con antelación que las medidas de puertas, escaleras, pasillos o ascensores de su inmueble permitan el paso del mobiliario ensamblado. Para despachos nacionales fuera de Antioquia, se coordina mediante empresas de transporte de carga con embalaje de alta protección.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#B8935A] shrink-0" />
                5. Garantía de Estructura y Acabados
              </h2>
              <p className="text-sm text-[#6B635B] leading-relaxed pl-7">
                Otorgamos <strong>garantía de 1 a 2 años</strong> sobre la estabilidad estructural, ensambles de ebanistería y herrajes principales instalados. La garantía cubre fallas imputables a la manufactura. Quedan excluidos desgastes normales por uso habitual, daños por agentes químicos corrosivos, humedad por filtraciones del inmueble o exposición al sol en mobiliario diseñado para interiores.
              </p>
            </section>

            {/* Direct Contact Callout */}
            <div className="rounded-xl border border-[#B8935A]/30 bg-[#F5F2EB]/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  ¿Tienes dudas sobre los términos o garantías?
                </h3>
                <p className="text-xs text-[#6B635B]">
                  Un asesor te atenderá directamente por WhatsApp para aclarar cualquier inquietud.
                </p>
              </div>

              <a
                href={getWhatsAppUrl("¡Hola Espacio Moderno! Tengo una consulta sobre los términos de garantía de sus muebles.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#B8935A] hover:bg-[#A4814E] px-5 py-3 text-white shadow-sm transition-all shrink-0"
              >
                <WhatsAppIcon className="h-4 w-4 fill-white shrink-0" />
                <div className="flex flex-col items-center leading-tight">
                  <span className="text-xs font-bold uppercase tracking-wider">Consultar por WhatsApp</span>
                  <span className="text-[11px] font-mono whitespace-nowrap text-white/95 mt-0.5">314 297 9756</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloating />
    </>
  );
}
