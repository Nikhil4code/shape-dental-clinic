export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://shape-dental-aesthetics.vercel.app";

export const clinic = {
  name: "Shape Dental Aesthetics Clinics",
  tagline: "Premium dental aesthetics and family care in Vasant Kunj",
  address:
    "GF, opposite Vasant Kunj North Police Station, Pocket 2, Sector C, Vasant Kunj, New Delhi 110070",
  addressLines: [
    "GF, opposite Vasant Kunj North Police Station",
    "Pocket 2, Sector C, Vasant Kunj",
    "New Delhi 110070"
  ],
  phone: process.env.NEXT_PUBLIC_CLINIC_PHONE ?? "+91 81680 81035",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918168081035",
  hours: "Mon-Sat, 10 AM - 9 PM",
  doctors: [
    {
      name: "Dr. Ila Yadav",
      focus: "Aesthetic, restorative and family dentistry",
      initials: "IY"
    },
    {
      name: "Dr. Sristi Raj",
      focus: "General dentistry, gum care and smile enhancement",
      initials: "SR"
    }
  ],
  services: [
    "General Dentistry",
    "Root Canal Treatment",
    "Teeth Whitening",
    "Dental Fillings",
    "Crowns & Bridges",
    "Dentures",
    "Laser Dentistry",
    "Bleeding Gum Treatment",
    "Oral Surgery"
  ] as const,
  mapQuery:
    "Shape Dental Aesthetics Clinics, Vasant Kunj, New Delhi 110070"
};

export const whatsappUrl = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${clinic.name}, I would like to book a dental appointment.`
)}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  clinic.mapQuery
)}&output=embed`;

export const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  clinic.mapQuery
)}`;
