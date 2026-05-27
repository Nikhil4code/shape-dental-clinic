# Shape Dental Aesthetics Clinics

Premium modern dental clinic website built with Next.js, Tailwind CSS, TypeScript, Framer Motion, Supabase and Resend.

## Project Structure

```txt
app/
  api/appointments/route.ts      Secure appointment booking API
  thank-you/page.tsx             Post-booking thank-you page
  layout.tsx                     SEO metadata, OpenGraph, layout shell
  page.tsx                       Landing page sections and schema markup
  robots.ts                      Robots metadata route
  sitemap.ts                     Sitemap metadata route
components/
  appointment-form.tsx           Client form with validation/loading states
  appointment.tsx                Booking section wrapper
  hero.tsx                       Premium animated hero
  about.tsx services.tsx         Main content sections
  doctors.tsx testimonials.tsx   Trust-building sections
  contact.tsx footer.tsx         Maps, contact and footer
lib/
  appointment-schema.ts          Shared Zod validation
  clinic.ts                      Clinic details, links and service data
  email.ts                       Resend patient/admin emails
  supabase-admin.ts              Server-only Supabase client
public/images/
  shape-dental-hero.png          Generated premium clinic hero image
supabase/
  schema.sql                     Appointments table, RLS and indexes
```

## Environment Variables

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SITE_URL="https://your-production-domain.com"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
RESEND_API_KEY="re_xxxxxxxxx"
RESEND_FROM_EMAIL="Shape Dental <appointments@yourdomain.com>"
ADMIN_EMAIL="clinic-admin@yourdomain.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="918168081035"
NEXT_PUBLIC_CLINIC_PHONE="+91 81680 81035"
```

Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Never expose it as a `NEXT_PUBLIC_` variable.

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run `supabase/schema.sql`.
4. Confirm that Row Level Security is enabled and there are no public `anon` insert policies.
5. Use the service role key only in Vercel environment variables.

The API stores appointment requests first, then attempts Resend email delivery. Email delivery status is saved in `email_status` and any delivery issue is recorded in `email_error` so leads are not lost.

## Resend Setup

1. Create or open a Resend account.
2. Verify the clinic sending domain.
3. Create an API key.
4. Set `RESEND_FROM_EMAIL` to a verified sender, for example `Shape Dental <appointments@yourdomain.com>`.
5. Set `ADMIN_EMAIL` to the clinic inbox that should receive new appointment details.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Deployment on Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add all environment variables from `.env.example`.
4. Deploy.
5. After deployment, update `NEXT_PUBLIC_SITE_URL` to the final production URL and redeploy.
6. Submit a test booking and confirm:
   - Supabase row is created.
   - Patient confirmation email is delivered.
   - Admin notification email is delivered.
   - User is redirected to `/thank-you`.

## SEO Features

- Local dentist metadata for Vasant Kunj, New Delhi.
- OpenGraph and Twitter card metadata.
- JSON-LD `Dentist` schema markup.
- Sitemap and robots routes.
- Google Maps embed and direction links.
- Mobile-first responsive layout.

Before launch, replace testimonial copy with verified patient review excerpts where available.
