"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

const gallery = [
  {
    src: "/images/clinic-chair-wide.jpeg",
    alt: "Modern dental chair and equipment at Shape Dental Aesthetics Clinics",
    title: "Treatment room setup",
    text: "Modern dental chair, lighting and working area for precise procedures."
  },
  {
    src: "/images/clinic-chair-vertical.jpeg",
    alt: "Clean dental treatment chair inside Shape Dental Aesthetics Clinics",
    title: "Clean clinical infrastructure",
    text: "Organized equipment and a hygienic setup designed for patient comfort."
  }
];

export function InfrastructureGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    scrollerRef.current?.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth"
    });
  }

  return (
    <MotionSection className="section-padding bg-white">
      <div className="container-premium">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Clinic infrastructure"
            title="Modern & Hygienic Clinic Infrastructure"
            description="Real clinic interiors help patients see the treatment environment before they book their first appointment."
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full border border-royal-100 bg-white text-royal-800 shadow-sm transition hover:bg-royal-50"
              aria-label="Previous infrastructure photo"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full bg-royal-600 text-white shadow-soft transition hover:bg-royal-700"
              aria-label="Next infrastructure photo"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"
        >
          {gallery.map((item) => (
            <article
              key={item.src}
              className="min-w-[84%] snap-start overflow-hidden rounded-[2rem] border border-royal-100 bg-white shadow-soft sm:min-w-[520px]"
            >
              <div className="relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1080}
                  height={900}
                  className="aspect-[4/3] h-full w-full object-cover"
                />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-black text-royal-800 shadow-sm backdrop-blur">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Real clinic photo
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-ink">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
