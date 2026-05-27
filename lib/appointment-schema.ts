import { z } from "zod";
import { clinic } from "@/lib/clinic";

export const TREATMENTS = clinic.services;

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

function isValidIndianMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  const mobile = digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(mobile);
}

export function getIndiaDateIso(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function getIndiaDateIsoAfter(days: number) {
  return getIndiaDateIso(new Date(Date.now() + days * 24 * 60 * 60 * 1000));
}

export const appointmentFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name must be under 80 characters."),
  phone: z
    .string()
    .trim()
    .refine(isValidIndianMobile, "Please enter a valid Indian mobile number."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(120, "Email must be under 120 characters."),
  treatment: z.enum(TREATMENTS, {
    errorMap: () => ({ message: "Please select a treatment." })
  }),
  preferredDate: z
    .string()
    .trim()
    .regex(isoDateRegex, "Please choose a valid preferred date.")
    .refine((value) => value >= getIndiaDateIso(), {
      message: "Preferred date cannot be in the past."
    })
    .refine((value) => value <= getIndiaDateIsoAfter(180), {
      message: "Please choose a date within the next 6 months."
    }),
  message: z
    .string()
    .trim()
    .max(600, "Message must be under 600 characters.")
    .optional()
    .default("")
});

export const appointmentRequestSchema = appointmentFieldsSchema.extend({
  website: z.string().trim().optional().default(""),
  formStartedAt: z.coerce.number().int().positive()
});

export type AppointmentFields = z.infer<typeof appointmentFieldsSchema>;
export type AppointmentRequest = z.infer<typeof appointmentRequestSchema>;

export function getFieldErrors(error: z.ZodError) {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const key = issue.path[0]?.toString() ?? "form";
    if (!acc[key]) {
      acc[key] = issue.message;
    }
    return acc;
  }, {});
}
