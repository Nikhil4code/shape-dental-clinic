import { Award, GraduationCap, Stethoscope } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import { clinic } from "@/lib/clinic";

export function Doctors() {
  return (
    <MotionSection id="doctors" className="section-padding bg-white">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Doctors"
          title="Led by dentists who balance precision with calm communication."
          description="Meet the clinical team patients interact with while planning their treatment journey at Shape Dental Aesthetics Clinics."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {clinic.doctors.map((doctor) => (
            <article
              key={doctor.name}
              className="overflow-hidden rounded-[2rem] border border-royal-100 bg-white shadow-soft"
            >
              <div className="h-2 bg-gradient-to-r from-royal-500 via-royal-300 to-white" />
              <div className="grid gap-6 p-7 sm:grid-cols-[auto_1fr] sm:p-8">
                <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-royal-600 text-3xl font-black text-white shadow-soft">
                  {doctor.initials}
                </div>
                <div>
                  <p className="eyebrow">Clinical team</p>
                  <h3 className="mt-3 text-2xl font-black text-ink">
                    {doctor.name}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {doctor.focus}
                  </p>
                  <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      <Stethoscope
                        className="h-4 w-4 text-royal-600"
                        aria-hidden="true"
                      />
                      Patient-first consultations
                    </span>
                    <span className="flex items-center gap-2">
                      <GraduationCap
                        className="h-4 w-4 text-royal-600"
                        aria-hidden="true"
                      />
                      Clear treatment education
                    </span>
                    <span className="flex items-center gap-2">
                      <Award
                        className="h-4 w-4 text-royal-600"
                        aria-hidden="true"
                      />
                      Aesthetic and functional planning
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
