"use client";

import { useState, useEffect } from "react";
import { Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getStoredProjects,
  getStoredTestimonials,
  RealProjectItem,
  TestimonialItem,
} from "@/lib/storage";
import { getCloudProjects, getCloudTestimonials } from "@/lib/cloudService";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Testimonials() {
  const [projects, setProjects] = useState<RealProjectItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  // Modal State for Real Projects Gallery
  const [selectedProject, setSelectedProject] = useState<RealProjectItem | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const MAX_PROJECTS = 4; // Limited to only 4 images as requested
  const MAX_TESTIMONIALS = 8;

  useEffect(() => {
    // Initial local cache load, then sync with cloud
    setProjects(getStoredProjects());
    setTestimonials(getStoredTestimonials());

    getCloudProjects().then((data) => setProjects(data));
    getCloudTestimonials().then((data) => setTestimonials(data));

    const handleStorageUpdate = () => {
      setProjects(getStoredProjects());
      setTestimonials(getStoredTestimonials());
    };
    window.addEventListener("storage_updated", handleStorageUpdate);
    return () => window.removeEventListener("storage_updated", handleStorageUpdate);
  }, []);

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, MAX_PROJECTS);

  const displayedTestimonials = showAllTestimonials
    ? testimonials
    : testimonials.slice(0, MAX_TESTIMONIALS);

  const currentModalProject =
    projects[activeProjectIndex] || selectedProject;

  const handleOpenProject = (proj: RealProjectItem) => {
    setSelectedProject(proj);
    const idx = projects.findIndex((p) => p.id === proj.id);
    setActiveProjectIndex(idx >= 0 ? idx : 0);
  };

  const handlePrevProject = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (projects.length <= 1) return;
    setActiveProjectIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNextProject = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (projects.length <= 1) return;
    setActiveProjectIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
      if (e.key === "ArrowLeft") handlePrevProject();
      if (e.key === "ArrowRight") handleNextProject();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject, projects.length]);

  return (
    <section id="proyectos" className="py-20 lg:py-28 bg-[#3B2F2F] border-b border-[#4E3E3E]/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[12px] font-semibold uppercase tracking-widest text-[#B8935A] font-sans">
            — TESTIMONIOS —
          </span>
          <h2 className="mt-3 text-3xl sm:text-[40px] font-semibold text-[#F5F2EB] tracking-tight font-serif leading-tight">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="mt-3 text-[16px] text-[#F5F2EB]/80 leading-relaxed font-sans">
            Más de 300 familias han confiado en nosotros para transformar su hogar.
          </p>
        </div>

        {/* Dynamic Testimonials Cards: Blanco Puro (#FFFFFF) sobre Café Tabaco (#3B2F2F) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {displayedTestimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between rounded-xl bg-[#FFFFFF] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#E8E0D5] transition-transform hover:-translate-y-1 duration-300"
            >
              <div>
                {/* 5 Stars en Bronce Antiguo (#B8935A) per brand manual */}
                <div className="flex items-center gap-1 text-[#B8935A] mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                {/* Quote: Gris Carbón Oscuro (#1A1A1A) */}
                <p className="text-[14px] sm:text-[15px] text-[#1A1A1A]/85 leading-relaxed italic font-sans">
                  "{t.quote}"
                </p>
              </div>

              {/* User Bio */}
              <div className="mt-6 pt-5 border-t border-[#F2ECE4] flex items-center gap-3">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover border border-[#D8C6B0]"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-[#B8935A] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {t.name
                      ? t.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")
                      : "EM"}
                  </div>
                )}
                <div>
                  <h4 className="text-[15px] font-semibold text-[#1A1A1A] font-serif">
                    {t.name}
                  </h4>
                  <span className="text-[12px] text-[#6B635B] font-normal font-sans">
                    {t.city}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle if more than 8 testimonials */}
        {testimonials.length > MAX_TESTIMONIALS && (
          <div className="flex justify-center -mt-8 mb-16">
            <button
              type="button"
              onClick={() => setShowAllTestimonials(!showAllTestimonials)}
              className="inline-flex items-center gap-2 rounded-md border border-[#B8935A] bg-transparent px-6 py-2.5 text-[14px] font-semibold uppercase tracking-wider text-[#F5F2EB] hover:bg-[#B8935A] hover:text-white transition-all shadow-sm"
            >
              <span>
                {showAllTestimonials
                  ? "Mostrar menos"
                  : `Ver más testimonios (+${testimonials.length - MAX_TESTIMONIALS})`}
              </span>
            </button>
          </div>
        )}

        {/* Real Project Photos Strip (Live Dynamic - Limited to 4 images) */}
        <div className="pt-8 border-t border-[#4E3E3E]/70">
          <div className="text-center mb-8">
            <span className="text-[12px] uppercase tracking-widest text-[#B8935A] font-semibold font-sans">
              Entregas Reales en Hogares y Espacios
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {displayedProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => handleOpenProject(proj)}
                className="group relative h-48 sm:h-60 overflow-hidden rounded-xl border border-[#4E3E3E] bg-[#342929] shadow-md cursor-pointer hover:border-[#B8935A] transition-all"
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[14px] font-semibold leading-tight drop-shadow font-serif">
                    {proj.title}
                  </p>
                  <p className="text-[11px] text-[#D8C6B0] mt-0.5 font-mono">
                    {proj.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Toggle if more than 4 real delivery photos */}
          {projects.length > MAX_PROJECTS && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="inline-flex items-center gap-2 rounded-md border border-[#B8935A] bg-transparent px-6 py-2.5 text-[14px] font-semibold uppercase tracking-wider text-[#F5F2EB] hover:bg-[#B8935A] hover:text-white transition-all shadow-sm"
              >
                <span>
                  {showAllProjects
                    ? "Mostrar solo 4 fotos"
                    : `Ver más entregas (+${projects.length - MAX_PROJECTS})`}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>


      {/* MODAL EMERGENTE: DETALLE DE ENTREGA REAL */}
      {selectedProject && currentModalProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
        >
          {/* Modal Card: Blanco Puro (#FFFFFF) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-2xl shadow-2xl p-5 sm:p-8 md:p-10 border border-[#E8E0D5] max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button X */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#6B635B] hover:text-[#1A1A1A] p-2 rounded-full hover:bg-[#F5F2EB] transition-colors z-10"
              aria-label="Cerrar ventana"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Left Column: Big Image & Thumbnail Carousel */}
              <div className="md:col-span-7 flex flex-col">
                {/* Main Image Container with Navigation Arrows */}
                <div className="relative h-64 sm:h-80 md:h-[390px] w-full rounded-xl overflow-hidden bg-[#FAF7F2] shadow-sm group select-none">
                  <img
                    src={currentModalProject.image}
                    alt={currentModalProject.title}
                    className="h-full w-full object-cover object-center transition-all duration-300"
                  />

                  {/* Left Arrow < */}
                  {projects.length > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevProject}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-sm transition-all shadow-md active:scale-95"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  )}

                  {/* Right Arrow > */}
                  {projects.length > 1 && (
                    <button
                      type="button"
                      onClick={handleNextProject}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-sm transition-all shadow-md active:scale-95"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  )}

                  {/* Location badge on top */}
                  <span className="absolute top-3.5 left-3.5 rounded-md bg-[#3B2F2F]/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm border border-white/20 font-mono">
                    {currentModalProject.location}
                  </span>
                </div>

                {/* Thumbnail Strip */}
                {projects.length > 1 && (
                  <div className="mt-4 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none select-none">
                    {projects.map((p, idx) => {
                      const isActive = idx === activeProjectIndex;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setActiveProjectIndex(idx)}
                          className={`relative h-14 w-14 sm:h-18 sm:w-18 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                            isActive
                              ? "border-[#B8935A] ring-2 ring-[#B8935A]/30 scale-105"
                              : "border-transparent opacity-60 hover:opacity-100 hover:border-[#D8C6B0]"
                          }`}
                        >
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Title, Location & WhatsApp CTA */}
              <div className="md:col-span-5 flex flex-col justify-center text-left">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B8935A] font-sans">
                  PROYECTO REAL INSTALADO
                </span>

                <h3 className="mt-1.5 text-2xl sm:text-[28px] font-semibold text-[#1A1A1A] font-serif leading-tight">
                  {currentModalProject.title}
                </h3>

                <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#6B635B] bg-[#F5F2EB] border border-[#E8E0D5] rounded-lg px-3 py-1.5 w-fit">
                  <span className="h-2 w-2 rounded-full bg-[#B8935A]" />
                  <span>{currentModalProject.location}</span>
                </div>

                {/* WhatsApp Action Button */}
                <div className="mt-8 pt-2">
                  <a
                    href={getWhatsAppUrl(
                      `¡Hola Espacio Moderno! Vi esta entrega real (${currentModalProject.title} en ${currentModalProject.location}) y me gustaría cotizar un proyecto similar para mi espacio.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#B8935A] hover:bg-[#A48256] text-white py-3.5 sm:py-4 px-6 text-[14px] font-semibold uppercase tracking-wider shadow-sm hover:scale-[1.01] active:scale-98 transition-all"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-white" />
                    <span>¡LO QUIERO ASÍ! - Cotizar por WhatsApp</span>
                  </a>

                  {/* Secondary Return Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="mt-3 flex w-full items-center justify-center rounded-lg border border-[#D8C6B0] bg-white hover:bg-[#F5F2EB] text-[#1A1A1A] py-3 px-6 text-[14px] font-semibold transition-colors"
                  >
                    <span>Volver a entregas</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
