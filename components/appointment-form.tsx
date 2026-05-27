"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  AppointmentFields,
  appointmentFieldsSchema,
  getFieldErrors,
  getIndiaDateIso,
  TREATMENTS
} from "@/lib/appointment-schema";
import { cn } from "@/lib/utils";

const initialForm: AppointmentFields = {
  name: "",
  phone: "",
  email: "",
  treatment: TREATMENTS[0],
  preferredDate: getIndiaDateIso(),
  message: ""
};

type ApiResponse = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export function AppointmentForm() {
  const router = useRouter();
  const startedAt = useRef(Date.now());
  const [form, setForm] = useState<AppointmentFields>(initialForm);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const minDate = useMemo(() => getIndiaDateIso(), []);

  function updateField<Field extends keyof AppointmentFields>(
    field: Field,
    value: AppointmentFields[Field]
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const parsed = appointmentFieldsSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(getFieldErrors(parsed.error));
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...parsed.data,
          website,
          formStartedAt: startedAt.current
        })
      });

      const result = (await response.json().catch(() => null)) as
        | ApiResponse
        | null;

      if (!response.ok || !result?.ok) {
        setErrors(result?.errors ?? {});
        setFormError(
          result?.message ??
            "We could not submit your appointment request. Please call the clinic."
        );
        return;
      }

      router.push("/thank-you");
    } catch {
      setFormError(
        "Network issue while submitting. Please try again or call the clinic."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-royal-100 bg-white p-5 shadow-premium sm:p-8"
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          error={errors.name}
          className="sm:col-span-2"
        >
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className={inputClass(errors.name)}
          />
        </Field>

        <Field label="Phone" error={errors.phone}>
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            inputMode="tel"
            className={inputClass(errors.phone)}
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            className={inputClass(errors.email)}
          />
        </Field>

        <Field label="Treatment" error={errors.treatment}>
          <select
            value={form.treatment}
            onChange={(event) =>
              updateField(
                "treatment",
                event.target.value as AppointmentFields["treatment"]
              )
            }
            className={inputClass(errors.treatment)}
          >
            {TREATMENTS.map((treatment) => (
              <option key={treatment} value={treatment}>
                {treatment}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred date" error={errors.preferredDate}>
          <input
            type="date"
            min={minDate}
            value={form.preferredDate}
            onChange={(event) =>
              updateField("preferredDate", event.target.value)
            }
            className={inputClass(errors.preferredDate)}
          />
        </Field>

        <Field
          label="Message"
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Tell us about your concern, preferred timing, or any dental history you want the team to know."
            rows={5}
            className={cn(inputClass(errors.message), "resize-none")}
          />
        </Field>
      </div>

      {formError ? (
        <p
          className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-500">
          By submitting, you agree to be contacted by the clinic for appointment
          confirmation.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-royal-600 px-7 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-royal-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Submitting..." : "Request appointment"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      {children}
      {error ? (
        <span className="mt-2 block text-sm font-semibold text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function inputClass(error?: string) {
  return cn(
    "focus-ring w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm transition placeholder:text-slate-400",
    error
      ? "border-red-300 ring-2 ring-red-100"
      : "border-royal-100 hover:border-royal-200"
  );
}
