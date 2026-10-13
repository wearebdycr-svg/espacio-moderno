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
    const { imageBase64, mimeType = "image/jpeg" } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No se proporcionó imagen" },
        { status: 400 }
      );
    }

    const customKey =
      body.apiKey ||
      req.headers.get("x-gemini-key") ||
      process.env.GEMINI_API_KEY;

    if (!customKey) {
      return NextResponse.json(
        {
          needsApiKey: true,
          error: "Falta la clave GEMINI_API_KEY",
          message:
            "Para analizar tu foto real con visión artificial, ingresa tu clave gratuita de Gemini.",
        },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: customKey.trim() });

    const promptText = `Eres el director creativo de 'Espacio Moderno' (marca de arquitectura, ebanistería y muebles a medida de alta gama).
Analiza detalladamente esta fotografía y clasifícala en una de estas 3 opciones:

1. DESTINO DE LA FOTO (destination):
   - 'fabrica': Si la foto fue tomada en el taller de carpintería o ebanistería (mostrando madera en bruto, viruta, herramientas, bancos de trabajo, cortes, ensamble de estructuras de muebles, lijado, operarios o artesanos trabajando).
   - 'entrega_real': Si la foto fue tomada en un apartamento o casa residencial de un cliente (mostrando el mueble terminado ya instalado en un hogar real con decoración hogareña).
   - 'catalogo': Si la foto es de un mueble terminado aislado, fondo limpio de estudio o fotografía para catálogo comercial.

2. SI ES 'fabrica':
   - workshopBadge: Etiqueta breve sugerida para la tarjeta del taller (ej: 'En el taller', 'El ensamble', 'Ebanistas', 'Banco de oficio', 'Corte y Estructura', 'Lijado y Detalle', 'Acabados').
   - name: Título breve de la etapa del proceso (ej: 'Ensamble de estructura en roble', 'Lijado artesanal').

3. SI ES 'catalogo':
   - category: Clasifícala estrictamente en una de estas: ['Salas', 'Comedores', 'Dormitorios', 'Sillas', 'Oficinas', 'Exterior'].
   - name: Nombre comercial elegante y moderno en español (ej: 'Mesa Hacienda Roble', 'Sofá Barcelona Línea').
   - description: 2 líneas atractivas sobre el diseño, materiales, maderas y confort.
   - badge: 'NUEVO', 'MÁS VENDIDO', 'TENDENCIA', o null.

4. SI ES 'entrega_real':
   - title: Título descriptivo del proyecto entregado (ej: 'Comedor Roble Instalado en Medellín').
   - location: Ciudad o municipio de entrega sugerido (ej: 'Entrega real en Itagüí', 'Entrega real en Medellín', 'Entrega real en Envigado', 'Entrega real en Sabaneta').

Devuelve estrictamente un JSON válido con las propiedades:
{
  "destination": "catalogo" | "entrega_real" | "fabrica",
  "workshopBadge": "string",
  "category": "Salas | Comedores | Dormitorios | Sillas | Oficinas | Exterior",
  "name": "string",
  "description": "string",
  "badge": "string o null",
  "title": "string",
  "location": "string"
}`;

    // Try models with fallback in case of temporary 503 high demand
    let lastError = null;
    for (const modelName of FALLBACK_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: "user",
              parts: [
                {
                  inlineData: {
                    data: imageBase64,
                    mimeType,
                  },
                },
                { text: promptText },
              ],
            },
          ],
          config: {
            responseMimeType: "application/json",
          },
        });

        const rawText = response.text || "{}";
        const data = JSON.parse(rawText);

        return NextResponse.json({
          ...data,
          modelUsed: modelName,
          isRealAi: true,
        });
      } catch (err: any) {
        lastError = err;
        // Continue to next model in cascade
      }
    }

    throw lastError || new Error("No se pudo procesar con ningún modelo de visión");
  } catch (error: any) {
    console.error("Error al clasificar imagen con IA:", error);
    return NextResponse.json(
      {
        error: "Error al analizar imagen con IA",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
