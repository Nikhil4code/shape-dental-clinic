import { Quote, Star } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

const testimonials = [
  {
    quote:
      "The consultation felt calm and transparent. I understood the treatment plan clearly before making a decision.",
    label: "Aesthetic dentistry patient",
    location: "Vasant Kunj"
  },
  {
    quote:
      "The clinic experience was modern, clean and reassuring. Booking was simple and the follow-up was prompt.",
    label: "Family dentistry patient",
    location: "South Delhi"
  },
  {
    quote:
      "I appreciated the attention to comfort and the way every step was explained without pressure.",
    label: "Root canal consultation",
    location: "New Delhi"
  }
];

export function Testimonials() {
  return (
    <MotionSection
      id="testimonials"
      className="section-padding bg-royal-50/55"
    >
      <div className="container-premium">
        <SectionHeading
          eyebrow="Patient trust"
          title="Designed for patients who value clarity, comfort and polish."
          description="A high-converting dental website should answer patient concerns quickly: trust, convenience, location and a clear path to book."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.label}
              className="rounded-[1.75rem] border border-white/80 bg-white p-7 shadow-sm"
            >
              <Quote className="h-8 w-8 text-royal-500" aria-hidden="true" />
              <div className="mt-5 flex gap-1 text-royal-500" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 leading-8 text-slate-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-royal-50 pt-5">
                <p className="font-black text-ink">{testimonial.label}</p>
                <p className="mt-1 text-sm font-semibold text-royal-700">
                  {testimonial.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
