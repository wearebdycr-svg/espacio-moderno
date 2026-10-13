"use client";

import { useState, useEffect } from "react";
import { X, ShieldCheck, FileText, CheckCircle2, MapPin, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: "privacidad" | "terminos";
  onClose: () => void;
}

export function LegalModal({
  isOpen,
  initialTab = "privacidad",
  onClose,
}: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<"privacidad" | "terminos">(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] rounded-2xl bg-[#FFFFFF] border border-[#E8E2D8] shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header en Café Tabaco (#3B2F2F) */}
        <div className="bg-[#3B2F2F] text-white px-6 py-5 border-b border-[#4E3E3E] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/images/monogram-transparent.png"
              alt="Logo Espacio Moderno"
              className="h-8 w-auto object-contain"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] block font-sans">
                ESPACIO MODERNO
              </span>
              <span className="text-[10px] text-[#B8935A] font-semibold uppercase tracking-widest">
                Itagüí • Medellín • Valle de Aburrá
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#342929] hover:bg-[#4E3E3E] p-2 text-[#F5F2EB]/80 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Buttons Bar */}
        <div className="flex border-b border-[#E8E2D8] bg-[#F5F2EB]/60 p-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("privacidad")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "privacidad"
                ? "bg-[#B8935A] text-white shadow-sm"
                : "bg-white text-[#6B635B] hover:text-[#1A1A1A] hover:bg-white/80 border border-[#E8E2D8]"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Políticas de Privacidad</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("terminos")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "terminos"
                ? "bg-[#B8935A] text-white shadow-sm"
                : "bg-white text-[#6B635B] hover:text-[#1A1A1A] hover:bg-white/80 border border-[#E8E2D8]"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Términos y Condiciones</span>
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-[#1A1A1A] text-sm leading-relaxed">
          {/* TAB 1: POLÍTICAS DE PRIVACIDAD */}
          {activeTab === "privacidad" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#E8E2D8] pb-4">
                <span className="text-[11px] font-bold text-[#B8935A] uppercase tracking-widest">
                  Protección de Datos Personales • Ley 1581 de 2012 (Colombia)
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] mt-1">
                  Política de Tratamiento y Privacidad de la Información
                </h3>
                <p className="text-xs text-[#6B635B] mt-1">
                  Última actualización: Octubre de 2026 • Itagüí, Antioquia, Colombia.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B8935A] shrink-0" />
                  1. Identificación del Responsable del Tratamiento
                </h4>
                <p className="text-xs text-[#6B635B] pl-6">
                  <strong>ESPACIO MODERNO</strong>, taller de diseño y fabricación de mobiliario a medida, con sede operativa en la <strong>Cra. 52 #35 - 46, Itagüí, Antioquia</strong>, atendiendo el Área Metropolitana del Valle de Aburrá (Medellín, Itagüí, Envigado, Sabaneta, Bello, La Estrella) y despachos nacionales. WhatsApp oficial de atención: <span className="font-semibold text-[#1A1A1A] font-mono">314 297 9756</span>.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B8935A] shrink-0" />
                  2. Datos Personales que Recopilamos
                </h4>
                <p className="text-xs text-[#6B635B] pl-6">
                  Recopilamos únicamente la información necesaria suministrada de forma voluntaria por el usuario a través de WhatsApp o llamadas, que incluye:
                </p>
                <ul className="text-xs text-[#6B635B] list-disc pl-11 space-y-1">
                  <li>Nombre completo y datos de contacto (número telefónico y WhatsApp).</li>
                  <li>Municipio o ciudad de entrega (ej. Itagüí, Medellín, Envigado u otras regiones).</li>
                  <li>Fotografías de referencia, planos o medidas del espacio compartidas voluntariamente para fines de cotización y diseño de mobiliario.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B8935A] shrink-0" />
                  3. Finalidad del Tratamiento de los Datos
                </h4>
                <p className="text-xs text-[#6B635B] pl-6">
                  Los datos recolectados se destinan exclusivamente a los siguientes propósitos:
                </p>
                <ul className="text-xs text-[#6B635B] list-disc pl-11 space-y-1">
                  <li>Elaboración y envío de cotizaciones comerciales personalizadas.</li>
                  <li>Asesoría técnica en ebanistería, maderas macizas y acabados arquitectónicos.</li>
                  <li>Coordinación logística para toma de medidas en sitio, entrega e instalación en el domicilio del cliente.</li>
                  <li>Seguimiento de satisfacción y garantía post-entrega.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B8935A] shrink-0" />
                  4. Confidencialidad y No Transferencia a Terceros
                </h4>
                <p className="text-xs text-[#6B635B] pl-6">
                  En <strong>ESPACIO MODERNO</strong> garantizamos que bajo ninguna circunstancia vendemos, alquilamos, comercializamos ni cedemos bases de datos personales a terceras empresas con fines publicitarios o lucrativos. Su información es tratada bajo estrictas medidas de confidencialidad.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B8935A] shrink-0" />
                  5. Derechos del Titular (Habeas Data)
                </h4>
                <p className="text-xs text-[#6B635B] pl-6">
                  Conforme a la Ley 1581 de 2012 de la República de Colombia, usted como titular tiene derecho a conocer, actualizar, rectificar y revocar la autorización o solicitar la eliminación total de sus datos personales de nuestros registros. Puede ejercer este derecho en cualquier momento mediante mensaje a nuestra línea WhatsApp <span className="font-semibold text-[#1A1A1A] font-mono">314 297 9756</span>.
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: TÉRMINOS Y CONDICIONES */}
          {activeTab === "terminos" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#E8E2D8] pb-4">
                <span className="text-[11px] font-bold text-[#B8935A] uppercase tracking-widest">
                  Servicio de Ebanistería y Fabricación Artesanal
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] mt-1">
                  Términos y Condiciones del Servicio
                </h3>
                <p className="text-xs text-[#6B635B] mt-1">
                  Espacio Moderno • Fabricación en Itagüí, cobertura en Medellín y el Valle de Aburrá.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B8935A] shrink-0" />
                  1. Fabricación Artesanal Sobre Medida
                </h4>
                <p className="text-xs text-[#6B635B] pl-6">
                  Cada producto de <strong>ESPACIO MODERNO</strong> se construye bajo pedido y de manera artesanal según las dimensiones, maderas, tapizados y acabados aprobados por el cliente. No trabajamos con inventario masivo industrial, lo que garantiza exclusividad y atención a cada detalle de ebanistería.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B8935A] shrink-0" />
                  2. Características Naturales de las Maderas Macizas
                </h4>
                <p className="text-xs text-[#6B635B] pl-6">
                  Utilizamos maderas seleccionadas (roble, cedro, teca, flor morado, entre otras). Al ser la madera un material orgánico y vivo, cada pieza presenta variaciones naturales en su veta, grano, textura y tonalidad. Estas marcas naturales certifican la autenticidad de la madera maciza y no constituyen defectos de fabricación.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B8935A] shrink-0" />
                  3. Cotizaciones y Esquema de Pagos
                </h4>
                <ul className="text-xs text-[#6B635B] list-disc pl-11 space-y-1">
                  <li><strong>Validez:</strong> Las cotizaciones tienen una validez de 15 a 30 días calendario debido a variaciones en el costo de materias primas.</li>
                  <li><strong>Anticipo:</strong> La orden de fabricación se formaliza con un anticipo acordado (habitualmente el 50% del valor total) para la adquisición de maderas e insumos.</li>
                  <li><strong>Saldo:</strong> El 50% restante se cancela contra entrega e instalación conforme del mobiliario en el espacio del cliente.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B8935A] shrink-0" />
                  4. Entrega, Instalación y Accesos
                </h4>
                <p className="text-xs text-[#6B635B] pl-6">
                  Coordinamos entregas directas e instalación en <strong>Itagüí, Medellín, Envigado, Sabaneta, Bello y todo el Valle de Aburrá</strong>. El cliente es responsable de verificar previamente que las medidas de las puertas, escaleras, pasillos o ascensores de su inmueble permitan el paso del mobiliario. Para envíos a otras ciudades de Colombia, se coordina mediante empresas de transporte de carga con embalaje de alta protección.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B8935A] shrink-0" />
                  5. Garantía Estructural
                </h4>
                <p className="text-xs text-[#6B635B] pl-6">
                  Ofrecemos <strong>garantía de 1 a 2 años</strong> sobre la estabilidad estructural, ensamble de carpintería y herrajes principales instalados. La garantía cubre fallas atribuibles a la fabricación o materiales defectuosos. No cubre desgastes por uso habitual, daños por derrames de químicos agresivos, exposición a humedad por filtraciones del inmueble o exposición prolongada a la intemperie en piezas de interiores.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer with Direct Contact Button */}
        <div className="bg-[#F5F2EB] border-t border-[#E8E2D8] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#6B635B]">
            <MapPin className="h-4 w-4 text-[#B8935A] shrink-0" />
            <span>Itagüí, Antioquia • Valle de Aburrá</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={getWhatsAppUrl("¡Hola Espacio Moderno! Tengo una consulta sobre sus políticas o términos de garantía.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#B8935A] hover:bg-[#A4814E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors flex-1 sm:flex-initial"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 fill-white" />
              <span>Consultar por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#E8E2D8] bg-white px-4 py-2 text-xs font-semibold text-[#1A1A1A] hover:bg-[#F5F2EB] transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
