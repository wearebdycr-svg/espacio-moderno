import { ExternalLink } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const sampleProjects = [
  {
    title: "Cocina Minimalista & Isla Central",
    category: "Muebles a Medida",
    description: "Acabados en cuarzo calacatta, frentes sin tiradores en tono grafito y herrajes Blum de cierre lento.",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
    inquiryMsg: "Hola! Vi el proyecto de 'Cocina Minimalista' en la web y me gustaría cotizar algo similar.",
  },
  {
    title: "Renovación Apartamento Loft",
    category: "Diseño & Remodelación",
    description: "Integración de espacios abiertos, iluminación cálida sectorizada y piso en madera estructurada.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    inquiryMsg: "Hola! Me encantó el proyecto 'Loft Abierto' y quiero una remodelación integral.",
  },
  {
    title: "Dressing Room & Walk-in Closet",
    category: "Mobiliario Premium",
    description: "Módulos iluminados con perfiles LED ocultos, vidrios templados y optimización ergonómica de almacenaje.",
    imageUrl: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80",
    inquiryMsg: "Hola! Quiero cotizar un Walk-in Closet a medida similar al que vi en la web.",
  },
  {
    title: "Sala de Juntas & Espacio Coworking",
    category: "Corporativo",
    description: "Mesa principal en roble macizo con conectividad integrada y paneles acústicos fonoabsorbentes.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    inquiryMsg: "Hola! Quiero cotizar mobiliario para oficinas / salas de reuniones.",
  },
];

export function Portfolio() {
  return (
    <section id="portafolio" className="py-24 bg-stone-900/30 border-t border-stone-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Inspiración Real
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              Proyectos recientes & Acabados
            </h2>
            <p className="mt-3 text-stone-400 max-w-xl text-base">
              Una muestra de la calidad, materiales y dedicación que entregamos en cada entrega.
            </p>
          </div>
          <p className="mt-4 md:mt-0 text-xs text-stone-400 font-mono">
            *Imágenes de referencia de estilo mientras agregamos tus fotos reales
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sampleProjects.map((project, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-stone-800 bg-stone-900/60 transition-all duration-300 hover:border-amber-500/40"
            >
              {/* Image Aspect Box */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-950">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-700/60 px-3.5 py-1 text-xs font-medium text-amber-300">
                  {project.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-stone-400 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-800">
                  <a
                    href={getWhatsAppUrl(project.inquiryMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-emerald-400" />
                    <span>Cotizar algo similar</span>
                  </a>
                  <span className="text-xs text-stone-400">Ver detalles</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
