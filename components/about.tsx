import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Crown, HeartPulse, ShieldCheck } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

const values = [
  {
    icon: Crown,
    title: "Premium smile aesthetics",
    description:
      "A refined clinic experience for patients who want dental treatment to feel precise, elevated and calm."
  },
  {
    icon: ShieldCheck,
    title: "Trust-first planning",
    description:
      "Clear treatment discussions, practical options and thoughtful next steps before care begins."
  },
  {
    icon: HeartPulse,
    title: "Comfort-led dentistry",
    description:
      "Modern care workflows designed to reduce uncertainty and make every visit feel reassuring."
  }
] satisfies Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}>;

const highlights = [
  "Located in Pocket 2, Sector C, Vasant Kunj",
  "Appointment-focused care for families and working professionals",
  "Modern dental services from routine care to aesthetic treatments",
  "Open Monday to Saturday, 10 AM to 9 PM"
];

export function About() {
  return (
    <MotionSection id="about" className="section-padding bg-white">
      <div className="container-premium grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="About the clinic"
          title="A polished dental destination for modern New Delhi patients."
          description="Shape Dental Aesthetics Clinics brings together aesthetic sensibility, clinical discipline and a patient-first booking experience in the heart of Vasant Kunj."
        />

        <div className="grid gap-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="rounded-3xl border border-royal-100 bg-royal-50/55 p-6 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-royal-700 shadow-sm">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-3 rounded-[2rem] border border-royal-100 bg-white p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl p-3">
                <CheckCircle2
                  className="mt-1 h-5 w-5 shrink-0 text-royal-600"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold leading-6 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
