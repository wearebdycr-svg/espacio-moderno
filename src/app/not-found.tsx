import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#3B2F2F] text-[#F5F2EB] flex flex-col items-center justify-center px-4 py-16 text-center font-sans">
      <div className="max-w-lg w-full rounded-2xl border border-[#4E3E3E] bg-[#342929] p-8 sm:p-12 shadow-2xl">
        {/* Brand Monogram */}
        <div className="mx-auto mb-6 flex justify-center">
          <img
            src="/images/monogram-transparent.png"
            alt="Espacio Moderno"
            className="h-16 w-auto object-contain"
          />
        </div>

        <span className="inline-block rounded-full bg-[#B8935A]/15 border border-[#B8935A]/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#B8935A]">
          Error 404 • Espacio No Encontrado
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-[#F5F2EB] font-serif leading-tight">
          Esta página no hace parte de nuestro catálogo
        </h1>

        <p className="mt-3 text-sm sm:text-[15px] text-[#F5F2EB]/75 leading-relaxed">
          Es posible que el enlace haya cambiado o que la dirección no exista. Regresa al inicio para explorar nuestras colecciones o escríbenos directo por WhatsApp.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#B8935A] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#A4814E] transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ir al Catálogo</span>
          </Link>

          <a
            href={getWhatsAppUrl("¡Hola Espacio Moderno! Estaba navegando en su web y me gustaría recibir asesoría.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#B8935A] bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#F5F2EB] hover:bg-[#B8935A]/15 transition-all"
          >
            <WhatsAppIcon className="h-4 w-4 fill-[#B8935A]" />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}
