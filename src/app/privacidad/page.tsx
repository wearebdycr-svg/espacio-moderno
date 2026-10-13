import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Políticas de Privacidad | Espacio Moderno",
  description:
    "Políticas de privacidad y tratamiento de datos personales conforme a la Ley 1581 de 2012 de Colombia - Espacio Moderno Itagüí, Medellín.",
};

export default function PrivacidadPage() {
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
              Protección de Datos Personales • Ley 1581 de 2012 (Colombia)
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Políticas de Privacidad
            </h1>
            <p className="mt-3 text-sm text-[#F5F2EB]/80 font-sans">
              Espacio Moderno • Itagüí, Medellín y Valle de Aburrá.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-6 sm:p-10 shadow-sm space-y-8 text-[#1A1A1A] font-sans">
            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#B8935A] shrink-0" />
                1. Identificación del Responsable del Tratamiento
              </h2>
              <p className="text-sm text-[#6B635B] leading-relaxed pl-7">
                <strong>ESPACIO MODERNO</strong>, taller de diseño y fabricación de mobiliario contemporáneo sobre medida, con sede operativa en la <strong>Cra. 52 #35 - 46, Itagüí, Antioquia</strong>, atendiendo el Área Metropolitana del Valle de Aburrá (Medellín, Itagüí, Envigado, Sabaneta, Bello, La Estrella) y despachos nacionales. Línea oficial de WhatsApp: <span className="font-semibold text-[#1A1A1A] font-mono">314 297 9756</span>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#B8935A] shrink-0" />
                2. Datos Personales que Recopilamos
              </h2>
              <p className="text-sm text-[#6B635B] leading-relaxed pl-7">
                Recopilamos únicamente los datos proporcionados voluntariamente por los usuarios a través de WhatsApp o llamadas telefónicas:
              </p>
              <ul className="text-sm text-[#6B635B] list-disc pl-11 space-y-1">
                <li>Nombres, apellidos y datos de contacto (número de teléfono y WhatsApp).</li>
                <li>Municipio o ciudad de entrega (Itagüí, Medellín, Envigado, Sabaneta u otras ciudades del país).</li>
                <li>Fotografías de espacios, planos o medidas suministradas libremente para cotizaciones y asesoría en ebanistería.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#B8935A] shrink-0" />
                3. Finalidad del Tratamiento de los Datos
              </h2>
              <p className="text-sm text-[#6B635B] leading-relaxed pl-7">
                La información recibida se utiliza con el fin exclusivo de:
              </p>
              <ul className="text-sm text-[#6B635B] list-disc pl-11 space-y-1">
                <li>Elaborar y remitir cotizaciones personalizadas solicitadas por el cliente.</li>
                <li>Brindar asesoría técnica de diseño y selección de maderas y acabados.</li>
                <li>Coordinar toma de medidas, producción en taller y logística de transporte e instalación.</li>
                <li>Atender solicitudes de soporte y garantía de los productos entregados.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#B8935A] shrink-0" />
                4. Confidencialidad y Seguridad
              </h2>
              <p className="text-sm text-[#6B635B] leading-relaxed pl-7">
                En <strong>ESPACIO MODERNO</strong> no comercializamos, alquilamos ni transferimos sus datos personales a terceras empresas para campañas de mercadeo masivo o fines no relacionados con la prestación de nuestros servicios. Toda información se custodia bajo estándares adecuados de seguridad y reserva.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#B8935A] shrink-0" />
                5. Derechos del Titular (Habeas Data)
              </h2>
              <p className="text-sm text-[#6B635B] leading-relaxed pl-7">
                De acuerdo con la legislación colombiana (Ley 1581 de 2012), usted tiene derecho a conocer, actualizar, rectificar y suprimir sus datos en cualquier momento. Para ejercer estos derechos, puede comunicarse directamente vía WhatsApp al <span className="font-semibold text-[#1A1A1A] font-mono">314 297 9756</span>.
              </p>
            </section>

            {/* Direct Contact Callout */}
            <div className="rounded-xl border border-[#B8935A]/30 bg-[#F5F2EB]/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  ¿Deseas actualizar o consultar tus datos?
                </h3>
                <p className="text-xs text-[#6B635B]">
                  Escríbenos directamente y te daremos respuesta inmediata.
                </p>
              </div>

              <a
                href={getWhatsAppUrl("¡Hola Espacio Moderno! Quisiera hacer una consulta sobre la protección de mis datos personales.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#B8935A] hover:bg-[#A4814E] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all shrink-0"
              >
                <WhatsAppIcon className="h-4 w-4 fill-white" />
                <span>Contactar al 314 297 9756</span>
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
