import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const FALLBACK_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-3.8-flash",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rawText, imageBase64, mimeType = "image/jpeg" } = body;

    if (!rawText && !imageBase64) {
      return NextResponse.json(
        { error: "Proporciona texto o captura de pantalla de la reseña" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta configurar GEMINI_API_KEY en el servidor" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

    const promptText = `Eres el redactor y curador de reseñas de 'Espacio Moderno' (marca de muebles a medida de alta gama y diseño interior).
Analiza el mensaje o captura de reseña enviada por un cliente y extrae de forma limpia:

1. name: Nombre de la persona o cliente (ej: "Carolina Morales", "Andrés Gómez"). Si no aparece, usa un nombre natural realista o "Cliente Satisfecho".
2. city: Ciudad o municipio del Valle de Aburrá / Colombia (ej: "Itagüí", "Medellín", "Envigado", "Sabaneta"). Si no se menciona, usa "Itagüí".
3. quote: El testimonio redactado de forma impecable, auténtica, elegante y humana (2 a 4 líneas), destacando los acabados, diseño, comodidad o cumplimiento.
4. rating: Calificación numérica entera de 1 a 5 (por defecto 5 si la reseña es positiva).

Devuelve estrictamente un JSON válido con este formato exacto:
{
  "name": "...",
  "city": "...",
  "quote": "...",
  "rating": 5
}`;

    const contents: any[] = [];
    if (imageBase64) {
      contents.push({
        inlineData: {
          mimeType,
          data: imageBase64,
        },
      });
    }
    if (rawText) {
      contents.push({ text: `Texto del cliente:\n"${rawText}"` });
    }
    contents.push({ text: promptText });

    let responseText = "";
    let lastError = null;

    for (const modelName of FALLBACK_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            responseMimeType: "application/json",
          },
        });
        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Modelo ${modelName} falló para testimonios:`, err.message);
      }
    }

    if (!responseText) {
      throw lastError || new Error("No se pudo obtener respuesta del modelo");
    }

    const cleaned = responseText
      .replace(/^```json/g, "")
      .replace(/^```/g, "")
      .replace(/```$/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json({
      success: true,
      name: parsed.name || "Cliente Satisfecho",
      city: parsed.city || "Itagüí",
      quote: parsed.quote || rawText,
      rating: Number(parsed.rating) || 5,
    });
  } catch (error: any) {
    console.error("Error en format-testimonial:", error);
    return NextResponse.json(
      { error: error.message || "Error procesando el testimonio" },
      { status: 500 }
    );
  }
}
