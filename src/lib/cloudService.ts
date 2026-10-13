import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage, isFirebaseConfigured } from "./firebase";
import {
  ProductItem,
  RealProjectItem,
  TestimonialItem,
  WorkshopItem,
  getStoredProducts,
  saveStoredProducts,
  getStoredProjects,
  saveStoredProjects,
  getStoredTestimonials,
  saveStoredTestimonials,
  getStoredWorkshop,
  saveStoredWorkshop,
} from "./storage";

// Helper to upload base64 image to Firebase Storage if available
export async function uploadImageToCloud(
  folder: string,
  id: string,
  base64OrUrl: string
): Promise<string> {
  // If it's already a http URL or not base64, return as is
  if (!base64OrUrl.startsWith("data:") || !storage) {
    return base64OrUrl;
  }

  try {
    const storageRef = ref(storage, `${folder}/${id}.jpg`);
    await uploadString(storageRef, base64OrUrl, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.warn("Storage upload falló, usando imagen directa:", error);
    return base64OrUrl;
  }
}

// ----------------------------------------------------------------------
// PRODUCTS (CATÁLOGO)
// ----------------------------------------------------------------------

export async function getCloudProducts(): Promise<ProductItem[]> {
  if (!db || !isFirebaseConfigured()) {
    return getStoredProducts();
  }

  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return getStoredProducts();
    }
    const products: ProductItem[] = snapshot.docs.map((d) => ({
      ...(d.data() as ProductItem),
      id: d.id,
    }));
    // Cache locally for offline fast loading
    saveStoredProducts(products);
    return products;
  } catch (error) {
    console.warn("Error leyendo productos de Firestore:", error);
    return getStoredProducts();
  }
}

export async function saveCloudProduct(product: ProductItem): Promise<ProductItem> {
  let finalProduct = { ...product };

  if (storage && isFirebaseConfigured() && product.image.startsWith("data:")) {
    const cloudUrl = await uploadImageToCloud("products", product.id, product.image);
    finalProduct.image = cloudUrl;
  }

  if (db && isFirebaseConfigured()) {
    try {
      await setDoc(doc(db, "products", finalProduct.id), finalProduct);
    } catch (error) {
      console.warn("Error guardando producto en Firestore:", error);
    }
  }

  // Update local storage
  const current = getStoredProducts().filter((p) => p.id !== finalProduct.id);
  const updated = [finalProduct, ...current];
  saveStoredProducts(updated);

  return finalProduct;
}

export async function deleteCloudProduct(id: string): Promise<void> {
  if (db && isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (error) {
      console.warn("Error eliminando producto en Firestore:", error);
    }
  }

  const current = getStoredProducts().filter((p) => p.id !== id);
  saveStoredProducts(current);
}

// ----------------------------------------------------------------------
// REAL PROJECTS (ENTREGAS REALES)
// ----------------------------------------------------------------------

export async function getCloudProjects(): Promise<RealProjectItem[]> {
  if (!db || !isFirebaseConfigured()) {
    return getStoredProjects();
  }

  try {
    const q = query(collection(db, "realProjects"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return getStoredProjects();
    }
    const projects: RealProjectItem[] = snapshot.docs.map((d) => ({
      ...(d.data() as RealProjectItem),
      id: d.id,
    }));
    saveStoredProjects(projects);
    return projects;
  } catch (error) {
    console.warn("Error leyendo entregas de Firestore:", error);
    return getStoredProjects();
  }
}

export async function saveCloudProject(project: RealProjectItem): Promise<RealProjectItem> {
  let finalProject = { ...project };

  if (storage && isFirebaseConfigured() && project.image.startsWith("data:")) {
    const cloudUrl = await uploadImageToCloud("deliveries", project.id, project.image);
    finalProject.image = cloudUrl;
  }

  if (db && isFirebaseConfigured()) {
    try {
      await setDoc(doc(db, "realProjects", finalProject.id), finalProject);
    } catch (error) {
      console.warn("Error guardando entrega en Firestore:", error);
    }
  }

  const current = getStoredProjects().filter((p) => p.id !== finalProject.id);
  const updated = [finalProject, ...current];
  saveStoredProjects(updated);

  return finalProject;
}

export async function deleteCloudProject(id: string): Promise<void> {
  if (db && isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, "realProjects", id));
    } catch (error) {
      console.warn("Error eliminando entrega en Firestore:", error);
    }
  }

  const current = getStoredProjects().filter((p) => p.id !== id);
  saveStoredProjects(current);
}

// ----------------------------------------------------------------------
// TESTIMONIALS (TESTIMONIOS)
// ----------------------------------------------------------------------

export async function getCloudTestimonials(): Promise<TestimonialItem[]> {
  if (!db || !isFirebaseConfigured()) {
    return getStoredTestimonials();
  }

  try {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return getStoredTestimonials();
    }
    const testimonials: TestimonialItem[] = snapshot.docs.map((d) => ({
      ...(d.data() as TestimonialItem),
      id: d.id,
    }));
    saveStoredTestimonials(testimonials);
    return testimonials;
  } catch (error) {
    console.warn("Error leyendo testimonios de Firestore:", error);
    return getStoredTestimonials();
  }
}

export async function saveCloudTestimonial(testimonial: TestimonialItem): Promise<TestimonialItem> {
  let finalT = { ...testimonial };

  if (storage && isFirebaseConfigured() && testimonial.avatar.startsWith("data:")) {
    const cloudUrl = await uploadImageToCloud("avatars", testimonial.id, testimonial.avatar);
    finalT.avatar = cloudUrl;
  }

  if (db && isFirebaseConfigured()) {
    try {
      await setDoc(doc(db, "testimonials", finalT.id), finalT);
    } catch (error) {
      console.warn("Error guardando testimonio en Firestore:", error);
    }
  }

  const current = getStoredTestimonials().filter((t) => t.id !== finalT.id);
  const updated = [finalT, ...current];
  saveStoredTestimonials(updated);

  return finalT;
}

export async function deleteCloudTestimonial(id: string): Promise<void> {
  if (db && isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, "testimonials", id));
    } catch (error) {
      console.warn("Error eliminando testimonio en Firestore:", error);
    }
  }

  const current = getStoredTestimonials().filter((t) => t.id !== id);
  saveStoredTestimonials(current);
}

// ----------------------------------------------------------------------
// WORKSHOP / SOMOS FABRICANTES (PROCESO EN TALLER)
// ----------------------------------------------------------------------

export async function getCloudWorkshop(): Promise<WorkshopItem[]> {
  if (!db || !isFirebaseConfigured()) {
    return getStoredWorkshop();
  }

  try {
    const q = query(collection(db, "workshop"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return getStoredWorkshop();
    }
    const items: WorkshopItem[] = snapshot.docs.map((d) => ({
      ...(d.data() as WorkshopItem),
      id: d.id,
    }));
    saveStoredWorkshop(items);
    return items;
  } catch (error) {
    console.warn("Error leyendo taller de Firestore:", error);
    return getStoredWorkshop();
  }
}

export async function saveCloudWorkshop(item: WorkshopItem): Promise<WorkshopItem> {
  let finalItem = { ...item };

  if (storage && isFirebaseConfigured() && item.image.startsWith("data:")) {
    const cloudUrl = await uploadImageToCloud("workshop", item.id, item.image);
    finalItem.image = cloudUrl;
  }

  if (db && isFirebaseConfigured()) {
    try {
      await setDoc(doc(db, "workshop", finalItem.id), finalItem);
    } catch (error) {
      console.warn("Error guardando taller en Firestore:", error);
    }
  }

  const current = getStoredWorkshop().filter((w) => w.id !== finalItem.id);
  const updated = [finalItem, ...current];
  saveStoredWorkshop(updated);

  return finalItem;
}

export async function deleteCloudWorkshop(id: string): Promise<void> {
  if (db && isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, "workshop", id));
    } catch (error) {
      console.warn("Error eliminando taller en Firestore:", error);
    }
  }

  const current = getStoredWorkshop().filter((w) => w.id !== id);
  saveStoredWorkshop(current);
}
