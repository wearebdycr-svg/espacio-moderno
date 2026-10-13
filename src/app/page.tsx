import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Catalog } from "@/components/Catalog";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ContactQuote } from "@/components/ContactQuote";
import { Footer } from "@/components/Footer";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F2EB] text-[#1A1A1A] selection:bg-[#B8935A] selection:text-white font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Catalog />
        <Process />
        <Testimonials />
        <ContactQuote />
      </main>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}

