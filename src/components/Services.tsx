import { Sparkles, Armchair, Box, Hammer, Building2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const iconMap = {
  muebles: Armchair,
  interiores: Box,
  remodelacion: Hammer,
  corporativo: Building2,
};

export function Services() {
  return (
    <section id="servicios" className="py-24 lg:py-32 bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Nuestras Especialidades</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            Soluciones integrales de diseño y fabricación
          </h2>
          <p className="mt-4 text-stone-400 text-base sm:text-lg">
            Combinamos técnica constructiva, materiales seleccionados y estética moderna para transformar cada rincón.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.services.map((service) => {
            const Icon = iconMap[service.id as keyof typeof iconMap] || Armchair;
            return (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-b from-stone-900/70 to-stone-900/30 p-8 sm:p-10 hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/20 flex flex-col justify-between"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-800/80 border border-stone-700/60 text-amber-400 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-stone-700/80 bg-stone-800/40 px-3.5 py-1 text-xs font-medium text-stone-300">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-400">
                    Asesoría personalizada
                  </span>
                  <a
                    href={getWhatsAppUrl(service.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 group-hover:translate-x-1 transition-all"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-emerald-400" />
                    <span>Cotizar este servicio</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
