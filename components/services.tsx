import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgePlus,
  Bone,
  CircleDot,
  Gem,
  HeartPulse,
  ScanLine,
  ShieldPlus,
  Sparkles
} from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import { clinic } from "@/lib/clinic";

const serviceDetails: Record<
  (typeof clinic.services)[number],
  { icon: LucideIcon; description: string }
> = {
  "General Dentistry": {
    icon: ShieldPlus,
    description:
      "Routine consultations, preventive guidance and essential dental care for long-term oral health."
  },
  "Root Canal Treatment": {
    icon: Activity,
    description:
      "Careful treatment planning for infected or painful teeth with a focus on comfort and preservation."
  },
  "Teeth Whitening": {
    icon: Sparkles,
    description:
      "Aesthetic whitening support for brighter smiles and confident special occasions."
  },
  "Dental Fillings": {
    icon: CircleDot,
    description:
      "Natural-looking restorative care for cavities, chips and tooth structure support."
  },
  "Crowns & Bridges": {
    icon: Gem,
    description:
      "Functional and aesthetic restorations designed to support bite, shape and smile balance."
  },
  Dentures: {
    icon: Bone,
    description:
      "Thoughtful replacement options for missing teeth and day-to-day chewing confidence."
  },
  "Laser Dentistry": {
    icon: ScanLine,
    description:
      "Modern laser-assisted dental workflows where suitable for precise, patient-friendly care."
  },
  "Bleeding Gum Treatment": {
    icon: HeartPulse,
    description:
      "Gum health evaluation and treatment planning for bleeding, swelling and sensitivity."
  },
  "Oral Surgery": {
    icon: BadgePlus,
    description:
      "Oral surgical consultations and procedures with clear guidance before and after treatment."
  }
};

export function Services() {
  return (
    <MotionSection id="services" className="section-padding bg-royal-50/55">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Dental services"
          title="Comprehensive care for healthier, more confident smiles."
          description="From routine dentistry to aesthetic and surgical consultations, every service is presented with clarity so patients can take the next step confidently."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clinic.services.map((service) => {
            const detail = serviceDetails[service];
            const Icon = detail.icon;

            return (
              <article
                key={service}
                className="group rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-royal-200 hover:shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-50 text-royal-700 transition group-hover:bg-royal-600 group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-black text-ink">{service}</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {detail.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
