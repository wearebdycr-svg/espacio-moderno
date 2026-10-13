import { siteConfig } from "@/config/site";

export function getWhatsAppUrl(customMessage?: string): string {
  const cleanPhone = siteConfig.phone.replace(/[^0-9]/g, "");
  const message = customMessage || siteConfig.whatsappDefaultMessage;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
