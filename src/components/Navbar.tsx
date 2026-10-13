"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#3B2F2F] border-b border-[#4E3E3E]/70 shadow-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
        {/* Brand Logo matching brand manual: breathing room, white/cream on dark */}
        <Link href="/" className="flex items-center gap-4 group select-none py-2">
          <img
            src="/images/monogram-transparent.png"
            alt="Espacio Moderno"
            className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          />
          <div className="flex flex-col justify-center leading-[0.98] font-sans">
            <span className="text-[19px] sm:text-[22px] font-black uppercase text-[#FFFFFF] tracking-wider">
              ESPACIO
            </span>
            <span className="text-[19px] sm:text-[22px] font-black uppercase text-[#FFFFFF] tracking-wider mt-0.5">
              MODERNO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links directly from brand manual */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-9">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[14px] font-medium tracking-normal text-[#F5F2EB]/90 hover:text-[#B8935A] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Quick WhatsApp Contact Pill en Bronce Antiguo (#B8935A) */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#B8935A]/50 bg-[#342929] hover:bg-[#B8935A]/20 px-3.5 py-1.5 text-xs font-semibold text-[#F5F2EB] transition-all shadow-sm hover:border-[#B8935A] group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8935A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8935A]"></span>
            </span>
            <WhatsAppIcon className="h-3.5 w-3.5 fill-[#B8935A] group-hover:scale-110 transition-transform" />
            <span className="font-mono tracking-tight font-bold text-white">314 297 9756</span>
          </a>
        </nav>

        {/* Mobile menu hamburger button */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B8935A] text-white shadow-md active:scale-95 transition-transform"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5 fill-white" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F5F2EB] hover:text-[#B8935A] transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#4E3E3E] bg-[#3B2F2F] px-6 pt-4 pb-6 space-y-3">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-[#F5F2EB]/90 hover:text-[#B8935A] py-2 border-b border-[#4E3E3E]/50 last:border-0"
            >
              {link.label}
            </Link>
          ))}

          {/* Prominent WhatsApp button in mobile menu */}
          <div className="pt-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#B8935A] hover:bg-[#A4814E] px-4 py-3 text-sm font-bold text-white shadow-md transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4 fill-white" />
              <span>WhatsApp: 314 297 9756</span>
            </a>
          </div>
        </div>
      )}

    </header>
  );
}

