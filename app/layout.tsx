import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { clinic, siteUrl } from "@/lib/clinic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${clinic.name} | Premium Dentist in Vasant Kunj, New Delhi`,
    template: `%s | ${clinic.name}`
  },
  description:
    "Book premium dental care in Vasant Kunj, New Delhi. Shape Dental Aesthetics Clinics offers root canal treatment, teeth whitening, crowns, bridges, dentures, laser dentistry, gum care and oral surgery.",
  keywords: [
    "dentist in Vasant Kunj",
    "dental clinic New Delhi",
    "Shape Dental Aesthetics Clinics",
    "root canal Vasant Kunj",
    "teeth whitening Delhi",
    "laser dentistry New Delhi",
    "bleeding gum treatment"
  ],
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: clinic.name,
    title: `${clinic.name} | Premium Dentist in Vasant Kunj`,
    description:
      "Luxury, modern dental care in New Delhi with appointments available Mon-Sat, 10 AM - 9 PM.",
    images: [
      {
        url: "/images/dr-ila-treatment.jpeg",
        width: 1080,
        height: 805,
        alt: "Dr. Ila Yadav providing dental treatment"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinic.name} | Premium Dental Care`,
    description:
      "Book a trusted dental appointment in Vasant Kunj, New Delhi.",
    images: ["/images/dr-ila-treatment.jpeg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#1260c5",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
