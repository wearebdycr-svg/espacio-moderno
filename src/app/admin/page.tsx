"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  Check,
  AlertCircle,
  Loader2,
  Trash2,
  ArrowLeft,
  Lock,
  Layers,
  Camera,
  Eye,
  Plus,
  Star,
  MessageSquareQuote,
  Hammer,
} from "lucide-react";
import {
  ProductItem,
  RealProjectItem,
  TestimonialItem,
  WorkshopItem,
  getStoredProducts,
  getStoredProjects,
  getStoredTestimonials,
  getStoredWorkshop,
} from "@/lib/storage";
import {
  getCloudProducts,
  saveCloudProduct,
  deleteCloudProduct,
  getCloudProjects,
  saveCloudProject,
  deleteCloudProject,
  getCloudTestimonials,
  saveCloudTestimonial,
  deleteCloudTestimonial,
  getCloudWorkshop,
  saveCloudWorkshop,
  deleteCloudWorkshop,
} from "@/lib/cloudService";
import { isFirebaseConfigured } from "@/lib/firebase";
import { optimizeImageForWeb } from "@/lib/imageOptimizer";

const DEFAULT_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "1234";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"upload" | "catalog" | "deliveries" | "workshop" | "testimonials">("upload");
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [projects, setProjects] = useState<RealProjectItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [workshopItems, setWorkshopItems] = useState<WorkshopItem[]>([]);
  const [isCloudActive, setIsCloudActive] = useState(false);

  // Uploader state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [analyzing, setAnalyzing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form result after AI classification
  const [destination, setDestination] = useState<"catalogo" | "entrega_real" | "fabrica">("catalogo");
  const [workshopBadge, setWorkshopBadge] = useState("En el taller");
  const [category, setCategory] = useState("Comedores");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState<string | null>("NUEVO");
  const [location, setLocation] = useState("Entrega real en Itagüí");

  // Testimonial Manager state
  const [tName, setTName] = useState("");
  const [tCity, setTCity] = useState("Itagüí");
  const [tQuote, setTQuote] = useState("");
  const [tRating, setTRating] = useState(5);
  const [tAvatar, setTAvatar] = useState("");
  const [tRawInput, setTRawInput] = useState("");
  const [analyzingTestimonial, setAnalyzingTestimonial] = useState(false);
  const [tSuccess, setTSuccess] = useState<string | null>(null);
  const [tError, setTError] = useState<string | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  // Check session storage for PIN auth
  useEffect(() => {
    setIsCloudActive(isFirebaseConfigured());
    const isAuth = sessionStorage.getItem("em_admin_auth");
    if (isAuth === "true") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    // 1. Instant local cache load
    setProducts(getStoredProducts());
    setProjects(getStoredProjects());
    setTestimonials(getStoredTestimonials());
    setWorkshopItems(getStoredWorkshop());

    // 2. Cloud sync if connected
    getCloudProducts().then((p) => setProducts(p));
    getCloudProjects().then((pr) => setProjects(pr));
    getCloudTestimonials().then((t) => setTestimonials(t));
    getCloudWorkshop().then((w) => setWorkshopItems(w));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN) {
      sessionStorage.setItem("em_admin_auth", "true");
      setIsAuthenticated(true);
      setPinError(false);
      loadData();
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("em_admin_auth");
    setIsAuthenticated(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setPublishSuccess(null);

    try {
      const optimized = await optimizeImageForWeb(file, 1024, 0.82);
      setSelectedImage(optimized);
      setMimeType("image/jpeg");
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setMimeType(file.type || "image/jpeg");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeWithAI = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    setError(null);
    setPublishSuccess(null);

    try {
      const base64Data = selectedImage.split(",")[1];
      const res = await fetch("/api/classify-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType,
        }),
      });

      if (!res.ok) throw new Error("Error analizando con IA");
      const data = await res.json();

      if (data.error && !data.destination) {
        throw new Error(data.message || data.error);
      }

      // Set state based on AI response
      let dest: "catalogo" | "entrega_real" | "fabrica" = "catalogo";
      if (data.destination === "fabrica") {
        dest = "fabrica";
        setWorkshopBadge(data.workshopBadge || "En el taller");
      } else if (data.destination === "entrega_real") {
        dest = "entrega_real";
      }
      setDestination(dest);
      setCategory(data.category || "Salas");
      setName(data.name || data.title || "Mueble a Medida");
      setDescription(
        data.description || "Pieza exclusiva de diseño contemporáneo y maderas nobles."
      );
      setBadge(data.badge || "NUEVO");
      setLocation(data.location || "Entrega real en Itagüí");
    } catch (err: any) {
      setError(err.message || "No se pudo conectar con el servicio de IA");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveAndPublish = async () => {
    if (!selectedImage) return;

    if (destination === "catalogo") {
      const newProduct: ProductItem = {
        id: `prod-${Date.now()}`,
        name: name || "Mueble a Medida",
        category: category || "Comedores",
        badge: badge || null,
        image: selectedImage,
        description: description || "Pieza artesanal de alta gama.",
        whatsappMsg: `¡Hola! Me interesa cotizar el producto ${name} de su catálogo.`,
        createdAt: Date.now(),
      };
      const saved = await saveCloudProduct(newProduct);
      const updated = [saved, ...products.filter((p) => p.id !== saved.id)];
      setProducts(updated);
      setPublishSuccess(`¡Producto publicado con éxito en Catálogo > ${category}!`);
    } else if (destination === "entrega_real") {
      const newProject: RealProjectItem = {
        id: `proj-${Date.now()}`,
        title: name || "Proyecto a Medida",
        location: location || "Entrega real en Itagüí",
        image: selectedImage,
        createdAt: Date.now(),
      };
      const saved = await saveCloudProject(newProject);
      const updated = [saved, ...projects.filter((p) => p.id !== saved.id)];
      setProjects(updated);
      setPublishSuccess("¡Foto publicada con éxito en la sección de Entregas Reales!");
    } else {
      const newWorkshop: WorkshopItem = {
        id: `ws-${Date.now()}`,
        badge: workshopBadge || "En el taller",
        image: selectedImage,
        alt: name || "Taller de ebanistería Espacio Moderno",
        createdAt: Date.now(),
      };
      const saved = await saveCloudWorkshop(newWorkshop);
      const updated = [saved, ...workshopItems.filter((w) => w.id !== saved.id)];
      setWorkshopItems(updated);
      setPublishSuccess("¡Foto publicada con éxito en Somos Fabricantes (Taller)!");
    }

    // Reset uploader form
    setSelectedImage(null);
    setName("");
    setDescription("");
  };

  const handleDeleteWorkshop = async (id: string) => {
    await deleteCloudWorkshop(id);
    const updated = workshopItems.filter((w) => w.id !== id);
    setWorkshopItems(updated);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteCloudProduct(id);
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  };

  const handleDeleteProject = async (id: string) => {
    await deleteCloudProject(id);
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName.trim() || !tQuote.trim()) {
      setTError("Ingresa al menos el nombre y la reseña del cliente.");
      return;
    }

    const newTestimonial: TestimonialItem = {
      id: `test-${Date.now()}`,
      name: tName.trim(),
      city: tCity.trim() || "Itagüí",
      quote: tQuote.trim(),
      rating: Number(tRating) || 5,
      avatar: tAvatar.trim(),
      createdAt: Date.now(),
    };

    const saved = await saveCloudTestimonial(newTestimonial);
    const updated = [saved, ...testimonials.filter((t) => t.id !== saved.id)];
    setTestimonials(updated);
    setTSuccess("¡Testimonio publicado con éxito en la página web!");
    setTError(null);

    // Reset form
    setTName("");
    setTCity("Itagüí");
    setTQuote("");
    setTRating(5);
    setTAvatar("");
    setTRawInput("");
    setIsAddingTestimonial(false);
  };

  const handleDeleteTestimonial = async (id: string) => {
    await deleteCloudTestimonial(id);
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
  };

  const handleExtractTestimonialWithAI = async () => {
    if (!tRawInput.trim()) return;
    setAnalyzingTestimonial(true);
    setTError(null);
    setTSuccess(null);

    try {
      const res = await fetch("/api/format-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: tRawInput }),
      });

      if (!res.ok) throw new Error("Error analizando reseña con IA");
      const data = await res.json();

      if (data.name) setTName(data.name);
      if (data.city) setTCity(data.city);
      if (data.quote) setTQuote(data.quote);
      if (data.rating) setTRating(data.rating);
      setTSuccess("¡Datos extraídos con IA! Revisa y pulsa 'Publicar Testimonio'.");
    } catch (err: any) {
      setTError(err.message || "No se pudo extraer la reseña con IA");
    } finally {
      setAnalyzingTestimonial(false);
    }
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const optimized = await optimizeImageForWeb(file, 256, 0.85);
      setTAvatar(optimized);
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        setTAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 1. PIN Login Screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#3B2F2F] px-4 text-[#F5F2EB] font-sans">
        <div className="w-full max-w-md rounded-2xl border border-[#4E3E3E] bg-[#342929] p-8 sm:p-10 shadow-2xl text-center">
          {/* Official Brand Logo */}
          <div className="mx-auto mb-4 flex justify-center">
            <img
              src="/images/logo-login-card.png"
              alt="Espacio Moderno"
              className="h-32 sm:h-36 w-auto object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#B8935A]/15 border border-[#B8935A]/30 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-[#B8935A] uppercase">
            Panel de Administración
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div className="relative">
              <input
                type="password"
                maxLength={8}
                placeholder="Ingresa PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full rounded-lg border border-[#4E3E3E] bg-[#2E2424] px-4 py-3 text-center text-lg tracking-widest text-white placeholder-[#786964] focus:border-[#B8935A] focus:outline-none"
                autoFocus
              />
            </div>

            {pinError && (
              <p className="text-xs text-red-400">PIN incorrecto. Intenta nuevamente.</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#B8935A] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#A4814E] transition-colors"
            >
              Entrar al Panel
            </button>
          </form>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#F5F2EB]/70 hover:text-[#F5F2EB] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Regresar a la página web</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A1A1A] font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#3B2F2F] text-white border-b border-[#4E3E3E] shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/images/monogram-transparent.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-white block font-sans">
                ESPACIO MODERNO
              </span>
              <span className="text-[10px] text-[#B8935A] font-semibold uppercase tracking-widest">
                Gestor Inteligente de Fotos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isCloudActive ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 text-[11px] font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Nube Conectada</span>
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 px-3 py-1 text-[11px] font-semibold text-amber-300">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>Modo Local</span>
              </span>
            )}

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#B8935A] px-3.5 py-1.5 text-xs font-semibold text-[#F5F2EB] hover:bg-[#B8935A] hover:text-white transition-all"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Ver Web</span>
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-md bg-[#2E2424] px-3.5 py-1.5 text-xs font-medium text-[#F5F2EB]/80 hover:text-white transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </header>


      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E2D8] pb-4 mb-8">
          <button
            onClick={() => setActiveTab("upload")}
            className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "upload"
                ? "bg-[#B8935A] text-white shadow-sm"
                : "bg-white text-[#6B635B] border border-[#E8E2D8] hover:text-[#1A1A1A] hover:border-[#B8935A]"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Subir Foto con IA</span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "catalog"
                ? "bg-[#B8935A] text-white shadow-sm"
                : "bg-white text-[#6B635B] border border-[#E8E2D8] hover:text-[#1A1A1A] hover:border-[#B8935A]"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Catálogo ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("deliveries")}
            className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "deliveries"
                ? "bg-[#B8935A] text-white shadow-sm"
                : "bg-white text-[#6B635B] border border-[#E8E2D8] hover:text-[#1A1A1A] hover:border-[#B8935A]"
            }`}
          >
            <Camera className="h-4 w-4" />
            <span>Entregas Reales ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("workshop")}
            className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "workshop"
                ? "bg-[#B8935A] text-white shadow-sm"
                : "bg-white text-[#6B635B] border border-[#E8E2D8] hover:text-[#1A1A1A] hover:border-[#B8935A]"
            }`}
          >
            <Hammer className="h-4 w-4" />
            <span>Taller / Fábrica ({workshopItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "testimonials"
                ? "bg-[#B8935A] text-white shadow-sm"
                : "bg-white text-[#6B635B] border border-[#E8E2D8] hover:text-[#1A1A1A] hover:border-[#B8935A]"
            }`}
          >
            <MessageSquareQuote className="h-4 w-4" />
            <span>Testimonios ({testimonials.length})</span>
          </button>
        </div>

        {/* TAB 1: UPLOAD WITH AI */}
        {activeTab === "upload" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Dropzone & Image */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-[#E8E2D8] bg-white p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#1A1A1A] font-serif mb-1">
                  1. Selecciona la Fotografía
                </h2>
                <p className="text-xs text-[#6B635B] mb-4">
                  Sube cualquier imagen desde tu móvil, cámara o Google Drive.
                </p>

                {!selectedImage ? (
                  <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E8E2D8] bg-[#F5F2EB]/50 p-10 text-center cursor-pointer hover:border-[#B8935A] transition-all">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#B8935A]/15 text-[#B8935A]">
                      <Upload className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-bold text-[#1A1A1A]">
                      Toca aquí para elegir foto
                    </span>
                    <span className="mt-1 text-[11px] text-[#6B635B]">
                      Catálogo o Entrega en cliente
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
                    <div className="relative h-72 w-full overflow-hidden rounded-xl border border-[#E8E2D8] bg-[#F5F2EB]">
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-3 right-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black transition-colors"
                      >
                        Cambiar
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={analyzing}
                      onClick={handleAnalyzeWithAI}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#B8935A] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#A4814E] disabled:opacity-60 transition-all"
                    >
                      {analyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>La IA está analizando fondo y mueble...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>Detectar con IA (Catálogo vs Entrega)</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: AI Result & Customization Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#E8E2D8] bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-bold text-[#1A1A1A] font-serif mb-1">
                    2. Destino y Clasificación
                  </h2>
                  <p className="text-xs text-[#6B635B]">
                    La IA preselecciona automáticamente el destino. Puedes ajustarlo a tu gusto.
                  </p>
                </div>

                {publishSuccess && (
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>{publishSuccess}</span>
                  </div>
                )}

                {/* Destination Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B635B] mb-2">
                    ¿A cuál sección pertenece esta foto?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setDestination("catalogo")}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                        destination === "catalogo"
                          ? "border-[#B8935A] bg-[#F5F2EB] text-[#1A1A1A] ring-2 ring-[#B8935A]/30 font-bold"
                          : "border-[#E8E2D8] bg-white text-[#6B635B] hover:border-[#B8935A]/50"
                      }`}
                    >
                      <Layers className="h-5 w-5 mb-1 text-[#B8935A]" />
                      <span className="text-xs">Catálogo</span>
                      <span className="text-[10px] text-[#6B635B]/80">
                        (Salas, Comedores...)
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDestination("entrega_real")}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                        destination === "entrega_real"
                          ? "border-[#B8935A] bg-[#F5F2EB] text-[#1A1A1A] ring-2 ring-[#B8935A]/30 font-bold"
                          : "border-[#E8E2D8] bg-white text-[#6B635B] hover:border-[#B8935A]/50"
                      }`}
                    >
                      <Camera className="h-5 w-5 mb-1 text-[#B8935A]" />
                      <span className="text-xs">Entregas Reales</span>
                      <span className="text-[10px] text-[#6B635B]/80">
                        (Hogar de cliente)
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDestination("fabrica")}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                        destination === "fabrica"
                          ? "border-[#B8935A] bg-[#F5F2EB] text-[#1A1A1A] ring-2 ring-[#B8935A]/30 font-bold"
                          : "border-[#E8E2D8] bg-white text-[#6B635B] hover:border-[#B8935A]/50"
                      }`}
                    >
                      <Hammer className="h-5 w-5 mb-1 text-[#B8935A]" />
                      <span className="text-xs">Taller / Fábrica</span>
                      <span className="text-[10px] text-[#6B635B]/80">
                        (Somos Fabricantes)
                      </span>
                    </button>
                  </div>
                </div>

                {/* Form Fields: If CATALOG */}
                {destination === "catalogo" && (
                  <div className="space-y-4 pt-2 border-t border-[#E8E2D8]">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Categoría
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-md border border-[#E8E2D8] bg-white px-3 py-2 text-xs font-semibold text-[#1A1A1A] focus:border-[#B8935A] focus:outline-none"
                      >
                        <option value="Comedores">Comedores</option>
                        <option value="Salas">Salas</option>
                        <option value="Dormitorios">Dormitorios</option>
                        <option value="Sillas">Sillas</option>
                        <option value="Oficinas">Oficinas</option>
                        <option value="Exterior">Exterior</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Nombre del Mueble
                      </label>
                      <input
                        type="text"
                        placeholder="ej: Mesa Hacienda Roble"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-[#E8E2D8] bg-white px-3 py-2 text-sm text-[#1A1A1A] font-semibold focus:border-[#B8935A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Descripción Comercial
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Descripción destacando acabados y diseño..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-md border border-[#E8E2D8] bg-white px-3 py-2 text-xs text-[#1A1A1A] resize-none focus:border-[#B8935A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Etiqueta (Opcional)
                      </label>
                      <select
                        value={badge || ""}
                        onChange={(e) => setBadge(e.target.value || null)}
                        className="w-full rounded-md border border-[#E8E2D8] bg-white px-3 py-2 text-xs text-[#1A1A1A] focus:border-[#B8935A] focus:outline-none"
                      >
                        <option value="">Ninguna</option>
                        <option value="NUEVO">NUEVO</option>
                        <option value="MÁS VENDIDO">MÁS VENDIDO</option>
                        <option value="TENDENCIA">TENDENCIA</option>
                        <option value="EXCLUSIVO">EXCLUSIVO</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Form Fields: If ENTREGA REAL */}
                {destination === "entrega_real" && (
                  <div className="space-y-4 pt-2 border-t border-[#E8E2D8]">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Título del Proyecto Entregado
                      </label>
                      <input
                        type="text"
                        placeholder="ej: Comedor Roble & Sillas Tapizadas"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-[#E8E2D8] bg-white px-3 py-2 text-sm text-[#1A1A1A] font-semibold focus:border-[#B8935A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Ubicación o Ciudad
                      </label>
                      <input
                        type="text"
                        placeholder="ej: Entrega real en Itagüí - Medellín"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-md border border-[#E8E2D8] bg-white px-3 py-2 text-xs text-[#1A1A1A] focus:border-[#B8935A] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Form Fields: If FABRICA / TALLER */}
                {destination === "fabrica" && (
                  <div className="space-y-4 pt-2 border-t border-[#E8E2D8]">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Etiqueta del Proceso en Taller (Badge)
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {["En el taller", "El ensamble", "Ebanistas", "Banco de oficio", "Acabados", "Corte y Estructura"].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setWorkshopBadge(tag)}
                            className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                              workshopBadge === tag
                                ? "bg-[#B8935A] text-white shadow-xs"
                                : "bg-[#F5F2EB]/60 border border-[#E8E2D8] text-[#6B635B] hover:border-[#B8935A]"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="O escribe una etiqueta personalizada..."
                        value={workshopBadge}
                        onChange={(e) => setWorkshopBadge(e.target.value)}
                        className="w-full rounded-md border border-[#E8E2D8] bg-white px-3 py-2 text-xs font-semibold text-[#1A1A1A] focus:border-[#B8935A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Descripción o Nombre de la Foto (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="ej: Fabricación artesanal de mesa de roble"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-[#E8E2D8] bg-white px-3 py-2 text-xs text-[#1A1A1A] focus:border-[#B8935A] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-4 border-t border-[#E8E2D8]">
                  <button
                    type="button"
                    disabled={!selectedImage}
                    onClick={handleSaveAndPublish}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#B8935A] py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#A4814E] active:scale-[0.99] disabled:opacity-40 transition-all"
                  >
                    <Check className="h-4 w-4" />
                    <span>Publicar en la Página Web</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE CATALOG */}
        {activeTab === "catalog" && (
          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A] font-serif">
                  Productos Activos en Catálogo ({products.length})
                </h2>
                <p className="text-xs text-[#6B635B]">
                  Puedes eliminar cualquier producto que ya no esté disponible.
                </p>
              </div>
              <span className="inline-flex items-center rounded-lg bg-[#F5F2EB] border border-[#E8E2D8] px-3 py-1.5 text-[11px] font-medium text-[#1A1A1A]">
                📌 En la web principal se muestran máx. 8 por sección (los más recientes)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-[#E8E2D8] overflow-hidden flex flex-col justify-between bg-[#F5F2EB]/40 shadow-xs hover:border-[#B8935A]/50 transition-all"
                >
                  <div className="relative h-44 w-full bg-[#E8E2D8]">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    {p.badge && (
                      <span className="absolute top-2 left-2 rounded bg-[#B8935A] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#B8935A] tracking-wider">
                        {p.category}
                      </span>
                      <h3 className="text-sm font-bold text-[#1A1A1A] font-serif">{p.name}</h3>
                      <p className="text-xs text-[#6B635B] line-clamp-2 mt-1">{p.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E8E2D8] flex justify-end">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE REAL DELIVERIES */}
        {activeTab === "deliveries" && (
          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A] font-serif">
                  Fotos de Entregas Reales en Clientes ({projects.length})
                </h2>
                <p className="text-xs text-[#6B635B]">
                  Estas son las fotos que se muestran debajo de los testimonios.
                </p>
              </div>
              <span className="inline-flex items-center rounded-lg bg-[#F5F2EB] border border-[#E8E2D8] px-3 py-1.5 text-[11px] font-medium text-[#1A1A1A]">
                📌 En la web principal se muestran máx. 8 fotos (las más recientes)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-xl border border-[#E8E2D8] overflow-hidden bg-[#F5F2EB]/40 shadow-xs hover:border-[#B8935A]/50 transition-all"
                >
                  <div className="relative h-44 w-full bg-[#E8E2D8]">
                    <img src={proj.image} alt={proj.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-bold text-[#1A1A1A]">{proj.title}</h3>
                    <p className="text-[10px] text-[#6B635B] mt-0.5">{proj.location}</p>
                    <div className="mt-3 pt-2 border-t border-[#E8E2D8] flex justify-end">
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MANAGE WORKSHOP / SOMOS FABRICANTES */}
        {activeTab === "workshop" && (
          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A] font-serif">
                  Fotos del Taller de Ebanistería — Somos Fabricantes ({workshopItems.length})
                </h2>
                <p className="text-xs text-[#6B635B]">
                  Estas son las fotos que se muestran en la sección "Somos Fabricantes" debajo del proceso.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-lg bg-[#F5F2EB] border border-[#E8E2D8] px-3 py-1.5 text-[11px] font-medium text-[#1A1A1A]">
                  📌 En la web principal se muestran máx. 8 fotos (las más recientes)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("upload");
                    setDestination("fabrica");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#B8935A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#A4814E] transition-all shadow-xs"
                >
                  <Plus className="h-4 w-4" />
                  <span>Subir Foto de Taller</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {workshopItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#E8E2D8] overflow-hidden bg-[#F5F2EB]/40 flex flex-col justify-between shadow-xs hover:border-[#B8935A]/50 transition-all"
                >
                  <div className="relative h-44 w-full bg-[#E8E2D8]">
                    <img src={item.image} alt={item.badge} className="h-full w-full object-cover" />
                    <span className="absolute top-2 left-2 rounded bg-[#B8935A] px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow">
                      {item.badge}
                    </span>
                  </div>
                  <div className="p-3">
                    <span className="text-xs font-bold text-[#1A1A1A]">{item.badge}</span>
                    <div className="mt-3 pt-2 border-t border-[#E8E2D8] flex justify-end">
                      <button
                        onClick={() => handleDeleteWorkshop(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {workshopItems.length === 0 && (
              <div className="text-center py-12 text-sm text-[#6B635B] rounded-xl bg-[#F5F2EB]/50 border border-dashed border-[#E8E2D8] my-4">
                No hay fotos del taller registradas. ¡Sube la primera desde la pestaña "Subir Foto con IA"!
              </div>
            )}
          </div>
        )}

        {/* TAB 5: MANAGE TESTIMONIALS */}
        {activeTab === "testimonials" && (
          <div className="space-y-8">
            {/* Header & Add Button */}
            <div className="rounded-2xl border border-[#E8E2D8] bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#1A1A1A] font-serif">
                    Reseñas y Testimonios ({testimonials.length})
                  </h2>
                  <p className="text-xs text-[#6B635B]">
                    Administra las opiniones que tus clientes ven en la sección "Lo Que Dicen Nuestros Clientes".
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-lg bg-[#F5F2EB] border border-[#E8E2D8] px-3 py-1.5 text-[11px] font-medium text-[#1A1A1A]">
                    📌 En la web se muestran máx. 8 (los más recientes)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingTestimonial(!isAddingTestimonial);
                      setTSuccess(null);
                      setTError(null);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#B8935A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#A4814E] transition-all shadow-xs"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{isAddingTestimonial ? "Ocultar Formulario" : "Nuevo Testimonio"}</span>
                  </button>
                </div>
              </div>

              {/* Form to add testimonial */}
              {isAddingTestimonial && (
                <div className="mt-8 pt-6 border-t border-[#E8E2D8] space-y-6">
                  {/* AI Quick Assistant Box */}
                  <div className="rounded-xl border border-[#B8935A]/30 bg-[#F5F2EB]/50 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#B8935A] uppercase tracking-wider">
                      <Sparkles className="h-4 w-4 text-[#B8935A]" />
                      <span>¿Tienes un mensaje o audio de WhatsApp del cliente? (Opcional)</span>
                    </div>
                    <p className="text-xs text-[#6B635B]">
                      Pega aquí lo que escribió el cliente y la IA extraerá automáticamente el nombre, ciudad, estrellas y redacción por ti.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <textarea
                        rows={2}
                        value={tRawInput}
                        onChange={(e) => setTRawInput(e.target.value)}
                        placeholder="ej: Don Carlos buenas tardes, le escribo para contarle que el comedor en roble quedó espectacular en nuestro apto aquí en Itagüí / Medellín..."
                        className="flex-1 rounded-lg border border-[#E8E2D8] bg-white p-3 text-xs text-[#1A1A1A] focus:border-[#B8935A] focus:outline-none"
                      />
                      <button
                        type="button"
                        disabled={analyzingTestimonial || !tRawInput.trim()}
                        onClick={handleExtractTestimonialWithAI}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B2F2F] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F5F2EB] hover:bg-[#B8935A] disabled:opacity-50 transition-all shrink-0"
                      >
                        {analyzingTestimonial ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Analizando...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 text-[#B8935A]" />
                            <span>Auto-llenar con IA</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {tSuccess && (
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>{tSuccess}</span>
                    </div>
                  )}

                  {tError && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-4 text-xs font-semibold text-red-800">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span>{tError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Nombre del Cliente *
                      </label>
                      <input
                        type="text"
                        required
                        value={tName}
                        onChange={(e) => setTName(e.target.value)}
                        placeholder="ej: Carolina Morales"
                        className="w-full rounded-md border border-[#E8E2D8] bg-white px-3 py-2 text-xs font-semibold text-[#1A1A1A] focus:border-[#B8935A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Ciudad o Sector
                      </label>
                      <input
                        type="text"
                        value={tCity}
                        onChange={(e) => setTCity(e.target.value)}
                        placeholder="ej: Itagüí, Medellín, Envigado, Sabaneta..."
                        className="w-full rounded-md border border-[#E8E2D8] bg-white px-3 py-2 text-xs text-[#1A1A1A] focus:border-[#B8935A] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Comentario / Testimonio del Cliente *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={tQuote}
                        onChange={(e) => setTQuote(e.target.value)}
                        placeholder="ej: Mandar a hacer nuestro comedor a medida con Espacio Moderno fue la mejor decisión. La atención, el diseño 3D y la puntualidad fueron impecables."
                        className="w-full rounded-md border border-[#E8E2D8] bg-white p-3 text-xs text-[#1A1A1A] focus:border-[#B8935A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Calificación (Estrellas)
                      </label>
                      <div className="flex items-center gap-1.5 py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setTRating(star)}
                            className="p-1 focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= tRating
                                  ? "fill-[#B8935A] text-[#B8935A]"
                                  : "text-[#E8E2D8]"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-xs font-bold text-[#6B635B]">
                          {tRating} de 5 estrellas
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#6B635B] mb-1">
                        Foto o Avatar del Cliente (Opcional)
                      </label>
                      <div className="flex items-center gap-3">
                        {tAvatar ? (
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#B8935A]">
                            <img src={tAvatar} alt="Avatar" className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setTAvatar("")}
                              className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] text-white opacity-0 hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="h-11 w-11 shrink-0 rounded-full bg-[#B8935A] text-white flex items-center justify-center text-xs font-bold">
                            {tName ? tName.slice(0, 2).toUpperCase() : "EM"}
                          </div>
                        )}
                        <label className="cursor-pointer rounded-md border border-[#E8E2D8] bg-[#F5F2EB]/60 px-3 py-1.5 text-xs font-semibold text-[#6B635B] hover:border-[#B8935A] hover:text-[#1A1A1A]">
                          <span>Subir foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarFileChange}
                          />
                        </label>
                        <span className="text-[11px] text-[#6B635B]/80">
                          (Si no subes foto, se generan sus iniciales elegantes)
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2 pt-3 flex justify-end gap-3 border-t border-[#E8E2D8]">
                      <button
                        type="button"
                        onClick={() => setIsAddingTestimonial(false)}
                        className="rounded-lg px-4 py-2.5 text-xs font-semibold text-[#6B635B] hover:text-[#1A1A1A]"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#B8935A] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#A4814E] active:scale-[0.99] transition-all shadow-md"
                      >
                        <Check className="h-4 w-4" />
                        <span>Publicar Testimonio</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Testimonials List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-[#E8E2D8] bg-white p-6 shadow-sm flex flex-col justify-between hover:border-[#B8935A]/50 transition-all"
                >
                  <div>
                    {/* Stars & delete */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-[#B8935A]">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold p-1 transition-colors"
                        title="Eliminar testimonio"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Eliminar</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#1A1A1A]/85 italic leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E8E2D8] flex items-center gap-3">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-10 w-10 rounded-full object-cover border border-[#E8E2D8]"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-[#B8935A] text-white flex items-center justify-center font-bold text-xs uppercase">
                        {t.name ? t.name.slice(0, 2).toUpperCase() : "EM"}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1A1A]">{t.name}</h4>
                      <p className="text-[11px] text-[#6B635B]">{t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
