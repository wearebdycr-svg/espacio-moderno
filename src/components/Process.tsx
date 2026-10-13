"use client";

import { useState, useEffect } from "react";
import {
  Pencil,
  Layers,
  Hammer,
  Truck,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getStoredWorkshop, WorkshopItem, DEFAULT_WORKSHOP } from "@/lib/storage";
import { getCloudWorkshop } from "@/lib/cloudService";

const stepIcons = [Pencil, Layers, Hammer, Truck];

export function Process() {
  const [workshopItems, setWorkshopItems] = useState<WorkshopItem[]>(DEFAULT_WORKSHOP);
  const [showAllWorkshop, setShowAllWorkshop] = useState(false);

  // Modal State for Workshop Gallery
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopItem | null>(null);
  const [activeWorkshopIndex, setActiveWorkshopIndex] = useState(0);

  const MAX_WORKSHOP = 4; // Limited to only 4 images as requested

  useEffect(() => {
    // 1. Initial local load
    setWorkshopItems(getStoredWorkshop());
    // 2. Cloud sync from Firestore
    getCloudWorkshop().then((items) => setWorkshopItems(items));

    const handleUpdate = () => {
      setWorkshopItems(getStoredWorkshop());
    };
    window.addEventListener("storage_updated", handleUpdate);
    return () => window.removeEventListener("storage_updated", handleUpdate);
  }, []);

  const displayedWorkshop = showAllWorkshop
    ? workshopItems
    : workshopItems.slice(0, MAX_WORKSHOP);

  const currentModalWorkshop =
    workshopItems[activeWorkshopIndex] || selectedWorkshop;

  const handleOpenWorkshop = (item: WorkshopItem) => {
    setSelectedWorkshop(item);
    const idx = workshopItems.findIndex((w) => w.id === item.id);
    setActiveWorkshopIndex(idx >= 0 ? idx : 0);
  };

  const handlePrevWorkshop = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (workshopItems.length <= 1) return;
    setActiveWorkshopIndex((prev) =>
      prev > 0 ? prev - 1 : workshopItems.length - 1
    );
  };

  const handleNextWorkshop = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (workshopItems.length <= 1) return;
    setActiveWorkshopIndex((prev) =>
      prev < workshopItems.length - 1 ? prev + 1 : 0
    );
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!selectedWorkshop) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedWorkshop(null);
      if (e.key === "ArrowLeft") handlePrevWorkshop();
      if (e.key === "ArrowRight") handleNextWorkshop();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedWorkshop, workshopItems.length]);

  return (
    <section id="proceso" className="py-20 lg:py-28 bg-[#F5F2EB] border-b border-[#E8E2D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[12px] font-semibold uppercase tracking-widest text-[#B8935A] font-sans">
            — PROCESO —
          </span>
          <h2 className="mt-3 text-3xl sm:text-[40px] font-semibold text-[#1A1A1A] tracking-tight font-serif leading-tight">
            Tu Mueble, de Principio a Fin
          </h2>
          <p className="mt-3 text-[16px] text-[#6B635B] leading-relaxed font-sans">
            Un proceso transparente y cercano para que recibas exactamente lo que imaginas.
          </p>
        </div>

        {/* 4 Steps Row: Outline minimal icons in Bronce Antiguo (#B8935A) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {siteConfig.processSteps.map((step, idx) => {
            const Icon = stepIcons[idx] || Pencil;
            return (
              <div
                key={step.step}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-transparent"
              >
                {/* Step Circle with Minimal Outline Icon in Bronce Antiguo */}
                <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#B8935A]/50 bg-[#FFFFFF] text-[#B8935A] shadow-sm">
                  <Icon className="h-6 w-6 stroke-[1.5]" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#B8935A] text-[10px] font-semibold text-white shadow-xs">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1A1A1A] font-serif">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] text-[#6B635B] leading-relaxed max-w-xs font-sans">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Callout Card: ¿Tienes una idea en mente? - Blanco Puro sobre Crema Seda */}
        <div className="overflow-hidden rounded-2xl border border-[#E8E2D8] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-20 lg:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-[32px] font-semibold text-[#1A1A1A] font-serif tracking-tight leading-tight">
                ¿Tienes una idea en mente?
              </h3>
              <p className="mt-4 text-[15px] sm:text-[16px] text-[#6B635B] leading-relaxed font-sans">
                Cuéntanos tu proyecto por WhatsApp. Envíanos fotos de tu espacio, medidas o bocetos y un maestro ebanista te brindará asesoría técnica inmediata.
              </p>
              <div className="mt-8">
                <a
                  href={getWhatsAppUrl("¡Hola Espacio Moderno! Tengo una idea en mente y quiero cotizar con un asesor.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-lg bg-[#B8935A] hover:bg-[#A4814E] px-7 py-3.5 text-[14px] font-semibold tracking-wider uppercase text-white shadow-sm hover:scale-[1.02] active:scale-98 transition-all"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-white" />
                  <span>CHATEAR AL 314 297 9756</span>
                </a>
              </div>
            </div>

            {/* Right Photo (Craftsman in wood workshop) */}
            <div className="relative h-64 sm:h-80 md:h-full w-full min-h-[260px] overflow-hidden bg-[#3B2F2F]">
              <img
                src="/images/idea-taller-ebanisteria.jpg"
                alt="Maestro ebanista trabajando la madera en taller artesanal"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
            </div>
          </div>
        </div>

        {/* SECCIÓN DINÁMICA: Somos Fabricantes (Limited to 4 images on page) */}
        <div className="pt-10 border-t border-[#E8E2D8]">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[12px] font-semibold uppercase tracking-widest text-[#B8935A] font-sans">
              — PROCESO ARTESANAL —
            </span>
            <h2 className="mt-3 text-3xl sm:text-[40px] font-semibold text-[#1A1A1A] tracking-tight font-serif leading-tight">
              Somos Fabricantes
            </h2>
            <p className="mt-3.5 text-[16px] text-[#6B635B] leading-relaxed max-w-xl mx-auto font-sans">
              Cada pieza nace en nuestro propio taller de ebanistería. Creamos con nuestras manos, cuidando cada detalle antes de que el mueble reciba su acabado final.
            </p>
          </div>

          {/* Dynamic Workshop Cards Grid (4 visible images) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
            {displayedWorkshop.map((card) => (
              <div
                key={card.id}
                onClick={() => handleOpenWorkshop(card)}
                className="group relative h-64 sm:h-72 lg:h-80 overflow-hidden rounded-xl bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#E8E0D5] hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-[#B8935A]"
              >
                <img
                  src={card.image}
                  alt={card.alt || card.badge}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                {/* Badge top-left */}
                <span className="absolute top-3.5 left-3.5 rounded-md bg-[#B8935A] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
                  {card.badge}
                </span>
              </div>
            ))}
          </div>

          {/* Toggle button if more than 4 workshop photos */}
          {workshopItems.length > MAX_WORKSHOP && (
            <div className="mb-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllWorkshop(!showAllWorkshop)}
                className="inline-flex items-center gap-2 rounded-md border border-[#B8935A] bg-[#FFFFFF] px-6 py-2.5 text-[14px] font-semibold uppercase tracking-wider text-[#B8935A] hover:bg-[#B8935A] hover:text-white transition-all shadow-xs"
              >
                <span>
                  {showAllWorkshop
                    ? "Mostrar solo 4 fotos"
                    : `Ver más fotos del taller (+${workshopItems.length - MAX_WORKSHOP})`}
                </span>
              </button>
            </div>
          )}

          {/* Bottom Button */}
          <div className="flex justify-center">
            <a
              href={getWhatsAppUrl("¡Hola! Me gustaría conocer más sobre su proceso de fabricación artesanal y acabados.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#B8935A] px-7 sm:px-9 py-3.5 text-[14px] font-semibold tracking-wider uppercase text-white shadow-sm hover:bg-[#A4814E] hover:scale-[1.02] active:scale-98 transition-all"
            >
              <span>CONOCE NUESTRO PROCESO</span>
              <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>


      {/* MODAL EMERGENTE: DETALLE DE SOMOS FABRICANTES (TALLER) */}
      {selectedWorkshop && currentModalWorkshop && (
        <div
          onClick={() => setSelectedWorkshop(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
        >
          {/* Modal Card: Fondo Blanco Puro, Sombra sutil */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-2xl shadow-2xl p-5 sm:p-8 md:p-10 border border-[#E8E0D5] max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button X */}
            <button
              type="button"
              onClick={() => setSelectedWorkshop(null)}
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
                    src={currentModalWorkshop.image}
                    alt={currentModalWorkshop.badge}
                    className="h-full w-full object-cover object-center transition-all duration-300"
                  />

                  {/* Left Arrow < */}
                  {workshopItems.length > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevWorkshop}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-sm transition-all shadow-md active:scale-95"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  )}

                  {/* Right Arrow > */}
                  {workshopItems.length > 1 && (
                    <button
                      type="button"
                      onClick={handleNextWorkshop}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-sm transition-all shadow-md active:scale-95"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  )}

                  {/* Badge top-left */}
                  <span className="absolute top-3.5 left-3.5 rounded-md bg-[#B8935A] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
                    {currentModalWorkshop.badge}
                  </span>
                </div>

                {/* Thumbnail Strip */}
                {workshopItems.length > 1 && (
                  <div className="mt-4 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none select-none">
                    {workshopItems.map((w, idx) => {
                      const isActive = idx === activeWorkshopIndex;
                      return (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setActiveWorkshopIndex(idx)}
                          className={`relative h-14 w-14 sm:h-18 sm:w-18 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                            isActive
                              ? "border-[#B8935A] ring-2 ring-[#B8935A]/30 scale-105"
                              : "border-transparent opacity-60 hover:opacity-100 hover:border-[#D8C6B0]"
                          }`}
                        >
                          <img
                            src={w.image}
                            alt={w.badge}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Title, Stage Badge & WhatsApp CTA */}
              <div className="md:col-span-5 flex flex-col justify-center text-left">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B8935A] font-sans">
                  PROCESO ARTESANAL EN TALLER
                </span>

                <h3 className="mt-1.5 text-2xl sm:text-[28px] font-semibold text-[#1A1A1A] font-serif leading-tight">
                  {currentModalWorkshop.badge}
                </h3>

                <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#6B635B] bg-[#F5F2EB] border border-[#E8E0D5] rounded-lg px-3 py-1.5 w-fit">
                  <span className="h-2 w-2 rounded-full bg-[#B8935A]" />
                  <span>Taller de ebanistería Espacio Moderno</span>
                </div>

                {/* WhatsApp Action Button */}
                <div className="mt-8 pt-2">
                  <a
                    href={getWhatsAppUrl(
                      `¡Hola Espacio Moderno! Vi su proceso artesanal en taller (${currentModalWorkshop.badge}) y me gustaría cotizar un mueble fabricado a medida.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#B8935A] hover:bg-[#A4814E] text-white py-3.5 sm:py-4 px-6 text-[14px] font-semibold uppercase tracking-wider shadow-sm hover:scale-[1.01] active:scale-98 transition-all"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-white" />
                    <span>Cotizar por WhatsApp</span>
                  </a>

                  {/* Secondary Return Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedWorkshop(null)}
                    className="mt-3 flex w-full items-center justify-center rounded-lg border border-[#D8C6B0] bg-white hover:bg-[#F5F2EB] text-[#1A1A1A] py-3 px-6 text-[14px] font-semibold transition-colors"
                  >
                    <span>Volver al proceso</span>
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
