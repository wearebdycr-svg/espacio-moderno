import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#3B2F2F] text-[#F5F2EB]/80 pt-16 pb-12 border-t border-[#4E3E3E]/70 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14 border-b border-[#4E3E3E]/60">
          {/* Col 1: Logo & Social */}
          <div>
            <div className="flex items-center gap-4 select-none">
              <img
                src="/images/monogram-transparent.png"
                alt="Espacio Moderno"
                className="h-12 w-auto object-contain drop-shadow-sm"
              />
              <div className="flex flex-col justify-center leading-[0.98] font-sans">
                <span className="text-lg font-black uppercase text-[#FFFFFF] tracking-wider">
                  ESPACIO
                </span>
                <span className="text-lg font-black uppercase text-[#FFFFFF] tracking-wider mt-0.5">
                  MODERNO
                </span>
              </div>
            </div>

            <p className="mt-4 text-[14px] text-[#F5F2EB]/75 leading-relaxed font-sans">
              Mobiliario contemporáneo sobre medida y acabados arquitectónicos que transforman tus espacios.
            </p>


            {/* Social Icons & WhatsApp */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={getWhatsAppUrl("¡Hola Espacio Moderno! Los contacto desde el pie de página de su web.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4E3E3E] bg-[#342929] text-[#F5F2EB] hover:border-[#B8935A] hover:text-[#B8935A] hover:bg-[#B8935A]/10 transition-all shadow-sm"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current" />
              </a>

              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4E3E3E] bg-[#342929] text-[#F5F2EB] hover:border-[#B8935A] hover:text-[#B8935A] hover:bg-[#B8935A]/10 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Acceso Rápido */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-wider text-[#F5F2EB] mb-4 font-sans">
              Acceso Rápido
            </h4>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link href="#colecciones" className="hover:text-[#B8935A] transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="#proceso" className="hover:text-[#B8935A] transition-colors">
                  Diseño a Medida
                </Link>
              </li>
              <li>
                <Link href="#proceso" className="hover:text-[#B8935A] transition-colors">
                  Materiales
                </Link>
              </li>
              <li>
                <Link href="#colecciones" className="hover:text-[#B8935A] transition-colors">
                  Muebles Activos
                </Link>
              </li>
              <li>
                <Link href="#proyectos" className="hover:text-[#B8935A] transition-colors">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="hover:text-[#B8935A] transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-[#B8935A] transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-[#B8935A] transition-colors">
                  Políticas de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ubicación */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-wider text-[#F5F2EB] mb-4 font-sans">
              Ubicación
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#B8935A] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href={getWhatsAppUrl("¡Hola Espacio Moderno! Quisiera información y cotización.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F5F2EB]/90 hover:text-[#B8935A] transition-colors font-medium group"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 fill-[#B8935A] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono">{siteConfig.phoneDisplay} (WhatsApp)</span>
                </a>
              </li>

              <li className="flex items-center gap-2">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F5F2EB]/90 hover:text-[#B8935A] transition-colors group"
                >
                  <InstagramIcon className="h-3.5 w-3.5 text-[#B8935A] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{siteConfig.instagram}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Visítanos (Google Maps Card) */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-wider text-[#F5F2EB] mb-4 font-sans">
              Visítanos
            </h4>
            <div className="relative overflow-hidden rounded-xl border border-[#4E3E3E] bg-[#342929] h-36 flex flex-col justify-end p-3.5 group">
              {/* Map background illustration */}
              <div className="absolute inset-0 bg-[#2D2323] opacity-80">
                <div className="w-full h-full bg-[radial-gradient(#4E3E3E_1px,transparent_1px)] [background-size:12px_12px]" />
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#F5F2EB] font-medium">
                  <MapPin className="h-3.5 w-3.5 text-[#B8935A]" />
                  <span>Taller & Showroom Itagüí</span>
                </div>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[12px] text-[#B8935A] hover:underline group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Ver mapa</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: 12px Regular per Brand Manual */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#F5F2EB]/60 font-sans pb-16 sm:pb-0 sm:pr-24 relative z-20">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 relative z-30">
            <Link
              href="/privacidad"
              className="hover:text-[#B8935A] transition-colors cursor-pointer py-1"
            >
              Políticas de Privacidad
            </Link>
            <span>|</span>
            <Link
              href="/terminos"
              className="hover:text-[#B8935A] transition-colors cursor-pointer py-1"
            >
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
