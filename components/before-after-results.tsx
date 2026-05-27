"use client";

import { useState } from "react";
import { ArrowLeftRight, ShieldCheck } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

export function BeforeAfterResults() {
  const [position, setPosition] = useState(52);
  const image = "url('/images/smile-before-after.jpeg')";

  return (
    <MotionSection className="section-padding bg-royal-50/55">
      <div className="container-premium grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Before / after results"
            title="Visible smile transformation that builds conversion confidence."
            description="A strong before-after result gives patients a clear reason to trust aesthetic and restorative dental work before they book."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/80 bg-white p-5 shadow-sm">
              <ShieldCheck className="h-7 w-7 text-royal-600" />
              <p className="mt-4 font-black text-ink">Aesthetic restoration</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Supports services such as crowns, bridges, fillings and smile
                correction conversations.
              </p>
            </div>
            <div className="rounded-3xl border border-white/80 bg-white p-5 shadow-sm">
              <ArrowLeftRight className="h-7 w-7 text-royal-600" />
              <p className="mt-4 font-black text-ink">
                Interactive comparison
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Drag the slider to compare the before and after result.
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm font-semibold leading-6 text-slate-500">
            Treatment results can vary by patient condition, treatment plan and
            clinical suitability.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-white p-4 shadow-premium">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-royal-50">
            <div
              className="aspect-[1.15/1] bg-cover bg-bottom"
              style={{
                backgroundImage: image,
                backgroundSize: "100% 200%",
                backgroundPosition: "center bottom"
              }}
            />
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-4 border-white"
              style={{ width: `${position}%` }}
            >
              <div
                className="h-full bg-cover"
                style={{
                  width: `${10000 / position}%`,
                  backgroundImage: image,
                  backgroundSize: "100% 200%",
                  backgroundPosition: "center top"
                }}
              />
            </div>
            <div
              className="absolute inset-y-0 flex -translate-x-1/2 items-center"
              style={{ left: `${position}%` }}
              aria-hidden="true"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-royal-600 text-white shadow-soft">
                <ArrowLeftRight className="h-5 w-5" />
              </div>
            </div>
            <div className="absolute left-4 top-4 rounded-full bg-ink/75 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">
              Before
            </div>
            <div className="absolute right-4 top-4 rounded-full bg-royal-600/85 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">
              After
            </div>
          </div>

          <label className="mt-5 block">
            <span className="sr-only">Adjust before-after comparison</span>
            <input
              type="range"
              min="18"
              max="82"
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              className="w-full accent-royal-600"
            />
          </label>
        </div>
      </div>
    </MotionSection>
  );
}
