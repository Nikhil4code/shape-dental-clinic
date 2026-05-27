import Link from "next/link";
import { clinic, mapDirectionsUrl, whatsappUrl } from "@/lib/clinic";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-premium grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="inline-block rounded-xl">
            <span className="block text-xl font-black">{clinic.name}</span>
            <span className="mt-2 block max-w-md text-sm leading-7 text-white/70">
              Premium dental aesthetics and modern oral healthcare in Vasant
              Kunj, New Delhi.
            </span>
          </Link>
        </div>

        <div>
          <p className="font-black">Clinic</p>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#doctors" className="transition hover:text-white">
              Doctors
            </a>
            <a href="#appointment" className="transition hover:text-white">
              Appointment
            </a>
          </div>
        </div>

        <div>
          <p className="font-black">Visit</p>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-white/70">
            <p>{clinic.address}</p>
            <p>{clinic.hours}</p>
            <a href={`tel:${clinic.phone.replace(/\s/g, "")}`}>
              {clinic.phone}
            </a>
            <a href={whatsappUrl} className="transition hover:text-white">
              WhatsApp booking
            </a>
            <a href={mapDirectionsUrl} className="transition hover:text-white">
              Google Maps
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-premium flex flex-col gap-3 py-5 text-xs font-semibold text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {clinic.name}. All rights
            reserved.
          </p>
          <p>Built for local dental appointment conversion.</p>
        </div>
      </div>
    </footer>
  );
}
