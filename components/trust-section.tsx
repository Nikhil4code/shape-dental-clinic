import Image from "next/image";
import { HeartHandshake, ShieldCheck, Star, Users } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

const trustPoints = [
  {
    icon: HeartHandshake,
    title: "Personal consultation",
    text: "Patients receive clear guidance before treatment decisions are made."
  },
  {
    icon: Users,
    title: "Family-friendly care",
    text: "A calm setting for senior citizens, working professionals and families."
  },
  {
    icon: ShieldCheck,
    title: "Transparent treatment planning",
    text: "The clinic focuses on practical options, comfort and patient confidence."
  },
  {
    icon: Star,
    title: "Relationship-led dentistry",
    text: "Real patient interactions help build the trust needed for long-term care."
  }
];

export function TrustSection() {
  return (
    <MotionSection id="trust" className="section-padding bg-royal-50/55">
      <div className="container-premium grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-premium">
          <Image
            src="/images/dr-ila-patient-trust.jpeg"
            alt="Dr. Ila Yadav with an elderly patient at Shape Dental Aesthetics Clinics"
            width={1080}
            height={1422}
            className="aspect-[4/5] h-full w-full object-cover"
          />
          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-soft backdrop-blur-2xl">
            <p className="text-sm font-black text-ink">
              Trusted by patients across Vasant Kunj
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              A real clinic moment that adds credibility beyond stock imagery.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Why patients trust us"
            title="Real patient trust, modern dental care and clear communication."
            description="This section uses authentic clinic imagery to show the human side of care: consultation, reassurance and patient-first treatment planning."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-3xl border border-white/80 bg-white p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-50 text-royal-700">
                  <point.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-black text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
