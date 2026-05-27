import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import Image from "next/image";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import {
  clinic,
  mapDirectionsUrl,
  mapEmbedUrl,
  whatsappUrl
} from "@/lib/clinic";

export function Contact() {
  return (
    <MotionSection id="contact" className="section-padding bg-royal-50/55">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Contact"
          title="Visit Shape Dental Aesthetics Clinics in Vasant Kunj."
          description="Conveniently located opposite Vasant Kunj North Police Station, with easy directions and direct phone or WhatsApp appointment support."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-soft">
              <Image
                src="/images/clinic-storefront.jpeg"
                alt="Shape Dental Aesthetics Clinic storefront in Vasant Kunj"
                width={1080}
                height={1345}
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <div className="p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-royal-600">
                  Clinic exterior & branding
                </p>
                <p className="mt-2 leading-7 text-slate-600">
                  Easy-to-identify storefront for patients visiting the Vasant
                  Kunj clinic.
                </p>
              </div>
            </div>

            <ContactCard icon={MapPin} title="Clinic address">
              {clinic.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </ContactCard>
            <ContactCard icon={Phone} title="Phone">
              <a href={`tel:${clinic.phone.replace(/\s/g, "")}`}>
                {clinic.phone}
              </a>
            </ContactCard>
            <ContactCard icon={Clock} title="Working hours">
              {clinic.hours}
            </ContactCard>
            <ContactCard icon={Mail} title="Booking support">
              Use the appointment form for treatment requests or WhatsApp us
              directly.
            </ContactCard>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={mapDirectionsUrl}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-royal-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-royal-700"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Get directions
              </a>
              <a
                href={whatsappUrl}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-royal-100 bg-white px-6 py-3 text-sm font-bold text-royal-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-royal-50"
              >
                WhatsApp clinic
              </a>
            </div>
          </div>

          <div className="min-h-[420px] overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-premium">
            <iframe
              title="Google Map for Shape Dental Aesthetics Clinics"
              src={mapEmbedUrl}
              className="h-full min-h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function ContactCard({
  icon: Icon,
  title,
  children
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/80 bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-royal-50 text-royal-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">
            {title}
          </p>
          <div className="mt-2 leading-7 text-slate-700">{children}</div>
        </div>
      </div>
    </div>
  );
}
