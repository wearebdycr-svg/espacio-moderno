import { siteConfig } from "@/config/site";

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  badge: string | null;
  image: string;
  description: string;
  whatsappMsg: string;
  refCode?: string;
  createdAt?: number;
}

export interface RealProjectItem {
  id: string;
  title: string;
  location: string;
  image: string;
  createdAt?: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  city: string;
  quote: string;
  avatar: string;
  rating?: number;
  createdAt?: number;
}

const STORAGE_PRODUCTS_KEY = "espacio_moderno_products_v1";
const STORAGE_PROJECTS_KEY = "espacio_moderno_projects_v1";
const STORAGE_TESTIMONIALS_KEY = "espacio_moderno_testimonials_v1";

export function getStoredProducts(): ProductItem[] {
  if (typeof window === "undefined") return siteConfig.products as ProductItem[];
  try {
    const raw = localStorage.getItem(STORAGE_PRODUCTS_KEY);
    if (!raw) return siteConfig.products as ProductItem[];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : (siteConfig.products as ProductItem[]);
  } catch {
    return siteConfig.products as ProductItem[];
  }
}

export function saveStoredProducts(products: ProductItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event("storage_updated"));
  } catch (err) {
    console.error("Error guardando productos:", err);
  }
}

export function getStoredProjects(): RealProjectItem[] {
  if (typeof window === "undefined") {
    return siteConfig.realProjects.map((p, i) => ({
      ...p,
      id: `seed-${i}`,
    }));
  }
  try {
    const raw = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (!raw) {
      return siteConfig.realProjects.map((p, i) => ({
        ...p,
        id: `seed-${i}`,
      }));
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : siteConfig.realProjects.map((p, i) => ({
          ...p,
          id: `seed-${i}`,
        }));
  } catch {
    return siteConfig.realProjects.map((p, i) => ({
      ...p,
      id: `seed-${i}`,
    }));
  }
}

export function saveStoredProjects(projects: RealProjectItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event("storage_updated"));
  } catch (err) {
    console.error("Error guardando entregas reales:", err);
  }
}

export function getStoredTestimonials(): TestimonialItem[] {
  const defaults = siteConfig.testimonials.map((t, i) => ({
    ...t,
    id: `seed-test-${i}`,
    rating: 5,
  }));

  if (typeof window === "undefined") {
    return defaults;
  }
  try {
    const raw = localStorage.getItem(STORAGE_TESTIMONIALS_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaults;
  } catch {
    return defaults;
  }
}

export function saveStoredTestimonials(testimonials: TestimonialItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_TESTIMONIALS_KEY, JSON.stringify(testimonials));
    window.dispatchEvent(new Event("storage_updated"));
  } catch (err) {
    console.error("Error guardando testimonios:", err);
  }
}

// ----------------------------------------------------------------------
// WORKSHOP / SOMOS FABRICANTES
// ----------------------------------------------------------------------

export interface WorkshopItem {
  id: string;
  badge: string; // e.g. "En el taller", "El ensamble", "Ebanistas", "Banco de oficio"
  image: string;
  alt?: string;
  createdAt?: number;
}

const STORAGE_WORKSHOP_KEY = "espacio_moderno_workshop_v1";

export const DEFAULT_WORKSHOP: WorkshopItem[] = [
  {
    id: "seed-ws-0",
    badge: "En el taller",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    alt: "Artesano cepillando y lijando madera en el taller",
  },
  {
    id: "seed-ws-1",
    badge: "El ensamble",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    alt: "Estructura de mueble de madera en proceso de ensamble",
  },
  {
    id: "seed-ws-2",
    badge: "Ebanistas",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    alt: "Maestro ebanista construyendo estructura en madera",
  },
  {
    id: "seed-ws-3",
    badge: "Banco de oficio",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    alt: "Banco de trabajo tradicional con herramientas y viruta de madera",
  },
];

export function getStoredWorkshop(): WorkshopItem[] {
  if (typeof window === "undefined") return DEFAULT_WORKSHOP;
  try {
    const raw = localStorage.getItem(STORAGE_WORKSHOP_KEY);
    if (!raw) return DEFAULT_WORKSHOP;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_WORKSHOP;
  } catch {
    return DEFAULT_WORKSHOP;
  }
}

export function saveStoredWorkshop(items: WorkshopItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_WORKSHOP_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("storage_updated"));
  } catch (err) {
    console.error("Error guardando taller:", err);
  }
}
