import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/clinic";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      aria-label="Chat with Shape Dental Aesthetics Clinics on WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0f9f6e] text-white shadow-premium transition hover:-translate-y-1 hover:bg-[#0b8b60] sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
