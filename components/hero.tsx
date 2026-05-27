"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, MapPin, ShieldCheck } from "lucide-react";
import { clinic, mapDirectionsUrl } from "@/lib/clinic";

const stats = [
  { label: "Working hours", value: "10 AM - 9 PM" },
  { label: "Clinic days", value: "Mon - Sat" },
  { label: "Location", value: "Vasant Kunj" }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-royal-glow pt-32 sm:pt-36">
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-royal-200/30 blur-3xl" />
      <div className="container-premium relative grid min-h-[calc(100vh-5rem)] items-center gap-12 pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-royal-100 bg-white/80 px-4 py-2 text-sm font-bold text-royal-800 shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Premium dental care in New Delhi
          </div>

          <h1 className="mt-7 max-w-4xl font-display text-5xl font-semibold leading-tight text-ink sm:text-6xl lg:text-7xl">
            Shape Dental Aesthetics Clinics
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600 sm:text-xl">
            Luxury, precise and compassionate dentistry in Vasant Kunj for
            healthy smiles, refined aesthetics and confident patient journeys.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#appointment"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-royal-600 px-7 py-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-royal-700"
            >
              Book an appointment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={mapDirectionsUrl}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-royal-100 bg-white/85 px-7 py-4 text-sm font-bold text-royal-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Get directions
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-lg font-black text-ink">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-royal-200/35 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-premium">
            <Image
              src="/images/dr-ila-treatment.jpeg"
              alt="Dr. Ila Yadav providing dental treatment at Shape Dental Aesthetics Clinics"
              width={1080}
              height={805}
              priority
              className="aspect-[4/3] h-full w-full object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur-2xl sm:left-auto sm:max-w-xs">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-royal-600 text-white">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black text-ink">
                    Clinical care by Dr. Ila Yadav
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Real treatment environment with appointment requests
                    confirmed by the clinic team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
