import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./styles.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Espacio Moderno | Muebles a Medida y Diseño de Interiores en Itagüí y Medellín",
    template: "%s | Espacio Moderno",
  },
  description:
    "Fábrica de muebles a medida de alta gama en Itagüí, Medellín y Valle de Aburrá. Comedores en roble, salas modulares, mobiliario arquitectónico y diseño sobre medida. Cotiza por WhatsApp.",
  keywords: [
    "muebles a medida Medellín",
    "muebles a medida Itagüí",
    "fábrica de muebles Itagüí",
    "comedores en madera maciza Medellín",
    "salas modulares Envigado",
    "diseño de interiores Valle de Aburrá",
    "ebanistería fina Antioquia",
    "mobiliario personalizado Sabaneta",
    "Espacio Moderno",
  ],
  authors: [{ name: "Espacio Moderno" }],
  creator: "Espacio Moderno",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Espacio Moderno | Muebles a Medida en Itagüí, Medellín y Valle de Aburrá",
    description:
      "Mobiliario contemporáneo sobre medida, maderas nobles seleccionadas y acabados arquitectónicos. Cotiza directo con nuestro taller por WhatsApp.",
    url: siteConfig.url,
    siteName: "Espacio Moderno",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/hero-room.png",
        width: 1200,
        height: 630,
        alt: "Espacio Moderno - Mobiliario a Medida y Diseño de Interiores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espacio Moderno | Muebles a Medida en Itagüí y Medellín",
    description:
      "Fábrica de mobiliario contemporáneo sobre medida en el Valle de Aburrá. Cotiza directo por WhatsApp.",
    images: ["/images/hero-room.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    image: `${siteConfig.url}/images/hero-room.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cra. 52 #35 - 46",
      addressLocality: "Itagüí",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    areaServed: [
      "Itagüí",
      "Medellín",
      "Envigado",
      "Sabaneta",
      "La Estrella",
      "Bello",
      "Valle de Aburrá",
      "Rionegro",
    ],
    sameAs: [siteConfig.instagramUrl],
    priceRange: "$$$",
  };

  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || process.env.CLARITY_ID;

  return (
    <html lang="es" className="antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {clarityId && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityId}");
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-[#F5F2EB] text-[#1A1A1A] font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


