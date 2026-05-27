"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { clinic } from "@/lib/clinic";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Doctors", href: "#doctors" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/80 shadow-sm backdrop-blur-2xl">
      <nav
        className="container-premium flex h-20 items-center justify-between"
        aria-label="Primary navigation"
      >
        <Link href="/" className="focus-ring rounded-xl">
          <span className="block text-lg font-black text-ink">
            Shape Dental
          </span>
          <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-royal-600">
            Aesthetics Clinics
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-700 transition hover:text-royal-700"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-royal-100 bg-white px-4 py-2 text-sm font-bold text-royal-800 shadow-sm transition hover:-translate-y-0.5 hover:border-royal-200"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {clinic.phone}
          </a>
          <a
            href="#appointment"
            className="focus-ring rounded-full bg-royal-600 px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-royal-700"
          >
            Book appointment
          </a>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-royal-100 bg-white text-ink lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid border-t border-royal-50 bg-white/95 transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="container-premium flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-royal-50 hover:text-royal-700"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#appointment"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-royal-600 px-5 py-3 text-center text-sm font-bold text-white"
            >
              Book appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
