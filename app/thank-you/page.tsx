import Link from "next/link";
import { CalendarCheck, MapPin, MessageCircle, Phone } from "lucide-react";
import { clinic, mapDirectionsUrl, whatsappUrl } from "@/lib/clinic";

export const metadata = {
  title: "Appointment Request Received"
};

export default function ThankYouPage() {
  return (
    <main className="bg-royal-glow">
      <section className="container-premium flex min-h-[78vh] items-center py-28">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/80 bg-white/85 p-8 text-center shadow-premium backdrop-blur-2xl sm:p-12">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-royal-600 text-white shadow-soft">
            <CalendarCheck className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="eyebrow">Request received</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Thank you for choosing {clinic.name}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Your appointment request has been recorded. Our clinic team will
            contact you shortly to confirm the final slot and answer any
            treatment questions.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href={`tel:${clinic.phone.replace(/\s/g, "")}`}
              className="focus-ring rounded-2xl border border-royal-100 bg-royal-50 px-4 py-4 text-sm font-semibold text-royal-800 transition hover:-translate-y-0.5 hover:bg-royal-100"
            >
              <Phone className="mx-auto mb-2 h-5 w-5" aria-hidden="true" />
              Call clinic
            </a>
            <a
              href={whatsappUrl}
              className="focus-ring rounded-2xl border border-royal-100 bg-royal-50 px-4 py-4 text-sm font-semibold text-royal-800 transition hover:-translate-y-0.5 hover:bg-royal-100"
            >
              <MessageCircle
                className="mx-auto mb-2 h-5 w-5"
                aria-hidden="true"
              />
              WhatsApp
            </a>
            <a
              href={mapDirectionsUrl}
              className="focus-ring rounded-2xl border border-royal-100 bg-royal-50 px-4 py-4 text-sm font-semibold text-royal-800 transition hover:-translate-y-0.5 hover:bg-royal-100"
            >
              <MapPin className="mx-auto mb-2 h-5 w-5" aria-hidden="true" />
              Directions
            </a>
          </div>

          <Link
            href="/"
            className="focus-ring mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-royal-800"
          >
            Back to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
