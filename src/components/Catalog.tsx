"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getStoredProducts, ProductItem } from "@/lib/storage";
import { getCloudProducts } from "@/lib/cloudService";

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [products, setProducts] = useState<ProductItem[]>(siteConfig.products as ProductItem[]);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeModalIndex, setActiveModalIndex] = useState(0);

  useEffect(() => {
    // Load products (cached local first, then sync from cloud)
    setProducts(getStoredProducts());
    getCloudProducts().then((data) => setProducts(data));

    const handleStorageUpdate = () => {
      setProducts(getStoredProducts());
    };
    window.addEventListener("storage_updated", handleStorageUpdate);
    return () => window.removeEventListener("storage_updated", handleStorageUpdate);
  }, []);

  const MAX_PER_SECTION = 8;
  const [showAll, setShowAll] = useState(false);

  const filteredProducts =
    activeCategory === "Todos"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, MAX_PER_SECTION);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setShowAll(false);
  };

  // Products to display in the modal thumbnails strip:
  // If activeCategory is not "Todos", use filteredProducts of that category.
  // Otherwise, group all products of the clicked product's category.
  const modalProducts = selectedProduct
    ? activeCategory !== "Todos"
      ? filteredProducts
      : products.filter(
          (p) => p.category.toLowerCase() === selectedProduct.category.toLowerCase()
        )
    : [];

  const safeModalProducts =
    modalProducts.length > 0 ? modalProducts : selectedProduct ? [selectedProduct] : [];

  const currentModalProduct =
    safeModalProducts[activeModalIndex] || selectedProduct;

  const handleOpenDetail = (product: ProductItem) => {
    setSelectedProduct(product);
    // Find index of this item in the modal category list
    const list =
      activeCategory !== "Todos"
        ? filteredProducts
        : products.filter(
            (p) => p.category.toLowerCase() === product.category.toLowerCase()
          );
    const idx = list.findIndex((p) => p.id === product.id);
    setActiveModalIndex(idx >= 0 ? idx : 0);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (safeModalProducts.length <= 1) return;
    setActiveModalIndex((prev) =>
      prev > 0 ? prev - 1 : safeModalProducts.length - 1
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (safeModalProducts.length <= 1) return;
    setActiveModalIndex((prev) =>
      prev < safeModalProducts.length - 1 ? prev + 1 : 0
    );
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!selectedProduct) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedProduct, safeModalProducts.length]);

  return (
    <section id="colecciones" className="py-20 lg:py-28 bg-[#F5F2EB] border-b border-[#E8E2D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[12px] font-semibold uppercase tracking-widest text-[#B8935A] font-sans">
            — COLECCIONES —
          </span>
          <h2 className="mt-3 text-3xl sm:text-[40px] font-semibold text-[#1A1A1A] tracking-tight font-serif leading-tight">
            Catálogo de Productos
          </h2>
          <p className="mt-3 text-[16px] text-[#6B635B] leading-relaxed font-sans">
            Piezas artesanales que combinan diseño contemporáneo y funcionalidad premium.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {siteConfig.categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`rounded-md px-4 sm:px-5 py-2 text-[14px] font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-[#B8935A] text-white shadow-sm"
                    : "border border-[#D8C6B0] bg-[#FFFFFF] text-[#6B635B] hover:border-[#B8935A] hover:text-[#1A1A1A]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#E8E0D5] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-[#B8935A]/50 transition-all duration-300"
            >
              {/* Product Image (Click opens modal) */}
              <div
                onClick={() => handleOpenDetail(product)}
                className="relative h-64 w-full overflow-hidden bg-[#FAF7F2] cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Badge if exists */}
                {product.badge && (
                  <span className="absolute top-3 left-3 rounded-md bg-[#B8935A] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#B8935A] font-semibold font-sans">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => handleOpenDetail(product)}
                    className="mt-1 text-[20px] sm:text-[24px] font-medium text-[#1A1A1A] group-hover:text-[#B8935A] transition-colors font-serif leading-snug cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-[14px] text-[#6B635B] line-clamp-2 leading-relaxed font-sans">
                    {product.description}
                  </p>
                </div>

                {/* Action Row */}
                <div className="mt-5 pt-4 border-t border-[#F2ECE4] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleOpenDetail(product)}
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#6B635B] hover:text-[#B8935A] transition-colors cursor-pointer"
                  >
                    <span>Ver detalle</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <a
                    href={getWhatsAppUrl(product.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-[#B8935A] px-3.5 py-1.5 text-[14px] font-semibold text-[#1A1A1A] hover:bg-[#B8935A] hover:text-white transition-all"
                  >
                    Cotizar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-12 rounded-xl bg-[#FFFFFF] border border-dashed border-[#D8C6B0] my-6">
            <p className="text-[15px] text-[#6B635B] font-sans">
              Próximamente nuevas piezas en la categoría {activeCategory}.
            </p>
          </div>
        )}

        {/* Toggle if there are more than 8 products */}
        {filteredProducts.length > MAX_PER_SECTION && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-md border border-[#B8935A] bg-[#FFFFFF] px-6 py-2.5 text-[14px] font-semibold uppercase tracking-wider text-[#B8935A] hover:bg-[#B8935A] hover:text-white transition-all shadow-xs"
            >
              <span>
                {showAll
                  ? "Mostrar solo 8 productos"
                  : `Ver más modelos (+${filteredProducts.length - MAX_PER_SECTION})`}
              </span>
            </button>
          </div>
        )}

        {/* Bottom Action Row */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            href={getWhatsAppUrl("¡Hola! Me gustaría ver el Catálogo Completo de Espacio Moderno en PDF o fotos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#B8935A] px-7 sm:px-9 py-3.5 text-[14px] font-semibold tracking-wider uppercase text-white shadow-sm hover:bg-[#A4814E] hover:scale-[1.02] active:scale-98 transition-all"
          >
            <WhatsAppIcon className="h-4 w-4 fill-white" />
            <span>PEDIR CATÁLOGO EN WHATSAPP</span>
          </a>

          <a
            href={getWhatsAppUrl("¡Hola! Busco un diseño especial o medidas personalizadas que no vi en la página.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#B8935A] bg-transparent px-6 sm:px-8 py-3 sm:py-3.5 text-[#1A1A1A] hover:bg-[#B8935A] hover:text-white transition-all shadow-xs group"
          >
            <div className="flex flex-col items-center leading-tight">
              <span className="text-[13px] sm:text-[14px] font-semibold tracking-wider uppercase">Medidas Especiales</span>
              <span className="text-[12px] font-mono whitespace-nowrap text-[#B8935A] group-hover:text-white transition-colors mt-0.5">314 297 9756</span>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>


      {/* MODAL EMERGENTE: DETALLE DEL PRODUCTO (IMAGEN 1) */}
      {selectedProduct && currentModalProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 md:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        >
          {/* Modal Card: Fondo Blanco Puro, Sombra sutil */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-2xl shadow-2xl p-4 sm:p-7 md:p-9 border border-[#E8E0D5] max-h-[94vh] sm:max-h-[92vh] overflow-y-auto"
          >
            {/* Sticky Header Bar: Siempre visible en mobile y desktop */}
            <div className="sticky top-0 z-30 -mx-4 -mt-4 sm:-mx-7 sm:-mt-7 md:-mx-9 md:-mt-9 mb-4 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/95 backdrop-blur-md border-b border-[#E8E0D5] flex items-center justify-between shadow-xs">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#3B2F2F] hover:text-[#B8935A] py-1.5 px-3 rounded-lg bg-[#F5F2EB] hover:bg-[#E8E0D5] active:scale-95 transition-all"
                aria-label="Volver al catálogo"
              >
                <ArrowLeft className="h-4 w-4 text-[#B8935A]" />
                <span>Volver al catálogo</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#F5F2EB] text-[#3B2F2F] hover:bg-[#E8E0D5] hover:text-[#1A1A1A] active:scale-90 transition-all shadow-xs"
                aria-label="Cerrar ventana"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Left Column: Big Image & Thumbnail Carousel */}
              <div className="md:col-span-7 flex flex-col">
                {/* Main Image Container with Navigation Arrows */}
                <div className="relative h-64 sm:h-80 md:h-[390px] w-full rounded-xl overflow-hidden bg-[#FAF7F2] shadow-sm group select-none">
                  <img
                    src={currentModalProduct.image}
                    alt={currentModalProduct.name}
                    className="h-full w-full object-cover object-center transition-all duration-300"
                  />

                  {/* Left Arrow < */}
                  {safeModalProducts.length > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-sm transition-all shadow-md active:scale-95"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  )}

                  {/* Right Arrow > */}
                  {safeModalProducts.length > 1 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-sm transition-all shadow-md active:scale-95"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  )}

                  {/* Badge */}
                  {currentModalProduct.badge && (
                    <span className="absolute top-3.5 left-3.5 rounded-md bg-[#B8935A] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
                      {currentModalProduct.badge}
                    </span>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {safeModalProducts.length > 1 && (
                  <div className="mt-4 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none select-none">
                    {safeModalProducts.map((p, idx) => {
                      const isActive = idx === activeModalIndex;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setActiveModalIndex(idx)}
                          className={`relative h-14 w-14 sm:h-18 sm:w-18 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                            isActive
                              ? "border-[#B8935A] ring-2 ring-[#B8935A]/30 scale-105"
                              : "border-transparent opacity-60 hover:opacity-100 hover:border-[#D8C6B0]"
                          }`}
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Title, Description, Reference & Actions */}
              <div className="md:col-span-5 flex flex-col justify-center text-left">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B8935A] font-sans">
                  {currentModalProduct.category}
                </span>

                <h3 className="mt-1.5 text-2xl sm:text-[28px] font-semibold text-[#1A1A1A] font-serif leading-tight">
                  {currentModalProduct.name}
                </h3>

                <p className="mt-3 text-[14px] sm:text-[15px] text-[#6B635B] leading-relaxed font-sans">
                  {currentModalProduct.description}
                </p>

                {/* Reference Code */}
                <p className="mt-4 text-xs font-mono font-semibold text-[#6B635B]">
                  Ref.{" "}
                  {currentModalProduct.refCode ||
                    `EM-${currentModalProduct.id.slice(0, 6).toUpperCase()}`}
                </p>

                {/* Primary WhatsApp Action Button */}
                <div className="mt-6 pt-2">
                  <a
                    href={getWhatsAppUrl(
                      `¡Hola Espacio Moderno! ¡LO QUIERO! Me interesa cotizar el producto ${
                        currentModalProduct.name
                      } (${
                        currentModalProduct.refCode
                          ? `Ref: ${currentModalProduct.refCode}`
                          : ""
                      }) que vi en su catálogo.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#B8935A] hover:bg-[#A4814E] text-white py-3.5 sm:py-4 px-6 text-[14px] font-semibold uppercase tracking-wider shadow-sm hover:scale-[1.01] active:scale-98 transition-all"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-white" />
                    <span>¡LO QUIERO! - Cotizar por WhatsApp</span>
                  </a>

                  {/* Secondary Return Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#D8C6B0] bg-white hover:bg-[#F5F2EB] text-[#1A1A1A] py-3.5 px-6 text-[14px] font-semibold transition-colors shadow-xs"
                  >
                    <ArrowLeft className="h-4 w-4 text-[#B8935A]" />
                    <span>Volver al catálogo</span>
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
