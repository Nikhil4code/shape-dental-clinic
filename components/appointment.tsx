import { CalendarDays, Clock, ShieldCheck } from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { SectionHeading } from "@/components/section-heading";
import { clinic } from "@/lib/clinic";

export function Appointment() {
  return (
    <section id="appointment" className="section-padding bg-white">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Appointment booking"
          title="Request a dental appointment in under a minute."
          description="Share your preferred date and treatment interest. The clinic team will call or email you to confirm availability."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[2rem] bg-ink p-7 text-white shadow-premium sm:p-8">
            <p className="eyebrow text-royal-200">Why book online</p>
            <h3 className="mt-4 font-display text-3xl font-semibold">
              A smoother first step for busy patients.
            </h3>
            <div className="mt-8 grid gap-5">
              <div className="flex gap-4">
                <CalendarDays className="h-6 w-6 shrink-0 text-royal-200" />
                <div>
                  <p className="font-bold">Preferred date capture</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Submit your chosen day and the team will confirm a suitable
                    appointment slot.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="h-6 w-6 shrink-0 text-royal-200" />
                <div>
                  <p className="font-bold">Private server handling</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Submissions go through a secure server route before being
                    stored in Supabase.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="h-6 w-6 shrink-0 text-royal-200" />
                <div>
                  <p className="font-bold">{clinic.hours}</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    For urgent dental concerns, call the clinic directly at{" "}
                    {clinic.phone}.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
