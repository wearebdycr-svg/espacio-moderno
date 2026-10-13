/**
 * Optimiza y comprime una imagen en el navegador antes de subirla.
 * Reduce fotos de smartphones (4000px, 5MB) a un tamaño ideal para web (~1000px, 60-90KB)
 * permitiendo almacenarla gratis en Firestore sin requerir bucket de pago.
 */
export async function optimizeImageForWeb(
  dataUrlOrFile: string | File,
  maxDimension = 1024,
  quality = 0.82
): Promise<string> {
  if (typeof window === "undefined") {
    return typeof dataUrlOrFile === "string" ? dataUrlOrFile : "";
  }

  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // Calcular proporción si sobrepasa la dimensión máxima
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(typeof dataUrlOrFile === "string" ? dataUrlOrFile : "");
        return;
      }

      // Dibujar imagen redimensionada
      ctx.drawImage(img, 0, 0, width, height);

      // Exportar en formato JPEG comprimido
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      resolve(typeof dataUrlOrFile === "string" ? dataUrlOrFile : "");
    };

    if (typeof dataUrlOrFile === "string") {
      img.src = dataUrlOrFile;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result as string;
      };
      reader.readAsDataURL(dataUrlOrFile);
    }
  });
}
