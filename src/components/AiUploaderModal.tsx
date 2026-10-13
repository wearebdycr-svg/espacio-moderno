"use client";

import { useState } from "react";
import { Sparkles, Upload, Check, AlertCircle, Loader2, X, Image as ImageIcon } from "lucide-react";

interface AiUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    id: string;
    name: string;
    category: string;
    badge: string | null;
    image: string;
    description: string;
    whatsappMsg: string;
  }) => void;
}

export function AiUploaderModal({ isOpen, onClose, onAddProduct }: AiUploaderModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{
    category: string;
    name: string;
    description: string;
    badge: string | null;
    note?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMimeType(file.type || "image/jpeg");
    setError(null);
    setAiResult(null);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeWithAI = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    setError(null);

    try {
      // Extract base64 without prefix data:...;base64,
      const base64Data = selectedImage.split(",")[1];

      const res = await fetch("/api/classify-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo clasificar la imagen");
      }

      const data = await res.json();
      setAiResult({
        category: data.category || "Salas",
        name: data.name || "Mueble a Medida",
        description: data.description || "Pieza exclusiva de diseño contemporáneo.",
        badge: data.badge || "NUEVO",
        note: data.note,
      });
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servicio de IA");
    } finally {
      setAnalyzing(false);
    }
  };

  const handlePublish = () => {
    if (!aiResult || !selectedImage) return;

    onAddProduct({
      id: `ai-${Date.now()}`,
      name: aiResult.name,
      category: aiResult.category,
      badge: aiResult.badge,
      image: selectedImage,
      description: aiResult.description,
      whatsappMsg: `¡Hola! Me interesa cotizar ${aiResult.name} que vi en su catálogo.`,
    });

    onClose();
    // Reset state
    setSelectedImage(null);
    setAiResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl rounded-2xl border border-[#E8E0D5] bg-[#FFFFFF] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E2D8] px-6 py-4 bg-[#F5F2EB]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B8935A] text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1A1A1A] font-serif">
                Clasificador Inteligente de Muebles
              </h3>
              <p className="text-xs text-[#6B635B] font-sans">
                Impulsado por Inteligencia Artificial de Visión (Gemini)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B635B] hover:text-[#1A1A1A] rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 font-sans">
          {/* Upload Dropzone */}
          {!selectedImage ? (
            <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D8C6B0] bg-[#FFFFFF] p-8 text-center cursor-pointer hover:border-[#B8935A] hover:bg-[#F5F2EB] transition-all">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#B8935A]/15 text-[#B8935A]">
                <Upload className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-[#1A1A1A]">
                Sube o arrastra una foto de cualquier mueble
              </span>
              <span className="mt-1 text-xs text-[#6B635B]">
                PNG, JPG o WebP desde tu galería, Google Drive o cámara
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative h-56 w-full overflow-hidden rounded-xl border border-[#E8E0D5] bg-[#F7F4EF]">
                <img
                  src={selectedImage}
                  alt="Preview del mueble"
                  className="h-full w-full object-cover object-center"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAiResult(null);
                  }}
                  className="absolute top-3 right-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black transition-colors"
                  title="Cambiar foto"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Action Analyze */}
              {!aiResult && (
                <button
                  type="button"
                  disabled={analyzing}
                  onClick={handleAnalyzeWithAI}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#B8935A] py-3.5 text-[14px] font-semibold tracking-wider uppercase text-white shadow-sm hover:bg-[#A4814E] disabled:opacity-60 transition-all"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Analizando tipo de mueble y estilo con IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Analizar y Clasificar con IA</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* AI Detection Result */}
          {aiResult && (
            <div className="rounded-xl border border-[#B8935A]/30 bg-[#FFFFFF] p-5 space-y-4 animate-fadeIn shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#B8935A]">
                  Categoría Detectada por IA:
                </span>
                <span className="rounded-md bg-[#B8935A] px-3.5 py-1 text-xs font-semibold text-white shadow-xs">
                  {aiResult.category}
                </span>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#6B635B] uppercase">
                  Nombre Sugerido
                </label>
                <input
                  type="text"
                  value={aiResult.name}
                  onChange={(e) => setAiResult({ ...aiResult, name: e.target.value })}
                  className="mt-1 w-full rounded-md border border-[#D8C6B0] bg-white px-3 py-2 text-sm text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#B8935A]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#6B635B] uppercase">
                  Descripción Comercial
                </label>
                <textarea
                  rows={2}
                  value={aiResult.description}
                  onChange={(e) =>
                    setAiResult({ ...aiResult, description: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-[#D8C6B0] bg-white px-3 py-2 text-xs text-[#1A1A1A] leading-relaxed focus:outline-none focus:border-[#B8935A] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#6B635B]">
                  Etiqueta: <strong className="text-[#B8935A]">{aiResult.badge || "Ninguna"}</strong>
                </span>

                <button
                  type="button"
                  onClick={handlePublish}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#B8935A] px-5 py-2.5 text-xs font-semibold uppercase text-white shadow-sm hover:bg-[#A4814E] transition-all"
                >
                  <Check className="h-4 w-4" />
                  <span>Publicar en {aiResult.category}</span>
                </button>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
