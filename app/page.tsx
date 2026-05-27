import { About } from "@/components/about";
import { Appointment } from "@/components/appointment";
import { BeforeAfterResults } from "@/components/before-after-results";
import { Contact } from "@/components/contact";
import { Doctors } from "@/components/doctors";
import { Hero } from "@/components/hero";
import { InfrastructureGallery } from "@/components/infrastructure-gallery";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { TrustSection } from "@/components/trust-section";
import { clinic, mapDirectionsUrl, siteUrl } from "@/lib/clinic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  url: siteUrl,
  image: `${siteUrl}/images/dr-ila-treatment.jpeg`,
  telephone: clinic.phone,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "GF, opposite Vasant Kunj North Police Station, Pocket 2, Sector C, Vasant Kunj",
    addressLocality: "New Delhi",
    postalCode: "110070",
    addressCountry: "IN"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      opens: "10:00",
      closes: "21:00"
    }
  ],
  medicalSpecialty: "Dentistry",
  hasMap: mapDirectionsUrl,
  employee: clinic.doctors.map((doctor) => ({
    "@type": "Dentist",
    name: doctor.name
  })),
  availableService: clinic.services.map((service) => ({
    "@type": "MedicalProcedure",
    name: service
  }))
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustSection />
      <About />
      <Services />
      <InfrastructureGallery />
      <BeforeAfterResults />
      <Doctors />
      <Testimonials />
      <Appointment />
      <Contact />
    </main>
  );
}
